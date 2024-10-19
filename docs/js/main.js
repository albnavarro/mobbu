(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/highlight.js/lib/core.js
  var require_core = __commonJS({
    "node_modules/highlight.js/lib/core.js"(exports, module) {
      function deepFreeze(obj) {
        if (obj instanceof Map) {
          obj.clear = obj.delete = obj.set = function() {
            throw new Error("map is read-only");
          };
        } else if (obj instanceof Set) {
          obj.add = obj.clear = obj.delete = function() {
            throw new Error("set is read-only");
          };
        }
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((name) => {
          const prop = obj[name];
          const type = typeof prop;
          if ((type === "object" || type === "function") && !Object.isFrozen(prop)) {
            deepFreeze(prop);
          }
        });
        return obj;
      }
      var Response = class {
        /**
         * @param {CompiledMode} mode
         */
        constructor(mode) {
          if (mode.data === void 0) mode.data = {};
          this.data = mode.data;
          this.isMatchIgnored = false;
        }
        ignoreMatch() {
          this.isMatchIgnored = true;
        }
      };
      function escapeHTML(value) {
        return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
      }
      function inherit$1(original, ...objects) {
        const result = /* @__PURE__ */ Object.create(null);
        for (const key in original) {
          result[key] = original[key];
        }
        objects.forEach(function(obj) {
          for (const key in obj) {
            result[key] = obj[key];
          }
        });
        return (
          /** @type {T} */
          result
        );
      }
      var SPAN_CLOSE = "</span>";
      var emitsWrappingTags = (node) => {
        return !!node.scope;
      };
      var scopeToCSSClass = (name, { prefix }) => {
        if (name.startsWith("language:")) {
          return name.replace("language:", "language-");
        }
        if (name.includes(".")) {
          const pieces = name.split(".");
          return [
            `${prefix}${pieces.shift()}`,
            ...pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`)
          ].join(" ");
        }
        return `${prefix}${name}`;
      };
      var HTMLRenderer = class {
        /**
         * Creates a new HTMLRenderer
         *
         * @param {Tree} parseTree - the parse tree (must support `walk` API)
         * @param {{classPrefix: string}} options
         */
        constructor(parseTree, options2) {
          this.buffer = "";
          this.classPrefix = options2.classPrefix;
          parseTree.walk(this);
        }
        /**
         * Adds texts to the output stream
         *
         * @param {string} text */
        addText(text) {
          this.buffer += escapeHTML(text);
        }
        /**
         * Adds a node open to the output stream (if needed)
         *
         * @param {Node} node */
        openNode(node) {
          if (!emitsWrappingTags(node)) return;
          const className = scopeToCSSClass(
            node.scope,
            { prefix: this.classPrefix }
          );
          this.span(className);
        }
        /**
         * Adds a node close to the output stream (if needed)
         *
         * @param {Node} node */
        closeNode(node) {
          if (!emitsWrappingTags(node)) return;
          this.buffer += SPAN_CLOSE;
        }
        /**
         * returns the accumulated buffer
        */
        value() {
          return this.buffer;
        }
        // helpers
        /**
         * Builds a span element
         *
         * @param {string} className */
        span(className) {
          this.buffer += `<span class="${className}">`;
        }
      };
      var newNode = (opts = {}) => {
        const result = { children: [] };
        Object.assign(result, opts);
        return result;
      };
      var TokenTree = class _TokenTree {
        constructor() {
          this.rootNode = newNode();
          this.stack = [this.rootNode];
        }
        get top() {
          return this.stack[this.stack.length - 1];
        }
        get root() {
          return this.rootNode;
        }
        /** @param {Node} node */
        add(node) {
          this.top.children.push(node);
        }
        /** @param {string} scope */
        openNode(scope) {
          const node = newNode({ scope });
          this.add(node);
          this.stack.push(node);
        }
        closeNode() {
          if (this.stack.length > 1) {
            return this.stack.pop();
          }
          return void 0;
        }
        closeAllNodes() {
          while (this.closeNode()) ;
        }
        toJSON() {
          return JSON.stringify(this.rootNode, null, 4);
        }
        /**
         * @typedef { import("./html_renderer").Renderer } Renderer
         * @param {Renderer} builder
         */
        walk(builder) {
          return this.constructor._walk(builder, this.rootNode);
        }
        /**
         * @param {Renderer} builder
         * @param {Node} node
         */
        static _walk(builder, node) {
          if (typeof node === "string") {
            builder.addText(node);
          } else if (node.children) {
            builder.openNode(node);
            node.children.forEach((child2) => this._walk(builder, child2));
            builder.closeNode(node);
          }
          return builder;
        }
        /**
         * @param {Node} node
         */
        static _collapse(node) {
          if (typeof node === "string") return;
          if (!node.children) return;
          if (node.children.every((el) => typeof el === "string")) {
            node.children = [node.children.join("")];
          } else {
            node.children.forEach((child2) => {
              _TokenTree._collapse(child2);
            });
          }
        }
      };
      var TokenTreeEmitter = class extends TokenTree {
        /**
         * @param {*} options
         */
        constructor(options2) {
          super();
          this.options = options2;
        }
        /**
         * @param {string} text
         */
        addText(text) {
          if (text === "") {
            return;
          }
          this.add(text);
        }
        /** @param {string} scope */
        startScope(scope) {
          this.openNode(scope);
        }
        endScope() {
          this.closeNode();
        }
        /**
         * @param {Emitter & {root: DataNode}} emitter
         * @param {string} name
         */
        __addSublanguage(emitter, name) {
          const node = emitter.root;
          if (name) node.scope = `language:${name}`;
          this.add(node);
        }
        toHTML() {
          const renderer = new HTMLRenderer(this, this.options);
          return renderer.value();
        }
        finalize() {
          this.closeAllNodes();
          return true;
        }
      };
      function source(re) {
        if (!re) return null;
        if (typeof re === "string") return re;
        return re.source;
      }
      function lookahead(re) {
        return concat("(?=", re, ")");
      }
      function anyNumberOfTimes(re) {
        return concat("(?:", re, ")*");
      }
      function optional(re) {
        return concat("(?:", re, ")?");
      }
      function concat(...args) {
        const joined = args.map((x) => source(x)).join("");
        return joined;
      }
      function stripOptionsFromArgs(args) {
        const opts = args[args.length - 1];
        if (typeof opts === "object" && opts.constructor === Object) {
          args.splice(args.length - 1, 1);
          return opts;
        } else {
          return {};
        }
      }
      function either(...args) {
        const opts = stripOptionsFromArgs(args);
        const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source(x)).join("|") + ")";
        return joined;
      }
      function countMatchGroups(re) {
        return new RegExp(re.toString() + "|").exec("").length - 1;
      }
      function startsWith(re, lexeme) {
        const match = re && re.exec(lexeme);
        return match && match.index === 0;
      }
      var BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
      function _rewriteBackreferences(regexps, { joinWith }) {
        let numCaptures = 0;
        return regexps.map((regex) => {
          numCaptures += 1;
          const offset2 = numCaptures;
          let re = source(regex);
          let out = "";
          while (re.length > 0) {
            const match = BACKREF_RE.exec(re);
            if (!match) {
              out += re;
              break;
            }
            out += re.substring(0, match.index);
            re = re.substring(match.index + match[0].length);
            if (match[0][0] === "\\" && match[1]) {
              out += "\\" + String(Number(match[1]) + offset2);
            } else {
              out += match[0];
              if (match[0] === "(") {
                numCaptures++;
              }
            }
          }
          return out;
        }).map((re) => `(${re})`).join(joinWith);
      }
      var MATCH_NOTHING_RE = /\b\B/;
      var IDENT_RE2 = "[a-zA-Z]\\w*";
      var UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
      var NUMBER_RE = "\\b\\d+(\\.\\d+)?";
      var C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
      var BINARY_NUMBER_RE = "\\b(0b[01]+)";
      var RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
      var SHEBANG = (opts = {}) => {
        const beginShebang = /^#![ ]*\//;
        if (opts.binary) {
          opts.begin = concat(
            beginShebang,
            /.*\b/,
            opts.binary,
            /\b.*/
          );
        }
        return inherit$1({
          scope: "meta",
          begin: beginShebang,
          end: /$/,
          relevance: 0,
          /** @type {ModeCallback} */
          "on:begin": (m, resp) => {
            if (m.index !== 0) resp.ignoreMatch();
          }
        }, opts);
      };
      var BACKSLASH_ESCAPE = {
        begin: "\\\\[\\s\\S]",
        relevance: 0
      };
      var APOS_STRING_MODE = {
        scope: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [BACKSLASH_ESCAPE]
      };
      var QUOTE_STRING_MODE = {
        scope: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [BACKSLASH_ESCAPE]
      };
      var PHRASAL_WORDS_MODE = {
        begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
      };
      var COMMENT = function(begin, end, modeOptions = {}) {
        const mode = inherit$1(
          {
            scope: "comment",
            begin,
            end,
            contains: []
          },
          modeOptions
        );
        mode.contains.push({
          scope: "doctag",
          // hack to avoid the space from being included. the space is necessary to
          // match here to prevent the plain text rule below from gobbling up doctags
          begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
          end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
          excludeBegin: true,
          relevance: 0
        });
        const ENGLISH_WORD = either(
          // list of common 1 and 2 letter words in English
          "I",
          "a",
          "is",
          "so",
          "us",
          "to",
          "at",
          "if",
          "in",
          "it",
          "on",
          // note: this is not an exhaustive list of contractions, just popular ones
          /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
          // contractions - can't we'd they're let's, etc
          /[A-Za-z]+[-][a-z]+/,
          // `no-way`, etc.
          /[A-Za-z][a-z]{2,}/
          // allow capitalized words at beginning of sentences
        );
        mode.contains.push(
          {
            // TODO: how to include ", (, ) without breaking grammars that use these for
            // comment delimiters?
            // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
            // ---
            // this tries to find sequences of 3 english words in a row (without any
            // "programming" type syntax) this gives us a strong signal that we've
            // TRULY found a comment - vs perhaps scanning with the wrong language.
            // It's possible to find something that LOOKS like the start of the
            // comment - but then if there is no readable text - good chance it is a
            // false match and not a comment.
            //
            // for a visual example please see:
            // https://github.com/highlightjs/highlight.js/issues/2827
            begin: concat(
              /[ ]+/,
              // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
              "(",
              ENGLISH_WORD,
              /[.]?[:]?([.][ ]|[ ])/,
              "){3}"
            )
            // look for 3 words in a row
          }
        );
        return mode;
      };
      var C_LINE_COMMENT_MODE = COMMENT("//", "$");
      var C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
      var HASH_COMMENT_MODE = COMMENT("#", "$");
      var NUMBER_MODE = {
        scope: "number",
        begin: NUMBER_RE,
        relevance: 0
      };
      var C_NUMBER_MODE = {
        scope: "number",
        begin: C_NUMBER_RE,
        relevance: 0
      };
      var BINARY_NUMBER_MODE = {
        scope: "number",
        begin: BINARY_NUMBER_RE,
        relevance: 0
      };
      var REGEXP_MODE = {
        scope: "regexp",
        begin: /\/(?=[^/\n]*\/)/,
        end: /\/[gimuy]*/,
        contains: [
          BACKSLASH_ESCAPE,
          {
            begin: /\[/,
            end: /\]/,
            relevance: 0,
            contains: [BACKSLASH_ESCAPE]
          }
        ]
      };
      var TITLE_MODE = {
        scope: "title",
        begin: IDENT_RE2,
        relevance: 0
      };
      var UNDERSCORE_TITLE_MODE = {
        scope: "title",
        begin: UNDERSCORE_IDENT_RE,
        relevance: 0
      };
      var METHOD_GUARD = {
        // excludes method names from keyword processing
        begin: "\\.\\s*" + UNDERSCORE_IDENT_RE,
        relevance: 0
      };
      var END_SAME_AS_BEGIN = function(mode) {
        return Object.assign(
          mode,
          {
            /** @type {ModeCallback} */
            "on:begin": (m, resp) => {
              resp.data._beginMatch = m[1];
            },
            /** @type {ModeCallback} */
            "on:end": (m, resp) => {
              if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
            }
          }
        );
      };
      var MODES = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        APOS_STRING_MODE,
        BACKSLASH_ESCAPE,
        BINARY_NUMBER_MODE,
        BINARY_NUMBER_RE,
        COMMENT,
        C_BLOCK_COMMENT_MODE,
        C_LINE_COMMENT_MODE,
        C_NUMBER_MODE,
        C_NUMBER_RE,
        END_SAME_AS_BEGIN,
        HASH_COMMENT_MODE,
        IDENT_RE: IDENT_RE2,
        MATCH_NOTHING_RE,
        METHOD_GUARD,
        NUMBER_MODE,
        NUMBER_RE,
        PHRASAL_WORDS_MODE,
        QUOTE_STRING_MODE,
        REGEXP_MODE,
        RE_STARTERS_RE,
        SHEBANG,
        TITLE_MODE,
        UNDERSCORE_IDENT_RE,
        UNDERSCORE_TITLE_MODE
      });
      function skipIfHasPrecedingDot(match, response) {
        const before = match.input[match.index - 1];
        if (before === ".") {
          response.ignoreMatch();
        }
      }
      function scopeClassName(mode, _parent) {
        if (mode.className !== void 0) {
          mode.scope = mode.className;
          delete mode.className;
        }
      }
      function beginKeywords(mode, parent) {
        if (!parent) return;
        if (!mode.beginKeywords) return;
        mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
        mode.__beforeBegin = skipIfHasPrecedingDot;
        mode.keywords = mode.keywords || mode.beginKeywords;
        delete mode.beginKeywords;
        if (mode.relevance === void 0) mode.relevance = 0;
      }
      function compileIllegal(mode, _parent) {
        if (!Array.isArray(mode.illegal)) return;
        mode.illegal = either(...mode.illegal);
      }
      function compileMatch(mode, _parent) {
        if (!mode.match) return;
        if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");
        mode.begin = mode.match;
        delete mode.match;
      }
      function compileRelevance(mode, _parent) {
        if (mode.relevance === void 0) mode.relevance = 1;
      }
      var beforeMatchExt = (mode, parent) => {
        if (!mode.beforeMatch) return;
        if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
        const originalMode = Object.assign({}, mode);
        Object.keys(mode).forEach((key) => {
          delete mode[key];
        });
        mode.keywords = originalMode.keywords;
        mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
        mode.starts = {
          relevance: 0,
          contains: [
            Object.assign(originalMode, { endsParent: true })
          ]
        };
        mode.relevance = 0;
        delete originalMode.beforeMatch;
      };
      var COMMON_KEYWORDS = [
        "of",
        "and",
        "for",
        "in",
        "not",
        "or",
        "if",
        "then",
        "parent",
        // common variable name
        "list",
        // common variable name
        "value"
        // common variable name
      ];
      var DEFAULT_KEYWORD_SCOPE = "keyword";
      function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
        const compiledKeywords = /* @__PURE__ */ Object.create(null);
        if (typeof rawKeywords === "string") {
          compileList(scopeName, rawKeywords.split(" "));
        } else if (Array.isArray(rawKeywords)) {
          compileList(scopeName, rawKeywords);
        } else {
          Object.keys(rawKeywords).forEach(function(scopeName2) {
            Object.assign(
              compiledKeywords,
              compileKeywords(rawKeywords[scopeName2], caseInsensitive, scopeName2)
            );
          });
        }
        return compiledKeywords;
        function compileList(scopeName2, keywordList) {
          if (caseInsensitive) {
            keywordList = keywordList.map((x) => x.toLowerCase());
          }
          keywordList.forEach(function(keyword) {
            const pair = keyword.split("|");
            compiledKeywords[pair[0]] = [scopeName2, scoreForKeyword(pair[0], pair[1])];
          });
        }
      }
      function scoreForKeyword(keyword, providedScore) {
        if (providedScore) {
          return Number(providedScore);
        }
        return commonKeyword(keyword) ? 0 : 1;
      }
      function commonKeyword(keyword) {
        return COMMON_KEYWORDS.includes(keyword.toLowerCase());
      }
      var seenDeprecations = {};
      var error = (message) => {
        console.error(message);
      };
      var warn = (message, ...args) => {
        console.log(`WARN: ${message}`, ...args);
      };
      var deprecated = (version2, message) => {
        if (seenDeprecations[`${version2}/${message}`]) return;
        console.log(`Deprecated as of ${version2}. ${message}`);
        seenDeprecations[`${version2}/${message}`] = true;
      };
      var MultiClassError = new Error();
      function remapScopeNames(mode, regexes, { key }) {
        let offset2 = 0;
        const scopeNames = mode[key];
        const emit = {};
        const positions = {};
        for (let i = 1; i <= regexes.length; i++) {
          positions[i + offset2] = scopeNames[i];
          emit[i + offset2] = true;
          offset2 += countMatchGroups(regexes[i - 1]);
        }
        mode[key] = positions;
        mode[key]._emit = emit;
        mode[key]._multi = true;
      }
      function beginMultiClass(mode) {
        if (!Array.isArray(mode.begin)) return;
        if (mode.skip || mode.excludeBegin || mode.returnBegin) {
          error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
          throw MultiClassError;
        }
        if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
          error("beginScope must be object");
          throw MultiClassError;
        }
        remapScopeNames(mode, mode.begin, { key: "beginScope" });
        mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
      }
      function endMultiClass(mode) {
        if (!Array.isArray(mode.end)) return;
        if (mode.skip || mode.excludeEnd || mode.returnEnd) {
          error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
          throw MultiClassError;
        }
        if (typeof mode.endScope !== "object" || mode.endScope === null) {
          error("endScope must be object");
          throw MultiClassError;
        }
        remapScopeNames(mode, mode.end, { key: "endScope" });
        mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
      }
      function scopeSugar(mode) {
        if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
          mode.beginScope = mode.scope;
          delete mode.scope;
        }
      }
      function MultiClass(mode) {
        scopeSugar(mode);
        if (typeof mode.beginScope === "string") {
          mode.beginScope = { _wrap: mode.beginScope };
        }
        if (typeof mode.endScope === "string") {
          mode.endScope = { _wrap: mode.endScope };
        }
        beginMultiClass(mode);
        endMultiClass(mode);
      }
      function compileLanguage(language) {
        function langRe(value, global) {
          return new RegExp(
            source(value),
            "m" + (language.case_insensitive ? "i" : "") + (language.unicodeRegex ? "u" : "") + (global ? "g" : "")
          );
        }
        class MultiRegex {
          constructor() {
            this.matchIndexes = {};
            this.regexes = [];
            this.matchAt = 1;
            this.position = 0;
          }
          // @ts-ignore
          addRule(re, opts) {
            opts.position = this.position++;
            this.matchIndexes[this.matchAt] = opts;
            this.regexes.push([opts, re]);
            this.matchAt += countMatchGroups(re) + 1;
          }
          compile() {
            if (this.regexes.length === 0) {
              this.exec = () => null;
            }
            const terminators = this.regexes.map((el) => el[1]);
            this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: "|" }), true);
            this.lastIndex = 0;
          }
          /** @param {string} s */
          exec(s) {
            this.matcherRe.lastIndex = this.lastIndex;
            const match = this.matcherRe.exec(s);
            if (!match) {
              return null;
            }
            const i = match.findIndex((el, i2) => i2 > 0 && el !== void 0);
            const matchData = this.matchIndexes[i];
            match.splice(0, i);
            return Object.assign(match, matchData);
          }
        }
        class ResumableMultiRegex {
          constructor() {
            this.rules = [];
            this.multiRegexes = [];
            this.count = 0;
            this.lastIndex = 0;
            this.regexIndex = 0;
          }
          // @ts-ignore
          getMatcher(index) {
            if (this.multiRegexes[index]) return this.multiRegexes[index];
            const matcher = new MultiRegex();
            this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
            matcher.compile();
            this.multiRegexes[index] = matcher;
            return matcher;
          }
          resumingScanAtSamePosition() {
            return this.regexIndex !== 0;
          }
          considerAll() {
            this.regexIndex = 0;
          }
          // @ts-ignore
          addRule(re, opts) {
            this.rules.push([re, opts]);
            if (opts.type === "begin") this.count++;
          }
          /** @param {string} s */
          exec(s) {
            const m = this.getMatcher(this.regexIndex);
            m.lastIndex = this.lastIndex;
            let result = m.exec(s);
            if (this.resumingScanAtSamePosition()) {
              if (result && result.index === this.lastIndex) ;
              else {
                const m2 = this.getMatcher(0);
                m2.lastIndex = this.lastIndex + 1;
                result = m2.exec(s);
              }
            }
            if (result) {
              this.regexIndex += result.position + 1;
              if (this.regexIndex === this.count) {
                this.considerAll();
              }
            }
            return result;
          }
        }
        function buildModeRegex(mode) {
          const mm = new ResumableMultiRegex();
          mode.contains.forEach((term) => mm.addRule(term.begin, { rule: term, type: "begin" }));
          if (mode.terminatorEnd) {
            mm.addRule(mode.terminatorEnd, { type: "end" });
          }
          if (mode.illegal) {
            mm.addRule(mode.illegal, { type: "illegal" });
          }
          return mm;
        }
        function compileMode(mode, parent) {
          const cmode = (
            /** @type CompiledMode */
            mode
          );
          if (mode.isCompiled) return cmode;
          [
            scopeClassName,
            // do this early so compiler extensions generally don't have to worry about
            // the distinction between match/begin
            compileMatch,
            MultiClass,
            beforeMatchExt
          ].forEach((ext) => ext(mode, parent));
          language.compilerExtensions.forEach((ext) => ext(mode, parent));
          mode.__beforeBegin = null;
          [
            beginKeywords,
            // do this later so compiler extensions that come earlier have access to the
            // raw array if they wanted to perhaps manipulate it, etc.
            compileIllegal,
            // default to 1 relevance if not specified
            compileRelevance
          ].forEach((ext) => ext(mode, parent));
          mode.isCompiled = true;
          let keywordPattern = null;
          if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
            mode.keywords = Object.assign({}, mode.keywords);
            keywordPattern = mode.keywords.$pattern;
            delete mode.keywords.$pattern;
          }
          keywordPattern = keywordPattern || /\w+/;
          if (mode.keywords) {
            mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
          }
          cmode.keywordPatternRe = langRe(keywordPattern, true);
          if (parent) {
            if (!mode.begin) mode.begin = /\B|\b/;
            cmode.beginRe = langRe(cmode.begin);
            if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
            if (mode.end) cmode.endRe = langRe(cmode.end);
            cmode.terminatorEnd = source(cmode.end) || "";
            if (mode.endsWithParent && parent.terminatorEnd) {
              cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
            }
          }
          if (mode.illegal) cmode.illegalRe = langRe(
            /** @type {RegExp | string} */
            mode.illegal
          );
          if (!mode.contains) mode.contains = [];
          mode.contains = [].concat(...mode.contains.map(function(c) {
            return expandOrCloneMode(c === "self" ? mode : c);
          }));
          mode.contains.forEach(function(c) {
            compileMode(
              /** @type Mode */
              c,
              cmode
            );
          });
          if (mode.starts) {
            compileMode(mode.starts, parent);
          }
          cmode.matcher = buildModeRegex(cmode);
          return cmode;
        }
        if (!language.compilerExtensions) language.compilerExtensions = [];
        if (language.contains && language.contains.includes("self")) {
          throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
        }
        language.classNameAliases = inherit$1(language.classNameAliases || {});
        return compileMode(
          /** @type Mode */
          language
        );
      }
      function dependencyOnParent(mode) {
        if (!mode) return false;
        return mode.endsWithParent || dependencyOnParent(mode.starts);
      }
      function expandOrCloneMode(mode) {
        if (mode.variants && !mode.cachedVariants) {
          mode.cachedVariants = mode.variants.map(function(variant) {
            return inherit$1(mode, { variants: null }, variant);
          });
        }
        if (mode.cachedVariants) {
          return mode.cachedVariants;
        }
        if (dependencyOnParent(mode)) {
          return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
        }
        if (Object.isFrozen(mode)) {
          return inherit$1(mode);
        }
        return mode;
      }
      var version = "11.10.0";
      var HTMLInjectionError = class extends Error {
        constructor(reason, html) {
          super(reason);
          this.name = "HTMLInjectionError";
          this.html = html;
        }
      };
      var escape = escapeHTML;
      var inherit = inherit$1;
      var NO_MATCH = Symbol("nomatch");
      var MAX_KEYWORD_HITS = 7;
      var HLJS = function(hljs) {
        const languages = /* @__PURE__ */ Object.create(null);
        const aliases = /* @__PURE__ */ Object.create(null);
        const plugins = [];
        let SAFE_MODE = true;
        const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
        const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: "Plain text", contains: [] };
        let options2 = {
          ignoreUnescapedHTML: false,
          throwUnescapedHTML: false,
          noHighlightRe: /^(no-?highlight)$/i,
          languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
          classPrefix: "hljs-",
          cssSelector: "pre code",
          languages: null,
          // beta configuration options, subject to change, welcome to discuss
          // https://github.com/highlightjs/highlight.js/issues/1086
          __emitter: TokenTreeEmitter
        };
        function shouldNotHighlight(languageName) {
          return options2.noHighlightRe.test(languageName);
        }
        function blockLanguage(block) {
          let classes = block.className + " ";
          classes += block.parentNode ? block.parentNode.className : "";
          const match = options2.languageDetectRe.exec(classes);
          if (match) {
            const language = getLanguage(match[1]);
            if (!language) {
              warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
              warn("Falling back to no-highlight mode for this block.", block);
            }
            return language ? match[1] : "no-highlight";
          }
          return classes.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
        }
        function highlight2(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
          let code = "";
          let languageName = "";
          if (typeof optionsOrCode === "object") {
            code = codeOrLanguageName;
            ignoreIllegals = optionsOrCode.ignoreIllegals;
            languageName = optionsOrCode.language;
          } else {
            deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
            deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
            languageName = codeOrLanguageName;
            code = optionsOrCode;
          }
          if (ignoreIllegals === void 0) {
            ignoreIllegals = true;
          }
          const context = {
            code,
            language: languageName
          };
          fire4("before:highlight", context);
          const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
          result.code = context.code;
          fire4("after:highlight", result);
          return result;
        }
        function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
          const keywordHits = /* @__PURE__ */ Object.create(null);
          function keywordData(mode, matchText) {
            return mode.keywords[matchText];
          }
          function processKeywords() {
            if (!top.keywords) {
              emitter.addText(modeBuffer);
              return;
            }
            let lastIndex = 0;
            top.keywordPatternRe.lastIndex = 0;
            let match = top.keywordPatternRe.exec(modeBuffer);
            let buf = "";
            while (match) {
              buf += modeBuffer.substring(lastIndex, match.index);
              const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
              const data2 = keywordData(top, word);
              if (data2) {
                const [kind, keywordRelevance] = data2;
                emitter.addText(buf);
                buf = "";
                keywordHits[word] = (keywordHits[word] || 0) + 1;
                if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
                if (kind.startsWith("_")) {
                  buf += match[0];
                } else {
                  const cssClass = language.classNameAliases[kind] || kind;
                  emitKeyword(match[0], cssClass);
                }
              } else {
                buf += match[0];
              }
              lastIndex = top.keywordPatternRe.lastIndex;
              match = top.keywordPatternRe.exec(modeBuffer);
            }
            buf += modeBuffer.substring(lastIndex);
            emitter.addText(buf);
          }
          function processSubLanguage() {
            if (modeBuffer === "") return;
            let result2 = null;
            if (typeof top.subLanguage === "string") {
              if (!languages[top.subLanguage]) {
                emitter.addText(modeBuffer);
                return;
              }
              result2 = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
              continuations[top.subLanguage] = /** @type {CompiledMode} */
              result2._top;
            } else {
              result2 = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
            }
            if (top.relevance > 0) {
              relevance += result2.relevance;
            }
            emitter.__addSublanguage(result2._emitter, result2.language);
          }
          function processBuffer() {
            if (top.subLanguage != null) {
              processSubLanguage();
            } else {
              processKeywords();
            }
            modeBuffer = "";
          }
          function emitKeyword(keyword, scope) {
            if (keyword === "") return;
            emitter.startScope(scope);
            emitter.addText(keyword);
            emitter.endScope();
          }
          function emitMultiClass(scope, match) {
            let i = 1;
            const max2 = match.length - 1;
            while (i <= max2) {
              if (!scope._emit[i]) {
                i++;
                continue;
              }
              const klass = language.classNameAliases[scope[i]] || scope[i];
              const text = match[i];
              if (klass) {
                emitKeyword(text, klass);
              } else {
                modeBuffer = text;
                processKeywords();
                modeBuffer = "";
              }
              i++;
            }
          }
          function startNewMode(mode, match) {
            if (mode.scope && typeof mode.scope === "string") {
              emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
            }
            if (mode.beginScope) {
              if (mode.beginScope._wrap) {
                emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
                modeBuffer = "";
              } else if (mode.beginScope._multi) {
                emitMultiClass(mode.beginScope, match);
                modeBuffer = "";
              }
            }
            top = Object.create(mode, { parent: { value: top } });
            return top;
          }
          function endOfMode(mode, match, matchPlusRemainder) {
            let matched = startsWith(mode.endRe, matchPlusRemainder);
            if (matched) {
              if (mode["on:end"]) {
                const resp = new Response(mode);
                mode["on:end"](match, resp);
                if (resp.isMatchIgnored) matched = false;
              }
              if (matched) {
                while (mode.endsParent && mode.parent) {
                  mode = mode.parent;
                }
                return mode;
              }
            }
            if (mode.endsWithParent) {
              return endOfMode(mode.parent, match, matchPlusRemainder);
            }
          }
          function doIgnore(lexeme) {
            if (top.matcher.regexIndex === 0) {
              modeBuffer += lexeme[0];
              return 1;
            } else {
              resumeScanAtSamePosition = true;
              return 0;
            }
          }
          function doBeginMatch(match) {
            const lexeme = match[0];
            const newMode = match.rule;
            const resp = new Response(newMode);
            const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
            for (const cb of beforeCallbacks) {
              if (!cb) continue;
              cb(match, resp);
              if (resp.isMatchIgnored) return doIgnore(lexeme);
            }
            if (newMode.skip) {
              modeBuffer += lexeme;
            } else {
              if (newMode.excludeBegin) {
                modeBuffer += lexeme;
              }
              processBuffer();
              if (!newMode.returnBegin && !newMode.excludeBegin) {
                modeBuffer = lexeme;
              }
            }
            startNewMode(newMode, match);
            return newMode.returnBegin ? 0 : lexeme.length;
          }
          function doEndMatch(match) {
            const lexeme = match[0];
            const matchPlusRemainder = codeToHighlight.substring(match.index);
            const endMode = endOfMode(top, match, matchPlusRemainder);
            if (!endMode) {
              return NO_MATCH;
            }
            const origin = top;
            if (top.endScope && top.endScope._wrap) {
              processBuffer();
              emitKeyword(lexeme, top.endScope._wrap);
            } else if (top.endScope && top.endScope._multi) {
              processBuffer();
              emitMultiClass(top.endScope, match);
            } else if (origin.skip) {
              modeBuffer += lexeme;
            } else {
              if (!(origin.returnEnd || origin.excludeEnd)) {
                modeBuffer += lexeme;
              }
              processBuffer();
              if (origin.excludeEnd) {
                modeBuffer = lexeme;
              }
            }
            do {
              if (top.scope) {
                emitter.closeNode();
              }
              if (!top.skip && !top.subLanguage) {
                relevance += top.relevance;
              }
              top = top.parent;
            } while (top !== endMode.parent);
            if (endMode.starts) {
              startNewMode(endMode.starts, match);
            }
            return origin.returnEnd ? 0 : lexeme.length;
          }
          function processContinuations() {
            const list = [];
            for (let current = top; current !== language; current = current.parent) {
              if (current.scope) {
                list.unshift(current.scope);
              }
            }
            list.forEach((item) => emitter.openNode(item));
          }
          let lastMatch = {};
          function processLexeme(textBeforeMatch, match) {
            const lexeme = match && match[0];
            modeBuffer += textBeforeMatch;
            if (lexeme == null) {
              processBuffer();
              return 0;
            }
            if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
              modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
              if (!SAFE_MODE) {
                const err = new Error(`0 width match regex (${languageName})`);
                err.languageName = languageName;
                err.badRule = lastMatch.rule;
                throw err;
              }
              return 1;
            }
            lastMatch = match;
            if (match.type === "begin") {
              return doBeginMatch(match);
            } else if (match.type === "illegal" && !ignoreIllegals) {
              const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || "<unnamed>") + '"');
              err.mode = top;
              throw err;
            } else if (match.type === "end") {
              const processed = doEndMatch(match);
              if (processed !== NO_MATCH) {
                return processed;
              }
            }
            if (match.type === "illegal" && lexeme === "") {
              return 1;
            }
            if (iterations > 1e5 && iterations > match.index * 3) {
              const err = new Error("potential infinite loop, way more iterations than matches");
              throw err;
            }
            modeBuffer += lexeme;
            return lexeme.length;
          }
          const language = getLanguage(languageName);
          if (!language) {
            error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
            throw new Error('Unknown language: "' + languageName + '"');
          }
          const md = compileLanguage(language);
          let result = "";
          let top = continuation || md;
          const continuations = {};
          const emitter = new options2.__emitter(options2);
          processContinuations();
          let modeBuffer = "";
          let relevance = 0;
          let index = 0;
          let iterations = 0;
          let resumeScanAtSamePosition = false;
          try {
            if (!language.__emitTokens) {
              top.matcher.considerAll();
              for (; ; ) {
                iterations++;
                if (resumeScanAtSamePosition) {
                  resumeScanAtSamePosition = false;
                } else {
                  top.matcher.considerAll();
                }
                top.matcher.lastIndex = index;
                const match = top.matcher.exec(codeToHighlight);
                if (!match) break;
                const beforeMatch = codeToHighlight.substring(index, match.index);
                const processedCount = processLexeme(beforeMatch, match);
                index = match.index + processedCount;
              }
              processLexeme(codeToHighlight.substring(index));
            } else {
              language.__emitTokens(codeToHighlight, emitter);
            }
            emitter.finalize();
            result = emitter.toHTML();
            return {
              language: languageName,
              value: result,
              relevance,
              illegal: false,
              _emitter: emitter,
              _top: top
            };
          } catch (err) {
            if (err.message && err.message.includes("Illegal")) {
              return {
                language: languageName,
                value: escape(codeToHighlight),
                illegal: true,
                relevance: 0,
                _illegalBy: {
                  message: err.message,
                  index,
                  context: codeToHighlight.slice(index - 100, index + 100),
                  mode: err.mode,
                  resultSoFar: result
                },
                _emitter: emitter
              };
            } else if (SAFE_MODE) {
              return {
                language: languageName,
                value: escape(codeToHighlight),
                illegal: false,
                relevance: 0,
                errorRaised: err,
                _emitter: emitter,
                _top: top
              };
            } else {
              throw err;
            }
          }
        }
        function justTextHighlightResult(code) {
          const result = {
            value: escape(code),
            illegal: false,
            relevance: 0,
            _top: PLAINTEXT_LANGUAGE,
            _emitter: new options2.__emitter(options2)
          };
          result._emitter.addText(code);
          return result;
        }
        function highlightAuto(code, languageSubset) {
          languageSubset = languageSubset || options2.languages || Object.keys(languages);
          const plaintext = justTextHighlightResult(code);
          const results = languageSubset.filter(getLanguage).filter(autoDetection).map(
            (name) => _highlight(name, code, false)
          );
          results.unshift(plaintext);
          const sorted = results.sort((a, b) => {
            if (a.relevance !== b.relevance) return b.relevance - a.relevance;
            if (a.language && b.language) {
              if (getLanguage(a.language).supersetOf === b.language) {
                return 1;
              } else if (getLanguage(b.language).supersetOf === a.language) {
                return -1;
              }
            }
            return 0;
          });
          const [best, secondBest] = sorted;
          const result = best;
          result.secondBest = secondBest;
          return result;
        }
        function updateClassName(element, currentLang, resultLang) {
          const language = currentLang && aliases[currentLang] || resultLang;
          element.classList.add("hljs");
          element.classList.add(`language-${language}`);
        }
        function highlightElement(element) {
          let node = null;
          const language = blockLanguage(element);
          if (shouldNotHighlight(language)) return;
          fire4(
            "before:highlightElement",
            { el: element, language }
          );
          if (element.dataset.highlighted) {
            console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
            return;
          }
          if (element.children.length > 0) {
            if (!options2.ignoreUnescapedHTML) {
              console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
              console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
              console.warn("The element with unescaped HTML:");
              console.warn(element);
            }
            if (options2.throwUnescapedHTML) {
              const err = new HTMLInjectionError(
                "One of your code blocks includes unescaped HTML.",
                element.innerHTML
              );
              throw err;
            }
          }
          node = element;
          const text = node.textContent;
          const result = language ? highlight2(text, { language, ignoreIllegals: true }) : highlightAuto(text);
          element.innerHTML = result.value;
          element.dataset.highlighted = "yes";
          updateClassName(element, language, result.language);
          element.result = {
            language: result.language,
            // TODO: remove with version 11.0
            re: result.relevance,
            relevance: result.relevance
          };
          if (result.secondBest) {
            element.secondBest = {
              language: result.secondBest.language,
              relevance: result.secondBest.relevance
            };
          }
          fire4("after:highlightElement", { el: element, result, text });
        }
        function configure(userOptions) {
          options2 = inherit(options2, userOptions);
        }
        const initHighlighting = () => {
          highlightAll();
          deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
        };
        function initHighlightingOnLoad() {
          highlightAll();
          deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
        }
        let wantsHighlight = false;
        function highlightAll() {
          if (document.readyState === "loading") {
            wantsHighlight = true;
            return;
          }
          const blocks = document.querySelectorAll(options2.cssSelector);
          blocks.forEach(highlightElement);
        }
        function boot() {
          if (wantsHighlight) highlightAll();
        }
        if (typeof window !== "undefined" && window.addEventListener) {
          window.addEventListener("DOMContentLoaded", boot, false);
        }
        function registerLanguage(languageName, languageDefinition) {
          let lang = null;
          try {
            lang = languageDefinition(hljs);
          } catch (error$1) {
            error("Language definition for '{}' could not be registered.".replace("{}", languageName));
            if (!SAFE_MODE) {
              throw error$1;
            } else {
              error(error$1);
            }
            lang = PLAINTEXT_LANGUAGE;
          }
          if (!lang.name) lang.name = languageName;
          languages[languageName] = lang;
          lang.rawDefinition = languageDefinition.bind(null, hljs);
          if (lang.aliases) {
            registerAliases(lang.aliases, { languageName });
          }
        }
        function unregisterLanguage(languageName) {
          delete languages[languageName];
          for (const alias of Object.keys(aliases)) {
            if (aliases[alias] === languageName) {
              delete aliases[alias];
            }
          }
        }
        function listLanguages() {
          return Object.keys(languages);
        }
        function getLanguage(name) {
          name = (name || "").toLowerCase();
          return languages[name] || languages[aliases[name]];
        }
        function registerAliases(aliasList, { languageName }) {
          if (typeof aliasList === "string") {
            aliasList = [aliasList];
          }
          aliasList.forEach((alias) => {
            aliases[alias.toLowerCase()] = languageName;
          });
        }
        function autoDetection(name) {
          const lang = getLanguage(name);
          return lang && !lang.disableAutodetect;
        }
        function upgradePluginAPI(plugin) {
          if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
            plugin["before:highlightElement"] = (data2) => {
              plugin["before:highlightBlock"](
                Object.assign({ block: data2.el }, data2)
              );
            };
          }
          if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
            plugin["after:highlightElement"] = (data2) => {
              plugin["after:highlightBlock"](
                Object.assign({ block: data2.el }, data2)
              );
            };
          }
        }
        function addPlugin(plugin) {
          upgradePluginAPI(plugin);
          plugins.push(plugin);
        }
        function removePlugin(plugin) {
          const index = plugins.indexOf(plugin);
          if (index !== -1) {
            plugins.splice(index, 1);
          }
        }
        function fire4(event, args) {
          const cb = event;
          plugins.forEach(function(plugin) {
            if (plugin[cb]) {
              plugin[cb](args);
            }
          });
        }
        function deprecateHighlightBlock(el) {
          deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
          deprecated("10.7.0", "Please use highlightElement now.");
          return highlightElement(el);
        }
        Object.assign(hljs, {
          highlight: highlight2,
          highlightAuto,
          highlightAll,
          highlightElement,
          // TODO: Remove with v12 API
          highlightBlock: deprecateHighlightBlock,
          configure,
          initHighlighting,
          initHighlightingOnLoad,
          registerLanguage,
          unregisterLanguage,
          listLanguages,
          getLanguage,
          registerAliases,
          autoDetection,
          inherit,
          addPlugin,
          removePlugin
        });
        hljs.debugMode = function() {
          SAFE_MODE = false;
        };
        hljs.safeMode = function() {
          SAFE_MODE = true;
        };
        hljs.versionString = version;
        hljs.regex = {
          concat,
          lookahead,
          either,
          optional,
          anyNumberOfTimes
        };
        for (const key in MODES) {
          if (typeof MODES[key] === "object") {
            deepFreeze(MODES[key]);
          }
        }
        Object.assign(hljs, MODES);
        return hljs;
      };
      var highlight = HLJS({});
      highlight.newInstance = () => HLJS({});
      module.exports = highlight;
      highlight.HighlightJS = highlight;
      highlight.default = highlight;
    }
  });

  // src/js/data/index.js
  var commonData = {};
  var legendData = {};
  var getCommonData = () => commonData;
  var getLegendData = () => legendData;
  var loadData = async () => {
    commonData = await fetch(`./data/common.json`).then((response) => response.json()).then((data2) => data2).catch((error) => console.warn("Something went wrong.", error));
    legendData = await fetch(`./data/legend.json`).then((response) => response.json()).then((data2) => data2).catch((error) => console.warn("Something went wrong.", error));
  };

  // src/js/mobCore/events/errorHandler/catchAnimationReject.js
  var ANIMATION_STOP_REJECT = "animationStop";
  var catchAnimationReject = () => {
    globalThis.addEventListener("unhandledrejection", (e) => {
      if (e.reason === ANIMATION_STOP_REJECT) e.preventDefault();
    });
  };

  // src/js/mobCore/utils/index.js
  function outerHeight(element) {
    let height = element.offsetHeight;
    const style = getComputedStyle(element);
    height += Number.parseInt(style.marginTop) + Number.parseInt(style.marginBottom);
    return height;
  }
  function outerWidth(element) {
    let width = element.offsetWidth;
    const style = getComputedStyle(element);
    width += Number.parseInt(style.marginLeft) + Number.parseInt(style.marginRight);
    return width;
  }
  function offset(element) {
    const rect = element.getBoundingClientRect();
    const offset2 = {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
    return offset2;
  }
  function position(element) {
    const rect = element.getBoundingClientRect();
    return rect;
  }
  function isDescendant(parent, child2) {
    let node = child2?.parentNode;
    while (node) {
      if (node === parent) return true;
      node = node?.parentNode;
    }
    return false;
  }
  function getTranslateValues(element) {
    const style = globalThis.getComputedStyle(element);
    const matrix = (
      // @ts-ignore
      style["transform"] || style.mozTransform
    );
    if (matrix === "none" || matrix === void 0) {
      return {
        x: 0,
        y: 0,
        z: 0
      };
    }
    const matrixType = matrix.includes("3d") ? "3d" : "2d";
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
    if (matrixType === "2d") {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0
      };
    }
    if (matrixType === "3d") {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14]
      };
    }
  }
  function isNode(element) {
    return typeof Node === "object" ? element instanceof Node : element && typeof element === "object" && typeof element.nodeType === "number" && typeof element.nodeName === "string";
  }
  var getUnivoqueId = () => {
    return `_${Math.random().toString(36).slice(2, 9)}`;
  };

  // src/js/mobCore/utils/nextTick.js
  var useNextLoop = (fn) => {
    setTimeout(() => fn());
  };

  // src/js/mobCore/store/storeType.js
  var TYPE_IS_ANY = "ANY";
  var UNTYPED = "UNTYPED";
  var STRING = "STRING";
  var NUMBER = "NUMBER";
  var OBJECT = "OBJECT";
  var FUNCTION = "FUNCTION";
  var ARRAY = "ARRAY";
  var BOOLEAN = "BOOLEAN";
  var ELEMENT = "ELEMENT";
  var HTMLELEMENT = "HTMLELEMENT";
  var NODELIST = "NODELIST";
  var SET = "SET";
  var MAP = "MAP";
  var storeType = {
    isString: (value) => Object.prototype.toString.call(value) === "[object String]",
    isNumber: (value) => Object.prototype.toString.call(value) === "[object Number]" && Number.isFinite(value),
    isObject: (value) => Object.prototype.toString.call(value) === "[object Object]",
    isFunction: (value) => Object.prototype.toString.call(value) === "[object Function]",
    isArray: (value) => Object.prototype.toString.call(value) === "[object Array]",
    isBoolean: (value) => Object.prototype.toString.call(value) === "[object Boolean]",
    isElement: (value) => value instanceof Element || value instanceof Document,
    isHTMLElement: (value) => value instanceof HTMLElement,
    isSet: (value) => value instanceof Set,
    isMap: (value) => value instanceof Map,
    isNodeList: (value) => Object.prototype.isPrototypeOf.call(NodeList.prototype, value)
  };
  var getTypeName = (type) => {
    switch (type) {
      case String:
      case STRING: {
        return "String";
      }
      case Number:
      case NUMBER: {
        return "Number";
      }
      case Object:
      case OBJECT: {
        return "Object";
      }
      case Function:
      case FUNCTION: {
        return "Function";
      }
      case Array:
      case ARRAY: {
        return "Array";
      }
      case Boolean:
      case BOOLEAN: {
        return "Boolean";
      }
      case Element:
      case ELEMENT: {
        return "Element";
      }
      case HTMLElement:
      case HTMLELEMENT: {
        return "HTMLElement";
      }
      case NodeList:
      case NODELIST: {
        return "NodeList";
      }
      case Set:
      case SET: {
        return "Set";
      }
      case Map:
      case MAP: {
        return "Map";
      }
      case TYPE_IS_ANY: {
        return TYPE_IS_ANY;
      }
      default: {
        return UNTYPED;
      }
    }
  };
  var checkType = (type, value) => {
    switch (type) {
      case String:
      case STRING: {
        return storeType.isString(value);
      }
      case Number:
      case NUMBER: {
        return storeType.isNumber(value);
      }
      case Object:
      case OBJECT: {
        return storeType.isObject(value);
      }
      case Function:
      case FUNCTION: {
        return storeType.isFunction(value);
      }
      case Array:
      case ARRAY: {
        return storeType.isArray(value);
      }
      case Boolean:
      case BOOLEAN: {
        return storeType.isBoolean(value);
      }
      case Element:
      case ELEMENT: {
        return storeType.isElement(value);
      }
      case HTMLElement:
      case HTMLELEMENT: {
        return storeType.isHTMLElement(value);
      }
      case NodeList:
      case NODELIST: {
        return storeType.isNodeList(value);
      }
      case Set:
      case SET: {
        return storeType.isSet(value);
      }
      case Map:
      case MAP: {
        return storeType.isMap(value);
      }
      case TYPE_IS_ANY: {
        return true;
      }
      default: {
        return true;
      }
    }
  };

  // src/js/mobCore/store/checkEquality.js
  var mapsAreEqual = (m1, m2) => m1.size === m2.size && [...m1.keys()].every((key) => m1.get(key) === m2.get(key));
  var setsAreEqual = (a, b) => a.size === b.size && [...a].every((value) => b.has(value));
  var arrayAreEquals = (a, b) => {
    if (a.length !== b.length) return false;
    const elements = /* @__PURE__ */ new Set([...a, ...b]);
    for (const x of elements) {
      const count1 = a.filter((e) => e === x).length;
      const count2 = b.filter((e) => e === x).length;
      if (count1 !== count2) return false;
    }
    return true;
  };
  var objectAreEqual = (obj1, obj2, checkDataOrder = false) => {
    const checkDataOrderParanoic = false;
    if (obj1 === null || obj2 === null) {
      return obj1 === obj2;
    }
    let _obj1 = obj1;
    let _obj2 = obj2;
    if (!checkDataOrder) {
      if (Array.isArray(obj1)) {
        _obj1 = [...obj1].sort();
      }
      if (Array.isArray(obj2)) {
        _obj2 = [...obj2].sort();
      }
    }
    if (typeof _obj1 !== "object" || typeof _obj2 !== "object") {
      return _obj1 === _obj2;
    }
    const obj1Props = Object.getOwnPropertyNames(_obj1);
    const obj2Props = Object.getOwnPropertyNames(_obj2);
    if (obj1Props.length !== obj2Props.length) {
      return false;
    }
    if (checkDataOrderParanoic && checkDataOrder) {
      const propOrder = obj1Props.toString() === obj2Props.toString();
      if (!propOrder) {
        return false;
      }
    }
    for (const prop of obj1Props) {
      const val1 = _obj1[prop];
      const val2 = _obj2[prop];
      if (typeof val1 === "object" && typeof val2 === "object") {
        if (objectAreEqual(val1, val2, checkDataOrder)) {
          continue;
        } else {
          return false;
        }
      }
      if (val1 !== val2) {
        return false;
      }
    }
    return true;
  };
  var checkEquality = (type, oldValue, newValue) => {
    switch (type) {
      case TYPE_IS_ANY: {
        return objectAreEqual(oldValue, newValue);
      }
      case ARRAY:
      case Array: {
        return arrayAreEquals(oldValue, newValue);
      }
      case SET:
      case Set: {
        return setsAreEqual(oldValue, newValue);
      }
      case MAP:
      case Map: {
        return mapsAreEqual(oldValue, newValue);
      }
      default: {
        return oldValue === newValue;
      }
    }
  };

  // src/js/mobCore/store/constant.js
  var STORE_SET = "SET";
  var STORE_UPDATE = "UPDATE";

  // src/js/mobCore/store/fireQueque.js
  var runCallbackQueqe = ({
    callBackWatcher,
    prop,
    newValue,
    oldValue,
    validationValue
  }) => {
    for (const { prop: currentProp, fn } of callBackWatcher.values()) {
      if (currentProp === prop) fn(newValue, oldValue, validationValue);
    }
  };
  var runCallbackQueqeAsync = async ({
    callBackWatcher,
    prop,
    newValue,
    oldValue,
    validationValue
  }) => {
    for (const { prop: currentProp, fn } of callBackWatcher.values()) {
      if (currentProp === prop) await fn(newValue, oldValue, validationValue);
    }
  };

  // src/js/mobCore/store/logStyle.js
  var logStyle = "padding: 10px;";
  var getLogStyle = () => logStyle;

  // src/js/mobCore/store/storeMap.js
  var storeMap = /* @__PURE__ */ new Map();
  var getStateFromMainMap = (id) => ({ ...storeMap.get(id) });
  var updateMainMap = (id, state) => {
    storeMap.set(id, state);
  };
  var removeStateFromMainMap = (id) => {
    storeMap.delete(id);
  };

  // src/js/mobCore/store/storeWarining.js
  var storeDepthWarning = (data2, style) => {
    console.warn(
      `%c SimpleStore supports an object with a depth of up to 2 levels, set 'Any' type to use obj as value, the input object has ${data2} level`,
      style
    );
  };
  var storeSetWarning = (prop, style) => {
    console.warn(
      `%c SimpleStore, trying to execute set() method: store.${prop} not exist`,
      style
    );
  };
  var storeSetPropValWarning = (prop, val2, style) => {
    console.warn(
      `%c trying to execute setProp method on '${prop}' propierties: setProp methods doesn't allow objects as value, ${JSON.stringify(
        val2
      )} is an Object, use 'Any' type for custom object`,
      style
    );
  };
  var storeSetPropPropWarning = (prop, style) => {
    console.warn(
      `%c trying to execute setProp method on '${prop}' propierties: '${JSON.stringify(
        prop
      )}' is an objects`,
      style
    );
  };
  var storeSetPropTypeWarning = (prop, val2, type, style) => {
    console.warn(
      `%c trying to execute setProp method on '${prop}' propierties: ${val2} is not a ${getTypeName(
        type
      )}`,
      style
    );
  };
  var storeSetObjectValWarning = (prop, val2, style) => {
    console.warn(
      `%c trying to execute setObj method on '${prop}' propierties: setObj methods allow only objects as value, ${val2} is not an Object`,
      style
    );
  };
  var storeSetObjectPropWarning = (prop, style) => {
    console.warn(
      `%c trying to execute setObj data method on '${prop}' propierties: store propierties '${prop}' is not an object`,
      style
    );
  };
  var storeSetObjKeysWarning = (key, prop, style) => {
    console.warn(
      `%c trying to execute setObj data method: one of these keys '${key}' not exist in store.${prop}`,
      style
    );
  };
  var storeSetObjDepthWarning = (prop, val2, style) => {
    console.warn(
      `%c trying to execute setObj data method on '${prop}' propierties: '${JSON.stringify(
        val2
      )}' have a depth > 1, nested obj is not allowed`,
      style
    );
  };
  var storeSetObjTypeWarning = (prop, subProp, subVal, type, style) => {
    console.warn(
      `%c trying to execute setObj data method on ${prop}.${subProp} propierties: ${subVal} is not a ${getTypeName(
        type
      )}`,
      style
    );
  };
  var storeGetPropWarning = (prop, style) => {
    console.warn(
      `%c trying to execute get data method: store.${prop} not exist`,
      style
    );
  };
  var storeEmitWarning = (prop, style) => {
    console.warn(
      `%c trying to execute set data method: store.${prop} not exist`,
      style
    );
  };
  var storeComputedKeyUsedWarning = (keys, style) => {
    console.warn(
      `%c one of the keys [${keys}] is already used as a computed target, or one of the keys coincides with the prop to be changed.`,
      style
    );
  };
  var storeWatchWarning = (prop, style) => {
    console.warn(
      `%c SimpleStore error: the property ${prop} to watch doesn't exist in store`,
      style
    );
  };
  var storeObjectIsNotAnyWarning = (style, CUSTOM_OBJECT) => {
    console.warn(
      `%c Validation Object error: validation function return undefined or have you used Object instead '${CUSTOM_OBJECT}' ?`,
      style
    );
  };

  // src/js/mobCore/store/storeUtils.js
  var maxDepth = (object) => {
    if (!storeType.isObject(object)) return 0;
    const values = Object.values(object);
    if (values.length === 0) return 1;
    return Math.max(...values.map((value) => maxDepth(value))) + 1;
  };
  var getDataRecursive = (data2, shouldRecursive = true) => {
    return Object.entries(data2).reduce((p, c) => {
      const [key, value] = c;
      const functionResult = storeType.isFunction(value) ? (
        /** @type {Function} */
        value()
      ) : {};
      if (storeType.isObject(value) && shouldRecursive) {
        return {
          ...p,
          [key]: getDataRecursive(
            /** @type {import('./type.js').mobStoreBaseData} */
            value,
            false
          )
        };
      }
      if (storeType.isFunction(value) && storeType.isObject(functionResult) && "value" in functionResult && ("validate" in functionResult || "type" in functionResult || "skipEqual" in functionResult)) {
        return { ...p, [key]: functionResult.value };
      }
      return { ...p, [key]: value };
    }, {});
  };
  var getPropRecursive = (data2, prop, fallback, shouldRecursive = true) => {
    return Object.entries(data2).reduce((p, c) => {
      const [key, value] = c;
      const functionResult = storeType.isFunction(value) ? (
        /** @type{Function} */
        value()
      ) : {};
      if (storeType.isObject(value) && shouldRecursive) {
        return {
          ...p,
          [key]: getPropRecursive(
            /** @type{import('./type.js').mobStoreBaseData} */
            value,
            prop,
            fallback,
            false
          )
        };
      }
      if (storeType.isFunction(value) && storeType.isObject(functionResult) && "value" in functionResult && prop in functionResult) {
        const propParsed = storeType.isString(functionResult[prop]) ? functionResult[prop].toUpperCase() : functionResult[prop];
        return { ...p, [key]: propParsed };
      }
      return { ...p, [key]: fallback };
    }, {});
  };
  var inizializeStoreData = ({ data: data2, depth, logStyle: logStyle2 }) => {
    if (depth > 2) {
      storeDepthWarning(depth, logStyle2);
      return {};
    }
    return getDataRecursive(data2);
  };
  var inizializeSpecificProp = ({
    data: data2,
    prop,
    depth,
    logStyle: logStyle2,
    fallback
  }) => {
    if (depth > 2) {
      storeDepthWarning(depth, logStyle2);
      return {};
    }
    return getPropRecursive(data2, prop, fallback);
  };
  var cloneValueOrGet = ({ value }) => {
    if (checkType(Map, value)) {
      return new Map(value);
    }
    if (checkType(Set, value)) {
      return new Set(value);
    }
    if (checkType(Object, value)) {
      return { ...value };
    }
    if (checkType(Array, value)) {
      return [...value];
    }
    return value;
  };

  // src/js/mobCore/store/storeSet.js
  var setProp = ({
    instanceId,
    state,
    prop,
    val: val2,
    fireCallback = true,
    useStrict = true
  }) => {
    const {
      type,
      fnTransformation,
      store,
      fnValidate,
      strict,
      validationStatusObject,
      skipEqual,
      callBackWatcher
    } = state;
    const logStyle2 = getLogStyle();
    const isCustomObject = type[prop] === TYPE_IS_ANY;
    if (storeType.isObject(val2) && !isCustomObject) {
      storeSetPropValWarning(prop, val2, logStyle2);
      return;
    }
    if (storeType.isObject(store[prop]) && !isCustomObject) {
      storeSetPropPropWarning(prop, logStyle2);
      return;
    }
    const oldVal = store[prop];
    const valueTransformed = (
      /** @type{{[key:string]: ((current: any, previous: any) => any)}} */
      fnTransformation[prop]?.(val2, oldVal) ?? val2
    );
    const isValidType = checkType(type[prop], valueTransformed);
    if (!isValidType) {
      storeSetPropTypeWarning(prop, valueTransformed, type[prop], logStyle2);
      return;
    }
    const isValidated = (
      /** @type {Object<string,function>} */
      fnValidate[prop]?.(valueTransformed, oldVal)
    );
    if (strict[prop] && !isValidated && useStrict) return;
    validationStatusObject[prop] = isValidated;
    const isEqual = skipEqual[prop] ? checkEquality(type[prop], oldVal, valueTransformed) : false;
    if (isEqual) return;
    store[prop] = valueTransformed;
    if (fireCallback) {
      runCallbackQueqe({
        callBackWatcher,
        prop,
        newValue: valueTransformed,
        oldValue: oldVal,
        validationValue: validationStatusObject[prop]
      });
      addToComputedWaitLsit({ instanceId, prop });
    }
    return {
      ...state,
      store,
      validationStatusObject
    };
  };
  var setObj = ({
    instanceId,
    state,
    prop,
    val: val2,
    fireCallback = true,
    useStrict = true
  }) => {
    const {
      store,
      type,
      strict,
      fnTransformation,
      fnValidate,
      validationStatusObject,
      skipEqual,
      callBackWatcher
    } = state;
    const logStyle2 = getLogStyle();
    if (!storeType.isObject(val2)) {
      storeSetObjectValWarning(prop, val2, logStyle2);
      return;
    }
    if (!storeType.isObject(store[prop])) {
      storeSetObjectPropWarning(prop, logStyle2);
      return;
    }
    const valKeys = Object.keys(val2);
    const propKeys = Object.keys(store[prop]);
    const hasKeys = valKeys.every((item) => propKeys.includes(item));
    if (!hasKeys) {
      storeSetObjKeysWarning(valKeys, prop, logStyle2);
      return;
    }
    const valueTransformed = Object.entries(val2).map((item) => {
      const [subProp, subVal] = item;
      const subValOld = store[prop][subProp];
      return {
        [subProp]: fnTransformation[prop][subProp]?.(subVal, subValOld) ?? subVal
      };
    }).reduce((previous, current) => ({ ...previous, ...current }));
    const isValidType = Object.entries(valueTransformed).map((item) => {
      const [subProp, subVal] = item;
      const typeResponse = checkType(type[prop][subProp], subVal);
      if (!typeResponse) {
        storeSetObjTypeWarning(
          prop,
          subProp,
          subVal,
          type[prop][subProp],
          logStyle2
        );
      }
      return typeResponse;
    }).every((item) => item === true);
    if (!isValidType) {
      return;
    }
    const strictObjectResult = Object.entries(valueTransformed).map((item) => {
      const [subProp, subVal] = item;
      const subValOld = store[prop][subProp];
      return strict[prop][subProp] && useStrict ? {
        strictCheck: fnValidate[prop][subProp]?.(
          subVal,
          subValOld
        ),
        item
      } : { strictCheck: true, item };
    }).filter(({ strictCheck }) => strictCheck === true);
    const allStrictFail = strictObjectResult.length === 0;
    if (allStrictFail) return;
    const newValParsedByStrict = Object.fromEntries(
      strictObjectResult.map(({ item }) => item).map(([key, val3]) => [key, val3])
    );
    Object.entries(newValParsedByStrict).forEach((item) => {
      const [subProp, subVal] = item;
      const subValOld = store[prop][subProp];
      const validateResult = fnValidate[prop][subProp]?.(subVal, subValOld);
      if (validateResult === void 0) {
        storeObjectIsNotAnyWarning(logStyle2, TYPE_IS_ANY);
      }
      validationStatusObject[prop][subProp] = validateResult;
    });
    const oldObjectValues = store[prop];
    const newObjectValues = {
      ...store[prop],
      ...newValParsedByStrict
    };
    const shouldSkipEqual = Object.keys(newValParsedByStrict).every(
      (subProp) => skipEqual[prop][subProp] === true
    );
    const prevValueIsEqualNew = shouldSkipEqual ? Object.entries(newObjectValues).every(([key, value]) => {
      const isCustomObject = type[prop][key] === TYPE_IS_ANY;
      const dataDepth = maxDepth(value);
      if (dataDepth > 1 && !isCustomObject) {
        storeSetObjDepthWarning(prop, valueTransformed, logStyle2);
        return;
      }
      return checkEquality(
        type[prop][key],
        oldObjectValues[key],
        value
      );
    }) : false;
    if (prevValueIsEqualNew) return;
    store[prop] = newObjectValues;
    if (fireCallback) {
      runCallbackQueqe({
        callBackWatcher,
        prop,
        newValue: store[prop],
        oldValue: oldObjectValues,
        validationValue: validationStatusObject[prop]
      });
      addToComputedWaitLsit({ instanceId, prop });
    }
    return {
      ...state,
      store,
      validationStatusObject
    };
  };
  var storeSetAction = ({
    instanceId,
    state,
    prop,
    value,
    fireCallback = true,
    clone = false,
    useStrict = true,
    action: action2
  }) => {
    const { store, type } = state;
    if (!store) return;
    const logStyle2 = getLogStyle();
    if (!(prop in store)) {
      storeSetWarning(prop, logStyle2);
      return;
    }
    const previousValue = clone ? cloneValueOrGet({ value: store[prop] }) : store[prop];
    const valueParsed = action2 === STORE_UPDATE ? value(previousValue) : value;
    const isCustomObject = type[prop] === TYPE_IS_ANY;
    return storeType.isObject(previousValue) && !isCustomObject ? setObj({
      instanceId,
      state,
      prop,
      val: valueParsed,
      fireCallback,
      useStrict
    }) : setProp({
      instanceId,
      state,
      prop,
      val: valueParsed,
      fireCallback,
      useStrict
    });
  };
  var storeSetEntryPoint = ({
    instanceId,
    prop,
    value,
    fireCallback,
    clone,
    action: action2
  }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;
    const newState = storeSetAction({
      instanceId,
      state,
      prop,
      value,
      fireCallback,
      clone,
      action: action2
    });
    if (!newState) return;
    updateMainMap(instanceId, newState);
  };
  var storeQuickSetEntrypoint = ({ instanceId, prop, value }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;
    const { store, callBackWatcher } = state;
    const oldVal = store[prop];
    store[prop] = value;
    runCallbackQueqe({
      callBackWatcher,
      prop,
      newValue: value,
      oldValue: oldVal,
      validationValue: true
    });
    updateMainMap(instanceId, { ...state, store });
  };
  var fireComputed = (instanceId) => {
    const state = getStateFromMainMap(instanceId);
    const { lastestPropsChanged, callBackComputed, store } = state;
    const computedFiltered = [...callBackComputed].filter(({ keys }) => {
      return [...lastestPropsChanged].find((current) => {
        return keys.includes(current);
      });
    });
    computedFiltered.forEach(({ prop, keys, fn }) => {
      const valuesToObject = keys.map((item) => {
        return { [item]: store[item] };
      }).reduce((previous, current) => {
        return { ...previous, ...current };
      }, {});
      const computedValue = fn(valuesToObject);
      storeSetEntryPoint({
        instanceId,
        prop,
        value: computedValue,
        action: STORE_SET
      });
    });
    const stateAfterComputed = getStateFromMainMap(instanceId);
    updateMainMap(instanceId, {
      ...stateAfterComputed,
      lastestPropsChanged: /* @__PURE__ */ new Set(),
      computedRunning: false
    });
  };
  var addToComputedWaitLsit = ({ instanceId, prop }) => {
    const state = getStateFromMainMap(instanceId);
    const { callBackComputed, lastestPropsChanged, computedRunning } = state;
    if (!callBackComputed || callBackComputed.size === 0) return;
    lastestPropsChanged.add(prop);
    updateMainMap(instanceId, {
      ...state,
      lastestPropsChanged
    });
    if (!computedRunning) {
      const state4 = getStateFromMainMap(instanceId);
      updateMainMap(instanceId, { ...state4, computedRunning: true });
      useNextLoop(() => fireComputed(instanceId));
    }
  };
  var storeComputedAction = ({ state, prop, keys, fn }) => {
    const { callBackComputed } = state;
    const tempComputedArray = [...callBackComputed, { prop, keys, fn }];
    const propList = tempComputedArray.flatMap((item) => item.prop);
    const keysIsusedInSomeComputed = propList.some(
      (item) => keys.includes(item)
    );
    if (keysIsusedInSomeComputed) {
      storeComputedKeyUsedWarning(keys, getLogStyle());
      return;
    }
    callBackComputed.add({
      prop,
      keys,
      fn
    });
    return {
      ...state,
      callBackComputed
    };
  };
  var storeComputedEntryPoint = ({
    instanceId,
    prop,
    keys,
    callback: callback2
  }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;
    const newState = storeComputedAction({
      state,
      prop,
      keys,
      fn: callback2
    });
    if (!newState) return;
    updateMainMap(instanceId, newState);
  };

  // src/js/mobCore/store/initialValidation.js
  var inizializeValidation = (initialState) => {
    const { store } = initialState;
    const validationStatusObject = Object.entries(store).reduce(
      (previous, current) => {
        const [key, value] = current;
        return storeType.isObject(value) ? { ...previous, [key]: {} } : previous;
      },
      {}
    );
    return { ...initialState, validationStatusObject };
  };
  var inizializeAllProps = (instanceId, initialState) => {
    const { store } = initialState;
    Object.entries(store).forEach((item) => {
      const [prop, value] = item;
      const state = getStateFromMainMap(instanceId);
      const newState = storeSetAction({
        instanceId,
        state,
        prop,
        value,
        fireCallback: false,
        useStrict: false,
        action: STORE_SET
      });
      if (!newState) return;
      updateMainMap(instanceId, newState);
    });
  };

  // src/js/mobCore/store/watch.js
  var storeWatchAction = ({ state, prop, callback: callback2 }) => {
    const { store, callBackWatcher } = state;
    const logStyle2 = getLogStyle();
    if (!store)
      return {
        state: void 0,
        unsubscribeId: ""
      };
    if (!(prop in store)) {
      storeWatchWarning(prop, logStyle2);
      return {
        state: void 0,
        unsubscribeId: ""
      };
    }
    const id = getUnivoqueId();
    callBackWatcher.set(id, { fn: callback2, prop });
    return {
      state: { ...state, callBackWatcher },
      unsubscribeId: id
    };
  };
  var unsubScribeWatch = ({ instanceId, unsubscribeId }) => {
    const state = getStateFromMainMap(instanceId);
    const { callBackWatcher } = state;
    callBackWatcher.delete(unsubscribeId);
    updateMainMap(instanceId, { ...state, callBackWatcher });
  };
  var watchEntryPoint = ({ instanceId, prop, callback: callback2 }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return () => {
    };
    const { state: newState, unsubscribeId } = storeWatchAction({
      state,
      prop,
      callback: callback2
    });
    if (!newState) return () => {
    };
    updateMainMap(instanceId, newState);
    return () => {
      unsubScribeWatch({ instanceId, unsubscribeId });
    };
  };

  // src/js/mobCore/store/inizializeInstance.js
  var inizializeInstance = (data2) => {
    const dataDepth = maxDepth(data2);
    return {
      callBackWatcher: /* @__PURE__ */ new Map(),
      callBackComputed: /* @__PURE__ */ new Set(),
      lastestPropsChanged: /* @__PURE__ */ new Set(),
      validationStatusObject: {},
      dataDepth,
      computedRunning: false,
      store: inizializeStoreData({
        data: data2,
        depth: dataDepth,
        logStyle: getLogStyle()
      }),
      type: inizializeSpecificProp({
        data: data2,
        prop: "type",
        depth: dataDepth,
        logStyle: getLogStyle(),
        fallback: UNTYPED
      }),
      fnTransformation: inizializeSpecificProp({
        data: data2,
        prop: "transform",
        depth: dataDepth,
        logStyle: getLogStyle(),
        fallback: (value) => value
      }),
      fnValidate: inizializeSpecificProp({
        data: data2,
        prop: "validate",
        depth: dataDepth,
        logStyle: getLogStyle(),
        fallback: () => true
      }),
      strict: inizializeSpecificProp({
        data: data2,
        prop: "strict",
        depth: dataDepth,
        logStyle: getLogStyle(),
        fallback: false
      }),
      skipEqual: inizializeSpecificProp({
        data: data2,
        prop: "skipEqual",
        depth: dataDepth,
        logStyle: getLogStyle(),
        fallback: true
      })
    };
  };

  // src/js/mobCore/store/storeGet.js
  var storeGetEntryPoint = (instanceId) => {
    const { store } = getStateFromMainMap(instanceId);
    return store;
  };
  var storeGetPropEntryPoint = ({ instanceId, prop }) => {
    const { store } = getStateFromMainMap(instanceId);
    if (!store) return;
    if (prop in store) {
      return store[prop];
    } else {
      storeGetPropWarning(prop, getLogStyle());
      return;
    }
  };

  // src/js/mobCore/store/storeEmit.js
  var storeEmitEntryPoint = ({ instanceId, prop }) => {
    const { store, callBackWatcher, validationStatusObject } = getStateFromMainMap(instanceId);
    if (!store) return;
    if (prop in store) {
      runCallbackQueqe({
        callBackWatcher,
        prop,
        newValue: store[prop],
        oldValue: store[prop],
        validationValue: validationStatusObject[prop]
      });
    } else {
      storeEmitWarning(prop, getLogStyle());
    }
  };
  var storeEmitAsyncEntryPoint = async ({ instanceId, prop }) => {
    const { store, callBackWatcher, validationStatusObject } = getStateFromMainMap(instanceId);
    if (!store) return { success: false };
    if (prop in store) {
      await runCallbackQueqeAsync({
        callBackWatcher,
        prop,
        newValue: store[prop],
        oldValue: store[prop],
        validationValue: validationStatusObject[prop]
      });
      return { success: true };
    } else {
      storeEmitWarning(prop, getLogStyle());
      return { success: false };
    }
  };

  // src/js/mobCore/store/storeDebug.js
  var storeGetValidationEntryPoint = ({ instanceId }) => {
    const { validationStatusObject } = getStateFromMainMap(instanceId);
    return validationStatusObject;
  };
  var storeDebugStoreEntryPoint = ({ instanceId }) => {
    const { store } = getStateFromMainMap(instanceId);
    console.log(store);
  };
  var storeDebugValidateEntryPoint = ({ instanceId }) => {
    const { validationStatusObject } = getStateFromMainMap(instanceId);
    console.log(validationStatusObject);
  };
  var storeDebugEntryPoint = ({ instanceId }) => {
    const state = getStateFromMainMap(instanceId);
    console.log(state);
  };

  // src/js/mobCore/store/index.js
  var mobStore = (data2 = {}) => {
    const instanceId = getUnivoqueId();
    const initialState = inizializeInstance(data2);
    const stateUpdated = inizializeValidation(initialState);
    updateMainMap(instanceId, stateUpdated);
    inizializeAllProps(instanceId, initialState);
    return {
      get: () => {
        return storeGetEntryPoint(instanceId);
      },
      getProp: (prop) => {
        return storeGetPropEntryPoint({ instanceId, prop });
      },
      set: (prop, value, fireCallback = true, clone = false) => {
        storeSetEntryPoint({
          instanceId,
          prop,
          value,
          fireCallback,
          clone,
          action: STORE_SET
        });
      },
      update: (prop, value, fireCallback = true, clone = false) => {
        storeSetEntryPoint({
          instanceId,
          prop,
          value,
          fireCallback,
          clone,
          action: STORE_UPDATE
        });
      },
      quickSetProp: (prop, value) => {
        storeQuickSetEntrypoint({ instanceId, prop, value });
      },
      watch: (prop, callback2) => {
        return watchEntryPoint({ instanceId, prop, callback: callback2 });
      },
      computed: (prop, keys, callback2) => {
        storeComputedEntryPoint({
          instanceId,
          prop,
          keys,
          callback: callback2
        });
      },
      emit: (prop) => {
        storeEmitEntryPoint({ instanceId, prop });
      },
      emitAsync: async (prop) => {
        return storeEmitAsyncEntryPoint({ instanceId, prop });
      },
      getValidation: () => {
        return storeGetValidationEntryPoint({ instanceId });
      },
      debug: () => {
        storeDebugEntryPoint({ instanceId });
      },
      debugStore: () => {
        storeDebugStoreEntryPoint({ instanceId });
      },
      debugValidate: () => {
        storeDebugValidateEntryPoint({ instanceId });
      },
      destroy: () => {
        removeStateFromMainMap(instanceId);
      }
    };
  };

  // src/js/mobCore/events/eventStore.js
  var eventStore = mobStore({
    /**
     * @description
     * Use passive event.
     */
    usePassive: () => ({
      value: true,
      type: Boolean
    }),
    /**
     * @description
     * Frame Event
     */
    currentFrame: () => ({
      value: 0,
      type: Number
    }),
    /**
     * @description
     * Initial fps value
     */
    instantFps: () => ({
      value: 60,
      type: Number
    }),
    /**
     * @description
     * Trigger nexFrame
     */
    requestFrame: () => ({
      value: () => {
      },
      type: Function
    }),
    /**
     * @description
     * Send nextTick on next loop
     */
    deferredNextTick: () => ({
      value: true,
      type: Boolean
    }),
    /**
     * @description
     * Throttle scroll value
     */
    throttle: () => ({
      value: 60,
      type: Number
    })
  });

  // src/js/mobCore/events/loadutils/handleLoad.js
  var initialized = false;
  var callbacks = /* @__PURE__ */ new Map();
  function handler() {
    if (callbacks.size === 0) {
      globalThis.removeEventListener("DOMContentLoaded", handler);
      initialized = false;
      return;
    }
    for (const value of callbacks.values()) {
      value();
    }
    callbacks.clear();
  }
  function init() {
    if (initialized) return;
    initialized = true;
    globalThis.addEventListener("DOMContentLoaded", handler, {
      passive: false
    });
  }
  var addCallback = (cb) => {
    const id = getUnivoqueId();
    callbacks.set(id, cb);
    if (typeof globalThis !== "undefined") {
      init();
    }
    return () => callbacks.delete(id);
  };
  var handleLoad = /* @__PURE__ */ (() => addCallback)();

  // src/js/mobCore/events/mouseUtils/normalizeWhell.js
  var PIXEL_STEP = 10;
  var LINE_HEIGHT = 40;
  var PAGE_HEIGHT = 800;
  function normalizeWheel(event) {
    let sX = 0, sY = 0, pX = 0, pY = 0;
    if ("detail" in event) {
      sY = event.detail;
    }
    if ("wheelDelta" in event) {
      sY = -event.wheelDelta / 120;
    }
    if ("wheelDeltaY" in event) {
      sY = -event.wheelDeltaY / 120;
    }
    if ("wheelDeltaX" in event) {
      sX = -event.wheelDeltaX / 120;
    }
    if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ("deltaY" in event) {
      pY = event.deltaY;
    }
    if ("deltaX" in event) {
      pX = event.deltaX;
    }
    if ((pX || pY) && event.deltaMode) {
      if (event.deltaMode == 1) {
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }
    return { spinX: sX, spinY: sY, pixelX: pX, pixelY: pY };
  }

  // src/js/mobCore/events/mouseUtils/handleMouse.js
  function getPageData({ type, e }) {
    if (type === "touchend" && e.changedTouches) return e.changedTouches[0];
    return e.touches ? e.touches[0] : e;
  }
  function getClientData({ type, e }) {
    if (type === "touchend" && e.changedTouches) return e.changedTouches[0];
    return e.touches ? e.touches[0] : e;
  }
  function handleMouse(event) {
    let initialized7 = false;
    const callbacks9 = /* @__PURE__ */ new Map();
    let { usePassive } = eventStore.get();
    eventStore.watch("usePassive", () => {
      globalThis.removeEventListener(event, handler7);
      initialized7 = false;
      init7();
    });
    function handler7(e) {
      if (callbacks9.size === 0) {
        globalThis.removeEventListener(event, handler7);
        initialized7 = false;
        return;
      }
      const type = e.type;
      const { pageX, pageY } = getPageData({ type, e });
      const { clientX, clientY } = getClientData({ type, e });
      const target = e.target;
      const mouseData = {
        page: {
          x: pageX,
          y: pageY
        },
        client: {
          x: clientX,
          y: clientY
        },
        target,
        type,
        preventDefault: () => usePassive ? () => {
        } : e.preventDefault()
      };
      if (type === "wheel") {
        const { spinX, spinY, pixelX, pixelY } = normalizeWheel(e);
        Object.assign(mouseData, { spinX, spinY, pixelX, pixelY });
      }
      for (const value of callbacks9.values()) {
        value(mouseData);
      }
    }
    function init7() {
      if (initialized7) return;
      initialized7 = true;
      usePassive = eventStore.getProp("usePassive");
      globalThis.addEventListener(event, handler7, {
        passive: usePassive
      });
    }
    const addCb6 = (cb) => {
      const id = getUnivoqueId();
      callbacks9.set(id, cb);
      if (typeof globalThis !== "undefined") {
        init7();
      }
      return () => callbacks9.delete(id);
    };
    return addCb6;
  }
  var handleMouseClick = handleMouse("click");
  var handleMouseDown = handleMouse("mousedown");
  var handleTouchStart = handleMouse("touchstart");
  var handleMouseMove = handleMouse("mousemove");
  var handleTouchMove = handleMouse("touchmove");
  var handleMouseUp = handleMouse("mouseup");
  var handleTouchEnd = handleMouse("touchend");
  var handleMouseWheel = handleMouse("wheel");

  // src/js/mobCore/events/rafutils/handleCache.js
  var cacheCoutner = 0;
  var subscriberMap = /* @__PURE__ */ new Map();
  var add = (el = {}, fn = () => {
  }) => {
    const id = getUnivoqueId();
    subscriberMap.set(id, {
      el,
      fn,
      data: /* @__PURE__ */ new Map()
    });
    return {
      id,
      unsubscribe: () => {
        if (subscriberMap.has(id)) {
          const item = subscriberMap.get(id);
          if (!item) return;
          const frameToSubstract = item.data.size;
          subscriberMap.delete(id);
          if (!frameToSubstract) return;
          cacheCoutner = cacheCoutner - frameToSubstract;
        }
      }
    };
  };
  var update = ({ id, callBackObject, frame }) => {
    if (!subscriberMap.has(id)) return;
    const { currentFrame: currentFrame2 } = eventStore.get();
    const item = subscriberMap.get(id);
    if (!item?.data) return;
    const { data: data2 } = item;
    if (data2.has(frame + currentFrame2)) return;
    data2.set(frame + currentFrame2, callBackObject);
    cacheCoutner++;
  };
  var remove = (id) => {
    if (subscriberMap.has(id)) subscriberMap.delete(id);
  };
  var clean = (id) => {
    const el = subscriberMap.get(id);
    if (!el) return;
    const frameToSubstract = el.data.size;
    cacheCoutner = cacheCoutner - frameToSubstract;
    el.data.clear();
  };
  var get = (id) => {
    return subscriberMap.get(id) ?? {};
  };
  var fire = (frameCounter) => {
    for (const value of subscriberMap.values()) {
      const { data: data2, fn, el } = value;
      const callBackObject = data2.get(frameCounter);
      if (callBackObject) {
        fn(callBackObject, el);
        data2.delete(frameCounter);
        cacheCoutner--;
      }
    }
  };
  var fireObject = ({ id, obj = {} }) => {
    if (!subscriberMap.has(id)) return;
    const item = subscriberMap.get(id);
    if (!item) return;
    const { el, fn } = item;
    fn(obj, el);
  };
  var getCacheCounter = () => cacheCoutner;
  var updateFrameId = (maxFramecounter) => {
    for (const [key, value] of subscriberMap) {
      const { data: data2, fn, el } = value;
      const newMap = /* @__PURE__ */ new Map();
      for (const [frame, object] of data2) {
        newMap.set(frame - maxFramecounter, object);
        data2.delete(frame);
      }
      subscriberMap.set(key, { data: newMap, fn, el });
    }
  };
  var handleCache = /* @__PURE__ */ (() => {
    return {
      add,
      get,
      update,
      remove,
      clean,
      fire,
      fireObject,
      getCacheCounter,
      updateFrameId
    };
  })();

  // src/js/mobCore/events/visibilityChange/handleVisibilityChange.js
  var initialized2 = false;
  var callbacks2 = /* @__PURE__ */ new Map();
  function handler2() {
    if (callbacks2.size === 0) {
      globalThis.removeEventListener("visibilitychange", handler2);
      initialized2 = false;
      return;
    }
    const visibilityData = {
      visibilityState: document.visibilityState
    };
    for (const value of callbacks2.values()) {
      value(visibilityData);
    }
  }
  function init2() {
    if (initialized2) return;
    initialized2 = true;
    globalThis.addEventListener("visibilitychange", handler2, {
      passive: false
    });
  }
  var addCb = (cb) => {
    const id = getUnivoqueId();
    callbacks2.set(id, cb);
    if (typeof globalThis !== "undefined") {
      init2();
    }
    return () => callbacks2.delete(id);
  };
  var handleVisibilityChange = /* @__PURE__ */ (() => addCb)();

  // src/js/mobCore/events/rafutils/handleNextTick.js
  var callbacks3 = [];
  var add2 = (cb = () => {
  }, priority = 100) => {
    callbacks3.push({ cb, priority });
  };
  var fire2 = ({ time: time2, fps: fps2 }) => {
    if (callbacks3.length === 0) return;
    callbacks3.sort((a, b) => a.priority - b.priority);
    callbacks3.forEach(({ cb }) => cb({ time: time2, fps: fps2 }));
    callbacks3.length = 0;
  };
  var handleNextTick = /* @__PURE__ */ (() => {
    return { add: add2, fire: fire2 };
  })();

  // src/js/mobCore/events/rafutils/handleNextFrame.js
  var callbacks4 = [];
  var add3 = (callBack) => {
    callbacks4.push(callBack);
  };
  var get2 = () => {
    const callBackArray = [...callbacks4];
    callbacks4.length = 0;
    return callBackArray;
  };
  var handleNextFrame = /* @__PURE__ */ (() => {
    return { add: add3, get: get2 };
  })();

  // src/js/mobCore/events/rafutils/handleFrameIndex.js
  var indexCallbackMap = /* @__PURE__ */ new Map();
  var updateKeys = (currentFrameLimit2) => {
    const oldMapToArray = [...indexCallbackMap.entries()];
    indexCallbackMap.clear();
    oldMapToArray.forEach(([index, value]) => {
      indexCallbackMap.set(index - currentFrameLimit2, value);
    });
  };
  var fire3 = ({ currentFrame: currentFrame2, time: time2, fps: fps2 }) => {
    const callabacks = indexCallbackMap.get(currentFrame2) ?? [];
    if (!callabacks || callabacks.length === 0) return;
    callabacks.forEach((item) => item({ time: time2, fps: fps2 }));
    indexCallbackMap.delete(currentFrame2);
  };
  var add4 = (callback2, index) => {
    const frameIndex = index + eventStore.getProp("currentFrame");
    const callabacks = indexCallbackMap.get(frameIndex) ?? [];
    indexCallbackMap.set(frameIndex, [...callabacks, callback2]);
    eventStore.emit("requestFrame");
  };
  var getAmountOfFrameToFire = () => {
    return indexCallbackMap.size;
  };
  var handleFrameIndex = /* @__PURE__ */ (() => {
    return {
      add: add4,
      fire: fire3,
      updateKeys,
      getAmountOfFrameToFire
    };
  })();

  // src/js/mobCore/events/rafutils/loadFps.js
  var loadFpsIsReady = false;
  var loadFps = (duration2 = 30) => {
    if (loadFpsIsReady) {
      const { instantFps } = eventStore.get();
      return new Promise((resolve) => {
        resolve({ averageFPS: instantFps });
      });
    }
    return new Promise((resolve) => {
      const frameTimes = [];
      const maxFrames = 25;
      let frameCursor = 0;
      let numFrames = 0;
      let totalFPS = 0;
      let then = 0;
      let frameCounter = 0;
      const render2 = (now) => {
        now *= 1e-3;
        const deltaTime = now - then;
        then = now;
        const rawFps = Number.isFinite(1 / deltaTime) ? 1 / deltaTime : 60;
        const fps2 = Math.max(rawFps, 60);
        totalFPS += fps2 - (frameTimes[frameCursor] || 0);
        frameTimes[frameCursor++] = fps2;
        numFrames = Math.max(numFrames, frameCursor);
        frameCursor %= maxFrames;
        const averageFPS = Math.round(totalFPS / numFrames);
        frameCounter++;
        if (frameCounter >= duration2) {
          eventStore.quickSetProp("instantFps", averageFPS);
          loadFpsIsReady = true;
          resolve({
            averageFPS
          });
          return;
        }
        requestAnimationFrame(render2);
      };
      requestAnimationFrame(render2);
    });
  };

  // src/js/mobCore/events/rafutils/time.js
  var getTime = () => {
    return typeof globalThis === "undefined" ? Date.now() : globalThis.performance.now();
  };
  var defaultTimestep = 1 / 60 * 1e3;

  // src/js/mobCore/events/rafutils/handleFrame.js
  loadFps();
  var currentFrameLimit = 1e7;
  var firstRunDuration = 2e3;
  var frameIsRuning = false;
  var callback = [];
  var time = getTime();
  var startTime = 0;
  var rawTime = 0;
  var timeElapsed = 0;
  var lastTime = 0;
  var timeLost = 0;
  var isStopped = false;
  var fps = 60;
  var maxFps = fps;
  var frames = 0;
  var fpsPrevTime = 0;
  var currentFrame = 0;
  var mustMakeSomethingIsActive = false;
  var shouldMakeSomethingIsActive = false;
  var mustMakeSomethingCheck = () => fps < maxFps / 5 * 3;
  var shouldMakeSomethingCheck = () => fps < maxFps / 5 * 4;
  var mustMakeSomethingStart = () => {
    if (!mustMakeSomethingCheck() || mustMakeSomethingIsActive) return;
    mustMakeSomethingIsActive = true;
    setTimeout(() => {
      mustMakeSomethingIsActive = false;
    }, 4e3);
  };
  var shouldMakeSomethingStart = () => {
    if (!shouldMakeSomethingCheck() || shouldMakeSomethingIsActive) return;
    shouldMakeSomethingIsActive = true;
    setTimeout(() => {
      shouldMakeSomethingIsActive = false;
    }, 4e3);
  };
  handleVisibilityChange(({ visibilityState }) => {
    isStopped = visibilityState === "visible";
  });
  catchAnimationReject();
  eventStore.watch("requestFrame", () => {
    initFrame();
  });
  var nextTickFn = () => {
    if (currentFrame === currentFrameLimit) {
      currentFrame = 0;
      eventStore.quickSetProp("currentFrame", currentFrame);
      handleFrameIndex.updateKeys(currentFrameLimit);
      handleCache.updateFrameId(currentFrameLimit);
    }
    handleNextTick.fire({ time, fps });
    callback = [...callback, ...handleNextFrame.get()];
    frameIsRuning = false;
    if (callback.length > 0 || handleFrameIndex.getAmountOfFrameToFire() > 0 || handleCache.getCacheCounter() > 0 || time < firstRunDuration) {
      initFrame();
    } else {
      isStopped = true;
      currentFrame = 0;
      lastTime = time;
      eventStore.quickSetProp("currentFrame", currentFrame);
    }
  };
  var render = (timestamp) => {
    time = timestamp;
    timeElapsed = time - rawTime;
    if (isStopped) startTime += timeElapsed;
    rawTime += timeElapsed;
    time = Math.round(rawTime - startTime);
    const frameDuration = Math.round(1e3 / fps);
    timeLost = Math.abs(time - lastTime - frameDuration);
    const timeToSubsctract = timeLost > 100 ? timeLost : 0;
    time = time - timeToSubsctract;
    lastTime = time;
    if (isStopped) {
      fpsPrevTime = time;
      frames = 0;
      fps = eventStore.getProp("instantFps");
    } else {
      frames++;
    }
    if (time > fpsPrevTime + 1e3 && !isStopped) {
      fps = time > firstRunDuration ? Math.round(frames * 1e3 / (time - fpsPrevTime)) : eventStore.getProp("instantFps");
      fpsPrevTime = time;
      frames = 0;
      fps = fps < 30 ? eventStore.getProp("instantFps") : fps;
    }
    if (fps > maxFps) maxFps = fps;
    mustMakeSomethingStart();
    shouldMakeSomethingStart();
    callback.forEach((item) => item({ time, fps }));
    handleFrameIndex.fire({ currentFrame, time, fps });
    handleCache.fire(currentFrame);
    currentFrame++;
    eventStore.quickSetProp("currentFrame", currentFrame);
    callback.length = 0;
    isStopped = false;
    const deferredNextTick = eventStore.getProp("deferredNextTick");
    if (deferredNextTick) {
      useNextLoop(() => nextTickFn());
    } else {
      nextTickFn();
    }
  };
  var initFrame = () => {
    if (frameIsRuning) return;
    if (typeof globalThis === "undefined") {
      setTimeout(() => render(getTime()), defaultTimestep);
    } else {
      requestAnimationFrame(render);
    }
    frameIsRuning = true;
  };
  var handleFrame = /* @__PURE__ */ (() => {
    const getFps = () => fps;
    const mustMakeSomething = () => mustMakeSomethingIsActive;
    const shouldMakeSomething = () => shouldMakeSomethingIsActive;
    const add5 = (cb) => {
      callback.push(cb);
      initFrame();
    };
    const addMultiple = (arr = []) => {
      callback = [...callback, ...arr];
      initFrame();
    };
    return {
      add: add5,
      addMultiple,
      getFps,
      mustMakeSomething,
      shouldMakeSomething
    };
  })();

  // src/js/mobCore/events/debounce.js
  var debounceFuncion = function debounce(fn, time2 = 200) {
    let timeout;
    return function() {
      const functionCall = () => Reflect.apply(fn, this, arguments);
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time2);
    };
  };

  // src/js/mobCore/events/resizeUtils/handleResize.js
  var initialized3 = false;
  var callbacks5 = /* @__PURE__ */ new Map();
  var debouceFunctionReference = () => {
  };
  var previousWindowHeight = window.innerHeight;
  var previousWindowWidth = window.innerWidth;
  function handler3() {
    if (callbacks5.size === 0) {
      window.removeEventListener("resize", debouceFunctionReference);
      initialized3 = false;
      return;
    }
    const windowsHeight = window.innerHeight;
    const windowsWidth = window.innerWidth;
    const verticalResize = windowsHeight !== previousWindowHeight;
    const horizontalResize = windowsWidth !== previousWindowWidth;
    previousWindowHeight = windowsHeight;
    previousWindowWidth = windowsWidth;
    const resizeData = {
      scrollY: window.scrollY,
      windowsHeight,
      windowsWidth,
      documentHeight: document.documentElement.scrollHeight,
      verticalResize,
      horizontalResize
    };
    for (const value of callbacks5.values()) {
      value(resizeData);
    }
  }
  function init3() {
    if (initialized3) return;
    initialized3 = true;
    debouceFunctionReference = debounceFuncion(() => handler3());
    window.addEventListener("resize", debouceFunctionReference, {
      passive: false
    });
  }
  var addCb2 = (cb) => {
    const id = getUnivoqueId();
    callbacks5.set(id, cb);
    if (typeof globalThis !== "undefined") {
      init3();
    }
    return () => callbacks5.delete(id);
  };
  var handleResize = /* @__PURE__ */ (() => addCb2)();

  // src/js/mobCore/events/scrollUtils/handleScrollImmediate.js
  var initialized4 = false;
  var callbacks6 = /* @__PURE__ */ new Map();
  var UP = "UP";
  var DOWN = "DOWN";
  var prev = window.scrollY;
  var val = window.scrollY;
  var direction = DOWN;
  var scrollData = {
    scrollY: val,
    direction
  };
  function handler4() {
    if (callbacks6.size === 0) {
      window.removeEventListener("scroll", handler4);
      initialized4 = false;
      return;
    }
    prev = val;
    val = window.scrollY;
    direction = val > prev ? DOWN : UP;
    scrollData = {
      scrollY: val,
      direction
    };
    for (const value of callbacks6.values()) {
      value(scrollData);
    }
  }
  function init4() {
    if (initialized4) return;
    initialized4 = true;
    window.addEventListener("scroll", handler4, {
      passive: true
    });
  }
  var addCb3 = (cb) => {
    const id = getUnivoqueId();
    callbacks6.set(id, cb);
    if (typeof globalThis !== "undefined") {
      init4();
    }
    return () => callbacks6.delete(id);
  };
  var handleScrollImmediate = /* @__PURE__ */ (() => {
    return addCb3;
  })();

  // src/js/mobCore/events/scrollUtils/handleScroll.js
  var initialized5 = false;
  var callbacks7 = /* @__PURE__ */ new Map();
  var unsubscribe = () => {
  };
  function handler5(scrollData2) {
    if (callbacks7.size === 0) {
      unsubscribe();
      initialized5 = false;
      return;
    }
    handleFrame.add(() => {
      handleNextTick.add(() => {
        for (const value of callbacks7.values()) {
          value(scrollData2);
        }
      }, 0);
    });
  }
  function init5() {
    if (initialized5) return;
    initialized5 = true;
    unsubscribe = handleScrollImmediate(handler5);
  }
  var addCb4 = (cb) => {
    const id = getUnivoqueId();
    callbacks7.set(id, cb);
    if (typeof globalThis !== "undefined") {
      init5();
    }
    return () => callbacks7.delete(id);
  };
  var handleScroll = /* @__PURE__ */ (() => addCb4)();

  // src/js/mobCore/events/throttle.js
  var throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (lastRan) {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(
          function() {
            if (getTime() - lastRan >= limit) {
              func.apply(context, args);
              lastRan = getTime();
            }
          },
          limit - (getTime() - lastRan)
        );
      } else {
        func.apply(context, args);
        lastRan = getTime();
      }
    };
  };

  // src/js/mobCore/events/scrollUtils/handleScrollThrottle.js
  var initialized6 = false;
  var callbacks8 = /* @__PURE__ */ new Map();
  var throttleFunctionReference;
  var unsubscribe2 = () => {
  };
  function handler6(scrollData2) {
    if (callbacks8.size === 0) {
      unsubscribe2();
      initialized6 = false;
      return;
    }
    handleFrame.add(() => {
      handleNextTick.add(() => {
        for (const value of callbacks8.values()) {
          value(scrollData2);
        }
      }, 0);
    });
  }
  function init6() {
    if (initialized6) return;
    initialized6 = true;
    throttleFunctionReference = throttle(
      (scrollData2) => handler6(scrollData2),
      eventStore.getProp("throttle")
    );
    unsubscribe2 = handleScrollImmediate(throttleFunctionReference);
  }
  var addCb5 = (cb) => {
    const id = getUnivoqueId();
    callbacks8.set(id, cb);
    if (typeof globalThis !== "undefined") {
      init6();
    }
    return () => callbacks8.delete(id);
  };
  var handleScrollThrottle = /* @__PURE__ */ (() => addCb5)();

  // src/js/mobCore/events/scrollUtils/handleScrollUtils.js
  var unsubscribeScrollStart = () => {
  };
  var unsubscribeScrollEnd = () => {
  };
  var debouceFunctionReference2 = () => {
  };
  function handleScrollUtils(type) {
    let initialized7 = false;
    const callbacks9 = /* @__PURE__ */ new Map();
    let isScrolling = false;
    function handler7() {
      isScrolling = false;
      if (callbacks9.size === 0) {
        unsubscribeScrollEnd();
        if (type === "START") {
          unsubscribeScrollStart();
        }
        initialized7 = false;
        return;
      }
      handleFrame.add(() => {
        handleNextTick.add(() => {
          const scrollData2 = {
            scrollY: window.scrollY
          };
          if (type === "END") {
            for (const value of callbacks9.values()) {
              value(scrollData2);
            }
          }
        }, 0);
      });
    }
    function init7() {
      if (initialized7) return;
      initialized7 = true;
      debouceFunctionReference2 = debounceFuncion(() => handler7());
      unsubscribeScrollEnd = handleScrollImmediate(debouceFunctionReference2);
      if (type === "START") {
        unsubscribeScrollStart = handleScrollImmediate(({ scrollY: scrollY2 }) => {
          const scrollData2 = {
            scrollY: scrollY2
          };
          if (!isScrolling) {
            isScrolling = true;
            for (const value of callbacks9.values()) {
              value(scrollData2);
            }
          }
        });
      }
    }
    const addCb6 = (cb) => {
      const id = getUnivoqueId();
      callbacks9.set(id, cb);
      if (typeof globalThis !== "undefined") {
        init7();
      }
      return () => callbacks9.delete(id);
    };
    return addCb6;
  }
  var handleScrollStart = handleScrollUtils("START");
  var handleScrollEnd = handleScrollUtils("END");

  // src/js/mobCore/index.js
  var mobCore = {
    /**
     * @description
     * SimpleStore initialization.
     * The store accepts single properties or objects
     *  Each individual property can be initialized with a simple value or via a more complex setup.
     *  A complex set-up is created through a function that must return an object with the property `value` and at least one of the following properties:
     *  `type` || `validation` || `skipEqual` || `strict`
     *
     * `value`:
     *  Initial value.
     *
     * `type`:
     *  Supported types:
     * `String|Number|Object|Function|Array|Boolean|Element|HTMLElement|Map|Set|NodeList|"Any"`.
     *  The property will not be updated if it doesn't match, you will have a warning.
     *  For custom Object use 'Any'.
     *  Support Constructor || String.
     *  Es: type: Number || type: 'Number'
     *
     *  `validation`:
     *  Validation function to parse value.
     *  This function will have the current value and old value as input parameter and will return a boolean value.
     *  The validation status of each property will be displayed in the watchers and will be retrievable using the getValidation() method.
     *
     *  `strict`:
     *  If set to true, the validation function will become blocking and the property will be updated only if the validation function is successful.
     *  THe default value is `false`.
     *
     *  `skipEqual`:
     *  If the value is equal to the previous one, the property will not be updated. The watches will not be executed and the property will have no effect on the computed related to it.
     *  The default value is `true`.
     *
     *
     * @param {import('./store/type.js').mobStoreBaseData} data
     *
     * @example
     *
     * ```javascript
     *
     * const myStore = mobCore.createStore({
     *     prop1: 0,
     *     prop2: 0
     * });
     *
     * const myStore = mobCore.createStore({
     *     myProp: () => ({
     *         value: 10,
     *         type: Number,
     *         validate: (val, oldVal) => val < 10,
     *         strict: true,
     *         skipEqual: false,
     *     }),
     *     myPropWithObject: () => ({
     *         value: { prop: { prop1: 1}},
     *         type: 'Any',
     *     }),
     *     myObject: {
     *         prop1: () => ({
     *             value: 0,
     *             type: Number,
     *             validate: (val, oldVal) => val < 10,
     *             strict: true,
     *             skipEqual: true,
     *         }),
     *         prop2: () => ({
     *             value: document.createElement('div'),
     *             type: Element,
     *         }),
     *     }
     * });
     *
     *
     *
     * Available methods:
     * myStore.set();
     * myStore.setProp();
     * myStore.setProp();
     * myStore.setObj();
     * myStore.computed();
     * myStore.get();
     * myStore.getProp();
     * myStore.getValidation();
     * myStore.watch();
     * myStore.emit();
     * myStore.emitAsync();
     * myStore.debugStore();
     * myStore.debugValidate();
     * myStore.setStyle();
     * myStore.destroy();
     * ```
     */
    createStore(data2 = {}) {
      return mobStore(data2);
    },
    /**
     * @returns {number}
     *
     * @description
     * Get fps detect on page load.
     * Start from 60fps.
     * The real value is calculated after 30 Request animation frame.
     */
    getInstantFps() {
      return eventStore.getProp("instantFps");
    },
    /**
     * @returns {number}
     *
     * @description
     * Get current fps value.
     */
    getFps() {
      return handleFrame.getFps();
    },
    /**
     * @description
     * If the current FPS drops below `2/5` of its maximum value the methods return true.
     * The value will remain frozen for 4 seconds in order to have time to take the right countermeasures.
     *
     * Note: created for mobMotion internal use.
     */
    mustMakeSomething() {
      return handleFrame.mustMakeSomething();
    },
    /**
     * @description
     * If the current FPS drops below `1/5` of its maximum value the methods return true.
     * The value will remain frozen for 4 seconds in order to have time to take the right countermeasures.
     *
     * Note: created for mobMotion internal use.
     *
     */
    shouldMakeSomething() {
      return handleFrame.shouldMakeSomething();
    },
    /**
     * @description
     * Execute a callBack within the first available request animation frame.
     * Use this method to modify elements of the DOM
     *
     * @param {import('./events/rafutils/type.js').handleFrameCallbakType} callback - callback function
     *
     * @example
     * ```javascript
     * mobCore.useframe(({ fps, shouldrender, time }) => {
     *     // code ...
     * });
     *
     * ```
     */
    useFrame(callback2 = () => {
    }) {
      return handleFrame.add(callback2);
    },
    /**
     * @description
     * Execute callbacks after scheduling the request animation frame. Use this method to read data from the DOM. To execute callbacks exactly after the request animation frame, set the global property deferredNextTick to true.
     *
     * @param {import('./events/rafutils/type.js').handleFrameCallbakType} callback - callback function
     *
     * @example
     * ```javascript
     * mobCore.useFrame(() => {
     *     mobCore.useNextTick(({ fps, time }) => {
     *         // code
     *     });
     * });
     *
     * Loop request animation frame using handleNextTick:
     *
     * const loop = () => {
     *     mobCore.useNextTick(() => {
     *         // read from DOM
     *
     *         mobCore.useFrame(() => {
     *             // write to the DOM
     *             loop();
     *         });
     *     });
     * };
     *
     * mobCore.useFrame(() => loop());
     *
     * To tick exactly after the request animation frame:
     * mobCore.default('set', { deferredNextTick: true });
     *
     * ```
     */
    useNextTick(callback2 = () => {
    }) {
      return handleNextTick.add(callback2);
    },
    /**
     * @description
     * Execute a callback to the next available frame allowing the creation of a request animation frame loop
     *
     * @param {import('./events/rafutils/type.js').handleFrameCallbakType} callback - callback function
     *
     * @example
     * ```javascript
     * const loop = () => {
     *     mobCore.useNextFrame(({ fps, time }) => {
     *         // code
     *         loop();
     *     });
     * };
     *
     * mobCore.useFrame(() => loop());
     *
     * ```
     */
    useNextFrame(callback2 = () => {
    }) {
      return handleNextFrame.add(callback2);
    },
    /**
     * @description
     * Add callback to a specific frame.
     *
     * @param {import('./events/rafutils/type.js').handleFrameCallbakType} callback - callback function
     * @pram {number} index
     *
     * @example
     * ```javascript
     * mobCore.useFrameIndex(({ fps, time }) => {
     *     // code ...
     * }, 5);
     *
     * ```
     */
    useFrameIndex(callback2 = () => {
    }, frame = 0) {
      return handleFrameIndex.add(callback2, frame);
    },
    /**
     * @description
        Runs a request animation frame loop to detect the frame rate of the monitor.
        After the method will be resolved the first time, subsequent calls will be resolved immediately returning the previously calculated value.
        The method is launched the first time automatically at the first loading.
     *
     * @param {import('./events/rafutils/type.js').loadFpsCallback} callback - callback function
     * @return {Promise}
     *
     */
    async useFps(callback2 = () => {
    }) {
      const obj = await loadFps();
      callback2(obj);
      return obj;
    },
    /**
     * @description
     * Add callback on page load
     *
     * @param {function():void } callback - Callback function executed on page load
     *
     * @example
     * ```javascript
     *
     * mobCore.useLoad(() => {
     *     // code
     * });
     *
     * ```
     */
    useLoad(callback2 = () => {
    }) {
      return handleLoad(callback2);
    },
    /**
     * @description
     * Get handleCache function.
     *
     * Note: created for mobMotion internal use.
     */
    useCache: handleCache,
    /**
     * @description
     * Add callback on resize using a debounce function.
     *
     * @param {import('./events/resizeUtils/type.js').handleResizeCallback} callback - callback function fired on resize.
     *
     * @example
     * ```javascript
     * mobCore.useResize(
     *     ({
     *         documentHeight,
     *         horizontalResize,
     *         scrollY,
     *         verticalResize,
     *         windowsHeight,
     *         windowsWidth,
     *     }) => {
     *         // code
     *     }
     * );
     *
     * ```
     */
    useResize(callback2 = () => {
    }) {
      return handleResize(callback2);
    },
    /**
     * @description
     * Add callback on tab change.
     *
     * @param {import('./events/visibilityChange/type.js').visibilityChangeCallback} callback - callback function fired on tab change.
     *
     * @example
     * ```javascript
     *  const unsubscribe = mobCore.useVisibilityChange(({ visibilityState }) => {
     *      // code
     *  });
     *
     *  unsubscribe();
     *
     * ```
     */
    useVisibilityChange(callback2 = () => {
    }) {
      return handleVisibilityChange(callback2);
    },
    /**
     * @description
     * Add callback on mouse click
     *
     * @param {import('./events/mouseUtils/type.js').mouseEventCallback} callback - callback function fired on mouse click.
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useMouseClick(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useMouseClick(callback2 = () => {
    }) {
      return handleMouseClick(callback2);
    },
    /**
     * @description
     * Add callback on mouse down
     *
     * @param {import('./events/mouseUtils/type.js').mouseEventCallback} callback - callback function fired on mouse down.
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useMouseDown(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useMouseDown(callback2 = () => {
    }) {
      return handleMouseDown(callback2);
    },
    /**
     * @description
     * Add callback on touch start
     *
     * @param {import('./events/mouseUtils/type.js').mouseEventCallback} callback - callback function fired on mouse touch start.
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useTouchStart(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useTouchStart(callback2 = () => {
    }) {
      return handleTouchStart(callback2);
    },
    /**
     * @description
     * Add callback on mouse move
     *
     * @param {import('./events/mouseUtils/type.js').mouseEventCallback} callback - callback function fired on mouse move.
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useMouseMove(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useMouseMove(callback2 = () => {
    }) {
      return handleMouseMove(callback2);
    },
    /**
     * @description
     * Add callback on touch move
     *
     * @param {import('./events/mouseUtils/type.js').mouseEventCallback} callback - callback function fired on touch move.
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useTouchMove(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useTouchMove(callback2 = () => {
    }) {
      return handleTouchMove(callback2);
    },
    /**
     * @description
     * Add callback on mouse up
     *
     * @param {import('./events/mouseUtils/type.js').mouseEventCallback} callback - callback function fired on mouse up.
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useMouseUp(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useMouseUp(callback2 = () => {
    }) {
      return handleMouseUp(callback2);
    },
    /**
     * @description
     * Add callback on touch end.
     *
     * @param {import('./events/mouseUtils/type.js').mouseEventCallback} callback - callback function fired on touch end.
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useTouchEnd(
     *     ({ client, page, preventDefault, target, type }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useTouchEnd(callback2 = () => {
    }) {
      return handleTouchEnd(callback2);
    },
    /**
     * @description
     * Add callback on mouse wheel.
     *
     * @param {import('./events/mouseUtils/type.js').mouseEventCallback} callback - callback function fired on mouse wheel.
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useMouseWheel(
     *     ({
     *         client,
     *         page,
     *         preventDefault,
     *         target,
     *         type,
     *         pixelX,
     *         pixelY,
     *         spinX,
     *         spinY,
     *     }) => {
     *         // code
     *     }
     * );
     *
     * unsubscribe();
     *
     * ```
     */
    useMouseWheel(callback2 = () => {
    }) {
      return handleMouseWheel(callback2);
    },
    /**
     * @description
     * Perform a callback to the first nextTick available after scrolling
     *
     * @param {import('./events/scrollUtils/type.js').handleScrollCallback} callback - callback function
     * @return {Function} unsubscribe callback
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useScroll(({ direction, scrollY }) => {
     *     // code
     * });
     *
     * unsubscribe();
     *
     * ```
     */
    useScroll(callback2 = () => {
    }) {
      return handleScroll(callback2);
    },
    /**
     * @description
     * Execute a callback immediately on scroll
     *
     * @param {import('./events/scrollUtils/type.js').handleScrollCallback} callback - callback function
     * @return {Function} unsubscribe callback
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useScrollImmediate(({ direction, scrollY }) => {
     *     // code
     * });
     *
     * unsubscribe();
     *
     * ```
     */
    useScrollImmediate(callback2 = () => {
    }) {
      return handleScrollImmediate(callback2);
    },
    /**
     * @description
     * Performs a scroll callback using a throttle function
     *
     * @param {import('./events/scrollUtils/type.js').handleScrollCallback} callback - callback function
     * @return {Function} unsubscribe callback
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useScrollThrottle(({ direction, scrollY }) => {
     *    // code
     * });
     *
     * unsubscribe();
     *
     * To change the duration of the throttle, change the value of the throttle property to the defaults:
     * TODO
     * Use store.
     *
     *
     *
     * ```
     */
    useScrollThrottle(callback2 = () => {
    }) {
      return handleScrollThrottle(callback2);
    },
    /**
     * @description
     * Execute a callback at the beginning of the scroll
     *
     * @param {import('./events/scrollUtils/type.js').handleScrollUtilsCallback} callback - callback function
     * @return {Function} unsubscribe callback
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useScrollStart(({ scrollY }) => {
     *     // code
     * });
     *
     * unsubscribe();
     *
     * ```
     */
    useScrollStart(callback2 = () => {
    }) {
      return handleScrollStart(callback2);
    },
    /**
     * @description
     * Execute a callback at the end of the scroll
     *
     * @param {import('./events/scrollUtils/type.js').handleScrollUtilsCallback} callback - callback function
     * @return {Function} unsubscribe callback
     *
     * @example
     * ```javascript
     * const unsubscribe = mobCore.useScrollEnd(({ scrollY }) => {
     *     // code
     * });
     *
     * unsubscribe()
     *
     * ```
     */
    useScrollEnd(callback2 = () => {
    }) {
      return handleScrollEnd(callback2);
    },
    /**
     * @param {any} type
     * @param {any} value
     * @returns {boolean}
     *
     * @description
     * Check type of variable.
     */
    checkType(type, value) {
      return checkType(type, value);
    },
    /**
     * @param {any} type
     * @returns {string}
     *
     * @description
     * Get type in String format.
     */
    getTypeName(type) {
      return getTypeName(type);
    },
    /**
     * @returns {string}
     *
     * @description
     * Generate univoque string id
     */
    getUnivoqueId() {
      return getUnivoqueId();
    },
    /**
     * @returns {number}
     *
     * @description
     * Get current time.
     */
    getTime() {
      return getTime();
    },
    /**
     * @param {() => void} fn
     * @returns {void}
     *
     * @description
     * Wait next event loop.
     */
    useNextLoop(fn) {
      useNextLoop(fn);
    },
    /**
     * @returns {Object}
     *
     * @description
     * Get event store ( es modify defaults or get current value )
     * Props:
     * - usePassive: true
     * - instantFps: 60
     * - deferredNextTick: true
     * - throttle: 60
     *
     *
     * @example
     * ``` javascript
     * mobCore.store.set('throttle', 300);
     * const { throttle } = mobCore.store.get();
     * ....
     *
     * ```
     */
    store: eventStore,
    /**
     * @returns {Object}
     *
     * @description
     * Parse wheel event.
     */
    normalizeWheel,
    /**
     *
     * @description
     * Avoid console error when promise is rejected.
     *
     * Note: created for mobMotion internal use.
     *
     * @example
     * ``` javascript
     * reject(mobCore.ANIMATION_STOP_REJECT);
     * ```
     */
    ANIMATION_STOP_REJECT
  };

  // src/js/mobMotion/animation/spring/springConfig.js
  var springPresetConfig = {
    default: {
      tension: 20,
      mass: 1,
      friction: 5,
      velocity: 0,
      precision: 0.01
    },
    gentle: {
      tension: 120,
      mass: 1,
      friction: 14,
      velocity: 0,
      precision: 0.01
    },
    wobbly: {
      tension: 180,
      mass: 1,
      friction: 12,
      velocity: 0,
      precision: 0.01
    },
    bounce: {
      tension: 200,
      mass: 3,
      friction: 5,
      velocity: 0,
      precision: 0.01
    },
    scroller: {
      tension: 10,
      mass: 1,
      friction: 5,
      velocity: 0,
      precision: 0.5
    }
  };

  // src/js/mobMotion/animation/utils/setUp/setUpValidation.js
  var easeReference = {
    easeLinear: "easeLinear",
    easeInQuad: "easeInQuad",
    easeOutQuad: "easeOutQuad",
    easeInOutQuad: "easeInOutQuad",
    easeInCubic: "easeInCubic",
    easeOutCubic: "easeOutCubic",
    easeInOutCubic: "easeInOutCubic",
    easeInQuart: "easeInQuart",
    easeOutQuart: "easeOutQuart",
    easeInOutQuart: "easeInOutQuart",
    easeInQuint: "easeInQuint",
    easeOutQuint: "easeOutQuint",
    easeInOutQuint: "easeInOutQuint",
    easeInSine: "easeInSine",
    easeOutSine: "easeOutSine",
    easeInOutSine: "easeInOutSine",
    easeInExpo: "easeInExpo",
    easeOutExpo: "easeOutExpo",
    easeInOutExpo: "easeInOutExpo",
    easeInCirc: "easeInCirc",
    easeOutCirc: "easeOutCirc",
    easeInOutCirc: "easeInOutCirc",
    easeInElastic: "easeInElastic",
    easeOutElastic: "easeOutElastic",
    easeInOutElastic: "easeInOutElastic",
    easeInBack: "easeInBack",
    easeOutBack: "easeOutBack",
    easeInOutBack: "easeInOutBack",
    easeInBounce: "easeInBounce",
    easeOutBounce: "easeOutBounce",
    easeInOutBounce: "easeInOutBounce"
  };
  var MQ_MIN = "min";
  var MQ_MAX = "max";
  var defaultMqValueDefault = "desktop";
  var easeDefault = "easeLinear";
  var springConfigDefault = "default";
  var mqDefault = {
    xSmall: 320,
    small: 360,
    medium: 600,
    tablet: 768,
    desktop: 992,
    large: 1200,
    xLarge: 1400
  };
  var sequencerDurationDefault = 10;
  var lerpConfigDefault = 0.06;
  var markerStartDefault = "#ff0000";
  var markerItemDefault = "#14df3b";
  var parallaxRangeDefault = 8;
  var parallaxTweenDurationDefault = 10;
  var tweenDurationDefault = 1e3;
  var tweenRealtiveDefault = false;
  var springRealtiveDefault = false;
  var lerpRelativeDefault = false;
  var lerpPrecisionDefault = 0.01;
  var lerpVelocityDefault = 0.06;
  var setupValidation = (obj) => {
    const deferredNextTick = checkSetUpType({
      prop: "deferredNextTick",
      value: obj?.deferredNextTick,
      defaultValue: mobCore.store.getProp("deferredNextTick"),
      type: Boolean
    });
    const usePassive = checkSetUpType({
      prop: "usePassive",
      value: obj?.usePassive,
      defaultValue: mobCore.store.getProp("usePassive"),
      type: Boolean
    });
    const throttle2 = checkSetUpType({
      prop: "throttle",
      value: obj?.throttle,
      defaultValue: mobCore.store.getProp("throttle"),
      type: Number
    });
    const mq2 = checkSetUpMq(obj?.mq);
    const defaultMqValue = checkSetUpType({
      prop: "defaultMq.value",
      value: obj?.defaultMq?.value,
      defaultValue: defaultMqValueDefault,
      type: String
    });
    const defaultMqType = checkSetUpType({
      prop: "defaultMq.type",
      value: obj?.defaultMq?.type,
      defaultValue: MQ_MIN,
      type: String
    });
    const sequencerDuration = checkSetUpType({
      prop: "sequencer.duration",
      value: obj?.sequencer?.duration,
      defaultValue: sequencerDurationDefault,
      type: Number
    });
    const sequencerEase = checkSetUpEase(obj?.sequencer?.ease, "sequencer");
    const scrollTriggerSpringConfig = checkSetUpType({
      prop: "scrolTrigger.springConfig",
      value: obj?.scrollTrigger?.springConfig,
      defaultValue: springConfigDefault,
      type: String
    });
    const scrollTriggerLerpConfig = checkSetUpType({
      prop: "scrolTrigger.lerpConfig",
      value: obj?.scrollTrigger?.lerpConfig,
      defaultValue: lerpConfigDefault,
      type: Number
    });
    const scrollTriggerMarkerEnd = checkSetUpType({
      prop: "scrolTrigger.markerColor.startEnd",
      value: obj?.scrollTrigger?.markerColor?.startEnd,
      defaultValue: markerStartDefault,
      type: String
    });
    const scrollTriggerMarkerItem = checkSetUpType({
      prop: "scrolTrigger.markerColor.item",
      value: obj?.scrollTrigger?.markerColor?.item,
      defaultValue: markerItemDefault,
      type: String
    });
    const parallaxRange = checkSetUpType({
      prop: "parallax.defaultRange",
      value: obj?.parallax?.defaultRange,
      defaultValue: parallaxRangeDefault,
      type: Number
    });
    const parallaxSpringConfig = checkSetUpType({
      prop: "parallax.springConfig",
      value: obj?.parallax?.springConfig,
      defaultValue: springConfigDefault,
      type: String
    });
    const parallaxLerpConfig = checkSetUpType({
      prop: "parallax.lerpConfig",
      value: obj?.parallax?.lerpConfig,
      defaultValue: lerpConfigDefault,
      type: Number
    });
    const parallaxTweenDuration = checkSetUpType({
      prop: "parallaxTween.duration",
      value: obj?.parallaxTween?.duration,
      defaultValue: parallaxTweenDurationDefault,
      type: Number
    });
    const parallaxTweenEase = checkSetUpEase(
      obj?.parallaxTween?.ease,
      "parallaxTween"
    );
    const tweenDuration = checkSetUpType({
      prop: "tween.duration",
      value: obj?.tween?.duration,
      defaultValue: tweenDurationDefault,
      type: Number
    });
    const tweenEase = checkSetUpEase(obj?.tween?.ease, "tween");
    const tweenRelative = checkSetUpType({
      prop: "tween.relative",
      value: obj?.tween?.relative,
      defaultValue: tweenRealtiveDefault,
      type: Boolean
    });
    const springRelative = checkSetUpType({
      prop: "spring.relative",
      value: obj?.spring?.relative,
      defaultValue: springRealtiveDefault,
      type: Boolean
    });
    const lerpRelative = checkSetUpType({
      prop: "lerp.relative",
      value: obj?.lerp?.relative,
      defaultValue: lerpRelativeDefault,
      type: Boolean
    });
    const lerpPrecision = checkSetUpType({
      prop: "lerp.precision",
      value: obj?.lerp?.precision,
      defaultValue: lerpPrecisionDefault,
      type: Number
    });
    const lerpVelocity = checkSetUpType({
      prop: "lerp.velocity",
      value: obj?.lerp?.velocity,
      defaultValue: lerpVelocityDefault,
      type: Number
    });
    const result = {
      deferredNextTick,
      throttle: throttle2,
      usePassive,
      mq: mq2,
      defaultMq: {
        value: defaultMqValue,
        type: defaultMqType
      },
      sequencer: {
        duration: sequencerDuration,
        // @ts-ignore
        ease: sequencerEase
      },
      scrollTrigger: {
        springConfig: scrollTriggerSpringConfig,
        lerpConfig: scrollTriggerLerpConfig,
        markerColor: {
          startEnd: scrollTriggerMarkerEnd,
          item: scrollTriggerMarkerItem
        }
      },
      parallax: {
        defaultRange: parallaxRange,
        springConfig: parallaxSpringConfig,
        lerpConfig: parallaxLerpConfig
      },
      parallaxTween: {
        duration: parallaxTweenDuration,
        // @ts-ignore
        ease: parallaxTweenEase
      },
      tween: {
        duration: tweenDuration,
        // @ts-ignore
        ease: tweenEase,
        relative: tweenRelative
      },
      spring: {
        relative: springRelative,
        config: obj?.spring?.config ? { ...springPresetConfig, ...obj.spring.config } : springPresetConfig
      },
      lerp: {
        relative: lerpRelative,
        precision: lerpPrecision,
        velocity: lerpVelocity
      }
    };
    return result;
  };
  var checkSetUpType = ({ prop, value, defaultValue, type }) => {
    const isValid = mobCore.checkType(type, value);
    if (!isValid)
      console.warn(
        `handleSetUp error: ${prop}: ${value}, is not valid must be a ${mobCore.getTypeName(
          type
        )}`
      );
    return isValid ? value : defaultValue;
  };
  var checkSetUpMq = (obj) => {
    const isValid = mobCore.checkType(Object, obj) && Object.values(obj).every((value) => {
      return mobCore.checkType(Number, value);
    });
    if (!isValid)
      console.warn(
        `handleSetUp error: mq must be an object as { ..., String: Number }`
      );
    return isValid ? obj : mqDefault;
  };
  var checkSetUpEase = (value, label) => {
    const isValid = Object.keys(easeReference).includes(value);
    if (!isValid && value !== void 0 && value !== null)
      console.warn(
        `handleSetUp error: ${label}.ease properties is not valid`
      );
    return isValid ? value : easeDefault;
  };

  // src/js/mobMotion/utils/mergeDeep.js
  var mergeDeep = (target, source, isMergingArrays = true) => {
    target = ((obj) => {
      let cloneObj;
      try {
        cloneObj = JSON.parse(JSON.stringify(obj));
      } catch {
        cloneObj = Object.assign({}, obj);
      }
      return cloneObj;
    })(target);
    const isObject = (obj) => obj && typeof obj === "object";
    if (!isObject(target) || !isObject(source)) return source;
    Object.keys(source).forEach((key) => {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (Array.isArray(targetValue) && Array.isArray(sourceValue))
        if (isMergingArrays) {
          target[key] = targetValue.map(
            (x, i) => sourceValue.length <= i ? x : mergeDeep(x, sourceValue[i], isMergingArrays)
          );
          if (sourceValue.length > targetValue.length)
            target[key] = target[key].concat(
              sourceValue.slice(targetValue.length)
            );
        } else {
          target[key] = targetValue.concat(sourceValue);
        }
      else if (isObject(targetValue) && isObject(sourceValue))
        target[key] = mergeDeep(
          Object.assign({}, targetValue),
          sourceValue,
          isMergingArrays
        );
      else target[key] = sourceValue;
    });
    return target;
  };

  // src/js/mobMotion/setup.js
  function getData() {
    return {
      deferredNextTick: mobCore.store.getProp("deferredNextTick"),
      throttle: mobCore.store.getProp("throttle"),
      usePassive: mobCore.store.getProp("usePassive"),
      mq: mqDefault,
      defaultMq: {
        value: defaultMqValueDefault,
        type: MQ_MIN
      },
      sequencer: {
        duration: sequencerDurationDefault,
        ease: easeDefault
      },
      scrollTrigger: {
        springConfig: springConfigDefault,
        lerpConfig: lerpConfigDefault,
        markerColor: {
          startEnd: markerStartDefault,
          item: markerItemDefault
        }
      },
      parallax: {
        defaultRange: parallaxRangeDefault,
        springConfig: springConfigDefault,
        lerpConfig: lerpConfigDefault
      },
      parallaxTween: {
        duration: parallaxTweenDurationDefault,
        ease: easeDefault
      },
      tween: {
        duration: tweenDurationDefault,
        ease: easeDefault,
        relative: tweenRealtiveDefault
      },
      spring: {
        relative: false,
        config: springPresetConfig
      },
      lerp: {
        relative: false,
        precision: 0.01,
        velocity: 0.06
      }
    };
  }
  var handleSetUp = (() => {
    let data2 = getData();
    const set = (obj) => {
      data2 = setupValidation(mergeDeep(getData(), obj));
      if ("usePassive" in obj)
        mobCore.store.set("usePassive", data2.usePassive);
      if ("deferredNextTick" in obj)
        mobCore.store.set("deferredNextTick", data2.deferredNextTick);
      if ("throttle" in obj) mobCore.store.set("throttle", data2.throttle);
    };
    const get3 = (prop) => {
      if (prop in data2) {
        return data2[prop];
      } else {
        console.warn(`handleSetUp: ${prop} is not a setup propierties`);
      }
    };
    const print = () => {
      console.log(`Writable props:`);
      console.log(data2);
    };
    return {
      set,
      get: get3,
      print
    };
  })();

  // src/js/mobMotion/utils/mediaManager.js
  var max = (breakpoint = "desktop") => {
    return window.innerWidth < handleSetUp.get("mq")[breakpoint];
  };
  var min = (breakpoint = "desktop") => {
    return window.innerWidth >= handleSetUp.get("mq")[breakpoint];
  };
  var getBreackpoint = (breakpoint = "desktop") => {
    return handleSetUp.get("mq")[breakpoint];
  };
  var mq = /* @__PURE__ */ (() => {
    return { max, min, getBreackpoint };
  })();

  // src/js/mobMotion/core.js
  var motionCore = {
    /**
     * @description
     * - Here it is possible to modify the default values of the various modules of the library
     *
     * @param {import('./animation/utils/setUp/type.js').setUpType} props
     *
     *
     * @example
     * ```javascript
     * Default value schema:
     *
     * core.setDefault.set({
     *     startFps: 60,
     *     deferredNextTick: false,
     *     throttle: 100,
     *     usePassive: true
     *     mq: {
     *         xSmall: 320,
     *         small: 360,
     *         medium: 600,
     *         tablet: 768,
     *         desktop: 992,
     *         large: 1200,
     *         xLarge: 1400,
     *     },
     *     defaultMq: {
     *         value: 'desktop',
     *         type: 'min',
     *     },
     *     sequencer: {
     *         duration: 10,
     *         ease: 'easeLinear',
     *     },
     *     scrollTrigger: {
     *         springConfig: 'default',
     *         lerpConfig: 0.06,
     *         markerColor: {
     *             startEnd: '#ff0000',
     *             item: '#14df3b',
     *         },
     *     },
     *     parallax: {
     *         defaultRange: 8,
     *         springConfig: 'default',
     *         lerpConfig: 0.06,
     *     },
     *     parallaxTween: {
     *         duration: 10,
     *         ease: 'easeLinear',
     *     },
     *     tween: {
     *         duration: 1000,
     *         ease: 'easeLinear',
     *         relative: false,
     *     },
     *     spring: {
     *         relative: false,
     *         config: {
     *             default: {
     *                 tension: 20,
     *                 mass: 1,
     *                 friction: 5,
     *                 velocity: 0,
     *                 precision: 0.01,
     *             },
     *             gentle: {
     *                 tension: 120,
     *                 mass: 1,
     *                 friction: 14,
     *                 velocity: 0,
     *                 precision: 0.01,
     *             },
     *             wobbly: {
     *                 tension: 180,
     *                 mass: 1,
     *                 friction: 12,
     *                 velocity: 0,
     *                 precision: 0.01,
     *             },
     *             bounce: {
     *                 tension: 200,
     *                 mass: 3,
     *                 friction: 5,
     *                 velocity: 0,
     *                 precision: 0.01,
     *             },
     *             scroller: {
     *                 tension: 10,
     *                 mass: 1,
     *                 friction: 5,
     *                 velocity: 0,
     *                 precision: 0.5,
     *             },
     *         },
     *     },
     *     lerp: {
     *         relative: false,
     *         precision: 0.01,
     *         velocity: 0.06,
     *     },
     * });
     *
     *
     * ```
     */
    setDefault(props) {
      handleSetUp.set(props);
    },
    /**
     * @description
     * Returns the value of a specific property
     *
     * @param {import('./setup.js').handleSetUpGetType} prop
     * @returns {Object}
     *
     * @example
     * ```javascript
     * core.getDefault('parallax');
     * ```
     */
    getDefault(prop) {
      return handleSetUp.get(prop);
    },
    /**
     * @description
     * Perform a console.log() of the default values
     *
     * @example
     * ```javascript
     * core.printDefault();
     * ```
     */
    printDefault() {
      handleSetUp.print();
    },
    /**
     * @param {import('./utils/type.js').mqActionMethods} action
     * @param {import('./utils/type.js').mqValues} breakpoint
     *
     * @return {(boolean|number)} Returns a boolean value if the action value is equal to 'min' or 'max', returns a numeric value if it is equal to 'get'
     *
     * @description
     *
     * @example
     *
     * ```javascript
     *   Property schema:
     *   core.mq([String], [string])
     *
     *   const isDesktop = core.mq('min', 'desktop'); // true/false
     *   const isMobile = core.mq('max', 'desktop'); // true/false
     *   const desktopBreackPoint = core.mq('get', 'desktop'); // 992
     *
     *
     *
     * ```
     **/
    mq(action2, breakpoint) {
      switch (action2) {
        case "min": {
          return mq.min(breakpoint);
        }
        case "max": {
          return mq.max(breakpoint);
        }
        case "get": {
          return mq.getBreackpoint(breakpoint);
        }
      }
    }
  };

  // src/js/mobMotion/animation/utils/animationUtils.js
  var getRoundedValue = (x) => {
    if (mobCore.checkType(Number, x)) {
      return Math.round(x * 1e4) / 1e4 || 0;
    }
    if (Math.abs(x) < 1) {
      const e = Number.parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().slice(2);
      }
    } else {
      let e = Number.parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return Number.parseFloat(Number.parseFloat(x).toFixed(4));
  };
  var clamp = (num, min2, max2) => {
    return Math.min(Math.max(num, min2), max2);
  };
  var lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end;
  };
  var compareKeys = (a, b) => {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    return aKeys.length === bKeys.length && aKeys.every((element, index) => element === bKeys[index]);
  };
  var sliceIntoChunks = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };
  var arrayColumn = (arr, n) => arr.map((x) => x[n]);

  // src/js/mobMotion/animation/utils/tweenAction/setValues.js
  var setFromByCurrent = (arr) => {
    return arr.map((item) => {
      if (!item.settled) {
        item.fromValue = item.currentValue;
      }
      return item;
    });
  };
  var setFromCurrentByTo = (arr) => {
    return arr.map((item) => {
      item.fromValue = item.toValue;
      item.currentValue = item.toValue;
      return item;
    });
  };
  var setFromToByCurrent = (arr) => {
    return arr.map((item) => {
      item.toValue = item.currentValue;
      item.fromValue = item.currentValue;
      return item;
    });
  };
  var setReverseValues = (obj, arr) => {
    const keysTorevert = Object.keys(obj);
    return arr.map((item) => {
      if (keysTorevert.includes(item.prop)) {
        const fromValue = item.fromValue;
        const toValue = item.toValue;
        item.fromValue = toValue;
        item.toValue = fromValue;
      }
      return item;
    });
  };
  var setRelative = (arr, relative) => {
    return arr.map((item) => {
      item.toValue = relative ? item.toValue + item.currentValue : item.toValue;
      return item;
    });
  };
  var tweenSmallNumber = 1e-5;
  var setRelativeTween = (arr, relative) => {
    return arr.map((item) => {
      if (item.shouldUpdate) {
        item.toValProcessed = relative ? item.toValue + tweenSmallNumber : item.toValue - item.fromValue + tweenSmallNumber;
      }
      return item;
    });
  };

  // src/js/mobMotion/animation/utils/stagger/staggerCostant.js
  var DIRECTION_ROW = "row";
  var DIRECTION_COL = "col";
  var DIRECTION_RADIAL = "radial";
  var STAGGER_START = "start";
  var STAGGER_END = "end";
  var STAGGER_CENTER = "center";
  var STAGGER_EDGES = "edges";
  var STAGGER_RANDOM = "random";
  var MERGE_FROM_UP = "MERGE_FROM_UP";
  var MERGE_FROM_DOWN = "MERGE_FROM_DOWN";
  var STAGGER_TYPE_EQUAL = "equal";
  var STAGGER_TYPE_START = "start";
  var STAGGER_TYPE_END = "end";
  var STAGGER_TYPE_CENTER = "center";
  var STAGGER_DEFAULT_OBJ = {
    type: STAGGER_TYPE_EQUAL,
    each: 0,
    waitComplete: false,
    from: STAGGER_START,
    grid: {
      col: 1,
      row: 1,
      direction: DIRECTION_COL
    }
  };
  var STAGGER_DEFAULT_INDEX_OBJ = {
    index: 0,
    frame: 0
  };

  // src/js/mobMotion/animation/parallax/parallaxConstant.js
  var parallaxConstant = {
    // Constant misure units
    /**
     * @type {string}
     */
    PX: "px",
    /**
     * @type {string}
     */
    VH: "vh",
    /**
     * @type {string}
     */
    VW: "vw",
    /**
     * @type {string}
     */
    WPERCENT: "w",
    /**
     * @type {string}
     */
    HPERCENT: "h",
    /**
     * @type {string}
     */
    DEGREE: "deg",
    // AdditionalChoiceContant
    /**
     * @type {string}
     */
    PLUS_HEIGHT: "+height",
    /**
     * @type {string}
     */
    PLUS_HEIGHT_HALF: "+halfHeight",
    /**
     * @type {string}
     */
    PLUS_WIDTH: "+width",
    /**
     * @type {string}
     */
    PLUS_WIDTH_HALF: "+halfWidth",
    /**
     * @type {string}
     */
    MINUS_HEIGHT: "-height",
    /**
     * @type {string}
     */
    MINUS_HEIGHT_HALF: "-halfHeight",
    /**
     * @type {string}
     */
    MINUS_WIDTH: "-width",
    /**
     * @type {string}
     */
    MINUS_WIDTH_HALF: "-halfWidth",
    // End Start position Constant
    /**
     * @type {string}
     */
    POSITION_BOTTOM: "bottom",
    /**
     * @type {string}
     */
    POSITION_TOP: "top",
    /**
     * @type {string}
     */
    POSITION_LEFT: "left",
    /**
     * @type {string}
     */
    POSITION_RIGHT: "right",
    // Constant direction
    /**
     * @type {string}
     */
    DIRECTION_VERTICAL: "vertical",
    /**
     * @type {string}
     */
    DIRECTION_HORIZONTAL: "horizontal",
    // Constant computation type
    /**
     * @type {string}
     */
    TYPE_PARALLAX: "parallax",
    /**
     * @type {string}
     */
    TYPE_SCROLLTRIGGER: "scrolltrigger",
    // Constant propierties
    /**
     * @type {string}
     */
    PROP_VERTICAL: "y",
    /**
     * @type {string}
     */
    PROP_HORIZONTAL: "x",
    /**
     * @type {string}
     */
    PROP_ROTATE: "rotate",
    /**
     * @type {string}
     */
    PROP_ROTATEY: "rotateY",
    /**
     * @type {string}
     */
    PROP_ROTATEX: "rotateX",
    /**
     * @type {string}
     */
    PROP_ROTATEZ: "rotateZ",
    /**
     * @type {string}
     */
    PROP_OPACITY: "opacity",
    /**
     * @type {string}
     */
    PROP_SCALE: "scale",
    /**
     * @type {string}
     */
    PROP_SCALE_X: "scaleX",
    /**
     * @type {string}
     */
    PROP_SCALE_Y: "scaleY",
    /**
     * @type {string}
     */
    PROP_TWEEN: "tween",
    /**
     * @type {string}
     */
    TWEEN_TWEEN: "parallaxTween",
    /**
     * @type {string}
     */
    TWEEN_TIMELINE: "sequencer",
    // Align constant
    /**
     * @type {string}
     */
    ALIGN_START: "start",
    /**
     * @type {string}
     */
    ALIGN_TOP: "top",
    /**
     * @type {string}
     */
    ALIGN_RIGHT: "right",
    /**
     * @type {string}
     */
    ALIGN_CENTER: "center",
    /**
     * @type {string}
     */
    ALIGN_BOTTOM: "bottom",
    /**
     * @type {string}
     */
    ALIGN_LEFT: "left",
    /**
     * @type {string}
     */
    ALIGN_END: "end",
    // Switch constant
    /**
     * @type {string}
     */
    IN_STOP: "in-stop",
    /**
     * @type {string}
     */
    IN_BACK: "in-back",
    /**
     * @type {string}
     */
    OUT_STOP: "out-stop",
    /**
     * @type {string}
     */
    OUT_BACK: "out-back",
    // Ease type constant
    /**
     * @type {string}
     */
    EASE_SPRING: "spring",
    /**
     * @type {string}
     */
    EASE_LERP: "lerp",
    /**
     * @type {number}
     */
    EASE_PRECISION: 1e-3,
    /**
     * @type {string}
     */
    SCROLL_UP: "up",
    /**
     * @type {string}
     */
    SCROLL_DOWN: "down",
    /**
     * @type {string}
     */
    ON_LEAVE: "ON_LEAVE",
    /**
     * @type {string}
     */
    ON_LEAVE_BACK: "ON_LEAVE_BACK",
    /**
     * @type {string}
     */
    ON_ENTER: "ON_ENTER",
    /**
     * @type {string}
     */
    ON_ENTER_BACK: "ON_ENTER_BACK",
    /**
     * @type {string}
     */
    ON_NOOP: "ON_NOOP"
  };

  // src/js/mobMotion/animation/utils/warning.js
  var possibleChoice = (choice) => {
    return choice.map((item) => {
      return `${item} | `;
    }).join("");
  };
  var compareKeysWarning = (label, fromObj, toObj) => {
    console.warn(
      `${label}: ${JSON.stringify(fromObj)} and to ${JSON.stringify(
        toObj
      )} is not equal`
    );
  };
  var staggerIsOutOfRangeWarning = (max2) => {
    console.warn(
      `stagger col of grid is out of range, it must be less than ${max2} ( staggers length )`
    );
  };
  var dataTweenValueIsNotValidWarning = (label) => {
    console.warn(
      `tween | sequencer: ${label} is not valid value, must be a number or a Function that return a number`
    );
  };
  var sequencerRangeStartWarning = (val2) => {
    console.warn(
      `sequencer, start option: ${val2} value is not valid, must be a Number`
    );
  };
  var sequencerRangeEndWarning = (val2) => {
    console.warn(
      `sequencer, end option: ${val2} value is not valid, must be a Number`
    );
  };
  var relativePropInsideTimelineWarning = () => {
    console.warn("relative prop is not allowed inside a timeline");
  };
  var timelineSuspendWarning = (val2) => {
    console.warn(
      `Timeline Supend: ${val2()} is not a valid value, must be a boolean`
    );
  };
  var timelineReverseGoFromWarning = () => {
    console.warn(
      `SyncTimeline: in revese ( or yoyo mode) only goTo || goFromTo || set action is allowed. Using goFrom makes no sense in this context. Timeline will stopped.`
    );
  };
  var timelineSetTweenArrayWarining = (items) => {
    console.warn(`timeline setTween: ${items} is not an array of tween`);
  };
  var timelineSetTweenLabelWarining = (label) => {
    console.warn(`timeline setTween: ${label} is not a string`);
  };
  var timelineSetTweenLabelNotFoundWarining = (label) => {
    console.warn(`asyncTimeline.setTween() label: ${label} not found`);
  };
  var timelineSetTweenFailWarining = () => {
    console.warn("setTween fail");
  };
  var syncTimelineLabelWarning = (label) => {
    console.warn(`label ${label} not founded`);
  };
  var syncTimelineAddFnWarning = (fn) => {
    console.warn(`sequencer.add(fn,time) ${fn}: fn must be Function`);
  };
  var syncTimelineAddTimeWarning = (time2) => {
    console.warn(`sequencer.add(fn,time) ${time2}: time must be a Number`);
  };
  var springPresetWarning = (preset) => {
    console.warn(`${preset} doesn't exist in spring configuration list`);
  };
  var springConfigPropWarning = () => {
    console.warn(`Spring configProp: all prop must be a positive Number`);
  };
  var springConfigSpecificPropWarning = (config) => {
    console.warn(
      `Spring config: ${config}: config must have friction/mass/precision/tesnion props and must be a number`
    );
  };
  var tweenEaseWarning = (preset) => {
    console.warn(`${preset} doesn't exist in tweens ease function`);
  };
  var staggerEachWarning = () => {
    console.warn(`stagger each must be a Number `);
  };
  var staggerRowColGenericWarining = (val2) => {
    console.warn(
      `stagger, row/col: ${val2} value is not valid, must be a Number`
    );
  };
  var staggerWaitCompleteWarning = () => {
    console.warn("Stagger error: waitComplete propierties must be a Boolean");
  };
  var staggerGridDirectionWarning = () => {
    console.warn(
      `Stagger error: in grid option direction should be a string radial/col/row`
    );
  };
  var staggerColRowWarning = () => {
    console.warn(
      `Stagger error: in col/row direction 'from' propierties must be a string start/end/center/edges or a number`
    );
  };
  var staggerFromGenericWarning = (from) => {
    console.warn(
      `Stagger error: from: ${from} is not a valid value, must be a string start/end/center/edges or a number or a Object {x:Number,y:Number}`
    );
  };
  var durationWarining = (value) => {
    console.warn(
      `duration error: ${value} is not valid duration must be a number`
    );
  };
  var durationNumberOrFunctionWarining = (value) => {
    console.warn(
      `duration error: ${value} is not valid duration must be a number or a Function that return a number`
    );
  };
  var repeatWarining = (value) => {
    console.warn(
      `repeat error: ${value} is not valid repeat value must be a Number`
    );
  };
  var initialDataPropWarining = (prop) => {
    console.warn(
      `data inizializiation error; ${prop} is not a valid value, must be a string`
    );
  };
  var initialDataValueWarining = (value) => {
    console.warn(
      `data inizializiation error; ${value} is not a valid value, must be a number`
    );
  };
  var createStaggerItemsWarning = () => {
    console.warn(`createStaggers error: items array can not be empty`);
  };
  var createStaggerItemsTypeWarning = () => {
    console.warn(
      `createStaggers error: each element of the array must be an Element or an Object`
    );
  };
  var createStaggerTypeWarning = () => {
    console.warn(
      `screateStaggers error: type should be: ${STAGGER_TYPE_EQUAL} || ${STAGGER_START} || ${STAGGER_TYPE_END} || ${STAGGER_TYPE_CENTER}`
    );
  };
  var createStaggerEachWarning = (eachProportion) => {
    console.warn(
      `createStagger:  each must be between 1 and ${eachProportion}`
    );
  };
  var relativeWarining = (val2, tweenType) => {
    console.warn(
      `${tweenType}: relative prop: ${val2} is not a valid parameter, must be a boolean `
    );
  };
  var booleanWarning = (val2, label) => {
    console.warn(`${label}: '${val2}' is not Boolean`);
  };
  var stringWarning = (val2, label) => {
    console.warn(`${label}: '${val2}' is not String`);
  };
  var naumberWarning = (val2, label) => {
    console.warn(`${label}: '${val2}' is not Number`);
  };
  var functionWarning = (val2, label) => {
    console.warn(`${label}: '${val2}' is not Function`);
  };
  var lerpVelocityWarining = () => {
    console.warn(
      "Lerp error: velocity is not valid, must be a Number greater than 0 and less than 1"
    );
  };
  var lerpPrecisionWarining = () => {
    console.warn(
      "Lerp error: precision is not valid, must be a number greater than 0"
    );
  };
  var asyncTimelineMetodsInsideGroupWarining = (methodName) => {
    console.warn(
      `asyncTimeline error: ${methodName} cannot be used inside group`
    );
  };
  var valueStringWarning = (label) => {
    console.warn(`${label} value must be a string`);
  };
  var asyncTimelineTweenWaring = () => {
    console.warn(
      "tween added to asyncTimeline or used inside sync() method must be instance of HandleLerp | HandleTween | HandleSpring"
    );
  };
  var asyncTimelineDelayWarning = () => {
    console.warn("asyncTimeline arror: delay must be a Number");
  };
  var playLabelWarining = (label) => {
    console.warn(`${label} not found`);
  };
  var addAsyncFunctionWarining = (value) => {
    console.warn(`timeline add async function, ${value} is not a function `);
  };
  var parallaxDirectionWarining = (value, component) => {
    console.warn(
      `${component} direction: ${value} is not valid value: must be ${parallaxConstant.DIRECTION_VERTICAL} | ${parallaxConstant.DIRECTION_HORIZONTAL}`
    );
  };
  var parallaxDynmicValueWarining = (label) => {
    console.warn(
      `scrollTrigger error; ${label} propierties: value must be a Object like { position: top|bottom|left|right, value: () => { return Number} } `
    );
  };
  var parallaxDynmicRangeValueWarining = () => {
    console.warn(
      `scrollTrigger error; dynamicRange propierties: value must be a Function that return a Number`
    );
  };
  var parallaxTweenWarning = () => {
    console.warn(
      "parallax|scrolTrigger error: tween is not valid, must be an instance of HandleSequencer || ParallaxTween"
    );
  };
  var parallaxAlignWarining = (value, choice) => {
    console.warn(
      `parallax error align propierties: ${value} is not valid must be one of ${possibleChoice(
        choice
      )} or a Number between 0 and 100`
    );
  };
  var parallaxOnSwitchWarining = (value, choice) => {
    console.warn(
      `parallax error align propierties: ${value} is not valid must be one of ${possibleChoice(
        choice
      )}`
    );
  };
  var parallaxOpacityWarning = (val2, label) => {
    console.warn(
      `${label}: '${val2}' is not Number, must be a number between 0 and 100`
    );
  };
  var parallaxTypeWarining = (value, choice) => {
    console.warn(
      `parallax error type propierties: ${value} is not valid must be one of ${possibleChoice(
        choice
      )}`
    );
  };
  var parallaxPropiertiesWarining = (value, choice) => {
    console.warn(
      `parallax/scrollTrigger error propierties props: ${value} is not valid must be one of ${possibleChoice(
        choice
      )} or a custom css propierites like margin|line-height|...`
    );
  };
  var parallaxEaseTypeWarining = (value, choice) => {
    console.warn(
      `parallax error easeType props: ${value} is not valid must be one of ${possibleChoice(
        choice
      )}`
    );
  };
  var genericEaseTypeWarining = (value, choice, component) => {
    console.warn(
      `${component} error easeType props: ${value} is not valid must be one of ${possibleChoice(
        choice
      )}`
    );
  };
  var parallaxEaseTypeSpringWarining = () => {
    console.warn(
      'Scrolltrigger warning: spring animation is only available for native properties and scrollerTween, Check that with the "propierties" property set to "tween" no HandleSequencer is associated with the "tween" property'
    );
  };
  var parallaxSpringCongifWarining = (value, choice) => {
    console.warn(
      `parallax/scrollTrigger error springConfig props: ${value} is not valid must be one of ${possibleChoice(
        choice
      )}`
    );
  };
  var parallaxRangeNumberWarning = (value) => {
    console.warn(
      `parallax error range propierties, current value: ${value}, the value must be a number between 0 and 9.99`
    );
  };
  var parallaxRangeStringWarning = (value) => {
    console.warn(
      `scrollTrigger error range propierties: ${value} is not a String`
    );
  };
  var breakpointWarning = (mq2, choice, label, component) => {
    console.warn(
      `${component} error ${label} propierties: ${mq2} is not valid must be one of ${possibleChoice(
        choice
      )}`
    );
  };
  var parallaxUseSequencerWarining = () => {
    console.warn(
      "Parallax warning: if propierties is a tween the only choice is ParallaxTween, HandleSequencer or empty tween propierites is not allowed inside a parallax"
    );
  };
  var parallaxLerpConfigWarning = () => {
    console.warn(
      "parallax/ScrollTrrigger error: velocity is not valid, must be a Number greater than 0 and less than 1"
    );
  };
  var parallaxNoTweenDefinedWarning = () => {
    console.warn(
      'parallax/ScrollTrrigger warning:  The property is "tween" but no tween has been associated, associate a tween with the "tween" property'
    );
  };
  var parallaxUseTweenButNotProsDefinedWarning = () => {
    console.warn(
      'parallax/ScrollTrrigger: there is tween associated but pros "propierties" is not set to "tween"'
    );
  };
  var functionIsValidAndReturnDefaultWarining = (label, value) => {
    console.warn(`${label}: ${value} is not a function`);
  };
  var scrollTriggerRangeWarning = (string, properties, choice) => {
    console.warn(
      `scrollTrigger error range : with '${properties}' propierties ${string} is not valid, add one of the following unit misure: ${possibleChoice(
        choice
      )}, es: 45deg|100px|50vw etc..`
    );
  };
  var scrollTriggerCustomRangeWarning = (properties) => {
    console.warn(
      `scrollTrigger error range : with custom css propierties '${properties}' no unit misure is necessary, the default unit misure will be used (px). Only '-' for negative value is allowed`
    );
  };
  var scrollTriggerRangeScaleWarning = (string, properties) => {
    console.warn(
      `scrollTrigger error range : with '${properties}' propierties ${string} is not valid no unit misure is necessary. Only '-' for negative value is allowed`
    );
  };

  // src/js/mobMotion/animation/tween/tweenConfig.js
  var tweenConfig = {
    [easeReference.easeLinear]: (elapsed, initialValue, amountOfChange, duration2) => {
      return amountOfChange * elapsed / duration2 + initialValue;
    },
    [easeReference.easeInQuad]: (elapsed, initialValue, amountOfChange, duration2) => {
      return amountOfChange * (elapsed /= duration2) * elapsed + initialValue;
    },
    [easeReference.easeOutQuad]: (elapsed, initialValue, amountOfChange, duration2) => {
      return -amountOfChange * (elapsed /= duration2) * (elapsed - 2) + initialValue;
    },
    [easeReference.easeInOutQuad]: (elapsed, initialValue, amountOfChange, duration2) => {
      if ((elapsed /= duration2 / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed + initialValue;
      }
      return -amountOfChange / 2 * (--elapsed * (elapsed - 2) - 1) + initialValue;
    },
    [easeReference.easeInCubic]: (elapsed, initialValue, amountOfChange, duration2) => {
      return amountOfChange * (elapsed /= duration2) * elapsed * elapsed + initialValue;
    },
    [easeReference.easeOutCubic]: (elapsed, initialValue, amountOfChange, duration2) => {
      return amountOfChange * ((elapsed = elapsed / duration2 - 1) * elapsed * elapsed + 1) + initialValue;
    },
    [easeReference.easeInOutCubic]: (elapsed, initialValue, amountOfChange, duration2) => {
      if ((elapsed /= duration2 / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed + initialValue;
      }
      return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed + 2) + initialValue;
    },
    [easeReference.easeInQuart]: (elapsed, initialValue, amountOfChange, duration2) => {
      return amountOfChange * (elapsed /= duration2) * elapsed * elapsed * elapsed + initialValue;
    },
    [easeReference.easeOutQuart]: (elapsed, initialValue, amountOfChange, duration2) => {
      return -amountOfChange * ((elapsed = elapsed / duration2 - 1) * elapsed * elapsed * elapsed - 1) + initialValue;
    },
    [easeReference.easeInOutQuart]: (elapsed, initialValue, amountOfChange, duration2) => {
      if ((elapsed /= duration2 / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed + initialValue;
      }
      return -amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed - 2) + initialValue;
    },
    [easeReference.easeInQuint]: (elapsed, initialValue, amountOfChange, duration2) => {
      return amountOfChange * (elapsed /= duration2) * elapsed * elapsed * elapsed * elapsed + initialValue;
    },
    [easeReference.easeOutQuint]: (elapsed, initialValue, amountOfChange, duration2) => {
      return amountOfChange * ((elapsed = elapsed / duration2 - 1) * elapsed * elapsed * elapsed * elapsed + 1) + initialValue;
    },
    [easeReference.easeInOutQuint]: (elapsed, initialValue, amountOfChange, duration2) => {
      if ((elapsed /= duration2 / 2) < 1) {
        return amountOfChange / 2 * elapsed * elapsed * elapsed * elapsed * elapsed + initialValue;
      }
      return amountOfChange / 2 * ((elapsed -= 2) * elapsed * elapsed * elapsed * elapsed + 2) + initialValue;
    },
    [easeReference.easeInSine]: (elapsed, initialValue, amountOfChange, duration2) => {
      return -amountOfChange * Math.cos(elapsed / duration2 * (Math.PI / 2)) + amountOfChange + initialValue;
    },
    [easeReference.easeOutSine]: (elapsed, initialValue, amountOfChange, duration2) => {
      return amountOfChange * Math.sin(elapsed / duration2 * (Math.PI / 2)) + initialValue;
    },
    [easeReference.easeInOutSine]: (elapsed, initialValue, amountOfChange, duration2) => {
      return -amountOfChange / 2 * (Math.cos(Math.PI * elapsed / duration2) - 1) + initialValue;
    },
    [easeReference.easeInExpo]: (elapsed, initialValue, amountOfChange, duration2) => {
      return elapsed === 0 ? initialValue : amountOfChange * Math.pow(2, 10 * (elapsed / duration2 - 1)) + initialValue;
    },
    [easeReference.easeOutExpo]: (elapsed, initialValue, amountOfChange, duration2) => {
      return elapsed === duration2 ? initialValue + amountOfChange : amountOfChange * (-Math.pow(2, -10 * elapsed / duration2) + 1) + initialValue;
    },
    [easeReference.easeInOutExpo]: (elapsed, initialValue, amountOfChange, duration2) => {
      if (elapsed === 0) {
        return initialValue;
      }
      if (elapsed === duration2) {
        return initialValue + amountOfChange;
      }
      if ((elapsed /= duration2 / 2) < 1) {
        return amountOfChange / 2 * Math.pow(2, 10 * (elapsed - 1)) + initialValue;
      }
      return amountOfChange / 2 * (-Math.pow(2, -10 * --elapsed) + 2) + initialValue;
    },
    [easeReference.easeInCirc]: (elapsed, initialValue, amountOfChange, duration2) => {
      return -amountOfChange * (Math.sqrt(1 - (elapsed /= duration2) * elapsed) - 1) + initialValue;
    },
    [easeReference.easeOutCirc]: (elapsed, initialValue, amountOfChange, duration2) => {
      return amountOfChange * Math.sqrt(1 - (elapsed = elapsed / duration2 - 1) * elapsed) + initialValue;
    },
    [easeReference.easeInOutCirc]: (elapsed, initialValue, amountOfChange, duration2) => {
      if ((elapsed /= duration2 / 2) < 1) {
        return -amountOfChange / 2 * (Math.sqrt(1 - elapsed * elapsed) - 1) + initialValue;
      }
      return amountOfChange / 2 * (Math.sqrt(1 - (elapsed -= 2) * elapsed) + 1) + initialValue;
    },
    [easeReference.easeInElastic]: (elapsed, initialValue, amountOfChange, duration2) => {
      let s = 1.70158;
      let p = 0;
      let a = amountOfChange;
      if (elapsed === 0) {
        return initialValue;
      }
      if ((elapsed /= duration2) === 1) {
        return initialValue + amountOfChange;
      }
      if (!p) {
        p = duration2 * 0.3;
      }
      if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
      }
      return -(a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin((elapsed * duration2 - s) * (2 * Math.PI) / p)) + initialValue;
    },
    [easeReference.easeOutElastic]: (elapsed, initialValue, amountOfChange, duration2) => {
      let s = 1.70158;
      let p = 0;
      let a = amountOfChange;
      if (elapsed === 0) {
        return initialValue;
      }
      if ((elapsed /= duration2) === 1) {
        return initialValue + amountOfChange;
      }
      if (!p) {
        p = duration2 * 0.3;
      }
      if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
      }
      return a * Math.pow(2, -10 * elapsed) * Math.sin((elapsed * duration2 - s) * (2 * Math.PI) / p) + amountOfChange + initialValue;
    },
    [easeReference.easeInOutElastic]: (elapsed, initialValue, amountOfChange, duration2) => {
      let s = 1.70158;
      let p = 0;
      let a = amountOfChange;
      if (elapsed === 0) {
        return initialValue;
      }
      if ((elapsed /= duration2 / 2) === 2) {
        return initialValue + amountOfChange;
      }
      if (!p) {
        p = duration2 * (0.3 * 1.5);
      }
      if (a < Math.abs(amountOfChange)) {
        a = amountOfChange;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
      }
      if (elapsed < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (elapsed -= 1)) * Math.sin(
          (elapsed * duration2 - s) * (2 * Math.PI) / p
        )) + initialValue;
      }
      return a * Math.pow(2, -10 * (elapsed -= 1)) * Math.sin((elapsed * duration2 - s) * (2 * Math.PI) / p) * 0.5 + amountOfChange + initialValue;
    },
    [easeReference.easeInBack]: (elapsed, initialValue, amountOfChange, duration2, s = 1.70158) => {
      return amountOfChange * (elapsed /= duration2) * elapsed * ((s + 1) * elapsed - s) + initialValue;
    },
    [easeReference.easeOutBack]: (elapsed, initialValue, amountOfChange, duration2, s = 1.70158) => {
      return amountOfChange * ((elapsed = elapsed / duration2 - 1) * elapsed * ((s + 1) * elapsed + s) + 1) + initialValue;
    },
    easeInOutBack: (elapsed, initialValue, amountOfChange, duration2, s = 1.70158) => {
      if ((elapsed /= duration2 / 2) < 1) {
        return amountOfChange / 2 * (elapsed * elapsed * (((s *= 1.525) + 1) * elapsed - s)) + initialValue;
      }
      return amountOfChange / 2 * ((elapsed -= 2) * elapsed * (((s *= 1.525) + 1) * elapsed + s) + 2) + initialValue;
    },
    [easeReference.easeInBounce]: (elapsed, initialValue, amountOfChange, duration2) => {
      return amountOfChange - tweenConfig[easeReference.easeOutBounce](
        duration2 - elapsed,
        0,
        amountOfChange,
        duration2
      ) + initialValue;
    },
    [easeReference.easeOutBounce]: (elapsed, initialValue, amountOfChange, duration2) => {
      if ((elapsed /= duration2) < 1 / 2.75) {
        return amountOfChange * (7.5625 * elapsed * elapsed) + initialValue;
      } else if (elapsed < 2 / 2.75) {
        return amountOfChange * (7.5625 * (elapsed -= 1.5 / 2.75) * elapsed + 0.75) + initialValue;
      } else if (elapsed < 2.5 / 2.75) {
        return amountOfChange * (7.5625 * (elapsed -= 2.25 / 2.75) * elapsed + 0.9375) + initialValue;
      } else {
        return amountOfChange * (7.5625 * (elapsed -= 2.625 / 2.75) * elapsed + 0.984375) + initialValue;
      }
    },
    [easeReference.easeInOutBounce]: (elapsed, initialValue, amountOfChange, duration2) => {
      if (elapsed < duration2 / 2) {
        return tweenConfig[easeReference.easeInBounce](
          elapsed * 2,
          0,
          amountOfChange,
          duration2
        ) * 0.5 + initialValue;
      }
      return tweenConfig[easeReference.easeOutBounce](
        elapsed * 2 - duration2,
        0,
        amountOfChange,
        duration2
      ) * 0.5 + amountOfChange * 0.5 + initialValue;
    }
  };
  var getTweenFn = (prop) => {
    if (prop in tweenConfig) {
      return tweenConfig[prop];
    } else {
      tweenEaseWarning(prop);
      return tweenConfig[handleSetUp.get("tween").ease];
    }
  };

  // src/js/mobMotion/animation/utils/regexValidation.js
  var escapeRegExp = (text) => {
    return text ? text.replaceAll(/[\s#$()*+,.?[\\\]^{|}-]/g, String.raw`\$&`) : "";
  };
  var checkIfIsOnlyNumberPositiveNegative = (pattern) => {
    return /^[+-]?\d+(\.\d+)?$/.test(pattern);
  };
  var checkIfIsOnlyNumber = (pattern) => {
    return /^\d+\.\d+$|^\d+$/.test(pattern);
  };
  var exactMatchInsensitive = (string, pattern) => {
    const regex = new RegExp(`^${escapeRegExp(pattern)}$`, "i");
    const result = string.match(regex) || [];
    return result.length;
  };
  var exactMatchInsesitiveNumberProp = (string, pattern) => {
    const regex = new RegExp(`[0-9]${pattern}$`, "i");
    const result = string.match(regex) || [];
    return result.length;
  };
  var exactMatchInsesitiveNumberPropArray = (arr, string) => {
    return arr.some((unitMisure) => {
      const regex = new RegExp(`[0-9]${unitMisure}$`, "i");
      const result = string.match(regex) || [];
      return result.length;
    });
  };
  var exactMatchInsesitivePropArray = (arr, string) => {
    return arr.some((unitMisure) => {
      const regex = new RegExp(`^${escapeRegExp(unitMisure)}$`, "i");
      const result = string.match(regex) || [];
      return result.length;
    });
  };

  // src/js/mobMotion/animation/parallax/getConstantFromRegex.js
  var getPropiertiesValueFromConstant = (value) => {
    if (!value) return value;
    if (exactMatchInsensitive(value, parallaxConstant.PROP_VERTICAL))
      return parallaxConstant.PROP_VERTICAL;
    if (exactMatchInsensitive(value, parallaxConstant.PROP_HORIZONTAL))
      return parallaxConstant.PROP_HORIZONTAL;
    if (exactMatchInsensitive(value, parallaxConstant.PROP_ROTATE))
      return parallaxConstant.PROP_ROTATE;
    if (exactMatchInsensitive(value, parallaxConstant.PROP_ROTATEY))
      return parallaxConstant.PROP_ROTATEY;
    if (exactMatchInsensitive(value, parallaxConstant.PROP_ROTATEX))
      return parallaxConstant.PROP_ROTATEX;
    if (exactMatchInsensitive(value, parallaxConstant.PROP_OPACITY))
      return parallaxConstant.PROP_OPACITY;
    if (exactMatchInsensitive(value, parallaxConstant.PROP_SCALE))
      return parallaxConstant.PROP_SCALE;
    if (exactMatchInsensitive(value, parallaxConstant.PROP_SCALE_X))
      return parallaxConstant.PROP_SCALE_X;
    if (exactMatchInsensitive(value, parallaxConstant.PROP_SCALE_Y))
      return parallaxConstant.PROP_SCALE_Y;
    if (exactMatchInsensitive(value, parallaxConstant.PROP_TWEEN))
      return parallaxConstant.PROP_TWEEN;
    return value;
  };
  var getStartEndUnitMisure = (pattern) => {
    if (pattern) {
      if (exactMatchInsesitiveNumberProp(pattern, parallaxConstant.PX))
        return parallaxConstant.PX;
      if (exactMatchInsesitiveNumberProp(pattern, parallaxConstant.VH))
        return parallaxConstant.VH;
      if (exactMatchInsesitiveNumberProp(pattern, parallaxConstant.VW))
        return parallaxConstant.VW;
    }
    return "";
  };
  var getParallaxPositionFromContanst = (position2) => {
    if (exactMatchInsensitive(position2, parallaxConstant.POSITION_TOP))
      return parallaxConstant.POSITION_TOP;
    if (exactMatchInsensitive(position2, parallaxConstant.POSITION_BOTTOM))
      return parallaxConstant.POSITION_BOTTOM;
    if (exactMatchInsensitive(position2, parallaxConstant.POSITION_LEFT))
      return parallaxConstant.POSITION_LEFT;
    if (exactMatchInsensitive(position2, parallaxConstant.POSITION_RIGHT))
      return parallaxConstant.POSITION_RIGHT;
    return "";
  };
  var getRangeUnitMisure = (string) => {
    if (exactMatchInsesitiveNumberProp(string, parallaxConstant.PX))
      return parallaxConstant.PX;
    if (exactMatchInsesitiveNumberProp(string, parallaxConstant.VH))
      return parallaxConstant.VH;
    if (exactMatchInsesitiveNumberProp(string, parallaxConstant.VW))
      return parallaxConstant.VW;
    if (exactMatchInsesitiveNumberProp(string, parallaxConstant.WPERCENT))
      return parallaxConstant.WPERCENT;
    if (exactMatchInsesitiveNumberProp(string, parallaxConstant.HPERCENT))
      return parallaxConstant.HPERCENT;
    if (exactMatchInsesitiveNumberProp(string, parallaxConstant.DEGREE))
      return parallaxConstant.DEGREE;
    return parallaxConstant.PX;
  };

  // src/js/mobMotion/animation/utils/tweenAction/tweenValidation.js
  var dataTweenValueIsValid = (val2) => {
    return mobCore.checkType(Number, val2) || // @ts-ignore
    mobCore.checkType(Function, val2) && mobCore.checkType(Number, val2());
  };
  var sequencerRangeValidate = ({ start, end }) => {
    const startIsValid = mobCore.checkType(Number, start);
    const endIsValid = mobCore.checkType(Number, end);
    if (!startIsValid) sequencerRangeStartWarning(start);
    if (!endIsValid) sequencerRangeEndWarning(end);
    return startIsValid && endIsValid;
  };
  var durationIsValid = (duration2) => {
    const isValid = mobCore.checkType(Number, duration2);
    if (!isValid && duration2) durationWarining(duration2);
    return isValid ? duration2 : handleSetUp.get("sequencer").duration;
  };
  var repeatIsValid = (repeat) => {
    const isValid = mobCore.checkType(Number, repeat);
    if (!isValid && repeat) repeatWarining(repeat);
    return isValid && repeat ? repeat : 1;
  };
  var easeIsValid = (ease) => {
    const isValid = ease && ease in tweenConfig;
    if (!isValid && ease) tweenEaseWarning(ease);
    return isValid ? ease : handleSetUp.get("sequencer").ease;
  };
  var easeParallaxTweenIsValid = (ease) => {
    const isValid = ease && ease in tweenConfig;
    if (!isValid && ease) tweenEaseWarning(ease);
    return isValid ? getTweenFn(ease) : getTweenFn(handleSetUp.get("parallaxTween").ease);
  };
  var initialDataPropValidate = (prop, value) => {
    const propIsValid = mobCore.checkType(String, prop);
    const valueIsValid = mobCore.checkType(Number, value);
    if (!propIsValid) initialDataPropWarining(prop);
    if (!valueIsValid) initialDataValueWarining(value);
    return propIsValid && valueIsValid;
  };
  var validateStaggerEach = (each) => {
    if (!each) return;
    const eachIsValid = mobCore.checkType(Number, each);
    if (!eachIsValid) staggerEachWarning();
    return eachIsValid;
  };
  var validateStaggerFrom = (from) => {
    if (!from) return;
    const fromList = [
      STAGGER_START,
      STAGGER_END,
      STAGGER_CENTER,
      STAGGER_EDGES,
      STAGGER_RANDOM
    ];
    const fromIsAValidString = fromList.includes(from);
    const fromIsANumber = mobCore.checkType(Number, from);
    const fromIsAValidObject = mobCore.checkType(Object, from);
    const fromIsValid = fromIsAValidString || fromIsANumber || fromIsAValidObject;
    if (!fromIsValid) staggerFromGenericWarning(from);
    return fromIsValid;
  };
  var validateStaggerColRow = (val2) => {
    if (!val2) return;
    const valIsValid = mobCore.checkType(Number, val2);
    if (!valIsValid) staggerRowColGenericWarining(val2);
    return valIsValid;
  };
  var validateStaggerDirection = (direction2) => {
    if (!direction2) return;
    const directionList = [DIRECTION_RADIAL, DIRECTION_ROW, DIRECTION_COL];
    const directionisValid = directionList.includes(direction2);
    if (!directionisValid) staggerGridDirectionWarning();
    return directionisValid;
  };
  var validateStaggerWaitComplete = (waitComplete) => {
    if (!waitComplete) return;
    const valIsValid = mobCore.checkType(Boolean, waitComplete);
    if (!valIsValid) staggerWaitCompleteWarning();
    return valIsValid;
  };
  var validateStaggerItems = (arr = []) => {
    const isValid = mobCore.checkType(Array, [...arr]) && arr.length > 0;
    if (!isValid) createStaggerItemsWarning();
    return isValid;
  };
  var staggerItemsIsValid = (arr = []) => {
    const isValid = mobCore.checkType(Array, [...arr]) && arr.length > 0;
    return isValid ? arr : [];
  };
  var validateStaggerType = (type) => {
    if (!type) return;
    const stagerTypeList = [
      STAGGER_TYPE_EQUAL,
      STAGGER_TYPE_START,
      STAGGER_TYPE_END,
      STAGGER_TYPE_CENTER
    ];
    const isValid = stagerTypeList.includes(type);
    if (!isValid) {
      createStaggerTypeWarning();
      return;
    }
    return isValid;
  };
  var relativeIsValid = (val2, tweenType) => {
    const isValid = mobCore.checkType(Boolean, val2);
    if (!isValid && val2) relativeWarining(val2, tweenType);
    return isValid ? val2 : handleSetUp.get(tweenType).relative;
  };
  var easeTweenIsValidGetFunction = (ease) => {
    const isValid = ease && ease in tweenConfig;
    if (!isValid && ease) tweenEaseWarning(ease);
    return isValid ? getTweenFn(ease) : getTweenFn(handleSetUp.get("tween").ease);
  };
  var easeTweenIsValid = (ease) => {
    const isValid = ease && ease in tweenConfig;
    if (!isValid && ease) tweenEaseWarning(ease);
    return isValid ? ease : handleSetUp.get("tween").ease;
  };
  var springConfigIsValidAndGetNew = (config) => {
    const { config: allConfig } = handleSetUp.get("spring");
    const isInConfig = config && config in allConfig;
    const obj = isInConfig ? allConfig[config] : {};
    const isValidPropsKey = isInConfig ? (() => {
      return mobCore.checkType(Object, obj) && "tension" in obj && "mass" in obj && "friction" in obj && "velocity" in obj && "precision" in obj;
    })() : false;
    const isValidPropsValue = isValidPropsKey ? Object.values(obj).every((prop) => {
      return mobCore.checkType(Number, prop) && prop >= 0;
    }) : null;
    if (!isInConfig && config) springPresetWarning(config);
    if (!isValidPropsValue && isInConfig)
      springConfigSpecificPropWarning(config);
    return isValidPropsValue ? allConfig[config] : allConfig.default;
  };
  var springConfigIsValid = (config) => {
    const { config: allConfig } = handleSetUp.get("spring");
    const isValid = config && config in allConfig;
    if (!isValid && config) springPresetWarning(config);
    return isValid;
  };
  var springConfigPropIsValid = (obj) => {
    const isValid = mobCore.checkType(Object, obj) && // @ts-ignore
    Object.values(obj).every((prop) => {
      return mobCore.checkType(Number, prop) && prop >= 0;
    });
    if (!isValid && obj) springConfigPropWarning();
    return isValid ? obj : {};
  };
  var durationIsNumberOrFunctionIsValid = (duration2) => {
    const durationIsFn = mobCore.checkType(Function, duration2);
    const durationResult = durationIsFn ? duration2() : duration2;
    const isValid = mobCore.checkType(Number, durationResult);
    if (!isValid && duration2) durationNumberOrFunctionWarining(duration2);
    return isValid ? durationResult : handleSetUp.get("tween").duration;
  };
  var valueIsBooleanAndTrue = (value, label) => {
    const isValid = mobCore.checkType(Boolean, value);
    if (!isValid && value) booleanWarning(value, label);
    return isValid && value === true;
  };
  var valueIsBooleanAndReturnDefault = (value, label, defaultValue) => {
    const isValid = mobCore.checkType(Boolean, value);
    if (!isValid && value) booleanWarning(value, label);
    return isValid ? value : defaultValue;
  };
  var valueIsStringAndReturnDefault = (value, label, defaultValue) => {
    const isValid = mobCore.checkType(String, value);
    if (!isValid && value) stringWarning(value, label);
    return isValid ? value : defaultValue;
  };
  var valueIsNumberAndReturnDefault = (value, label, defaultValue) => {
    const isValid = mobCore.checkType(Number, value);
    if (!isValid && value) naumberWarning(value, label);
    return isValid ? value : defaultValue;
  };
  var valueIsFunctionAndReturnDefault = (value, label, defaultValue) => {
    const isValid = mobCore.checkType(Function, value);
    if (!isValid && value) functionWarning(value, label);
    return isValid ? value : defaultValue;
  };
  var lerpVelocityIsValid = (value) => {
    const isValid = mobCore.checkType(Number, value) && value > 0 && value <= 1;
    if (!isValid && value) lerpVelocityWarining();
    return isValid ? value : handleSetUp.get("lerp").velocity;
  };
  var lerpPrecisionIsValid = (value) => {
    const isValid = mobCore.checkType(Number, value);
    if (!isValid && value) lerpPrecisionWarining();
    return isValid ? value : handleSetUp.get("lerp").precision;
  };
  var valueStringIsValid = (value, label) => {
    const isValid = mobCore.checkType(String, value);
    if (!isValid && value) valueStringWarning(label);
    return isValid;
  };
  var asyncTimelineDelayIsValid = (value) => {
    const isValid = mobCore.checkType(Number, value);
    if (!isValid && value) asyncTimelineDelayWarning();
    return isValid ? value : void 0;
  };
  var asyncTimelineTweenIsValid = (instance) => {
    const isValid = instance?.getType?.() && (instance.getType() === "LERP" || instance.getType() === "SPRING" || instance.getType() === "TWEEN");
    if (!isValid && instance) asyncTimelineTweenWaring();
    return isValid;
  };
  var playLabelIsValid = (index, label) => {
    if (index === -1) playLabelWarining(label);
  };
  var functionIsValidAndReturnDefault = (fn, defaultValue, label) => {
    const isValid = mobCore.checkType(Function, fn);
    if (!isValid && fn) functionIsValidAndReturnDefaultWarining(label, fn);
    return isValid ? fn : defaultValue;
  };
  var addAsyncFunctionIsValid = (fn) => {
    const isValid = mobCore.checkType(Function, fn);
    if (!isValid && fn) addAsyncFunctionWarining(fn);
    return isValid ? fn : ({ resolve }) => {
      resolve();
    };
  };
  var timelineSetTweenArrayIsValid = (arr) => {
    const isValid = mobCore.checkType(Array, arr);
    if (!isValid && arr) timelineSetTweenArrayWarining(arr);
    return isValid;
  };
  var timelineSetTweenLabelIsValid = (label) => {
    const isValid = mobCore.checkType(String, label);
    if (!isValid && label) timelineSetTweenLabelWarining(label);
    return isValid;
  };
  var domNodeIsValidAndReturnElOrWin = (element, returnWindow = false) => {
    const isNode3 = mobCore.checkType(Element, element);
    const realEl = isNode3 ? element : document.querySelector(element);
    return returnWindow ? (
      // eslint-disable-next-line unicorn/prefer-global-this
      realEl ?? window
    ) : realEl ?? document.createElement("div");
  };
  var domNodeIsValidAndReturnNull = (element) => {
    const isNode3 = mobCore.checkType(Element, element);
    const realEl = isNode3 ? element : document.querySelector(element);
    return realEl;
  };
  var directionIsValid = (direction2, component) => {
    if (!direction2) return parallaxConstant.DIRECTION_VERTICAL;
    const choice = [
      parallaxConstant.DIRECTION_VERTICAL,
      parallaxConstant.DIRECTION_HORIZONTAL
    ];
    const isValid = choice.includes(direction2);
    if (!isValid && direction2) parallaxDirectionWarining(direction2, component);
    return isValid ? direction2 : parallaxConstant.DIRECTION_VERTICAL;
  };
  var parallaxDynamicValueIsValid = (obj, label) => {
    const positionChoice = [
      parallaxConstant.POSITION_TOP,
      parallaxConstant.POSITION_LEFT,
      parallaxConstant.POSITION_RIGHT,
      parallaxConstant.POSITION_BOTTOM
    ];
    const valueIsObject = mobCore.checkType(Object, obj);
    const positionIsValid = valueIsObject && mobCore.checkType(String, obj?.position) && positionChoice.includes(obj.position);
    const valueIsValid = valueIsObject && mobCore.checkType(Function, obj.value) && mobCore.checkType(Number, obj.value());
    const isValid = valueIsObject && positionIsValid && valueIsValid;
    if (!isValid) parallaxDynmicValueWarining(label);
    return isValid ? obj : null;
  };
  var parallaxDynamicRangeIsValid = (fn) => {
    const isValid = mobCore.checkType(Function, fn) && mobCore.checkType(Number, fn?.());
    if (!isValid && fn) parallaxDynmicRangeValueWarining();
    return isValid ? fn : void 0;
  };
  var parallaxTweenIsValid = (instance) => {
    const isValid = instance?.getType?.() && (instance.getType() === parallaxConstant.TWEEN_TWEEN || instance.getType() === parallaxConstant.TWEEN_TIMELINE);
    if (!isValid && instance) parallaxTweenWarning();
    return isValid ? instance : {};
  };
  var parallaxAlignIsValid = (value) => {
    if (!value) return parallaxConstant.ALIGN_CENTER;
    const choice = [
      parallaxConstant.ALIGN_START,
      parallaxConstant.ALIGN_TOP,
      parallaxConstant.ALIGN_RIGHT,
      parallaxConstant.ALIGN_CENTER,
      parallaxConstant.ALIGN_BOTTOM,
      parallaxConstant.ALIGN_LEFT,
      parallaxConstant.ALIGN_END
    ];
    const isValid = choice.includes(value) || mobCore.checkType(Number, value);
    if (!isValid && value) parallaxAlignWarining(value, choice);
    return isValid ? value : parallaxConstant.ALIGN_CENTER;
  };
  var parallaxOnSwitchIsValid = (value) => {
    if (!value) return false;
    const choice = [
      parallaxConstant.IN_BACK,
      parallaxConstant.IN_STOP,
      parallaxConstant.OUT_BACK,
      parallaxConstant.OUT_STOP
    ];
    const isValid = choice.includes(value);
    if (!isValid && value) parallaxOnSwitchWarining(value, choice);
    return isValid ? value : false;
  };
  var parallaxOpacityIsValid = (value, label, defaultValue) => {
    if (!value) return defaultValue;
    const isValid = mobCore.checkType(Number, value);
    if (!isValid && value) parallaxOpacityWarning(value, label);
    return isValid ? value : defaultValue;
  };
  var parallaxTypeIsValid = (value) => {
    if (!value) return parallaxConstant.TYPE_PARALLAX;
    const valueLowerCase = value?.toLowerCase();
    const choice = [
      parallaxConstant.TYPE_PARALLAX,
      parallaxConstant.TYPE_SCROLLTRIGGER
    ];
    const isValid = choice.includes(valueLowerCase);
    if (!isValid && valueLowerCase)
      parallaxTypeWarining(valueLowerCase, choice);
    return isValid ? valueLowerCase : parallaxConstant.TYPE_PARALLAX;
  };
  var parallaxRangeIsValid = (value, type) => {
    const parsedValue = () => {
      if (type === parallaxConstant.TYPE_PARALLAX) {
        const isOnlyNumber = checkIfIsOnlyNumber(value);
        const isValid = mobCore.checkType(Number, Number(value)) && isOnlyNumber && // @ts-ignore
        value >= 0 && // @ts-ignore
        value < 10;
        if (!isValid && value) parallaxRangeNumberWarning(value);
        return isValid ? (
          // @ts-ignore
          10 - value
        ) : 10 - handleSetUp.get("parallax").defaultRange;
      } else {
        const isValid = mobCore.checkType(String, value);
        if (!isValid && value) parallaxRangeStringWarning(value);
        return isValid ? value : "0px";
      }
    };
    return parsedValue();
  };
  var breakpointIsValid = (mq2, label, component) => {
    const defaultMq = handleSetUp.get("defaultMq").value;
    if (!mq2) return defaultMq;
    const mqObj = handleSetUp.get("mq");
    const choice = Object.keys(mqObj);
    const isValid = mobCore.checkType(String, mq2) && choice.includes(mq2);
    if (!isValid && mq2) breakpointWarning(mq2, choice, label, component);
    return isValid ? mq2 : defaultMq;
  };
  var breakpointTypeIsValid = (type, label, component) => {
    const defaultType = handleSetUp.get("defaultMq").type;
    if (!type) return defaultType;
    const choice = [MQ_MAX, MQ_MIN];
    const isValid = mobCore.checkType(String, type) && choice.includes(type);
    if (!isValid && type) breakpointWarning(type, choice, label, component);
    return isValid ? type : defaultType;
  };
  var parallaxPropiertiesIsValid = (value, type, tweenIsParallaxTween, tweenIsSequencer) => {
    if (!value && tweenIsSequencer)
      return {
        propierties: parallaxConstant.PROP_VERTICAL,
        shouldTrackOnlyEvents: true
      };
    if (!value && tweenIsParallaxTween)
      return {
        propierties: parallaxConstant.PROP_VERTICAL,
        shouldTrackOnlyEvents: false
      };
    const shouldTrackOnlyEvents = type === parallaxConstant.TYPE_SCROLLTRIGGER && !value;
    const choice = [
      parallaxConstant.PROP_VERTICAL,
      parallaxConstant.PROP_HORIZONTAL,
      parallaxConstant.PROP_ROTATE,
      parallaxConstant.PROP_ROTATEY,
      parallaxConstant.PROP_ROTATEX,
      parallaxConstant.PROP_ROTATEZ,
      parallaxConstant.PROP_OPACITY,
      parallaxConstant.PROP_SCALE,
      parallaxConstant.PROP_SCALE_X,
      parallaxConstant.PROP_SCALE_Y,
      parallaxConstant.PROP_TWEEN
    ];
    const isValid = mobCore.checkType(String, value);
    if (!isValid && value) parallaxPropiertiesWarining(value, choice);
    const notParallaxTweenInsideParallax = type === parallaxConstant.TYPE_PARALLAX && value === parallaxConstant.PROP_TWEEN && !tweenIsParallaxTween;
    if (!tweenIsParallaxTween && !tweenIsSequencer && value === parallaxConstant.PROP_TWEEN)
      parallaxNoTweenDefinedWarning();
    if ((tweenIsParallaxTween || tweenIsSequencer) && value !== parallaxConstant.PROP_TWEEN)
      parallaxUseTweenButNotProsDefinedWarning();
    if (notParallaxTweenInsideParallax) parallaxUseSequencerWarining();
    const valueParsed = notParallaxTweenInsideParallax ? parallaxConstant.PROP_VERTICAL : value;
    const valueFromConstant = getPropiertiesValueFromConstant(valueParsed);
    return {
      propierties: isValid ? valueFromConstant ?? parallaxConstant.PROP_VERTICAL : parallaxConstant.PROP_VERTICAL,
      shouldTrackOnlyEvents
    };
  };
  var parallaxEaseTypeIsValid = (value) => {
    if (!value) return parallaxConstant.EASE_LERP;
    const choice = [parallaxConstant.EASE_SPRING, parallaxConstant.EASE_LERP];
    const isValid = choice.includes(value);
    if (!isValid) parallaxEaseTypeWarining(value, choice);
    const fallback = isValid ? value : parallaxConstant.EASE_LERP;
    return isValid ? value : fallback;
  };
  var genericEaseTypeIsValid = (value, component) => {
    const choice = [parallaxConstant.EASE_SPRING, parallaxConstant.EASE_LERP];
    const isValid = choice.includes(value);
    if (!isValid && value) genericEaseTypeWarining(value, choice, component);
    return isValid ? value : parallaxConstant.EASE_LERP;
  };
  var parallaxSpringConfigIsValid = (config, type) => {
    const defaultConfig = type === parallaxConstant.TYPE_PARALLAX ? handleSetUp.get("parallax").springConfig : handleSetUp.get("scrollTrigger").springConfig;
    if (!config) return defaultConfig;
    const springDefaultConfig = handleSetUp.get("spring").config;
    const choice = Object.keys(springDefaultConfig);
    const isValid = choice.includes(config);
    if (!isValid && config) parallaxSpringCongifWarining(config, choice);
    return isValid ? config : defaultConfig;
  };
  var parallaxLerpConfigIsValid = (value, type) => {
    const isValid = (
      // @ts-ignore
      mobCore.checkType(Number, Number(value)) && value > 0 && value <= 1
    );
    if (!isValid && value) parallaxLerpConfigWarning();
    const defaultConfig = type === parallaxConstant.TYPE_PARALLAX ? handleSetUp.get("parallax").lerpConfig : handleSetUp.get("scrollTrigger").lerpConfig;
    return isValid ? value : defaultConfig;
  };
  var checkStringRangeOnPropierties = (value, properties) => {
    const parallalxXYRangeChoice = [
      parallaxConstant.PX,
      parallaxConstant.VW,
      parallaxConstant.VH,
      parallaxConstant.WPERCENT,
      parallaxConstant.HPERCENT
    ];
    if (properties === parallaxConstant.PROP_VERTICAL || properties === parallaxConstant.PROP_HORIZONTAL) {
      const isValid2 = exactMatchInsesitiveNumberPropArray(
        parallalxXYRangeChoice,
        value
      );
      if (!isValid2)
        scrollTriggerRangeWarning(
          value,
          properties,
          parallalxXYRangeChoice
        );
      return isValid2 ? value : "0px";
    }
    if (properties === parallaxConstant.PROP_ROTATE || properties === parallaxConstant.PROP_ROTATEX || properties === parallaxConstant.PROP_ROTATEY || properties === parallaxConstant.PROP_ROTATEZ) {
      const isValid2 = exactMatchInsesitiveNumberPropArray(
        [parallaxConstant.DEGREE],
        value
      );
      if (!isValid2)
        scrollTriggerRangeWarning(value, properties, [
          parallaxConstant.DEGREE
        ]);
      return isValid2 ? value : "0";
    }
    if (properties === parallaxConstant.PROP_SCALE || properties === parallaxConstant.PROP_SCALE_X || properties === parallaxConstant.PROP_SCALE_Y) {
      const isValid2 = checkIfIsOnlyNumberPositiveNegative(value);
      if (!isValid2) scrollTriggerRangeScaleWarning(value, properties);
      return isValid2 ? value : "0";
    }
    const isValid = checkIfIsOnlyNumberPositiveNegative(value);
    if (!isValid) scrollTriggerCustomRangeWarning(properties);
    return isValid ? value : "0";
  };

  // src/js/mobMotion/animation/utils/stagger/staggerUtils.js
  var getEachByFps = (each) => {
    const { instantFps } = mobCore.store.get();
    const eachByFps = Math.round(each * (instantFps / 60));
    return each === 1 && eachByFps === 0 ? each : eachByFps;
  };
  var getStaggerFromProps = (props) => {
    return {
      type: validateStaggerType(props?.stagger?.type) ? props.stagger.type : STAGGER_DEFAULT_OBJ.type,
      each: validateStaggerEach(props?.stagger?.each) ? props.stagger.each : STAGGER_DEFAULT_OBJ.each,
      //
      from: validateStaggerFrom(props?.stagger?.from) ? props?.stagger?.from : STAGGER_TYPE_START,
      //
      grid: {
        col: validateStaggerColRow(props?.stagger?.grid?.col) ? props.stagger.grid.col : STAGGER_DEFAULT_OBJ.grid.col,
        //
        row: validateStaggerColRow(props?.stagger?.grid?.row) ? props.stagger.grid.row : STAGGER_DEFAULT_OBJ.grid.row,
        //
        direction: validateStaggerDirection(props?.stagger?.grid?.direction) ? props.stagger.grid.direction : DIRECTION_COL
      },
      //
      waitComplete: validateStaggerWaitComplete(props?.stagger?.waitComplete) ? props.stagger.waitComplete : STAGGER_DEFAULT_OBJ.waitComplete
    };
  };
  var getStaggerArray = (callbackCache, callbackDefault) => {
    return callbackCache.length > callbackDefault.length ? callbackCache : callbackDefault;
  };

  // src/js/mobMotion/animation/utils/stagger/getDefaultStagger.js
  var isOdd = (num) => num % 2;
  var getRandomInt = (max2) => Math.floor(Math.random() * max2);
  var getRandomChoice = (arrayChunk, each, index) => {
    const previousFrame = new Set(
      arrayChunk.slice(0, index).map((item) => item.frame)
    );
    const posibileFrame = arrayChunk.map((_item, i) => i * each);
    const randomChoice = posibileFrame.filter((x) => !previousFrame.has(x));
    return randomChoice;
  };
  var getStaggerIndex = (index, arraylenght, stagger, randomChoice = []) => {
    const { from, each } = stagger;
    const eachByFps = getEachByFps(each);
    if (from === STAGGER_RANDOM) {
      return {
        index,
        frame: (() => randomChoice[getRandomInt(randomChoice.length)])()
      };
    }
    if (from === STAGGER_START) {
      return {
        index,
        frame: index * eachByFps
      };
    }
    if (from === STAGGER_END) {
      return {
        index,
        frame: (arraylenght - 1 - index) * eachByFps
      };
    }
    if (from === STAGGER_CENTER) {
      const half = Math.trunc(arraylenght / 2);
      return (() => {
        if (index > half) {
          return {
            index,
            frame: (index - half) * eachByFps
          };
        }
        if (index < half) {
          return isOdd(arraylenght) === 0 && half - index === 1 ? {
            index,
            frame: 0
          } : (() => {
            return isOdd(arraylenght) === 0 ? {
              index,
              frame: (half - index - 1) * eachByFps
            } : {
              index,
              frame: (half - index) * eachByFps
            };
          })();
        }
        return {
          index,
          frame: 0
        };
      })();
    }
    if (from === STAGGER_EDGES) {
      const half = Math.trunc(arraylenght / 2);
      return (() => {
        if (index > half) {
          return {
            index,
            frame: (arraylenght - half - 1 - (index - half)) * eachByFps
          };
        }
        if (index < half) {
          return isOdd(arraylenght) === 0 && half - index === 1 ? {
            index,
            frame: (half - 1) * eachByFps
          } : (() => {
            return isOdd(arraylenght) === 0 ? {
              index,
              frame: (arraylenght - half - (half - index)) * eachByFps
            } : {
              index,
              frame: (arraylenght - half - 1 - (half - index)) * eachByFps
              // dfault,
            };
          })();
        }
        return isOdd(arraylenght) ? {
          index,
          frame: half * eachByFps
          // dfault,
        } : {
          index,
          frame: (half - 1) * eachByFps
          // dfault,
        };
      })();
    }
    if (from && checkType(Number, from)) {
      const half = from >= arraylenght ? arraylenght - 1 : from;
      return (() => {
        if (index > half) {
          return {
            index,
            // @ts-ignore
            frame: (index - half) * each
          };
        }
        if (index < half) {
          return {
            index,
            // @ts-ignore
            frame: (half - index) * each
          };
        }
        return {
          index,
          frame: 0
        };
      })();
    }
    return {
      index: 0,
      frame: 0
    };
  };
  var getItemsByRow = (arrayDefault, stagger, chunckSizeCol) => {
    if (stagger.grid.direction === DIRECTION_ROW) {
      const chunkByCol = sliceIntoChunks(arrayDefault, chunckSizeCol);
      const colToRowArray = [
        ...new Array(stagger.grid.col).keys()
        // @ts-ignore
      ].reduce((p, _c, i) => {
        return [...p, ...arrayColumn(chunkByCol, i)];
      }, []);
      return [...colToRowArray].flat();
    } else {
      return arrayDefault;
    }
  };
  var getDefaultStagger = ({
    arrayDefault,
    arrayOnStop,
    stagger,
    slowlestStagger,
    fastestStagger
  }) => {
    const chunckSizeCol = stagger?.grid?.col <= 1 ? arrayDefault.length : stagger.grid.col;
    const chunckSizeRow = stagger?.grid?.row <= 1 ? arrayDefault.length : stagger.grid.row;
    const itemByRow = getItemsByRow(arrayDefault, stagger, chunckSizeCol);
    const staggerArray = itemByRow.map((item) => {
      return item && item !== void 0 ? item : { index: 0, frame: 0 };
    });
    const itemCompleteByRow = getItemsByRow(
      arrayOnStop,
      stagger,
      chunckSizeCol
    );
    const staggerArrayOnComplete = itemCompleteByRow.map((item) => {
      return item && item !== void 0 ? item : { index: 0, frame: 0 };
    });
    const chunksize = stagger.grid.direction === DIRECTION_ROW ? chunckSizeRow : chunckSizeCol;
    const chunked = sliceIntoChunks(staggerArray, chunksize);
    const firstChunk = chunked[0];
    firstChunk.forEach((item, i) => {
      const { index, frame } = getStaggerIndex(
        i,
        chunked[0].length,
        stagger,
        getRandomChoice(firstChunk, stagger.each, i)
      );
      item.index = index;
      item.frame = frame;
      if (frame >= slowlestStagger.frame)
        slowlestStagger = {
          index,
          frame
        };
      if (frame <= fastestStagger.frame)
        fastestStagger = {
          index,
          frame
        };
    });
    chunked.forEach((chunkItem) => {
      chunkItem.forEach((item, i) => {
        if (item) {
          item.index = chunked[0][i].index;
          item.frame = chunked[0][i].frame;
        }
      });
    });
    const flatArray = chunked.flat();
    flatArray.forEach((item, i) => {
      staggerArray[i].index = item.index;
      staggerArray[i].frame = item.frame;
      if (staggerArrayOnComplete.length > 0) {
        staggerArrayOnComplete[i].index = item.index;
        staggerArrayOnComplete[i].frame = item.frame;
      }
    });
    return {
      staggerArray,
      staggerArrayOnComplete,
      fastestStagger,
      slowlestStagger
    };
  };

  // src/js/mobMotion/animation/utils/stagger/getRadialStagger.js
  var getRadialY = (arr, x, y) => {
    return arr.reduce((total, row, i) => {
      const offset2 = Math.abs(i - y);
      const newRow = row.reduce((p, c, i2) => {
        return i2 < x - offset2 || i2 > x + offset2 ? p : [...p, c];
      }, []);
      return [...total, newRow];
    }, []);
  };
  var getRadialX = (arr, x, y, chunk) => {
    return arr.reduce((total, _row, i) => {
      const offset2 = Math.abs(i - y);
      const newRow = [];
      if (i >= y && i <= y * 2) {
        return [...total, newRow];
      }
      const xStart = x - offset2;
      const xEnd = x + offset2;
      for (let i2 = 0; i2 < offset2; i2++) {
        if (isAvailableIntoChunk(chunk, y + i2, xStart)) {
          newRow.push(chunk[y + i2][xStart]);
        }
        if (isAvailableIntoChunk(chunk, y + i2, xEnd)) {
          newRow.push(chunk[y + i2][xEnd]);
        }
        if (i2 > 0) {
          if (isAvailableIntoChunk(chunk, y - i2, xStart)) {
            newRow.push(chunk[y - i2][xStart]);
          }
          if (isAvailableIntoChunk(chunk, y - i2, xEnd)) {
            newRow.push(chunk[y - i2][xEnd]);
          }
        }
      }
      const newRowFiltered = newRow.filter((item) => item != void 0);
      return [...total, newRowFiltered];
    }, []);
  };
  var isAvailableIntoChunk = (arr, i, i2) => {
    return arr[i] !== void 0 && arr[i][i2] !== void 0;
  };
  var getRadialArray = (arr, stagger) => {
    const { col } = stagger.grid;
    const { x, y } = stagger.from;
    const chunk = sliceIntoChunks(arr, col);
    [...new Array(col).keys()].forEach(() => {
      chunk.push([]);
    });
    const radialArrY = getRadialY(chunk, x, y);
    const radialArrX = getRadialX(radialArrY, x, y, chunk);
    const radialXY = radialArrY.reduce((p, _c, i) => {
      const row = [...radialArrY[i], ...radialArrX[i]];
      p.push(row);
      return p;
    }, []);
    const arrayLength = radialXY.length;
    const mergeDirection = y >= arrayLength / 2 ? MERGE_FROM_UP : MERGE_FROM_DOWN;
    const finalArray = mergeDirection === MERGE_FROM_DOWN ? radialXY.reduce(
      (previous, _current, index) => {
        if (index < y) {
          return previous;
        } else if (index === y) {
          const merged = [...radialXY[index]];
          previous.push(merged);
          return previous;
        } else {
          const downRow = radialXY[y - (index - y)] ?? [];
          const merged = [...radialXY[index], ...downRow];
          previous.push(merged);
          return previous;
        }
      },
      []
    ) : radialXY.reduce(
      (previous, _current, index) => {
        if (index > y) {
          return previous;
        } else if (index === y) {
          const merged = [...radialXY[index]];
          previous.push(merged);
          return previous;
        } else {
          const upRow = radialXY[y + (y - index)] ?? [];
          const merged = [...radialXY[index], ...upRow];
          previous.push(merged);
          return previous;
        }
      },
      []
    ).reverse();
    const cleanArray = finalArray.reduce(
      (previous, current) => {
        return current.length === 0 ? previous : [...previous, current];
      },
      []
    );
    return {
      cleanArray
    };
  };

  // src/js/mobMotion/animation/utils/stagger/setStagger.js
  var getRadial = ({
    arrayDefault,
    arrayOnStop,
    stagger,
    slowlestStagger,
    fastestStagger
  }) => {
    if (!mobCore.checkType(Object, stagger?.from)) {
      stagger.from = {};
    }
    if (!mobCore.checkType(Number, stagger?.from?.x)) {
      stagger.from = { ...stagger.from, x: 0 };
    }
    if (!mobCore.checkType(Number, stagger?.from?.y)) {
      stagger.from = { ...stagger.from, y: 0 };
    }
    const { cleanArray: cleanCb } = getRadialArray(arrayDefault, stagger);
    let counter = 0;
    cleanCb.forEach(
      (chunk, i) => {
        chunk.forEach((item) => {
          const eachByFps = getEachByFps(stagger.each);
          const frame = i * eachByFps;
          item.index = counter;
          item.frame = frame;
          if (frame >= slowlestStagger.frame)
            slowlestStagger = {
              index: counter,
              frame
            };
          if (frame <= fastestStagger.frame)
            fastestStagger = {
              index: counter,
              frame
            };
          counter++;
        });
      }
    );
    const cleanEndCb = (() => {
      if (arrayOnStop.length > 0) {
        const { cleanArray } = getRadialArray(arrayOnStop, stagger);
        return cleanArray.flat();
      } else {
        return [];
      }
    })();
    const staggerArray = cleanCb.flat();
    const endstaggerArray = cleanEndCb.flat();
    staggerArray.forEach(
      (item, i) => {
        if (endstaggerArray.length > 0) {
          endstaggerArray[i].index = item.index;
          endstaggerArray[i].frame = item.frame;
        }
      }
    );
    return {
      staggerArray,
      staggerArrayOnComplete: endstaggerArray,
      fastestStagger,
      slowlestStagger
    };
  };
  var getDefault = ({
    arrayDefault,
    arrayOnStop,
    stagger,
    slowlestStagger,
    fastestStagger
  }) => {
    const fromList = [
      STAGGER_START,
      STAGGER_END,
      STAGGER_CENTER,
      STAGGER_EDGES,
      STAGGER_RANDOM
    ];
    if (!mobCore.checkType(String, stagger?.from) && !mobCore.checkType(Number, stagger?.from) || mobCore.checkType(String, stagger?.from) && // @ts-ignore
    !fromList.includes(stagger?.from)) {
      staggerColRowWarning();
      stagger.from = STAGGER_START;
    }
    return getDefaultStagger({
      arrayDefault,
      arrayOnStop,
      stagger,
      slowlestStagger,
      fastestStagger
    });
  };
  var setStagger = ({
    arrayDefault,
    arrayOnStop,
    stagger,
    slowlestStagger,
    fastestStagger
  }) => {
    const result = stagger?.grid?.direction === DIRECTION_RADIAL ? getRadial({
      arrayDefault,
      arrayOnStop,
      stagger,
      slowlestStagger,
      fastestStagger
    }) : getDefault({
      arrayDefault,
      arrayOnStop,
      stagger,
      slowlestStagger,
      fastestStagger
    });
    const staggerArray = result.staggerArray;
    const staggerArrayOnComplete = result.staggerArrayOnComplete;
    const fastestStaggerUpdated = result.fastestStagger;
    const slowlestStaggerUpdated = result.slowlestStagger;
    return {
      staggerArray,
      staggerArrayOnComplete,
      fastestStagger: fastestStaggerUpdated,
      slowlestStagger: slowlestStaggerUpdated
    };
  };

  // src/js/mobMotion/animation/utils/callbacks/defaultCallback.js
  var defaultCallback = ({
    stagger,
    callback: callback2,
    callbackCache,
    callBackObject,
    useStagger
  }) => {
    if (stagger.each === 0 || !useStagger) {
      mobCore.useFrame(() => {
        callback2.forEach(({ cb }) => {
          cb(callBackObject);
        });
      });
      mobCore.useFrame(() => {
        callbackCache.forEach(({ cb }) => {
          mobCore.useCache.fireObject({ id: cb, obj: callBackObject });
        });
      });
      return;
    }
    callback2.forEach(({ cb, frame }) => {
      mobCore.useFrameIndex(() => {
        cb(callBackObject);
      }, frame);
    });
    callbackCache.forEach(({ cb, frame }) => {
      mobCore.useCache.update({ id: cb, callBackObject, frame });
    });
  };
  var defaultCallbackOnComplete = ({
    onComplete: onComplete2,
    callback: callback2,
    callbackCache,
    callbackOnComplete,
    callBackObject,
    stagger,
    slowlestStagger,
    fastestStagger,
    useStagger
  }) => {
    if (stagger.each === 0 || !useStagger) {
      onComplete2();
      mobCore.useNextFrame(() => {
        callback2.forEach(({ cb }) => {
          cb(callBackObject);
        });
        callbackCache.forEach(({ cb }) => {
          mobCore.useCache.fireObject({ id: cb, obj: callBackObject });
        });
        callbackOnComplete.forEach(({ cb }) => {
          cb(callBackObject);
        });
      });
      return;
    }
    callback2.forEach(({ cb, frame }, index) => {
      mobCore.useFrameIndex(() => {
        if (stagger.waitComplete) {
          if (index === slowlestStagger.index) {
            cb(callBackObject);
            onComplete2();
          }
          return;
        }
        if (index === fastestStagger.index) {
          cb(callBackObject);
          onComplete2();
        }
      }, frame);
    });
    callbackCache.forEach(({ cb, frame }, index) => {
      mobCore.useFrameIndex(() => {
        if (stagger.waitComplete) {
          if (index === slowlestStagger.index) {
            mobCore.useCache.fireObject({
              id: cb,
              obj: callBackObject
            });
            onComplete2();
          }
          return;
        }
        if (index === fastestStagger.index) {
          mobCore.useCache.fireObject({ id: cb, obj: callBackObject });
          onComplete2();
        }
      }, frame);
    });
    callbackOnComplete.forEach(({ cb, frame }) => {
      mobCore.useFrameIndex(() => {
        cb(callBackObject);
      }, frame + 1);
    });
  };

  // src/js/mobMotion/animation/utils/callbacks/callBackStore.js
  var callBackStore = mobCore.createStore({ id: 0 });

  // src/js/mobMotion/animation/utils/callbacks/setCallback.js
  var setCallBack = (currentCallback, arrayOfCallback) => {
    const { id } = callBackStore.get();
    const arrayOfCallbackUpdated = [
      ...arrayOfCallback,
      { cb: currentCallback, id, index: -1, frame: -1 }
    ];
    const prevId = id;
    callBackStore.quickSetProp("id", id + 1);
    return {
      arrayOfCallbackUpdated,
      unsubscribeCb: (arrayOfCallback2) => arrayOfCallback2.map(({ id: id2, cb, index, frame }) => {
        if (id2 === prevId) cb = () => {
        };
        return { id: id2, cb, index, frame };
      })
    };
  };
  var setCallBackCache = (item, currentCallback, arrayOfCallback, unsubscribeCacheArray) => {
    const { id } = callBackStore.get();
    const { id: cacheId, unsubscribe: unsubscribe3 } = mobCore.useCache.add(
      item,
      currentCallback
    );
    const arrayOfCallbackUpdated = [
      ...arrayOfCallback,
      { cb: cacheId, id, index: -1, frame: -1 }
    ];
    unsubscribeCacheArray.push(unsubscribe3);
    const prevId = id;
    callBackStore.quickSetProp("id", id + 1);
    return {
      arrayOfCallbackUpdated,
      unsubscribeCache: unsubscribeCacheArray,
      unsubscribeCb: (arrayOfCallback2) => {
        unsubscribe3();
        return arrayOfCallback2.map(({ id: id2, cb, index, frame }) => {
          if (id2 === prevId) cb = "";
          return { id: id2, cb, index, frame };
        });
      }
    };
  };

  // src/js/mobMotion/animation/utils/tweenAction/actions.js
  var goToUtils = (obj) => {
    return Object.keys(obj).map((item) => {
      if (!dataTweenValueIsValid(obj[item])) {
        dataTweenValueIsNotValidWarning(`${item}: ${obj[item]}`);
        return {
          prop: item,
          toValue: 0,
          toFn: () => 0,
          toIsFn: false,
          settled: false
        };
      }
      const toValue = mobCore.checkType(Number, obj[item]) ? obj[item] : (
        // @ts-ignore
        obj[item]?.() ?? 0
      );
      return {
        prop: item,
        toValue,
        toFn: (
          /** @type{() => number} */
          obj[item]
        ),
        toIsFn: mobCore.checkType(Function, obj[item]),
        settled: false
      };
    });
  };
  var goFromUtils = (obj) => {
    return Object.keys(obj).map((item) => {
      if (!dataTweenValueIsValid(obj[item])) {
        dataTweenValueIsNotValidWarning(`${item}: ${obj[item]}`);
        return {
          prop: item,
          fromValue: 0,
          currentValue: 0,
          fromFn: () => 0,
          fromIsFn: false,
          settled: false
        };
      }
      const value = mobCore.checkType(Number, obj[item]) ? obj[item] : (
        // @ts-ignore
        obj[item]?.() ?? 0
      );
      return {
        prop: item,
        fromValue: value,
        currentValue: value,
        fromFn: (
          /** @type{() => number} */
          obj[item]
        ),
        fromIsFn: mobCore.checkType(Function, obj[item]),
        settled: false
      };
    });
  };
  var goFromToUtils = (fromObj, toObj) => {
    return Object.keys(fromObj).map((item) => {
      if (!dataTweenValueIsValid(toObj[item]) || !dataTweenValueIsValid(fromObj[item])) {
        dataTweenValueIsNotValidWarning(
          `${item}: ${toObj[item]} || ${item}: ${fromObj[item]}`
        );
        return {
          prop: item,
          fromValue: 0,
          fromFn: () => 0,
          fromIsFn: false,
          currentValue: 0,
          toValue: 0,
          toFn: () => 0,
          toIsFn: false,
          settled: false
        };
      }
      const fromValue = mobCore.checkType(Number, fromObj[item]) ? fromObj[item] : (
        // @ts-ignore
        fromObj[item]?.() ?? 0
      );
      const toValue = mobCore.checkType(Number, toObj[item]) ? toObj[item] : (
        // @ts-ignore
        toObj[item]?.() ?? 0
      );
      return {
        prop: item,
        fromValue,
        fromFn: (
          /** @type{() => number} */
          fromObj[item]
        ),
        fromIsFn: mobCore.checkType(Function, fromObj[item]),
        currentValue: fromValue,
        toValue,
        toFn: (
          /** @type{() => number} */
          toObj[item]
        ),
        toIsFn: mobCore.checkType(Function, toObj[item]),
        settled: false
      };
    });
  };
  var setUtils = (obj) => {
    return Object.keys(obj).map((item) => {
      if (!dataTweenValueIsValid(obj[item])) {
        dataTweenValueIsNotValidWarning(`${item}: ${obj[item]}`);
        return {
          prop: item,
          fromValue: 0,
          fromFn: () => 0,
          fromIsFn: false,
          currentValue: 0,
          toValue: 0,
          toFn: () => 0,
          toIsFn: false,
          settled: false
        };
      }
      const value = mobCore.checkType(Number, obj[item]) ? obj[item] : (
        // @ts-ignore
        obj[item]?.() ?? 0
      );
      return {
        prop: item,
        fromValue: value,
        fromFn: (
          /** @type{() => number} */
          obj[item]
        ),
        fromIsFn: mobCore.checkType(Function, obj[item]),
        currentValue: value,
        toValue: value,
        toFn: (
          /** @type{() => number} */
          obj[item]
        ),
        toIsFn: mobCore.checkType(Function, obj[item]),
        settled: false
      };
    });
  };

  // src/js/mobMotion/animation/utils/initRaf.js
  var initRaf = (callbackPauseArray, rafFunction, pauseFunction, resolve) => {
    mobCore.useFrame(() => {
      mobCore.useNextTick(({ time: time2, fps: fps2 }) => {
        const prevent = callbackPauseArray.map(({ cb }) => cb()).includes(true);
        rafFunction(time2, fps2, resolve);
        if (prevent) pauseFunction();
      });
    });
  };

  // src/js/mobMotion/animation/utils/fpsLogInizialization.js
  var fpsLoadedLog = (label, fps2) => {
    console.log(`stagger on ${label} loaded at: ${fps2} fps`);
  };

  // src/js/mobMotion/animation/utils/stagger/shouldInizialize.js
  var shouldInizializzeStagger = (each, firstRun, arrayToCompare1, arrayToCompare2) => {
    if (!mobCore.checkType(Number, each)) {
      staggerEachWarning();
    }
    return each > 0 && firstRun && (arrayToCompare1.length > 0 || arrayToCompare2.length > 0);
  };

  // src/js/mobMotion/animation/utils/resumeTween.js
  var resume = (rafFunction, resolveFunction) => {
    mobCore.useFrame(() => {
      mobCore.useNextTick(({ time: time2, fps: fps2 }) => {
        rafFunction(time2, fps2, resolveFunction);
      });
    });
  };

  // src/js/mobMotion/animation/utils/tweenAction/getValues.js
  var getValueObj = (arr, key) => {
    return arr.map((item) => ({ [item.prop]: Number.parseFloat(item[key]) })).reduce((p, c) => ({ ...p, ...c }), {});
  };
  var getValueObjToNative = (arr) => {
    return arr.map((item) => {
      return item.toIsFn ? { [item.prop]: item.toFn } : { [item.prop]: Number.parseFloat(item.toValue) };
    }).reduce((p, c) => ({ ...p, ...c }), {});
  };
  var getValueObjFromNative = (arr) => {
    return arr.map((item) => {
      return item.fromIsFn ? { [item.prop]: item.fromFn } : { [item.prop]: Number.parseFloat(item.fromValue) };
    }).reduce((p, c) => ({ ...p, ...c }), {});
  };

  // src/js/mobMotion/animation/utils/tweenAction/mergeArray.js
  var mergeArray = (newData, data2) => {
    return data2.map((item) => {
      const itemToMerge = newData.find((newItem) => {
        return newItem.prop === item.prop;
      });
      return itemToMerge ? { ...item, ...itemToMerge } : item;
    });
  };
  var mergeArrayTween = (newData, data2) => {
    return data2.map((item) => {
      const itemToMerge = newData.find((newItem) => {
        return newItem.prop === item.prop;
      });
      return itemToMerge ? { ...item, ...itemToMerge, shouldUpdate: true } : { ...item, shouldUpdate: false };
    });
  };

  // src/js/mobMotion/animation/lerp/getValuesOnDraw.js
  var lerpGetValuesOnDraw = ({ values, fps: fps2, velocity, precision }) => {
    return values.map((item) => {
      if (item.settled) return item;
      const { currentValue, toValue } = item;
      const lerpValue = lerp(currentValue, toValue, velocity / fps2 * 60);
      const newCurrentValue = getRoundedValue(lerpValue);
      const settled = Number(Math.abs(toValue - newCurrentValue).toFixed(4)) <= precision;
      if (settled) {
        return {
          ...item,
          currentValue: toValue,
          settled: true
        };
      }
      return {
        ...item,
        currentValue: newCurrentValue,
        settled: false
      };
    });
  };

  // src/js/mobMotion/animation/lerp/handleLerp.js
  var HandleLerp = class {
    /**
     * @param {import('./type.js').lerpTweenProps} [ data  = {}]
     *
     * @example
     * ```javascript
     * const myLerp = new HandleLerp({
     *   data: Object.<string, number>,
     *   precision: Number,
     *   velocity: Number,
     *   relative: Boolean
     *   stagger:{
     *      each: Number,
     *      from: Number|String|{x:number,y:number},
     *      grid: {
     *          col: Number,
     *          row: Number,
     *          direction: String,
     *      },
     *      waitComplete: Boolean,
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * myLerp.set()
     * myLerp.goTo()
     * myLerp.goFrom()
     * myLerp.goFromTo()
     * myLerp.subscribe()
     * myLerp.subscribeCache()
     * myLerp.onComplete()
     * myLerp.updateVelocity()
     * myLerp.updatePrecision()
     * myLerp.getId()
     * myLerp.get()
     * myLerp.getTo()
     * myLerp.getFrom()
     * myLerp.getToNativeType()
     * myLerp.getFromNativeType()
     *
     * ```
     */
    constructor(data2) {
      this.stagger = getStaggerFromProps(data2);
      this.relative = relativeIsValid(data2?.relative, "lerp");
      this.velocity = lerpVelocityIsValid(data2?.velocity);
      this.precision = lerpPrecisionIsValid(data2?.precision);
      this.uniqueId = mobCore.getUnivoqueId();
      this.isActive = false;
      this.currentResolve = void 0;
      this.currentReject = void 0;
      this.promise = void 0;
      this.values = [];
      this.initialData = [];
      this.callback = [];
      this.callbackCache = [];
      this.callbackOnComplete = [];
      this.callbackStartInPause = [];
      this.unsubscribeCache = [];
      this.pauseStatus = false;
      this.firstRun = true;
      this.useStagger = true;
      this.fpsInLoading = false;
      this.defaultProps = {
        reverse: false,
        velocity: this.velocity,
        precision: this.precision,
        relative: this.relative,
        immediate: false,
        immediateNoPromise: false
      };
      this.slowlestStagger = STAGGER_DEFAULT_INDEX_OBJ;
      this.fastestStagger = STAGGER_DEFAULT_INDEX_OBJ;
      const props = data2?.data || null;
      if (props) this.setData(props);
    }
    /**
     * @param {number} _time
     * @param {number} fps
     * @param {(value:any) => void} res
     *
     * @returns {void}
     */
    draw(_time, fps2, res = () => {
    }) {
      this.isActive = true;
      this.values = lerpGetValuesOnDraw({
        values: this.values,
        fps: fps2,
        velocity: this.velocity,
        precision: this.precision
      });
      const callBackObject = getValueObj(this.values, "currentValue");
      defaultCallback({
        stagger: this.stagger,
        callback: this.callback,
        callbackCache: this.callbackCache,
        callBackObject,
        useStagger: this.useStagger
      });
      const allSettled = this.values.every((item) => item.settled === true);
      if (allSettled) {
        const onComplete2 = () => {
          this.isActive = false;
          this.values = [...this.values].map((item) => {
            return { ...item, fromValue: item.toValue };
          });
          if (!this.pauseStatus) {
            res();
            this.promise = void 0;
            this.currentReject = void 0;
            this.currentResolve = void 0;
          }
        };
        const cbObjectSettled = getValueObj(this.values, "toValue");
        defaultCallbackOnComplete({
          onComplete: onComplete2,
          callback: this.callback,
          callbackCache: this.callbackCache,
          callbackOnComplete: this.callbackOnComplete,
          callBackObject: cbObjectSettled,
          stagger: this.stagger,
          slowlestStagger: this.slowlestStagger,
          fastestStagger: this.fastestStagger,
          useStagger: this.useStagger
        });
        return;
      }
      mobCore.useFrame(() => {
        mobCore.useNextTick(({ time: time2, fps: fps3 }) => {
          if (this.isActive) this.draw(time2, fps3, res);
        });
      });
    }
    /**
     * @private
     *
     * @param {number} time current global time
     * @param {number} fps current FPS
     * @param {(value:any) => void} res current promise resolve
     **/
    onReuqestAnim(time2, fps2, res) {
      this.values = [...this.values].map((item) => {
        return { ...item, currentValue: item.fromValue };
      });
      this.draw(time2, fps2, res);
    }
    /**
     * @description
     * Inzialize stagger array
     *
     * @returns {Promise<any>}
     */
    async inzializeStagger() {
      if (shouldInizializzeStagger(
        this.stagger.each,
        this.firstRun,
        this.callbackCache,
        this.callback
      )) {
        const { averageFPS } = await mobCore.useFps();
        fpsLoadedLog("lerp", averageFPS);
        const cb = getStaggerArray(this.callbackCache, this.callback);
        if (this.stagger.grid.col > cb.length) {
          staggerIsOutOfRangeWarning(cb.length);
          this.firstRun = false;
          return;
        }
        const {
          staggerArray,
          staggerArrayOnComplete,
          fastestStagger,
          slowlestStagger
        } = setStagger({
          arrayDefault: cb,
          arrayOnStop: this.callbackOnComplete,
          stagger: this.stagger,
          slowlestStagger: this.slowlestStagger,
          fastestStagger: this.fastestStagger
        });
        if (this.callbackCache.length > this.callback.length) {
          this.callbackCache = staggerArray;
        } else {
          this.callback = staggerArray;
        }
        this.callbackOnComplete = staggerArrayOnComplete;
        this.slowlestStagger = slowlestStagger;
        this.fastestStagger = fastestStagger;
        this.firstRun = false;
      }
      return { ready: true };
    }
    /**
     * @private
     * @param {(arg0: any) => void} res
     * @param {(value: any) => void|null} reject
     *
     * @returns {Promise}
     */
    async startRaf(res, reject) {
      if (this.fpsInLoading) return;
      this.currentResolve = res;
      this.currentReject = reject;
      if (this.firstRun) {
        this.fpsInLoading = true;
        await this.inzializeStagger();
        this.fpsInLoading = false;
      }
      initRaf(
        this.callbackStartInPause,
        this.onReuqestAnim.bind(this),
        this.pause.bind(this),
        res
      );
    }
    /**
     * @type {import('./type.js').lerpStop}
     */
    stop({ clearCache = true } = {}) {
      if (this.pauseStatus) this.pauseStatus = false;
      this.values = setFromToByCurrent(this.values);
      if (this.isActive && clearCache)
        this.callbackCache.forEach(({ cb }) => mobCore.useCache.clean(cb));
      if (this.currentReject) {
        this.currentReject(mobCore.ANIMATION_STOP_REJECT);
        this.promise = void 0;
        this.currentReject = void 0;
        this.currentResolve = void 0;
      }
      if (this.isActive) this.isActive = false;
    }
    /**
     * @type {import('./type.js').lerpPause}
     */
    pause() {
      if (this.pauseStatus) return;
      this.pauseStatus = true;
      if (this.isActive) this.isActive = false;
      this.values = setFromByCurrent(this.values);
    }
    /**
     * @type {import('./type.js').lerpResume}
     */
    resume() {
      if (!this.pauseStatus) return;
      this.pauseStatus = false;
      if (!this.isActive && this.currentResolve) {
        resume(this.onReuqestAnim.bind(this), this.currentResolve);
      }
    }
    /**
     * @type {import('./type.js').lerpSetData}
     *
     * @description
     * Set initial data structure, the method is call by data prop in constructor. In case of need it can be called after creating the instance
     */
    setData(obj) {
      this.values = Object.entries(obj).map((item) => {
        const [prop, value] = item;
        return {
          prop,
          toValue: value,
          fromValue: value,
          currentValue: value,
          fromFn: () => 0,
          fromIsFn: false,
          toFn: () => 0,
          toIsFn: false,
          settled: false
        };
      });
      this.initialData = this.values.map((item) => {
        return {
          prop: item.prop,
          toValue: item.toValue,
          fromValue: item.fromValue,
          currentValue: item.currentValue
        };
      });
    }
    /**
     * @type {import('./type.js').lerpResetData}
     */
    resetData() {
      this.values = mergeDeep(this.values, this.initialData);
    }
    /**
     * @private
     * @type  {import('./type.js').lerpMergeProps}
     */
    mergeProps(props) {
      const newProps = { ...this.defaultProps, ...props };
      const { velocity, precision, relative } = newProps;
      this.relative = relativeIsValid(relative, "lerp");
      this.velocity = lerpVelocityIsValid(velocity);
      this.precision = lerpPrecisionIsValid(precision);
      return newProps;
    }
    /**
     * @type {import('./type.js').lerpGoTo} obj to Values
     */
    goTo(obj, props = {}) {
      if (this.pauseStatus) return;
      this.useStagger = true;
      const data2 = goToUtils(obj);
      return this.doAction(data2, props, obj);
    }
    /**
     * @type {import('./type.js').lerpGoFrom} obj from Values
     */
    goFrom(obj, props = {}) {
      if (this.pauseStatus) return;
      this.useStagger = true;
      const data2 = goFromUtils(obj);
      return this.doAction(data2, props, obj);
    }
    /**
     * @type {import('./type.js').lerpGoFromTo} fromObj from Values
     */
    goFromTo(fromObj, toObj, props = {}) {
      if (this.pauseStatus) return;
      this.useStagger = true;
      if (!compareKeys(fromObj, toObj)) {
        compareKeysWarning("lerp goFromTo:", fromObj, toObj);
        return this.promise;
      }
      const data2 = goFromToUtils(fromObj, toObj);
      return this.doAction(data2, props, fromObj);
    }
    /**
     * @type {import('./type.js').lerpSet} obj to Values
     */
    set(obj, props = {}) {
      if (this.pauseStatus) return;
      this.useStagger = false;
      const data2 = setUtils(obj);
      return this.doAction(data2, props, obj);
    }
    /**
     * @private
     * @type {import('./type.js').lerpDoAction}
     */
    doAction(data2, props, obj) {
      this.values = mergeArray(data2, this.values);
      const { reverse, immediate, immediateNoPromise } = this.mergeProps(props);
      if (valueIsBooleanAndTrue(reverse, "reverse"))
        this.values = setReverseValues(obj, this.values);
      this.values = setRelative(this.values, this.relative);
      if (valueIsBooleanAndTrue(immediate, "immediate ")) {
        this.isActive = false;
        this.values = setFromCurrentByTo(this.values);
        return Promise.resolve();
      }
      if (valueIsBooleanAndTrue(immediateNoPromise, "immediateNoPromise")) {
        this.isActive = false;
        this.values = setFromCurrentByTo(this.values);
        return;
      }
      if (!this.isActive) {
        this.promise = new Promise((res, reject) => {
          this.startRaf(res, reject);
        });
      }
      if (this.promise) return this.promise;
    }
    /**
     * @description
     * Get current values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').lerpGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.get();
     * ```
     */
    get() {
      return getValueObj(this.values, "currentValue");
    }
    /**
     * @description
     * Get initial values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').lerpGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.getIntialData();
     * ```
     */
    getInitialData() {
      return getValueObj(this.initialData, "currentValue");
    }
    /**
     * @description
     * Get from values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').lerpGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.getFrom();
     * ```
     */
    getFrom() {
      return getValueObj(this.values, "fromValue");
    }
    /**
     * @description
     * Get to values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').lerpGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.getTo();
     * ```
     */
    getTo() {
      return getValueObj(this.values, "toValue");
    }
    /**
     * @description
     * Get From values, if the single value is a function it returns the same function.
     *
     * @type {import('./type.js').lerpGetValueNative}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.getFromNativeType();
     * ```
     */
    getFromNativeType() {
      return getValueObjFromNative(this.values);
    }
    /**
     * @description
     * Get To values, if the single value is a function it returns the same function.
     *
     * @type {import('./type.js').lerpGetValueNative}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myLerp.getToNativeType();
     * ```
     */
    getToNativeType() {
      return getValueObjToNative(this.values);
    }
    /**
     * @description
     * Get tween type
     *
     * @type {import('./type.js').lerpGetType} tween type
     *
     * @example
     * ```javascript
     *
     *
     * const type = myLerp.getType();
     * ```
     */
    getType() {
      return "LERP";
    }
    /**
     * @description
     * Get univoque Id
     *
     * @type {import('./type.js').lerpGetId}
     *
     * @example
     * ```javascript
     *
     *
     * const type = myLerp.getId();
     * ```
     */
    getId() {
      return this.uniqueId;
    }
    /**
     * @type  {import('./type.js').lerpUpdateVelocity} 
     *
     * @example
     * ```javascript
     * myLerp.updateVelocity(0.1)
     *
     *
     * ```
     *
     * @description
     * Update velocity value.
       `default value is 0.06`,the closer the value is to 1, the faster the transition will be.
        The change will be persistent
     */
    updateVelocity(velocity) {
      this.velocity = lerpVelocityIsValid(velocity);
      this.defaultProps = mergeDeep(this.defaultProps, {
        velocity: this.velocity
      });
    }
    /**
     * @type  {import('./type.js').lerpUpdatePrecision} 
     *
     * @example
     * ```javascript
     * myLerp.updatePrecision(0.5)
     *
     *
     * ```
     *
     * @description
     * Update precision value.
       When the calculated value is less than this number, the transition will be considered completed, the smaller the value, the greater the precision of the calculation, the `default value is 0.01`.
       The change will be persistent
     */
    updatePrecision(precision) {
      this.velocity = lerpPrecisionIsValid(precision);
      this.defaultProps = mergeDeep(this.defaultProps, {
        precision: this.precision
      });
    }
    /**
     * @type {import('./type.js').lerpSubscribe}
     *
     * ```
     * @description
     * Callback that returns updated values ready to be usable, it is advisable to use it for single elements, although it works well on a not too large number of elements (approximately 100-200 elements) for large staggers it is advisable to use the subscribeCache method .
     */
    subscribe(cb) {
      const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
        cb,
        this.callback
      );
      this.callback = arrayOfCallbackUpdated;
      return () => this.callback = unsubscribeCb(this.callback);
    }
    /**
     * Support callback to asyncTimeline.
     * Callback to manage the departure of tweens in a timeline. If a delay is applied to the tween and before the delay ends the timeline pauses the tween at the end of the delay will automatically pause.
     * Add callback to start in pause to stack
     *
     * @param  {() => void} cb cal function
     * @return {() => void} unsubscribe callback
     *
     */
    onStartInPause(cb) {
      const { arrayOfCallbackUpdated } = setCallBack(
        cb,
        this.callbackStartInPause
      );
      this.callbackStartInPause = arrayOfCallbackUpdated;
      return () => this.callbackStartInPause = [];
    }
    /**
     * @type {import('./type.js').lerpOnComplete}
     *
     *
     * @description
     *  Similar to subscribe this callBack is launched when the data calculation stops (when the timeline ends or the scroll trigger is inactive).
     *  Useful for applying a different style to an inactive element.
     *  A typical example is to remove the teansform3D property:
     **/
    onComplete(cb) {
      const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
        cb,
        this.callbackOnComplete
      );
      this.callbackOnComplete = arrayOfCallbackUpdated;
      return () => this.callbackOnComplete = unsubscribeCb(this.callbackOnComplete);
    }
    /**
     * @type {import('./type.js').lerpSubscribeCache}
     *
     * @description
     * Callback that returns updated values ready to be usable, specific to manage large staggers.
     */
    subscribeCache(item, fn) {
      const { arrayOfCallbackUpdated, unsubscribeCb, unsubscribeCache } = setCallBackCache(
        item,
        fn,
        this.callbackCache,
        this.unsubscribeCache
      );
      this.callbackCache = arrayOfCallbackUpdated;
      this.unsubscribeCache = unsubscribeCache;
      return () => this.callbackCache = unsubscribeCb(this.callbackCache);
    }
    /**
     * @description
     * Destroy tween
     */
    destroy() {
      if (this.promise) this.stop();
      this.callbackOnComplete = [];
      this.callbackStartInPause = [];
      this.callback = [];
      this.callbackCache = [];
      this.values = [];
      this.promise = void 0;
      this.unsubscribeCache.forEach((unsubscribe3) => unsubscribe3());
      this.unsubscribeCache = [];
    }
  };

  // src/js/mobMotion/animation/utils/callbacks/syncCallback.js
  var syncCallback = ({
    each,
    useStagger,
    isLastDraw,
    callBackObject,
    callback: callback2,
    callbackCache,
    callbackOnStop
  }) => {
    if (each === 0 || useStagger === false) {
      mobCore.useFrame(() => {
        callback2.forEach(({ cb }) => cb(callBackObject));
      });
      mobCore.useFrame(() => {
        callbackCache.forEach(({ cb }) => {
          mobCore.useCache.fireObject({ id: cb, obj: callBackObject });
        });
      });
    } else {
      callback2.forEach(({ cb, frame }) => {
        mobCore.useFrameIndex(() => cb(callBackObject), frame);
      });
      callbackCache.forEach(({ cb, frame }) => {
        mobCore.useCache.update({ id: cb, callBackObject, frame });
      });
    }
    if (isLastDraw) {
      if (each === 0 || useStagger === false) {
        mobCore.useFrame(() => {
          callbackOnStop.forEach(({ cb }) => cb(callBackObject));
        });
      } else {
        callbackOnStop.forEach(({ cb, frame }) => {
          mobCore.useFrameIndex(() => cb(callBackObject), frame + 1);
        });
      }
    }
  };

  // src/js/mobMotion/animation/parallax/parallaxTween.js
  var ParallaxTween = class {
    /**
     * @param {import('./type.js').parallaxTweenType} data
     *
     * @example
     * ```js
     * const myParallaxTween = new ParallaxTween({
     *   from: Object.<string, number>,
     *   to: Object.<string, number>,
     *   ease: [ String ],
     *   stagger:{
     *      each: [ Number ],
     *      from: [ Number|String|{x:number,y:number} ],
     *      grid: {
     *          col: [ Number ],
     *          row: [ Number ],
     *          direction: [ String ]
     *      },
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Simplified tween specific to be used with scrollTrigger as an alternative to the more complex sequencer, ParallaxTween requires only one mutation step (from / to).
     *
     * Available methods:
     * ```js
     * myParallaxTween.subscribe()
     * myParallaxTween.subscribeCache()
     * myParallaxTween.onStop()
     *
     * ```
     */
    constructor(data2) {
      this.ease = easeParallaxTweenIsValid(data2?.ease);
      this.duration = durationIsValid(data2?.duration);
      this.stagger = getStaggerFromProps(data2);
      this.values = [];
      this.callbackOnStop = [];
      this.callback = [];
      this.callbackCache = [];
      this.unsubscribeCache = [];
      this.type = "parallaxTween";
      const props = data2?.from || null;
      if (props) this.setData(props);
      if (data2?.to) {
        this.goTo(data2.to);
      }
    }
    /**
     * @description
     * Inzialize stagger array
     *
     * @returns {void}
     */
    inzializeStagger() {
      if (this.stagger.each > 0 && (this.callbackCache.length > 0 || this.callback.length > 0)) {
        const cb = getStaggerArray(this.callbackCache, this.callback);
        if (this.stagger.grid.col > cb.length) {
          staggerIsOutOfRangeWarning(cb.length);
          return;
        }
        const { staggerArray, staggerArrayOnComplete } = setStagger({
          arrayDefault: cb,
          arrayOnStop: this.callbackOnStop,
          stagger: this.stagger,
          slowlestStagger: STAGGER_DEFAULT_INDEX_OBJ,
          //sequencer doesn't support fastestStagger
          fastestStagger: STAGGER_DEFAULT_INDEX_OBJ
          //sequencer doesn't support fastestStagger
        });
        if (this.callbackCache.length > this.callback.length) {
          this.callbackCache = staggerArray;
        } else {
          this.callback = staggerArray;
        }
        this.callbackOnStop = staggerArrayOnComplete;
      }
    }
    /**
     * @param {object} obj
     * @param {number} obj.partial - render at specific partial between 0 and duration
     * @param {boolean} obj.isLastDraw - use the callback defined by the onStop method
     *
     * @example
     * ```js
     * myParallaxTween.draw(
     *      partial: 200,
     *      isLastDraw: true,
     * );
     *
     *
     * ```
     * @description
     */
    draw({ partial, isLastDraw }) {
      this.values = [...this.values].map((item) => {
        const { toIsFn, toFn, toValue, fromIsFn, fromFn, fromValue } = item;
        const toValueParsed = toIsFn ? toFn() : toValue;
        const fromValueParsed = fromIsFn ? fromFn() : fromValue;
        const toValFinal = toValueParsed - fromValueParsed;
        const currentValue = this.ease(
          partial,
          fromValueParsed,
          toValFinal,
          this.duration
        );
        return {
          ...item,
          currentValue: getRoundedValue(currentValue)
        };
      });
      const callBackObject = getValueObj(this.values, "currentValue");
      mobCore.useNextTick(() => {
        syncCallback({
          each: this.stagger.each,
          useStagger: true,
          isLastDraw,
          callBackObject,
          callback: this.callback,
          callbackCache: this.callbackCache,
          callbackOnStop: this.callbackOnStop
        });
      });
    }
    /**
     *
     * @param {Record<string, number>} obj Initial data Object
     * @returns {this} The instance on which this method was called.
     */
    setData(obj) {
      const valToArray = Object.entries(obj);
      this.values = valToArray.map((item) => {
        const [prop, value] = item;
        return {
          prop,
          toValue: value,
          toValProcessed: value,
          fromValue: value,
          currentValue: value,
          settled: false,
          /**
           * Only for type check.
           */
          fromFn: () => 0,
          toFn: () => 0
        };
      });
      return this;
    }
    /**
     * @private
     *
     * Return the new array maeged with main array created in setData
     *
     * @param  {import('../utils/tweenAction/type.js').goToParamsType[]} newData new datato merge
     * @return {void}
     */
    mergeData(newData) {
      this.values = this.values.map((item) => {
        const itemToMerge = newData.find((newItem) => {
          return newItem.prop === item.prop;
        });
        return itemToMerge ? { ...item, ...itemToMerge } : { ...item };
      });
    }
    /**
     * @private
     *
     * @param {Record<string, number|(() => number)>} obj to values
     * @returns {this} The instance on which this method was called.
     *
     * @example
     * ```js
     * myParallaxTween.goTo(
     *     { string: number|function, ... }
     * );
     *
     *
     * ```
     * @description
     * Transform some properties of your choice from the `current value` to the `entered value`.
     * The target value can be a number or a function that returns a number, when using a function the target value will become dynamic and will change in real time as the result of the function changes
     */
    goTo(obj) {
      const data2 = goToUtils(obj);
      this.mergeData(data2);
      return this;
    }
    /**
     * @param {() => void} cb - callback function.
     * @return {() => void} unsubscribe callback.
     *
     * @example
     * ```js
     * //Single DOM element
     * const unsubscribe = myParallaxTween.subscribe(({ x,y... }) => {
     *      domEl.style.prop = `...`
     * })
     * unsubscribe()
     *
     *
     * //Multiple DOM element ( stagger )
     * const unsubscribeStagger = [...elements].map((item) => {
     *   return myParallaxTween.subscribe(({ x, y... }) => {
     *       item.style.prop = ...
     *   });
     * });
     * unsubscribeStagger.forEach((item) => item());
     *
     *
     * ```
     * @description
     * Callback that returns updated values ready to be usable, it is advisable to use it for single elements, although it works well on a not too large number of elements (approximately 100-200 elements) for large staggers it is advisable to use the subscribeCache method .
     */
    subscribe(cb) {
      const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
        cb,
        this.callback
      );
      this.callback = arrayOfCallbackUpdated;
      return () => this.callback = unsubscribeCb(this.callback);
    }
    /**
     * @param {() => void} cb - callback function.
     * @return {() => void} unsubscribe callback.
     *
     * @example
     * ```js
     * //Single DOM element
     * const unsubscribe = myParallaxTween.onStop(({ x,y... }) => {
     *      domEl.style.prop = `...`
     * })
     * unsubscribe()
     *
     *
     * //Multiple DOM element ( stagger )
     * const unsubscribeStagger = [...elements].map((item) => {
     *   return myParallaxTween.onStop(({ x, y... }) => {
     *       item.style.prop = ...
     *   });
     * });
     * unsubscribeStagger.forEach((item) => item());
     *
     *
     * ```
     * @description
     * Similar to subscribe this callBack is launched when the data calculation stops (when the timeline ends or the scroll trigger is inactive).
     * Useful for applying a different style to an inactive element.
     * A typical example is to remove the teansform3D property:
     *
     * @example
     * ```js
     * // Use transform3D while item is active
     * mySequencer.subscribe(({x}) => {
     *      domEl.style.transform = ` transform3D(0,0,0) translateX(${x}px)`
     * })
     *
     * // Remove transform3D when item is inactive
     * mySequencer.onStop(({x}) => {
     *      domEl.style.transform = `translateX(${x}px)`
     * })
     * ```
     */
    onStop(cb) {
      const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
        cb,
        this.callbackOnStop
      );
      this.callbackOnStop = arrayOfCallbackUpdated;
      return () => this.callbackOnStop = unsubscribeCb(this.callbackOnStop);
    }
    /**
     * @param {(Object|HTMLElement)} item
     * @param {function(any):void} fn - callback function.
     * @return {Function} unsubscribe callback
     *
     * @example
     *```js
     * //Multiple DOM element ( stagger )
     * const unsubscribeStagger = [...elements].map((item) => {
     *   return myParallaxTween.subscribeCache(item, ({ x, y... }) => {
     *       item.style.prop = ...
     *   });
     * });
     * unsubscribeStagger.forEach((item) => item());
     *
     *
     * ```
     * @description
     * Callback that returns updated values ready to be usable, specific to manage large staggers.
     */
    subscribeCache(item, fn) {
      const { arrayOfCallbackUpdated, unsubscribeCb, unsubscribeCache } = setCallBackCache(
        item,
        fn,
        this.callbackCache,
        this.unsubscribeCache
      );
      this.callbackCache = arrayOfCallbackUpdated;
      this.unsubscribeCache = unsubscribeCache;
      return () => this.callbackCache = unsubscribeCb(this.callbackCache);
    }
    /**
     * @description
     * Get duration
     * @return {number}
     */
    getDuration() {
      return this.duration;
    }
    /**
     * @description
     * Get tween type - 'parallaxTween'
     */
    getType() {
      return this.type;
    }
    /**
     * @description
     * Destroy sequencer
     */
    destroy() {
      this.values = [];
      this.callbackOnStop = [];
      this.callback = [];
      this.callbackCache = [];
      this.unsubscribeCache.forEach((unsubscribe3) => unsubscribe3());
      this.unsubscribeCache = [];
    }
  };

  // src/js/mobMotion/animation/sequencer/handleMasterSequencer.js
  var HandleMasterSequencer = class {
    constructor() {
      this.type = "sequencer";
      this.children = [];
    }
    /**
     * @param {object} obj
     * @param {number} obj.partial
     * @param {boolean} obj.isLastDraw
     * @param {boolean} obj.useFrame
     *
     * @returns {void}
     */
    draw({ partial, isLastDraw, useFrame }) {
      this.children.forEach((item) => {
        item.draw({ partial, isLastDraw, useFrame });
      });
    }
    /**
     * @param {import("./type").masterSequencerItem} item
     * @returns {void}
     */
    add(item) {
      this.children.push(item);
    }
    /**
     * @returns {void}
     */
    inzializeStagger() {
      this.children.forEach((item) => {
        item.inzializeStagger();
      });
    }
    /**
     * @param {number} val
     * @returns {void}
     */
    setDuration(val2) {
      this.children.forEach((item) => {
        item.setDuration(val2);
      });
    }
    /**
     * @returns {number}
     */
    getDuration() {
      return this.children.length > 0 ? this.children[0].getDuration() : 0;
    }
    /**
     * @param {number} val
     * @returns {void}
     */
    setStretchFactor(val2) {
      this.children.forEach((item) => {
        item.setStretchFactor(val2);
      });
    }
    /**
     * @returns {Array<string>}
     */
    getLabels() {
      return this.children.flatMap((item) => item.getLabels());
    }
    /**
     * @returns {void}
     */
    resetLastValue() {
      this.children.forEach((item) => item.resetLastValue());
    }
    /**
     * @returns {void}
     */
    disableStagger() {
      this.children.forEach((item) => {
        item.disableStagger();
      });
    }
    /**
     * @returns {void}
     */
    cleanCachedId() {
      this.children.forEach((item) => {
        item.cleanCachedId();
      });
    }
    /**
     * @returns {string}
     */
    getType() {
      return this.type;
    }
    /**
     * @returns {void}
     */
    destroy() {
      this.children.forEach((item) => {
        item.destroy();
      });
      this.children = [];
    }
  };

  // src/js/mobMotion/animation/sequencer/syncActions.js
  var goToSyncUtils = (obj, ease) => {
    return Object.keys(obj).map((item) => {
      if (!dataTweenValueIsValid(obj[item])) {
        dataTweenValueIsNotValidWarning(`${item}: ${obj[item]}`);
        return {
          prop: item,
          toValue: 0,
          ease: getTweenFn(ease)
        };
      }
      return {
        prop: item,
        toValue: obj[item],
        ease: getTweenFn(ease)
      };
    });
  };
  var goFromSyncUtils = (obj, ease) => {
    return Object.keys(obj).map((item) => {
      if (!dataTweenValueIsValid(obj[item])) {
        dataTweenValueIsNotValidWarning(`${item}: ${obj[item]}`);
        return {
          prop: item,
          fromValue: 0,
          ease: getTweenFn(ease)
        };
      }
      return {
        prop: item,
        fromValue: obj[item],
        ease: getTweenFn(ease)
      };
    });
  };
  var goFromToSyncUtils = (fromObj, toObj, ease) => {
    return Object.keys(fromObj).map((item) => {
      if (!dataTweenValueIsValid(toObj[item]) || !dataTweenValueIsValid(fromObj[item])) {
        dataTweenValueIsNotValidWarning(
          `${item}: ${toObj[item]} || ${item}: ${fromObj[item]}`
        );
        return {
          prop: item,
          fromValue: 0,
          toValue: 0,
          ease: getTweenFn(ease)
        };
      }
      return {
        prop: item,
        fromValue: fromObj[item],
        toValue: toObj[item],
        ease: getTweenFn(ease)
      };
    });
  };

  // src/js/mobMotion/animation/utils/timeline/timelineConstant.js
  var directionConstant = {
    BACKWARD: "backward",
    FORWARD: "forward",
    NONE: "none"
  };

  // src/js/mobMotion/animation/sequencer/reduceFunction.js
  var propToSet = {
    fromValue: {
      get: "toValue",
      set: "fromValue"
    },
    toValue: {
      get: "toValue",
      set: "toValue"
    }
  };
  var getFirstValidValueBack = (arr, index, prop, propToFind) => {
    return arr.slice(0, index).reduceRight((previous, { values: valuesForward }) => {
      const result = valuesForward.find(
        ({ prop: propToCompare, active }) => {
          return active && propToCompare === prop;
        }
      );
      return result && !previous ? result[propToSet[propToFind].get] : previous;
    }, void 0);
  };
  var checkIsLastUsableProp = (arr, index, prop, partial) => {
    return arr.slice(index + 1).reduce((p, { start, values }) => {
      const nextActiveItem = values.find((nextItem) => {
        return nextItem.prop === prop && nextItem.active;
      });
      return nextActiveItem && start <= partial ? false : p;
    }, true);
  };

  // src/js/mobMotion/animation/sequencer/getValuesOnDraw.js
  var sequencerGetValusOnDraw = ({ timeline: timeline2, valuesState, partial }) => {
    return valuesState.map((valueItem) => {
      const item = timeline2.reduce(
        (previous, { start: start2, end: end2, values }, index) => {
          const currentValuesItem = values.find(
            ({ prop: prop2 }) => prop2 === valueItem.prop
          );
          if (!currentValuesItem || !currentValuesItem?.active || Object.keys(previous).length > 0 || valueItem.settled)
            return previous;
          const { prop, toValue: toValue2, fromValue: fromValue2, ease: ease2 } = currentValuesItem;
          const isLastUsableProp = checkIsLastUsableProp(
            timeline2,
            index,
            prop,
            partial
          );
          if (!isLastUsableProp) return previous;
          return {
            toValue: toValue2,
            fromValue: fromValue2,
            start: start2,
            end: end2,
            ease: ease2
          };
        },
        {}
      );
      if (Object.keys(item).length === 0) return valueItem;
      const { start, end, toValue, fromValue, ease } = item;
      const newToValue = mobCore.checkType(Number, toValue) ? toValue : (
        // @ts-ignore
        toValue()
      );
      const newFromValue = mobCore.checkType(Number, fromValue) ? fromValue : (
        // @ts-ignore
        fromValue()
      );
      const duration2 = end - start;
      const inactivePosition = partial < end ? newFromValue : newToValue;
      const newCurrentValue = partial >= start && partial <= end ? ease(
        partial - start,
        newFromValue,
        newToValue - newFromValue,
        duration2
      ) : inactivePosition;
      const newCurrentValueSanitize = Number.isNaN(newCurrentValue) ? inactivePosition : newCurrentValue;
      const currentValueRoudned = getRoundedValue(newCurrentValueSanitize);
      return {
        ...valueItem,
        currentValue: currentValueRoudned,
        settled: true
      };
    });
  };

  // src/js/mobMotion/animation/sequencer/setPropFromAncestor.js
  var setPropFromAncestor = ({ timeline: timeline2, activeProp }) => {
    return timeline2.map((item, index) => {
      const { values, propToFind } = item;
      const newValues = values.map((valueItem) => {
        const { prop, active } = valueItem;
        if (!active || !activeProp.includes(prop) || !propToFind || propToFind.length === 0)
          return valueItem;
        const previousValidValue = getFirstValidValueBack(
          timeline2,
          index,
          prop,
          propToFind
        );
        if (!previousValidValue) {
          return valueItem;
        }
        const newValueItem = {
          ...valueItem,
          [propToSet[propToFind].set]: previousValidValue
        };
        return newValueItem;
      });
      return {
        ...item,
        values: newValues
      };
    });
  };

  // src/js/mobMotion/animation/sequencer/orderRow.js
  var orderByProp = (arr, prop) => {
    return arr.sort((a, b) => {
      return a?.[prop] - b?.[prop];
    });
  };

  // src/js/mobMotion/animation/sequencer/insertNewRow.js
  var insertNewRow = ({
    timeline: timeline2,
    values,
    start,
    end,
    duration: duration2,
    propToFind
  }) => {
    const priority = timeline2.length === 0 ? 0 : 1;
    const newTimeline = [
      ...timeline2,
      {
        values,
        start: start ?? 0,
        end: end ?? duration2,
        priority,
        propToFind
      }
    ];
    const timelineOrderByStart = orderByProp(newTimeline, "start");
    return orderByProp(timelineOrderByStart, "priority");
  };

  // src/js/mobMotion/animation/sequencer/mergeNewValues.js
  var mergeNewValues = ({ data: data2, values }) => {
    return values.map((item) => {
      const itemToMerge = data2.find((newItem) => {
        return newItem.prop === item.prop;
      });
      return itemToMerge ? { ...item, ...itemToMerge, active: true } : {
        prop: item.prop,
        active: false
      };
    });
  };

  // src/js/mobMotion/animation/sequencer/handleSequencer.js
  var HandleSequencer = class {
    /**
     * @param {import('./type.js').sequencerProps} data
     *
     * @example
     * ```javascript
     * const mySequencer = new HandleSequencer({
     *   data: Object.<string, number>,
     *   duration: [ Number ],
     *   ease: [ String ],
     *   stagger:{
     *      each: [ Number ],
     *      from: [ Number|String|{x:number,y:number} ],
     *      grid: {
     *          col: [ Number ],
     *          row: [ Number ],
     *          direction: [ String ]
     *      },
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * mySequencer.goTo()
     * mySequencer.goFrom()
     * mySequencer.goFromTo()
     * mySequencer.add()
     * mySequencer.label()
     * mySequencer.subscribe()
     * mySequencer.subscribeCache()
     * mySequencer.onStop()
     *
     * ```
     */
    constructor(data2) {
      this.values = [];
      this.timeline = [];
      this.labels = [];
      this.callback = [];
      this.callbackCache = [];
      this.callbackOnStop = [];
      this.callbackAdd = [];
      this.unsubscribeCache = [];
      this.duration = durationIsValid(data2?.duration);
      this.type = "sequencer";
      this.defaultProp = {
        start: 0,
        end: this.duration,
        ease: easeIsValid(data2?.ease)
      };
      this.firstRun = true;
      this.forceAddFnAtFirstRun = true;
      this.direction = "none";
      this.lastPartial = 0;
      this.lastDirection = "none";
      this.stagger = getStaggerFromProps(data2);
      this.useStagger = true;
      this.staggerIsReady = false;
      const props = data2?.data || null;
      if (props) this.setData(props);
    }
    /**
     * @description
     * Inzialize stagger array
     */
    inzializeStagger() {
      if (this.staggerIsReady) return;
      if (this.stagger.each > 0 && (this.callbackCache.length > 0 || this.callback.length > 0)) {
        const cb = getStaggerArray(this.callbackCache, this.callback);
        if (this.stagger.grid.col > cb.length) {
          staggerIsOutOfRangeWarning(cb.length);
          return;
        }
        const { staggerArray, staggerArrayOnComplete } = setStagger({
          arrayDefault: cb,
          arrayOnStop: this.callbackOnStop,
          stagger: this.stagger,
          slowlestStagger: STAGGER_DEFAULT_INDEX_OBJ,
          //sequencer doesn't support fastestStagger
          fastestStagger: STAGGER_DEFAULT_INDEX_OBJ
          //sequencer doesn't support fastestStagger
        });
        if (this.callbackCache.length > this.callback.length) {
          this.callbackCache = staggerArray;
        } else {
          this.callback = staggerArray;
        }
        this.callbackOnStop = staggerArrayOnComplete;
      }
      this.staggerIsReady = true;
    }
    /**
     * @param {object} obj
     * @param {number} obj.partial
     * @param {boolean} obj.isLastDraw
     * @param {boolean} obj.useFrame
     * @param {import('../utils/timeline/type.js').directionType} obj.direction
     *
     * @example
     * ```javascript
     * mySequencer.draw(
     *      partial: 200,
     *      isLastDraw: true,
     *      useFrame: false,
     *      direction: ('backward'|'forward'|'none')
     * );
     *
     *
     * ```
     * @description
     */
    draw({
      partial = 0,
      isLastDraw = false,
      useFrame = false,
      direction: direction2 = directionConstant.NONE
    }) {
      if (useFrame) {
        this.onDraw({
          partial,
          isLastDraw,
          direction: direction2
        });
        return;
      }
      mobCore.useNextTick(
        () => this.onDraw({
          partial,
          isLastDraw,
          direction: direction2
        })
      );
    }
    /**
     * @private
     *
     * @param {object} obj
     * @param {number} obj.partial
     * @param {boolean} obj.isLastDraw
     * @param {import('../utils/timeline/type.js').directionType} obj.direction
     *
     */
    onDraw({
      partial = 0,
      isLastDraw = false,
      direction: direction2 = directionConstant.NONE
    }) {
      if (this.firstRun) {
        this.lastPartial = partial;
        this.actionAtFirstRender(partial);
      }
      if (!this.firstRun && this.lastPartial && (!direction2 || direction2 === directionConstant.NONE)) {
        this.direction = partial >= this.lastPartial ? directionConstant.FORWARD : directionConstant.BACKWARD;
      }
      if (!this.firstRun && (direction2 === directionConstant.BACKWARD || direction2 === directionConstant.FORWARD)) {
        this.direction = direction2;
      }
      this.values = [...this.values].map((item) => {
        return {
          ...item,
          settled: false
        };
      });
      this.values = sequencerGetValusOnDraw({
        timeline: this.timeline,
        valuesState: this.values,
        partial
      });
      const callBackObject = getValueObj(this.values, "currentValue");
      syncCallback({
        each: this.stagger.each,
        useStagger: this.useStagger,
        isLastDraw,
        callBackObject,
        callback: this.callback,
        callbackCache: this.callbackCache,
        callbackOnStop: this.callbackOnStop
      });
      this.fireAddCallBack(partial);
      this.useStagger = true;
      this.lastPartial = partial;
      this.lastDirection = this.direction;
      this.firstRun = false;
    }
    /**
     * @description
     * Methods call by syncTimeline, everty time user use play, playFrom etc.. or loop end.
     * Reset the data that control add callback to have a new clean state
     */
    resetLastValue() {
      this.firstRun = true;
      this.lastPartial = 0;
      this.lastDirection = directionConstant.NONE;
    }
    /**
     * @private
     *
     * @property {number} [ time=0 ]
     *
     * @description
     * Fire addCallback first time without check the previous position.
     * because first time we can start from any position and we doesn't a have previous position
     * So we fire the callback once
     * To skip this callback, check isForce prop in callback
     */
    actionAtFirstRender(time2 = 0) {
      if (!this.forceAddFnAtFirstRun) return;
      this.callbackAdd.forEach(({ fn, time: fnTime }) => {
        const mustFireForward = {
          shouldFire: time2 >= fnTime,
          direction: directionConstant.FORWARD
        };
        const mustFireBackward = {
          shouldFire: time2 <= fnTime,
          direction: directionConstant.BACKWARD
        };
        const mustFire = mustFireForward.shouldFire || mustFireBackward.shouldFire;
        if (!mustFire) return;
        const direction2 = mustFireForward.shouldFire ? mustFireForward.direction : mustFireBackward.direction;
        fn({ direction: direction2, value: time2, isForced: true });
      });
      this.forceAddFnAtFirstRun = false;
    }
    /**
     * @private
     *
     * @property {number} [ time=0 ]
     *
     * @description
     * Fire callBack at specific time
     *
     */
    fireAddCallBack(time2 = 0) {
      this.callbackAdd.forEach(({ fn, time: fnTime }) => {
        const mustFireForward = this.direction === directionConstant.FORWARD && time2 > fnTime && this.lastPartial <= fnTime;
        const mustFireBackward = this.direction === directionConstant.BACKWARD && time2 < fnTime && this.lastPartial >= fnTime;
        const mustFire = mustFireForward || mustFireBackward;
        if (!mustFire) return;
        fn({ direction: this.direction, value: time2, isForced: false });
      });
    }
    /**
     * @type {import('./type.js').sequencerSetStretchFacor}
     *
     * @description
     * Set factor between timeline duration and sequencer getDuration
     * So start and end propierties will be proportionate to the duration of the timeline
     * This methods is called by SyncTimeline
     */
    setStretchFactor(duration2 = 0) {
      const stretchFactor = duration2 / this.duration;
      this.timeline = [...this.timeline].map((item) => {
        const { start, end } = item;
        return {
          ...item,
          start: getRoundedValue(start * stretchFactor),
          end: getRoundedValue(end * stretchFactor)
        };
      });
      this.labels = [...this.labels].map((item) => {
        const { time: time2 } = item;
        return {
          ...item,
          time: getRoundedValue(time2 * stretchFactor)
        };
      });
      this.callbackAdd = [...this.callbackAdd].map((item) => {
        const { time: time2 } = item;
        return {
          ...item,
          time: getRoundedValue(time2 * stretchFactor)
        };
      });
    }
    /**
     * @type {import('./type.js').sequencerSetData}
     */
    setData(obj = {}) {
      this.values = Object.entries(obj).map((item) => {
        const [prop, value] = item;
        const isValid = initialDataPropValidate(prop, value);
        const valueSanitized = isValid ? value : 0;
        return {
          prop: isValid ? prop : "invalidProp",
          toValue: valueSanitized,
          fromValue: valueSanitized,
          currentValue: valueSanitized,
          active: false,
          settled: false,
          ease: getTweenFn(handleSetUp.get("sequencer").ease)
        };
      });
      this.goTo(obj, { start: 0, end: 0 });
      return this;
    }
    /**
     * @type {import('./type.js').sequencerGoTo}
     *
     * @example
     * ```javascript
     * mySequencer.goTo(
     *     { string: number|function, ... },
     *     { start: number, end: number, ease: string }
     * );
     *
     *
     * ```
     * @description
     * Transform some properties of your choice from the `current value` to the `entered value`, the transformation will start from the value associated with start and will end in the value associated with end.
     * The target value can be a number or a function that returns a number, when using a function the target value will become dynamic and will change in real time as the result of the function changes
     * It is possible to associate an easing to the transformation, this easing will be applied only in this transformation.
     */
    goTo(obj, props) {
      const propMerged = { ...this.defaultProp, ...props };
      const { start, end, ease } = propMerged;
      if (!sequencerRangeValidate({ start, end })) return this;
      const data2 = goToSyncUtils(obj, ease);
      const newValues = mergeNewValues({ data: data2, values: this.values });
      const activeProp = Object.keys(obj);
      const newTimeline = insertNewRow({
        timeline: this.timeline,
        values: newValues,
        start,
        end,
        duration: this.duration,
        propToFind: "fromValue"
      });
      this.timeline = setPropFromAncestor({
        timeline: newTimeline,
        activeProp
      });
      return this;
    }
    /**
     * @type {import('./type.js').sequencerGoFrom} obj  to values
     *
     * @example
     * ```javascript
     * mySequencer.goFrom(
     *     { string: number|function, ... },
     *     { start: number, end: number, ease: string }
     * );
     *
     *
     * ```
     * @description
     * Transform some properties of your choice from the `entered value` to the `current value`, the transformation will start from the value associated with start and will end in the value associated with end.
     * The target value can be a number or a function that returns a number, when using a function the target value will become dynamic and will change in real time as the result of the function changes
     * It is possible to associate an easing to the transformation, this easing will be applied only in this transformation.
     */
    goFrom(obj, props) {
      const propMerged = { ...this.defaultProp, ...props };
      const { start, end, ease } = propMerged;
      if (!sequencerRangeValidate({ start, end })) return this;
      const data2 = goFromSyncUtils(obj, ease);
      const newValues = mergeNewValues({ data: data2, values: this.values });
      const activeProp = Object.keys(obj);
      const newTimeline = insertNewRow({
        timeline: this.timeline,
        values: newValues,
        start,
        end,
        duration: this.duration,
        propToFind: "toValue"
      });
      this.timeline = setPropFromAncestor({
        timeline: newTimeline,
        activeProp
      });
      return this;
    }
    /**
     * @type {import('./type.js').sequencerGoFromTo}
     *
     * @example
     * ```javascript
     * mySequencer.goFromTo(
     *     { string: number|function, ... },
     *     { string: number|function, ... },
     *     { start: number, end: number, ease: string }
     * );
     *
     *
     * ```
     *
     * @description
     * Transform some properties of your choice from the `first entered value` to the `second entered value`, the transformation will start from the value associated with start and will end in the value associated with end.
     * The target value can be a number or a function that returns a number, when using a function the target value will become dynamic and will change in real time as the result of the function changes
     * It is possible to associate an easing to the transformation, this easing will be applied only in this transformation.
     */
    goFromTo(fromObj, toObj, props) {
      const propMerged = { ...this.defaultProp, ...props };
      const { start, end, ease } = propMerged;
      if (!sequencerRangeValidate({ start, end })) return this;
      if (!compareKeys(fromObj, toObj)) {
        compareKeysWarning("sequencer goFromTo:", fromObj, toObj);
        return;
      }
      const data2 = goFromToSyncUtils(fromObj, toObj, ease);
      const newValues = mergeNewValues({ data: data2, values: this.values });
      this.timeline = insertNewRow({
        timeline: this.timeline,
        values: newValues,
        start,
        end,
        duration: this.duration,
        propToFind: ""
      });
      return this;
    }
    /**
     * @type {import('./type.js').sequencerLabel}
     *
     * @example
     * ```javascript
     * mySequencer.label('mylabel',5);
     *
     *
     * ```
     * @description
     * Adds a label associated with a specific step in a range between 0 and duration (default: 10).
     * Both syncTimeline and scrollTrigger will take care of processing the value as needed
     */
    label(name = "", time2 = 0) {
      this.labels.push({ name, time: time2 });
      return this;
    }
    /**
     * Return the array of entered labels
     * @type {import('./type.js').sequencerGetLabels}
     */
    getLabels() {
      return this.labels;
    }
    /**
     * @type {import('./type.js').sequencerAdd}
     *
     * @description
     * Fire a function at a step in a range greater the 0 and minor duration.
     * Both syncTimeline and scrollTrigger will take care of processing the value as needed.
     *
     * To interpect both end ( 0 and duration )
     * use the syncTimeline/scrollTrigger built in function:
     */
    add(fn = () => {
    }, time2 = 0) {
      const fnIsValid = mobCore.checkType(Function, fn);
      const timeIsValid = mobCore.checkType(Number, time2);
      const addIsValid = fnIsValid && timeIsValid;
      if (!fnIsValid) syncTimelineAddFnWarning(fn);
      if (!timeIsValid) syncTimelineAddTimeWarning(time2);
      if (!addIsValid) return this;
      this.callbackAdd.push({ fn, time: time2 });
      return this;
    }
    /**
     * @type {import('./type.js').sequencerSubscribe}
     *
     * @description
     * Callback that returns updated values ready to be usable, it is advisable to use it for single elements, although it works well on a not too large number of elements (approximately 100-200 elements) for large staggers it is advisable to use the subscribeCache method.
     */
    subscribe(cb = () => {
    }) {
      const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
        cb,
        this.callback
      );
      this.callback = arrayOfCallbackUpdated;
      return () => this.callback = unsubscribeCb(this.callback);
    }
    /**
     * @type {import('./type.js').sequencerOnStop}
     *
     * @description
     *  Similar to subscribe this callBack is launched when the data calculation stops (when the timeline ends or the scroll trigger is inactive).
     *  Useful for applying a different style to an inactive element.
     *  A typical example is to remove the teansform3D property:
     */
    onStop(cb) {
      const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
        cb,
        this.callbackOnStop
      );
      this.callbackOnStop = arrayOfCallbackUpdated;
      return () => this.callbackOnStop = unsubscribeCb(this.callbackOnStop);
    }
    /**
     * @type {import('./type.js').sequencerSubscribeCache}
     *
     * @description
     * Callback that returns updated values ready to be usable, specific to manage large staggers.
     */
    subscribeCache(item, fn = () => {
    }) {
      const { arrayOfCallbackUpdated, unsubscribeCb, unsubscribeCache } = setCallBackCache(
        item,
        fn,
        this.callbackCache,
        this.unsubscribeCache
      );
      this.callbackCache = arrayOfCallbackUpdated;
      this.unsubscribeCache = unsubscribeCache;
      return () => this.callbackCache = unsubscribeCb(this.callbackCache);
    }
    /**
     * @description
     * Get duration
     * @type {import('./type.js').sequencerGetDuration}
     */
    getDuration() {
      return this.duration;
    }
    /**
     * @description
     * Set duration
     * @type {import('./type.js').sequencerSetDuration}
     */
    setDuration(val2 = 0) {
      this.duration = val2;
    }
    /**
     * @type {import('./type.js').sequencerGetType}
     * @description
     * Get tween type - 'sequencer'
     */
    getType() {
      return this.type;
    }
    /**
     * @description
     * Removes all references of staggers not yet started by the handleCache function, method used by HandleSyncTimeline when it is stopped
     */
    cleanCachedId() {
      this.callbackCache.forEach(({ cb }) => mobCore.useCache.clean(cb));
    }
    /**
     * @description
     * Disable stagger for one run
     **/
    disableStagger() {
      this.useStagger = false;
    }
    /**
     * @type {() => void}
     * @description
     * Destroy sequencer
     */
    destroy() {
      this.values = [];
      this.timeline = [];
      this.callback = [];
      this.callbackCache = [];
      this.callbackOnStop = [];
      this.callbackAdd = [];
      this.unsubscribeCache.forEach((unsubscribe3) => unsubscribe3());
      this.unsubscribeCache = [];
    }
  };

  // src/js/mobMotion/animation/spring/getValuesOndraw.js
  var springGetValuesOndraw = ({
    values,
    tension,
    friction,
    mass,
    precision,
    fps: fps2
  }) => {
    return values.map((item) => {
      const { currentValue, toValue, velocity } = item;
      const tensionForce = -tension * (currentValue - toValue);
      const dampingForce = -friction * velocity;
      const acceleration = (tensionForce + dampingForce) / mass;
      const newVelocity = velocity + acceleration * 1 / fps2;
      const rawCurrentValue = currentValue + newVelocity * 1 / fps2;
      const newCurrentValue = getRoundedValue(rawCurrentValue);
      const isVelocity = Math.abs(newVelocity) <= 0.1;
      const isDisplacement = tension === 0 ? true : Math.abs(toValue - newCurrentValue) <= precision;
      const settled = isVelocity && isDisplacement;
      if (settled) {
        return {
          ...item,
          currentValue: toValue,
          velocity: newVelocity,
          settled: true
        };
      }
      return {
        ...item,
        currentValue: newCurrentValue,
        velocity: newVelocity,
        settled: false
      };
    });
  };

  // src/js/mobMotion/animation/spring/handleSpring.js
  var HandleSpring = class {
    /**
     * @param {import('./type.js').springTweenProps} [ data = {} ]
     *
     * @example
     * ```javascript
     * const mySpring = new HandleSpring({
     *   data: Object.<string, number>,
     *   config: String,
     *   configProp: {
     *      tension: Number,
     *      mass: Number,
     *      friction: Number,
     *      velocity: Number,
     *      precision: Number,
     *   },
     *   relative: Boolean
     *   stagger:{
     *      each: Number,
     *      from: Number|String|{x:number,y:number},
     *      grid: {
     *          col: Number,
     *          row: Number,
     *          direction: String,
     *      },
     *      waitComplete: Boolean,
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * mySpring.set()
     * mySpring.goTo()
     * mySpring.goFrom()
     * mySpring.goFromTo()
     * mySpring.subscribe()
     * mySpring.subscribeCache()
     * mySpring.onComplete()
     * mySpring.updateConfigProp()
     * mySpring.updateConfig()
     * mySpring.getId()
     * mySpring.get()
     * mySpring.getTo()
     * mySpring.getFrom()
     * mySpring.getToNativeType()
     * mySpring.getFromNativeType()
     *
     * ```
     */
    constructor(data2) {
      this.stagger = getStaggerFromProps(data2);
      this.relative = relativeIsValid(data2?.relative, "spring");
      this.configProps = springConfigIsValidAndGetNew(data2?.config);
      this.updateConfigProp(data2?.configProp);
      this.uniqueId = mobCore.getUnivoqueId();
      this.isActive = false;
      this.currentResolve = void 0;
      this.currentReject = void 0;
      this.promise = void 0;
      this.values = [];
      this.initialData = [];
      this.callback = [];
      this.callbackCache = [];
      this.callbackOnComplete = [];
      this.callbackStartInPause = [];
      this.unsubscribeCache = [];
      this.pauseStatus = false;
      this.firstRun = true;
      this.useStagger = true;
      this.fpsInLoading = false;
      this.defaultProps = {
        reverse: false,
        configProps: this.configProps,
        relative: this.relative,
        immediate: false,
        immediateNoPromise: false
      };
      this.slowlestStagger = STAGGER_DEFAULT_INDEX_OBJ;
      this.fastestStagger = STAGGER_DEFAULT_INDEX_OBJ;
      const props = data2?.data || null;
      if (props) this.setData(props);
    }
    /**
     * @param {number} _time
     * @param {number} fps
     * @param {Function} res
     * @param {number} tension
     * @param {number} friction
     * @param {number} mass
     * @param {number} precision
     *
     * @returns {void}
     */
    draw(_time, fps2, res = () => {
    }, tension, friction, mass, precision) {
      this.isActive = true;
      this.values = springGetValuesOndraw({
        values: this.values,
        tension,
        friction,
        mass,
        precision,
        fps: fps2
      });
      const callBackObject = getValueObj(this.values, "currentValue");
      defaultCallback({
        stagger: this.stagger,
        callback: this.callback,
        callbackCache: this.callbackCache,
        callBackObject,
        useStagger: this.useStagger
      });
      const allSettled = this.values.every((item) => item.settled === true);
      if (allSettled) {
        const onComplete2 = () => {
          this.isActive = false;
          this.values = [...this.values].map((item) => {
            return {
              ...item,
              fromValue: item.toValue
            };
          });
          if (!this.pauseStatus) {
            res();
            this.promise = void 0;
            this.currentReject = void 0;
            this.currentResolve = void 0;
          }
        };
        const cbObjectSettled = getValueObj(this.values, "toValue");
        defaultCallbackOnComplete({
          onComplete: onComplete2,
          callback: this.callback,
          callbackCache: this.callbackCache,
          callbackOnComplete: this.callbackOnComplete,
          callBackObject: cbObjectSettled,
          stagger: this.stagger,
          slowlestStagger: this.slowlestStagger,
          fastestStagger: this.fastestStagger,
          useStagger: this.useStagger
        });
        return;
      }
      mobCore.useFrame(() => {
        mobCore.useNextTick(({ time: time2, fps: fps3 }) => {
          if (this.isActive)
            this.draw(
              time2,
              fps3,
              res,
              tension,
              friction,
              mass,
              precision
            );
        });
      });
    }
    /**
     * @private
     *
     * @param {number} time current global time
     * @param {number} fps current FPS
     * @param {Function} res current promise resolve
     **/
    onReuqestAnim(time2, fps2, res) {
      this.values = [...this.values].map((item) => {
        return {
          ...item,
          velocity: Math.trunc(this.configProps.velocity)
        };
      });
      const tension = this.configProps.tension;
      const friction = this.configProps.friction;
      const mass = Math.max(1, this.configProps.mass);
      const precision = this.configProps.precision;
      this.draw(time2, fps2, res, tension, friction, mass, precision);
    }
    /**
     * @description
     * Inzialize stagger array
     *
     * @returns {Promise<any>}
     */
    async inzializeStagger() {
      if (shouldInizializzeStagger(
        this.stagger.each,
        this.firstRun,
        this.callbackCache,
        this.callback
      )) {
        const { averageFPS } = await mobCore.useFps();
        fpsLoadedLog("spring", averageFPS);
        const cb = getStaggerArray(this.callbackCache, this.callback);
        if (this.stagger.grid.col > cb.length) {
          staggerIsOutOfRangeWarning(cb.length);
          this.firstRun = false;
          return;
        }
        const {
          staggerArray,
          staggerArrayOnComplete,
          fastestStagger,
          slowlestStagger
        } = setStagger({
          arrayDefault: cb,
          arrayOnStop: this.callbackOnComplete,
          stagger: this.stagger,
          slowlestStagger: this.slowlestStagger,
          fastestStagger: this.fastestStagger
        });
        if (this.callbackCache.length > this.callback.length) {
          this.callbackCache = staggerArray;
        } else {
          this.callback = staggerArray;
        }
        this.callbackOnComplete = staggerArrayOnComplete;
        this.slowlestStagger = slowlestStagger;
        this.fastestStagger = fastestStagger;
        this.firstRun = false;
      }
      return { ready: true };
    }
    /**
     * @private
     * @param {(value:any) => void} res
     * @param {(value:any) => void} reject
     *
     * @returns {Promise}
     */
    async startRaf(res, reject) {
      if (this.fpsInLoading) return;
      this.currentResolve = res;
      this.currentReject = reject;
      if (this.firstRun) {
        this.fpsInLoading = true;
        await this.inzializeStagger();
        this.fpsInLoading = false;
      }
      initRaf(
        this.callbackStartInPause,
        this.onReuqestAnim.bind(this),
        this.pause.bind(this),
        res
      );
    }
    /**
     * @type {import('./type.js').springStop}
     */
    stop({ clearCache = true } = {}) {
      if (this.pauseStatus) this.pauseStatus = false;
      this.values = setFromToByCurrent(this.values);
      if (this.isActive && clearCache)
        this.callbackCache.forEach(({ cb }) => mobCore.useCache.clean(cb));
      if (this.currentReject) {
        this.currentReject(mobCore.ANIMATION_STOP_REJECT);
        this.promise = void 0;
        this.currentReject = void 0;
        this.currentResolve = void 0;
      }
      if (this.isActive) {
        this.isActive = false;
      }
    }
    /**
     * @type {import('./type.js').springPause}
     */
    pause() {
      if (this.pauseStatus) return;
      this.pauseStatus = true;
      if (this.isActive) this.isActive = false;
      this.values = setFromByCurrent(this.values);
    }
    /**
     * @type {import('./type.js').springResume}
     */
    resume() {
      if (!this.pauseStatus) return;
      this.pauseStatus = false;
      if (!this.isActive && this.currentResolve) {
        resume(this.onReuqestAnim.bind(this), this.currentResolve);
      }
    }
    /**
     * @param {Record<string, number>} obj Initial data structure
     * @returns {void}
     *
     * @description
     * Set initial data structure, the method is call by data prop in constructor. In case of need it can be called after creating the instance
     *
     *
     * @example
     * ```javascript
     *
     *
     * mySpring.setData({ val: 100 });
     * ```
     */
    setData(obj) {
      this.values = Object.entries(obj).map((item) => {
        const [prop, value] = item;
        return {
          prop,
          toValue: value,
          fromValue: value,
          velocity: this.configProps.velocity,
          currentValue: value,
          fromFn: () => 0,
          fromIsFn: false,
          toFn: () => 0,
          toIsFn: false,
          settled: false
        };
      });
      this.initialData = this.values.map((item) => {
        return {
          prop: item.prop,
          toValue: item.toValue,
          fromValue: item.fromValue,
          currentValue: item.currentValue
        };
      });
    }
    /**
     * @type {import('./type.js').springResetData}
     */
    resetData() {
      this.values = mergeDeep(this.values, this.initialData);
    }
    /**
     * @private
     * @type  {import('./type.js').springMergeProps}
     *
     * @description
     * Merge special props with default props
     */
    mergeProps(props) {
      const springParams = handleSetUp.get("spring");
      const allPresetConfig = springParams.config;
      const newConfigPreset = springConfigIsValid(props?.config) ? (
        // @ts-ignore
        allPresetConfig[props.config]
      ) : this.defaultProps.configProps;
      const configPropsToMerge = springConfigPropIsValid(props?.configProp);
      const newConfigProps = { ...newConfigPreset, ...configPropsToMerge };
      const newProps = {
        ...this.defaultProps,
        ...props,
        configProps: newConfigProps
      };
      const { configProps, relative } = newProps;
      this.configProps = configProps;
      this.relative = relative;
      return newProps;
    }
    /**
     * @type {import('./type.js').springGoTo}
     */
    goTo(obj, props = {}) {
      if (this.pauseStatus) return;
      this.useStagger = true;
      const data2 = goToUtils(obj);
      return this.doAction(data2, props, obj);
    }
    /**
     * @type {import('./type.js').springGoFrom}
     */
    goFrom(obj, props = {}) {
      if (this.pauseStatus) return;
      this.useStagger = true;
      const data2 = goFromUtils(obj);
      return this.doAction(data2, props, obj);
    }
    /**
     * @type {import('./type.js').springGoFromTo}
     */
    goFromTo(fromObj, toObj, props = {}) {
      if (this.pauseStatus) return;
      this.useStagger = true;
      if (!compareKeys(fromObj, toObj)) {
        compareKeysWarning("spring goFromTo:", fromObj, toObj);
        return this.promise;
      }
      const data2 = goFromToUtils(fromObj, toObj);
      return this.doAction(data2, props, fromObj);
    }
    /**
     * @type {import('./type.js').springSet}
     */
    set(obj, props = {}) {
      if (this.pauseStatus) return;
      this.useStagger = false;
      const data2 = setUtils(obj);
      return this.doAction(data2, props, obj);
    }
    /**
     * @private
     * @type {import('./type.js').springDoAction} data Updated data
     */
    doAction(data2, props, obj) {
      this.values = mergeArray(data2, this.values);
      const { reverse, immediate, immediateNoPromise } = this.mergeProps(props);
      if (valueIsBooleanAndTrue(reverse, "reverse"))
        this.values = setReverseValues(obj, this.values);
      this.values = setRelative(this.values, this.relative);
      if (valueIsBooleanAndTrue(immediate, "immediate ")) {
        this.isActive = false;
        this.values = setFromCurrentByTo(this.values);
        return Promise.resolve();
      }
      if (valueIsBooleanAndTrue(immediateNoPromise, "immediateNoPromise")) {
        this.isActive = false;
        this.values = setFromCurrentByTo(this.values);
        return;
      }
      if (!this.isActive) {
        this.promise = new Promise((res, reject) => {
          this.startRaf(res, reject);
        });
      }
      if (this.promise) return this.promise;
    }
    /**
     * @description
     * Get current values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').springGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.get();
     * ```
     */
    get() {
      return getValueObj(this.values, "currentValue");
    }
    /**
     * @description
     * Get initial values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').springGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.getIntialData();
     * ```
     */
    getInitialData() {
      return getValueObj(this.initialData, "currentValue");
    }
    /**
     * @description
     * Get from values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').springGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.getFrom();
     * ```
     */
    getFrom() {
      return getValueObj(this.values, "fromValue");
    }
    /**
     * @description
     * Get to values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').springGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.getTo();
     * ```
     */
    getTo() {
      return getValueObj(this.values, "toValue");
    }
    /**
     * @description
     * Get From values, if the single value is a function it returns the same function.
     *
     * @type {import('./type.js').springGetValueNative}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.getFromNativeType();
     * ```
     */
    getFromNativeType() {
      return getValueObjFromNative(this.values);
    }
    /**
     * @description
     * Get To values, if the single value is a function it returns the same function.
     *
     * @type {import('./type.js').springGetValueNative}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = mySpring.getToNativeType();
     * ```
     */
    getToNativeType() {
      return getValueObjToNative(this.values);
    }
    /**
     * @description
     * Get tween type
     *
     * @type {import('./type.js').springGetType} tween type
     *
     * @example
     * ```javascript
     *
     *
     * const type = mySpring.getType();
     * ```
     */
    getType() {
      return "SPRING";
    }
    /**
     * @description
     * Get univoque Id
     *
     * @type {import('./type.js').springGetId}
     *
     * @example
     * ```javascript
     *
     *
     * const type = mySpring.getId();
     * ```
     */
    getId() {
      return this.uniqueId;
    }
    /**
     * @type {import('./type.js').springUdateConfigProp}
     *
     *  @example
     *  ```javascript
     *  mySpring.updateConfigProp({
     *      mass: 2,
     *      friction: 5
     *  })
     *
     *
     *  ```
     *
     * @description
     * Update config object, every || some properties
     * The change will be persistent
     */
    updateConfigProp(configProp = {}) {
      const configToMerge = springConfigPropIsValid(configProp);
      this.configProps = { ...this.configProps, ...configToMerge };
      this.defaultProps = mergeDeep(this.defaultProps, {
        configProps: configToMerge
      });
    }
    /**
     *
     * @description
     * updateConfig - Update config object with new preset
     *
     * @type {import('./type.js').springUdateConfig}
     *
     */
    updateConfig(config) {
      this.configProps = springConfigIsValidAndGetNew(config);
      this.defaultProps = mergeDeep(this.defaultProps, {
        configProps: this.configProps
      });
    }
    /**
     * @type {import('./type.js').springSubscribe}
     *
     * ```
     * @description
     * Callback that returns updated values ready to be usable, it is advisable to use it for single elements, although it works well on a not too large number of elements (approximately 100-200 elements) for large staggers it is advisable to use the subscribeCache method .
     */
    subscribe(cb) {
      const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
        cb,
        this.callback
      );
      this.callback = arrayOfCallbackUpdated;
      return () => this.callback = unsubscribeCb(this.callback);
    }
    /**
     * Support callback to asyncTimeline.
     * Callback to manage the departure of tweens in a timeline. If a delay is applied to the tween and before the delay ends the timeline pauses the tween at the end of the delay will automatically pause.
     * Add callback to start in pause to stack
     *
     * @param  {() => void} cb cal function
     * @return {() => void} unsubscribe callback
     *
     */
    onStartInPause(cb) {
      const { arrayOfCallbackUpdated } = setCallBack(
        cb,
        this.callbackStartInPause
      );
      this.callbackStartInPause = arrayOfCallbackUpdated;
      return () => this.callbackStartInPause = [];
    }
    /**
     * @type {import('./type.js').springOnComplete}
     *
     *
     * @description
     *  Similar to subscribe this callBack is launched when the data calculation stops (when the timeline ends or the scroll trigger is inactive).
     *  Useful for applying a different style to an inactive element.
     *  A typical example is to remove the teansform3D property:
     **/
    onComplete(cb) {
      const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
        cb,
        this.callbackOnComplete
      );
      this.callbackOnComplete = arrayOfCallbackUpdated;
      return () => this.callbackOnComplete = unsubscribeCb(this.callbackOnComplete);
    }
    /**
     * @type {import('./type.js').springSubscribeCache}
     *
     * @description
     * Callback that returns updated values ready to be usable, specific to manage large staggers.
     */
    subscribeCache(item, fn) {
      const { arrayOfCallbackUpdated, unsubscribeCb, unsubscribeCache } = setCallBackCache(
        item,
        fn,
        this.callbackCache,
        this.unsubscribeCache
      );
      this.callbackCache = arrayOfCallbackUpdated;
      this.unsubscribeCache = unsubscribeCache;
      return () => this.callbackCache = unsubscribeCb(this.callbackCache);
    }
    /**
     * @description
     * Destroy tween
     */
    destroy() {
      if (this.promise) this.stop();
      this.callbackOnComplete = [];
      this.callbackStartInPause = [];
      this.callback = [];
      this.callbackCache = [];
      this.values = [];
      this.promise = void 0;
      this.unsubscribeCache.forEach((unsubscribe3) => unsubscribe3());
      this.unsubscribeCache = [];
    }
  };

  // src/js/mobMotion/animation/tween/getValuesOnDraw.js
  var tweenGetValueOnDraw = ({
    values,
    timeElapsed: timeElapsed2,
    duration: duration2,
    ease
  }) => {
    return values.map((item) => {
      if (item.shouldUpdate) {
        const rawCurrentValue = ease(
          timeElapsed2,
          item.fromValue,
          item.toValProcessed,
          duration2
        );
        return {
          ...item,
          currentValue: getRoundedValue(rawCurrentValue)
        };
      }
      return {
        ...item,
        currentValue: item.fromValue
      };
    });
  };

  // src/js/mobMotion/animation/tween/handleTween.js
  var HandleTween = class {
    /**
     * @param {import('./type.js').tweenProps} [ data ]
     *
     * @example
     * ```javascript
     * const myTween = new HandleTween({
     *   data: Object.<string, number>,
     *   duration: Number,
     *   ease: String,
     *   relative: Boolean
     *   stagger:{
     *      each: Number,
     *      from: Number|String|{x:number,y:number},
     *      grid: {
     *          col: Number,
     *          row: Number,
     *          direction: String
     *      },
     *      waitComplete: Boolean,
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * myTween.set()
     * myTween.goTo()
     * myTween.goFrom()
     * myTween.goFromTo()
     * myTween.subscribe()
     * myTween.subscribeCache()
     * myTween.onComplete()
     * myTween.updateEase()
     * myTween.getId()
     * myTween.get()
     * myTween.getTo()
     * myTween.getFrom()
     * myTween.getToNativeType()
     * myTween.getFromNativeType()
     *
     * ```
     */
    constructor(data2) {
      this.ease = easeTweenIsValidGetFunction(data2?.ease);
      this.duration = durationIsNumberOrFunctionIsValid(data2?.duration);
      this.relative = relativeIsValid(data2?.relative, "tween");
      this.stagger = getStaggerFromProps(data2);
      this.uniqueId = mobCore.getUnivoqueId();
      this.isActive = false;
      this.currentResolve = void 0;
      this.currentReject = void 0;
      this.promise = void 0;
      this.values = [];
      this.initialData = [];
      this.callback = [];
      this.callbackCache = [];
      this.callbackOnComplete = [];
      this.callbackStartInPause = [];
      this.unsubscribeCache = [];
      this.pauseStatus = false;
      this.comeFromResume = false;
      this.startTime = 0;
      this.isRunning = false;
      this.timeElapsed = 0;
      this.pauseTime = 0;
      this.firstRun = true;
      this.useStagger = true;
      this.fpsInLoading = false;
      this.defaultProps = {
        duration: this.duration,
        ease: easeTweenIsValid(data2?.ease),
        relative: this.relative,
        reverse: false,
        immediate: false,
        immediateNoPromise: false
      };
      this.slowlestStagger = STAGGER_DEFAULT_INDEX_OBJ;
      this.fastestStagger = STAGGER_DEFAULT_INDEX_OBJ;
      const props = data2?.data || null;
      if (props) this.setData(props);
    }
    /**
     * @param {number} time
     * @param {Function} res
     *
     * @returns {void}
     */
    draw(time2, res = () => {
    }) {
      this.isActive = true;
      if (this.pauseStatus) {
        this.pauseTime = time2 - this.startTime - this.timeElapsed;
      }
      this.timeElapsed = time2 - this.startTime - this.pauseTime;
      if (this.isRunning && Math.round(this.timeElapsed) >= this.duration) {
        this.timeElapsed = this.duration;
      }
      this.values = tweenGetValueOnDraw({
        values: this.values,
        timeElapsed: this.timeElapsed,
        duration: this.duration,
        ease: this.ease
      });
      const isSettled = Math.round(this.timeElapsed) === this.duration;
      const callBackObject = getValueObj(this.values, "currentValue");
      defaultCallback({
        stagger: this.stagger,
        callback: this.callback,
        callbackCache: this.callbackCache,
        callBackObject,
        useStagger: this.useStagger
      });
      this.isRunning = true;
      if (isSettled) {
        const onComplete2 = () => {
          this.isActive = false;
          this.isRunning = false;
          this.pauseTime = 0;
          this.values = [...this.values].map((item) => {
            if (!item.shouldUpdate) return item;
            return {
              ...item,
              toValue: item.currentValue,
              fromValue: item.currentValue
            };
          });
          if (!this.pauseStatus) {
            res();
            this.promise = void 0;
            this.currentReject = void 0;
            this.currentResolve = void 0;
          }
        };
        defaultCallbackOnComplete({
          onComplete: onComplete2,
          callback: this.callback,
          callbackCache: this.callbackCache,
          callbackOnComplete: this.callbackOnComplete,
          callBackObject,
          stagger: this.stagger,
          slowlestStagger: this.slowlestStagger,
          fastestStagger: this.fastestStagger,
          useStagger: this.useStagger
        });
        return;
      }
      mobCore.useFrame(() => {
        mobCore.useNextTick(({ time: time3 }) => {
          if (this.isActive) this.draw(time3, res);
        });
      });
    }
    /**
     * @private
     * @param {number} time current global time
     * @param {boolean} _fps current FPS
     * @param {Function} res current promise resolve
     *
     * @returns {void}
     **/
    onReuqestAnim(time2, _fps, res) {
      this.startTime = time2;
      this.draw(time2, res);
    }
    /**
     * @description
     * Inzialize stagger array
     *
     * @returns {Promise<any>}
     */
    async inzializeStagger() {
      if (shouldInizializzeStagger(
        this.stagger.each,
        this.firstRun,
        this.callbackCache,
        this.callback
      )) {
        const { averageFPS } = await mobCore.useFps();
        fpsLoadedLog("tween", averageFPS);
        const cb = getStaggerArray(this.callbackCache, this.callback);
        if (this.stagger.grid.col > cb.length) {
          staggerIsOutOfRangeWarning(cb.length);
          this.firstRun = false;
          return;
        }
        const {
          staggerArray,
          staggerArrayOnComplete,
          fastestStagger,
          slowlestStagger
        } = setStagger({
          arrayDefault: cb,
          arrayOnStop: this.callbackOnComplete,
          stagger: this.stagger,
          slowlestStagger: this.slowlestStagger,
          fastestStagger: this.fastestStagger
        });
        if (this.callbackCache.length > this.callback.length) {
          this.callbackCache = staggerArray;
        } else {
          this.callback = staggerArray;
        }
        this.callbackOnComplete = staggerArrayOnComplete;
        this.slowlestStagger = slowlestStagger;
        this.fastestStagger = fastestStagger;
        this.firstRun = false;
      }
      return { ready: true };
    }
    /**
     * @private
     * @param {(value:any) => void} res
     * @param {(value:any) => void} reject
     *
     * @returns {Promise}
     */
    async startRaf(res, reject) {
      if (this.fpsInLoading) return;
      this.currentResolve = res;
      this.currentReject = reject;
      if (this.firstRun) {
        this.fpsInLoading = true;
        await this.inzializeStagger();
        this.fpsInLoading = false;
      }
      initRaf(
        this.callbackStartInPause,
        this.onReuqestAnim.bind(this),
        this.pause.bind(this),
        res
      );
    }
    /**
     * @type {import('./type.js').tweenStop}
     */
    stop({ clearCache = true } = {}) {
      this.pauseTime = 0;
      this.pauseStatus = false;
      this.comeFromResume = false;
      this.values = setFromToByCurrent(this.values);
      if (this.isActive && clearCache)
        this.callbackCache.forEach(({ cb }) => mobCore.useCache.clean(cb));
      if (this.currentReject) {
        this.currentReject(mobCore.ANIMATION_STOP_REJECT);
        this.promise = void 0;
        this.currentReject = void 0;
        this.currentResolve = void 0;
      }
      this.isActive = false;
    }
    /**
     * @type {import('./type.js').tweenPause}
     */
    pause() {
      if (this.pauseStatus) return;
      this.pauseStatus = true;
    }
    /**
     * @type {import('./type.js').tweenResume}
     */
    resume() {
      if (!this.pauseStatus) return;
      this.pauseStatus = false;
      this.comeFromResume = true;
    }
    /**
     * @type {import('./type.js').tweenSetData}
     */
    setData(obj) {
      this.values = Object.entries(obj).map((item) => {
        const [prop, value] = item;
        return {
          prop,
          toValue: value,
          toValueOnPause: value,
          toValProcessed: value,
          fromValue: value,
          currentValue: value,
          shouldUpdate: false,
          fromFn: () => 0,
          fromIsFn: false,
          toFn: () => 0,
          toIsFn: false,
          settled: false
          // not used, only for uniformity with lerp and spring
        };
      });
      this.initialData = this.values.map((item) => {
        return {
          prop: item.prop,
          toValue: item.toValue,
          fromValue: item.fromValue,
          currentValue: item.currentValue,
          shouldUpdate: false,
          fromFn: () => 0,
          fromIsFn: false,
          toFn: () => 0,
          toIsFn: false,
          settled: false
          // not used, only for uniformity with lerp and spring
        };
      });
    }
    /**
     * @type {import('./type.js').tweenResetData}
     */
    resetData() {
      this.values = mergeDeep(this.values, this.initialData);
    }
    /**
     * @private
     *
     * @description
     * Reject promise and update form value with current
     *
     * @returns {void}
     */
    updateDataWhileRunning() {
      this.isActive = false;
      if (this.currentReject) {
        this.currentReject(mobCore.ANIMATION_STOP_REJECT);
        this.promise = void 0;
      }
      this.values = [...this.values].map((item) => {
        if (!item.shouldUpdate) return item;
        return {
          ...item,
          fromValue: item.currentValue
        };
      });
    }
    /**
     * @private
     *
     * @type  {import('./type.js').tweenMergeProps}
     *
     * @description
     * Merge special props with default props
     *
     */
    mergeProps(props) {
      const newProps = { ...this.defaultProps, ...props };
      const { ease, duration: duration2, relative } = newProps;
      this.ease = easeTweenIsValidGetFunction(ease);
      this.relative = relativeIsValid(relative, "tween");
      this.duration = durationIsNumberOrFunctionIsValid(duration2);
      return newProps;
    }
    /**
     * @type {import('./type.js').tweenGoTo} obj to Values
     */
    goTo(obj, props = {}) {
      if (this.pauseStatus || this.comeFromResume) this.stop();
      this.useStagger = true;
      const data2 = goToUtils(obj);
      return this.doAction(data2, props, obj);
    }
    /**
     * @type {import('./type.js').tweenGoFrom}
     */
    goFrom(obj, props = {}) {
      if (this.pauseStatus || this.comeFromResume) this.stop();
      this.useStagger = true;
      const data2 = goFromUtils(obj);
      return this.doAction(data2, props, obj);
    }
    /**
     * @type {import('./type.js').tweenGoFromTo}
     */
    goFromTo(fromObj, toObj, props = {}) {
      if (this.pauseStatus || this.comeFromResume) this.stop();
      this.useStagger = true;
      if (!compareKeys(fromObj, toObj)) {
        compareKeysWarning("tween goFromTo:", fromObj, toObj);
        return this.promise;
      }
      const data2 = goFromToUtils(fromObj, toObj);
      return this.doAction(data2, props, fromObj);
    }
    /**
     * @type {import('./type.js').tweenSet}
     */
    set(obj, props = {}) {
      if (this.pauseStatus || this.comeFromResume) this.stop();
      this.useStagger = false;
      const data2 = setUtils(obj);
      props.duration = 1;
      return this.doAction(data2, props, obj);
    }
    /**
     * @private
     * @type {import('./type.js').tweenDoAction} data Updated data
     */
    doAction(data2, props, obj) {
      this.values = mergeArrayTween(data2, this.values);
      if (this.isActive) this.updateDataWhileRunning();
      const { reverse, immediate, immediateNoPromise } = this.mergeProps(props);
      if (valueIsBooleanAndTrue(reverse, "reverse"))
        this.value = setReverseValues(obj, this.values);
      this.values = setRelativeTween(this.values, this.relative);
      if (valueIsBooleanAndTrue(immediate, "immediate ")) {
        this.isActive = false;
        this.values = setFromCurrentByTo(this.values);
        return Promise.resolve();
      }
      if (valueIsBooleanAndTrue(immediateNoPromise, "immediateNoPromise")) {
        this.isActive = false;
        this.values = setFromCurrentByTo(this.values);
        return;
      }
      if (!this.isActive) {
        this.promise = new Promise((res, reject) => {
          this.startRaf(res, reject);
        });
      }
      if (this.promise) return this.promise;
    }
    /**
     * @description
     * Get current values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').tweenGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.get();
     * ```
     */
    get() {
      return getValueObj(this.values, "currentValue");
    }
    /**
     * @description
     * Get initial values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').tweenGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.getIntialData();
     * ```
     */
    getInitialData() {
      return getValueObj(this.initialData, "currentValue");
    }
    /**
     * @description
     * Get from values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').tweenGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.getFrom();
     * ```
     */
    getFrom() {
      return getValueObj(this.values, "fromValue");
    }
    /**
     * @description
     * Get to values, If the single value is a function it returns the result of the function.
     *
     * @type {import('./type.js').tweenGetValue}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.getTo();
     * ```
     */
    getTo() {
      return getValueObj(this.values, "toValue");
    }
    /**
     * @description
     * Get From values, if the single value is a function it returns the same function.
     *
     * @type {import('./type.js').tweenGetValueNative}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.getFromNativeType();
     * ```
     */
    getFromNativeType() {
      return getValueObjFromNative(this.values);
    }
    /**
     * @description
     * Get To values, if the single value is a function it returns the same function.
     *
     * @type {import('./type.js').tweenGetValueNative}
     *
     * @example
     * ```javascript
     *
     *
     * const { prop } = myTween.getToNativeType();
     * ```
     */
    getToNativeType() {
      return getValueObjToNative(this.values);
    }
    /**
     * @description
     * Get tween type
     *
     * @type {import('./type.js').tweenGetType} tween type
     *
     * @example
     * ```javascript
     *
     *
     * const type = myTween.getType();
     * ```
     */
    getType() {
      return "TWEEN";
    }
    /**
     * @description
     * Get univoque Id
     *
     * @type {import('./type.js').tweenGetId}
     *
     * @example
     * ```javascript
     *
     *
     * const type = myTween.getId();
     * ```
     */
    getId() {
      return this.uniqueId;
    }
    /**
     * Update ease with new preset
     *
     * @type {import('./type.js').tweenUpdateEase}
     *
     */
    updateEase(ease) {
      this.ease = easeTweenIsValidGetFunction(ease);
      this.defaultProps = mergeDeep(this.defaultProps, {
        ease
      });
    }
    /**
     * @type {import('./type.js').tweenSubscribe}
     *
     * ```
     * @description
     * Callback that returns updated values ready to be usable, it is advisable to use it for single elements, although it works well on a not too large number of elements (approximately 100-200 elements) for large staggers it is advisable to use the subscribeCache method .
     */
    subscribe(cb) {
      const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
        cb,
        this.callback
      );
      this.callback = arrayOfCallbackUpdated;
      return () => this.callback = unsubscribeCb(this.callback);
    }
    /**
     * Support callback to asyncTimeline.
     * Callback to manage the departure of tweens in a timeline. If a delay is applied to the tween and before the delay ends the timeline pauses the tween at the end of the delay will automatically pause.
     * Add callback to start in pause to stack
     *
     * @param  {() => void} cb cal function
     * @return {() => void} unsubscribe callback
     *
     */
    onStartInPause(cb) {
      const { arrayOfCallbackUpdated } = setCallBack(
        cb,
        this.callbackStartInPause
      );
      this.callbackStartInPause = arrayOfCallbackUpdated;
      return () => this.callbackStartInPause = [];
    }
    /**
     * @type {import('./type.js').tweenOnComplete}
     *
     *
     * @description
     *  Similar to subscribe this callBack is launched when the data calculation stops (when the timeline ends or the scroll trigger is inactive).
     *  Useful for applying a different style to an inactive element.
     *  A typical example is to remove the teansform3D property:
     **/
    onComplete(cb) {
      const { arrayOfCallbackUpdated, unsubscribeCb } = setCallBack(
        cb,
        this.callbackOnComplete
      );
      this.callbackOnComplete = arrayOfCallbackUpdated;
      return () => this.callbackOnComplete = unsubscribeCb(this.callbackOnComplete);
    }
    /**
     * @type {import('./type.js').tweenSubscribeCache}
     *
     * @description
     * Callback that returns updated values ready to be usable, specific to manage large staggers.
     */
    subscribeCache(item, fn) {
      const { arrayOfCallbackUpdated, unsubscribeCb, unsubscribeCache } = setCallBackCache(
        item,
        fn,
        this.callbackCache,
        this.unsubscribeCache
      );
      this.callbackCache = arrayOfCallbackUpdated;
      this.unsubscribeCache = unsubscribeCache;
      return () => this.callbackCache = unsubscribeCb(this.callbackCache);
    }
    /**
     * @description
     * Destroy tween
     *
     * @returns {void}
     */
    destroy() {
      if (this.promise) this.stop();
      this.callbackOnComplete = [];
      this.callbackStartInPause = [];
      this.callback = [];
      this.callbackCache = [];
      this.values = [];
      this.promise = void 0;
      this.unsubscribeCache.forEach((unsubscribe3) => unsubscribe3());
      this.unsubscribeCache = [];
    }
  };

  // src/js/mobMotion/animation/sequencer/createStagger.js
  var getStaggerEqual = ({ each, duration: duration2, numItem, index, eachByNumItem }) => {
    if (each === 1) {
      const stepDuration = duration2 / numItem;
      const start = getRoundedValue(index * stepDuration);
      const end = getRoundedValue(start + stepDuration);
      return { start, end };
    }
    const unit = duration2 / numItem;
    const staggerDuration = unit * eachByNumItem;
    const remainSpace = duration2 - staggerDuration;
    const validNumItem = numItem - 1 > 0 ? numItem - 1 : 1;
    const remainSpaceUnit = remainSpace / validNumItem;
    const staggerStart = remainSpaceUnit * index;
    return {
      start: getRoundedValue(staggerStart),
      end: getRoundedValue(staggerDuration + staggerStart)
    };
  };
  var getStaggerSpecial = ({
    duration: duration2,
    numItem,
    index,
    eachByNumItem,
    type
  }) => {
    const unit = duration2 / numItem;
    const cleanStart = unit * index;
    const noopSpace = duration2 - (duration2 - cleanStart);
    const gap = noopSpace / numItem * eachByNumItem;
    if (type === STAGGER_TYPE_START) {
      return {
        start: 0,
        end: getRoundedValue(duration2 - (cleanStart - gap))
      };
    }
    if (type === STAGGER_TYPE_CENTER) {
      const space = (cleanStart - gap) / 2;
      return {
        start: getRoundedValue(space),
        end: getRoundedValue(duration2 - space)
      };
    }
    if (type === STAGGER_TYPE_END) {
      return {
        start: getRoundedValue(cleanStart - gap),
        end: getRoundedValue(duration2)
      };
    }
    return {
      start: 0,
      end: duration2
    };
  };
  var createStaggers = (data2) => {
    const items = staggerItemsIsValid(data2?.items);
    const stagger = getStaggerFromProps(data2);
    const duration2 = durationIsValid(data2?.duration);
    const eachProportion = 10;
    let each = stagger?.each || 1;
    const fallBack = [...items].map((item, i) => {
      return {
        item,
        start: 0,
        end: duration2,
        index: i
      };
    });
    if (!validateStaggerItems(items)) {
      return fallBack;
    }
    if (stagger.grid?.col > items.length) {
      staggerIsOutOfRangeWarning(items.length);
      each = 1;
    }
    if (mobCore.checkType(Number, each) && (each > eachProportion || each < 1)) {
      createStaggerEachWarning(eachProportion);
      each = 1;
    }
    const { staggerArray } = setStagger({
      arrayDefault: [...items].map((item) => ({ item })),
      arrayOnStop: [],
      stagger,
      slowlestStagger: STAGGER_DEFAULT_INDEX_OBJ,
      fastestStagger: STAGGER_DEFAULT_INDEX_OBJ
    });
    const staggerArrayFiltered = staggerArray.filter(
      ({ item }) => mobCore.checkType(Element, item) || mobCore.checkType(Object, item)
    );
    if (staggerArrayFiltered.length === 0) {
      createStaggerItemsTypeWarning();
      return fallBack;
    }
    const frameArray = staggerArrayFiltered.map(({ frame }) => frame);
    const frameSet = [...new Set(frameArray)].sort((a, b) => a - b);
    const numItem = frameSet.length;
    const staggers = staggerArrayFiltered.map(({ item, frame }) => {
      const index = frameSet.indexOf(frame);
      const eachByNumItem = each * numItem / eachProportion;
      const { start, end } = (() => {
        if (stagger.type === STAGGER_TYPE_EQUAL) {
          return getStaggerEqual({
            each,
            duration: duration2,
            numItem,
            index,
            eachByNumItem
          });
        }
        if (stagger.type === STAGGER_TYPE_START || stagger.type === STAGGER_TYPE_END || stagger.type === STAGGER_TYPE_CENTER) {
          return getStaggerSpecial({
            duration: duration2,
            numItem,
            index,
            eachByNumItem,
            type: stagger.type
          });
        }
        return {
          start: 0,
          end: duration2
        };
      })();
      return {
        item,
        start,
        end,
        index
      };
    });
    return staggers;
  };

  // src/js/mobMotion/tween.js
  var tween = {
    /**
     * @param {import('./animation/parallax/type.js').parallaxTweenType} data
     * @return {ParallaxTween}
     *
     * @example
     * ```javascript
     * Property schema:
     *
     *
     * const myScrollerTween = tween.createScrollerTween({
     *   from: Object.<string, number>,
     *   to: Object.<string, number>,
     *   ease: [ String ],
     *   stagger:{
     *      each: [ Number ],
     *      from: [ Number|String|{x:number,y:number} ],
     *      grid: {
     *          col: [ Number ],
     *          row: [ Number ],
     *          direction: [ String ]
     *      },
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Simplified tween specific to be used with scrollTrigger as an alternative to the more complex sequencer, ParallaxTween requires only one mutation step (from / to).
     *
     * Available methods:
     * ```javascript
     * myScrollerTween.subscribe()
     * myScrollerTween.subscribeCache()
     * myScrollerTween.onStop()
     *
     * ```
     */
    createScrollerTween(data2) {
      return new ParallaxTween(data2);
    },
    /**
     * @param {import('./animation/sequencer/type.js').sequencerProps} data
     * @returns {HandleSequencer}
     *
     * @example
     * ```javascript
     * Property schema:
     *
     *
     * const mySequencer = tween.createSequencer({
     *   data: Object.<string, number>,
     *   duration: [ Number ],
     *   ease: [ String ],
     *   stagger:{
     *      each: [ Number ],
     *      from: [ Number|String|{x:number,y:number} ],
     *      grid: {
     *          col: [ Number ],
     *          row: [ Number ],
     *          direction: [ String ]
     *      },
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * mySequencer.goTo()
     * mySequencer.goFrom()
     * mySequencer.goFromTo()
     * mySequencer.add()
     * mySequencer.label()
     * mySequencer.subscribe()
     * mySequencer.subscribeCache()
     * mySequencer.onStop()
     *
     * ```
     */
    createSequencer(data2) {
      return new HandleSequencer(data2);
    },
    /**
     * @description
     *
      Support class for grouping multiple sequencers.
      Very useful when generating sequencers dynamically, such as through the use of a createStagger.
      The following example uses a timeline but the same can be done using a scrollTrigger.
     *
     *
     * @example
     *
     * ```javascript
     * cont masterSequencer = tween.createMasterSequencer();
     * const staggers = tween.createStaggers({})
     * staggers.forEach(({ item, start, end, index }) => {
     *     const sequencer = tween
     *         .createSequencer({ ... })
     *         .goTo({ ... }, { start, end ...});
     *     sequencer.subscribe(({ ... }) => { ... });
     *     masterSequencer.add(sequencer);
     * });
     * const timeline = timeline.createSyncTimeline({}).add(masterSequencer)
     * ```
     */
    createMasterSequencer() {
      return new HandleMasterSequencer();
    },
    /**
     * @param { import('./animation/sequencer/type.js').createSequencerType & import('./animation/utils/stagger/type.js').staggerPropiertiesObject } data
     * @returns {Array<{ start: Number, end: Number,index: Number, item: (HTMLElement|Object) }>} Stagger array
     *
     * @example
     * ```javascript
     * Property schema:
     *
     *
     * const staggers = tween.createStaggers({
     *     items: Array.<Element|Object>,
     *     stagger: {
     *         type: [ String ],
     *         from: [ Number|String|{x:number,y:number} ],
     *         grid: {
     *             col: [ Number ],
     *             row: [ Number ],
     *             direction: [ String ]
     *         },
     *     },
     *     duration: [ Number ],
     * });
     *
     *
     * staggers.forEach(({ item, start, end, index }) => {
     *     const sequencer = tween
     *         .createSequencer({ ... })
     *         .goTo({ ... }, { start, end ...});
     *     sequencer.subscribe(({ ... }) => { ... });
     *     masterSequencer.add(sequencer);
     * });
     *
     * ```
     *
     * @description
     *
     * ```
     */
    createStaggers(data2) {
      return createStaggers(data2);
    },
    /**
     * @param {import('./animation/tween/type.js').tweenProps} data
     * @returns {HandleTween}
     *
     * @example
     * ```javascript
     * Property schema:
     *
     *
     * const myTween = tween.createTween({
     *   data: Object.<string, number>,
     *   duration: [ Number ],
     *   ease: [ String ],
     *   relative: [ Boolean ]
     *   stagger:{
     *      each: [ Number ],
     *      from: [ Number|String|{x:number,y:number} ],
     *      grid: {
     *          col: [ Number ],
     *          row: [ Number ],
     *          direction: [ String ]
     *      },
     *      waitComplete: [ Boolean ],
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * myTween.set()
     * myTween.goTo()
     * myTween.goFrom()
     * myTween.goFromTo()
     * myTween.subscribe()
     * myTween.subscribeCache()
     * myTween.onComplete()
     * myTween.updateEase()
     * myTween.getId()
     * myTween.get()
     * myTween.getTo()
     * myTween.getFrom()
     * myTween.getToNativeType()
     * myTween.getFromNativeType()
     *
     * ```
     */
    createTween(data2) {
      return new HandleTween(data2);
    },
    /**
     * @param {import('./animation/spring/type.js').springTweenProps} data
     * @returns {HandleSpring}
     *
     *
     * @example
     * ```javascript
     * Property schema:
     *
     *
     * const mySpring = tween.createSpring({
     *   data: Object.<string, number>,
     *   config: [ String ],
     *   configProp: {
     *      tension: [ Number ],
     *      mass: [ Number ],
     *      friction: [ Number ],
     *      velocity: [ Number ],
     *      precision: [ Number ],
     *   },
     *   relative: [ Boolean ]
     *   stagger:{
     *      each: [ Number ],
     *      from: [ Number|String|{x:number,y:number} ],
     *      grid: {
     *          col: [ Number ],
     *          row: [ Number ],
     *          direction: [ String ],
     *      },
     *      waitComplete: [ Boolean ],
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * mySpring.set()
     * mySpring.goTo()
     * mySpring.goFrom()
     * mySpring.goFromTo()
     * mySpring.subscribe()
     * mySpring.subscribeCache()
     * mySpring.onComplete()
     * mySpring.updateConfigProp()
     * mySpring.updateConfig()
     * mySpring.getId()
     * mySpring.get()
     * mySpring.getTo()
     * mySpring.getFrom()
     * mySpring.getToNativeType()
     * mySpring.getFromNativeType()
     *
     * ```
     */
    createSpring(data2) {
      return new HandleSpring(data2);
    },
    /**
     * @param {import('./animation/lerp/type.js').lerpTweenProps} data
     * @returns {HandleLerp}
     *
     * @example
     * ```javascript
     * Property schema:
     *
     *
     * const myLerp = tween.createLerp({
     *   data: Object.<string, number>,
     *   precision: [ Number ],
     *   velocity: [ Number ],
     *   relative: [ Boolean ]
     *   stagger:{
     *      each: [ Number ],
     *      from: [ Number|String|{x:number,y:number} ],
     *      grid: {
     *          col: [ Number ],
     *          row: [ Number ],
     *          direction: [ String ],
     *      },
     *      waitComplete: [ Boolean ],
     *   },
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * myLerp.set()
     * myLerp.goTo()
     * myLerp.goFrom()
     * myLerp.goFromTo()
     * myLerp.subscribe()
     * myLerp.subscribeCache()
     * myLerp.onComplete()
     * myLerp.updateVelocity()
     * myLerp.updatePrecision()
     * myLerp.getId()
     * myLerp.get()
     * myLerp.getTo()
     * myLerp.getFrom()
     * myLerp.getToNativeType()
     * myLerp.getFromNativeType()
     *
     * ```
     */
    createLerp(data2) {
      return new HandleLerp(data2);
    }
  };

  // src/js/mobMotion/utils/functionsUtils.js
  var NOOP = () => {
  };
  var pipe = (...functions) => (input) => functions.reduce(
    (chain, func) => chain.then(func),
    Promise.resolve(input)
  );

  // src/js/mobMotion/animation/asyncTimeline/asyncReduceData.js
  var asyncReduceData = (data2, activeData) => {
    return Object.entries(data2).map((item) => {
      const [prop, val2] = item;
      const valueIsValid = prop in activeData;
      return { data: { [prop]: val2 }, active: valueIsValid };
    }).filter(({ active }) => active).map(({ data: data3 }) => data3).reduce((p, c) => {
      return { ...p, ...c };
    }, {});
  };

  // src/js/mobMotion/animation/asyncTimeline/asyncReduceTween.js
  var asyncReduceTween = (tweenList, tween3, index) => {
    let currentId = tween3?.getId?.();
    const initialData = tween3?.getInitialData?.() || {};
    return tweenList.slice(0, index).reduce((p, c) => {
      const currentFirstData = c[0].data;
      const action2 = currentFirstData.action;
      if (action2 === "sync") {
        const syncProp = currentFirstData?.syncProp;
        const from = {
          // tween: syncProp.from,
          id: syncProp.from?.getId?.()
        };
        const to = {
          tween: syncProp.to,
          id: syncProp.to?.getId?.()
        };
        if (from.id === currentId) {
          currentId = to.id;
        }
      }
      const currentTween = c.find(({ data: data2 }) => {
        const uniqueId = data2?.tween?.getId?.();
        return uniqueId === currentId;
      });
      currentTween?.data?.tween?.set?.(currentTween?.data?.valuesTo, {
        immediateNoPromise: true
      });
      const currentValueTo = currentTween?.data?.tween?.getToNativeType?.();
      const propsInUse = currentValueTo && currentTween ? asyncReduceData(currentValueTo, currentTween.data.valuesTo) : {};
      return { ...p, ...propsInUse };
    }, initialData);
  };

  // src/js/mobMotion/animation/asyncTimeline/loopCallback.js
  var resolveTweenPromise = ({
    reject,
    res,
    isStopped: isStopped2,
    startOnDelay,
    previousSessionId,
    currentSessionId,
    isInPause,
    tween: tween3,
    fn,
    action: action2,
    addToActiveTween
  }) => {
    if (isStopped2 || startOnDelay || previousSessionId !== currentSessionId) {
      reject();
      return;
    }
    const unsubscribeActiveTween = addToActiveTween(tween3);
    const unsubscribeTweenStartInPause = tween3 && tween3?.onStartInPause ? tween3.onStartInPause(() => {
      return isInPause;
    }) : NOOP;
    fn[action2]().then(() => res({ resolve: true })).catch(() => {
    }).finally(() => {
      unsubscribeActiveTween();
      unsubscribeTweenStartInPause();
    });
  };

  // src/js/mobMotion/animation/asyncTimeline/handleAsyncTimeline.js
  var HandleAsyncTimeline = class {
    /**
     * @param {import('./type').asyncTimelineType} data
     *
     * @example
     * ```javascript
     * const myTimeline = new HandleAsyncTimeline({
     *   yoyo: [ Boolean ],
     *   repeat: [ Number ],
     *   freeMode: [ Number ],
     *   autoSet: [ Number ],
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     *
     * `Methods to create timeline`
     * myTimeline.set()
     * myTimeline.goTo()
     * myTimeline.goFrom()
     * myTimeline.goFromTo()
     * myTimeline.add()
     * myTimeline.addAsync()
     * myTimeline.sync()
     * myTimeline.createGroup()
     * myTimeline.closeGroup()
     * myTimeline.suspend()
     * myTimeline.label()
     *
     *
     * `Methods to control timeline`
     * myTimeline.play()
     * myTimeline.playFromLabel()
     * myTimeline.playFrom()
     * myTimeline.playFromReverse()
     * myTimeline.playReverse()
     * myTimeline.reverseNext()
     * myTimeline.stop()
     * myTimeline.pause()
     * myTimeline.resume()
     * myTimeline.isActive()
     * myTimeline.isPaused()
     * myTimeline.isSuspended()
     * myTimeline.getDirection()
     * myTimeline.setTween()
     * myTimeline.get()
     * myTimeline.onLoopEnd()
     * myTimeline.onComplete()
     * myTimeline.destroy()
     * ```
     */
    constructor(data2) {
      this.repeat = repeatIsValid(data2?.repeat);
      this.yoyo = valueIsBooleanAndReturnDefault(
        data2?.yoyo,
        "asyncTimeline: yoyo",
        false
      );
      this.freeMode = valueIsBooleanAndReturnDefault(
        data2?.freeMode,
        "asyncTimeline: freeMode",
        false
      );
      this.autoSet = valueIsBooleanAndReturnDefault(
        data2?.autoSet,
        "asyncTimeline: autoSet",
        false
      );
      this.tweenList = [];
      this.currentTween = [];
      this.tweenStore = [];
      this.waitComplete = false;
      this.defaultObj = {
        id: -1,
        tween: void 0,
        action: "",
        valuesFrom: {},
        valuesTo: {},
        prevValueTo: {},
        prevValueSettled: false,
        tweenProps: {},
        groupProps: {},
        syncProp: {
          to: {
            getId: () => "",
            set: () => Promise.resolve(),
            goTo: () => Promise.resolve(),
            goFromTo: () => Promise.resolve(),
            getToNativeType: () => {
            },
            destroy: () => {
            },
            onStartInPause: () => {
            },
            resetData: () => {
            },
            getInitialData: () => {
            },
            stop: () => {
            },
            pause: () => {
            },
            resume: () => {
            }
          },
          from: {
            getId: () => "",
            set: () => Promise.resolve(),
            goTo: () => Promise.resolve(),
            goFromTo: () => Promise.resolve(),
            getToNativeType: () => {
            },
            destroy: () => {
            },
            onStartInPause: () => {
            },
            resetData: () => {
            },
            getInitialData: () => {
            },
            stop: () => {
            },
            pause: () => {
            },
            resume: () => {
            }
          }
        },
        labelProps: {}
      };
      this.labelState = {
        active: false,
        index: -1,
        isReverse: false
      };
      this.starterFunction = {
        fn: () => {
        },
        active: false
      };
      this.groupCounter = 1;
      this.groupId = void 0;
      this.currentTweenCounter = 0;
      this.currentIndex = 0;
      this.loopCounter = 1;
      this.isReverseNext = false;
      this.forceYoyo = false;
      this.isReverse = false;
      this.isInPause = false;
      this.isInSuspension = false;
      this.addAsyncIsActive = false;
      this.isStopped = true;
      this.delayIsRunning = false;
      this.startOnDelay = false;
      this.actionAfterReject = {
        active: false,
        fn: () => {
        }
      };
      this.sessionId = 0;
      this.activetweenCounter = 0;
      this.timeOnPause = 0;
      this.autoSetIsJustCreated = false;
      this.currentAction = [];
      this.fpsIsInLoading = false;
      this.id = 0;
      this.callbackLoop = [];
      this.callbackComplete = [];
      this.currentResolve = void 0;
      this.currentReject = void 0;
    }
    /**
     * @private
     * @type {() => void}
     */
    run() {
      const currentTweelist = this.tweenList[this.currentIndex];
      const lastAction = this.currentAction;
      this.currentAction = [];
      if (!currentTweelist) return;
      this.tweenList[this.currentIndex] = currentTweelist.map((item) => {
        const { data: data2 } = item;
        const { tween: tween3, valuesTo, prevValueSettled } = data2;
        if (tween3 && tween3?.getToNativeType && !prevValueSettled) {
          const values = tween3.getToNativeType();
          const propsInUse = asyncReduceData(values, valuesTo);
          return {
            ...item,
            data: {
              ...data2,
              prevValueTo: propsInUse,
              prevValueSettled: true
            }
          };
        }
        return item;
      });
      const tweenPromises = currentTweelist.map((item) => {
        const { data: data2 } = item;
        const {
          tween: tween3,
          action: action2,
          valuesFrom,
          valuesTo,
          tweenProps,
          syncProp,
          id
        } = data2;
        const newTweenProps = { ...tweenProps };
        delete newTweenProps.delay;
        const { active: labelIsActive, index: labelIndex } = this.labelState;
        const isImmediate = Number.isNaN(labelIndex) ? false : labelIsActive && labelIndex && // @ts-ignore
        this.currentIndex < labelIndex;
        if (isImmediate) newTweenProps.immediate = true;
        if (tweenProps && "relative" in tweenProps && tweenProps.relative) {
          tweenProps.relative = false;
          relativePropInsideTimelineWarning();
        }
        this.currentAction.push({ id, action: action2 });
        const prevActionIsCurrent = lastAction.find(
          ({ id: prevId, action: prevAction }) => {
            return prevId === id && prevAction === action2;
          }
        );
        const fn = {
          set: () => {
            return tween3?.[action2](valuesFrom, newTweenProps);
          },
          goTo: () => {
            return tween3?.[action2](valuesTo, newTweenProps);
          },
          goFrom: () => {
            return tween3?.[action2](valuesFrom, newTweenProps);
          },
          goFromTo: () => {
            return tween3?.[action2](valuesFrom, valuesTo, newTweenProps);
          },
          sync: () => {
            return new Promise((res) => {
              const { from, to } = syncProp;
              to?.set(from?.getToNativeType(), {
                immediate: true
              }).then(() => res({ resolve: true }));
            });
          },
          add: () => {
            if (prevActionIsCurrent) {
              return new Promise((res) => res({ resolve: true }));
            }
            return new Promise((res) => {
              if (isImmediate) {
                res({ resolve: true });
                return;
              }
              const direction2 = this.getDirection();
              tween3({
                direction: direction2,
                loop: this.loopCounter
              });
              res({ resolve: true });
            });
          },
          addAsync: () => {
            this.addAsyncIsActive = true;
            const sessionId = this.sessionId;
            if (prevActionIsCurrent) {
              return new Promise((res) => res({ resolve: true }));
            }
            return new Promise((res, reject) => {
              if (isImmediate) {
                res({ resolve: true });
                return;
              }
              const direction2 = this.getDirection();
              tween3({
                direction: direction2,
                loop: this.loopCounter,
                resolve: () => {
                  if (sessionId === this.sessionId) {
                    res({ resolve: true });
                    return;
                  }
                  reject();
                }
              });
            });
          },
          createGroup: () => {
            return new Promise((res) => res({ resolve: true }));
          },
          closeGroup: () => {
            return new Promise((res) => res({ resolve: true }));
          },
          label: () => {
            return new Promise((res) => res({ resolve: true }));
          },
          suspend: () => {
            if (prevActionIsCurrent) {
              return new Promise((res) => res({ resolve: true }));
            }
            const valueIsValid = mobCore.checkType(Boolean, tween3());
            if (!valueIsValid) timelineSuspendWarning(tween3);
            const sholudSuspend = valueIsValid ? tween3() : true;
            return new Promise((res) => {
              if (!isImmediate && sholudSuspend) {
                this.isInSuspension = true;
              }
              res({ resolve: true });
            });
          }
        };
        return new Promise((res, reject) => {
          const delay = isImmediate ? false : tweenProps?.delay;
          const previousSessionId = this.sessionId;
          if (delay) {
            const start = mobCore.getTime();
            this.delayIsRunning = true;
            requestAnimationFrame(() => {
              this.loopOnDelay({
                start,
                deltaTimeOnpause: 0,
                delay,
                reject,
                res,
                previousSessionId,
                tween: tween3,
                fn,
                action: action2
              });
            });
            return;
          }
          resolveTweenPromise({
            reject,
            res,
            isStopped: this.isStopped,
            startOnDelay: this.startOnDelay,
            isInPause: this.isInPause,
            addToActiveTween: (tween4) => this.addToActiveTween(tween4),
            currentSessionId: this.sessionId,
            previousSessionId,
            tween: tween3,
            fn,
            action: action2
          });
        });
      });
      const waitComplete = this.tweenList[this.currentIndex].some((item) => {
        return item.data.groupProps?.waitComplete;
      });
      const promiseType = waitComplete ? "all" : "race";
      Promise[promiseType](tweenPromises).then(() => {
        if (this.isInSuspension || this.isStopped) return;
        const {
          active: labelIsActive,
          index: labelIndex,
          isReverse: labelIsReverse
        } = this.labelState;
        const { fn: starterFunction, active: starterFunctionIsActive } = this.starterFunction;
        if (starterFunctionIsActive && labelIsActive && // @ts-ignore
        this.currentIndex === labelIndex - 1) {
          this.starterFunction.active = false;
          this.disableLabel();
          this.loopCounter++;
          starterFunction();
          return;
        }
        if (labelIsActive && labelIsReverse && // @ts-ignore
        this.currentIndex === labelIndex - 1) {
          this.reverseNext();
        }
        if (this.isReverseNext) {
          this.isReverseNext = false;
          this.currentIndex = this.tweenList.length - this.currentIndex - 1;
          this.disableLabel();
          this.revertTween();
          this.run();
          return;
        }
        if (this.currentIndex < this.tweenList.length - 1) {
          this.currentIndex++;
          this.run();
          return;
        }
        if (this.loopCounter < this.repeat || this.repeat === -1) {
          if (labelIsActive && labelIndex === this.tweenList.length && !this.freeMode) {
            const tweenPromise = this.tweenStore.map(
              ({ tween: tween3 }) => {
                const data2 = asyncReduceTween(
                  this.tweenList,
                  tween3,
                  this.tweenList.length
                );
                return new Promise((resolve, reject) => {
                  tween3.set(data2).then(() => resolve({ resolve: true })).catch(() => reject());
                });
              }
            );
            Promise.all(tweenPromise).then(() => {
              this.onRepeat();
            }).catch(() => {
            });
            return;
          }
          this.onRepeat();
          return;
        }
        this.callbackComplete.forEach(({ cb }) => cb());
        this.isStopped = true;
        if (this.currentResolve) {
          handleNextFrame.add(() => {
            handleNextTick.add(() => {
              this.currentResolve?.({ resolve: true });
            });
          });
        }
      }).catch(() => {
        if (this.actionAfterReject.active) {
          console.log("actionAfterReject fired");
          this.actionAfterReject.fn();
          this.actionAfterReject.fn = () => {
          };
          this.actionAfterReject.active = false;
          return;
        }
      }).finally(() => {
        this.addAsyncIsActive = false;
      });
    }
    loopOnDelay({
      start,
      deltaTimeOnpause,
      delay,
      reject,
      res,
      previousSessionId,
      tween: tween3,
      fn,
      action: action2
    }) {
      const current = mobCore.getTime();
      let delta = current - start;
      if (this.isInPause) deltaTimeOnpause = current - this.timeOnPause;
      if (this.actionAfterReject.active) {
        deltaTimeOnpause = 0;
        delta = delay;
      }
      if (delta - deltaTimeOnpause >= delay || this.isStopped || this.isReverseNext) {
        this.delayIsRunning = false;
        resolveTweenPromise({
          reject,
          res,
          isStopped: this.isStopped,
          startOnDelay: this.startOnDelay,
          isInPause: this.isInPause,
          addToActiveTween: (tween4) => {
            return this.addToActiveTween(tween4);
          },
          currentSessionId: this.sessionId,
          previousSessionId,
          tween: tween3,
          fn,
          action: action2
        });
        return;
      }
      requestAnimationFrame(() => {
        this.loopOnDelay({
          start,
          deltaTimeOnpause,
          delay,
          reject,
          res,
          previousSessionId,
          tween: tween3,
          fn,
          action: action2
        });
      });
    }
    /**
     * @private
     * @type {() => void}
     */
    onRepeat() {
      if (this.loopCounter > 0) {
        const direction2 = this.getDirection();
        this.callbackLoop.forEach(
          ({ cb }) => cb({
            direction: direction2,
            loop: this.loopCounter
          })
        );
      }
      this.loopCounter++;
      this.currentIndex = 0;
      this.disableLabel();
      if (this.yoyo || this.forceYoyo) this.revertTween();
      this.forceYoyo = false;
      this.run();
    }
    /**
     * @private
     * @type {import('./type').addToActiveTween}
     */
    addToActiveTween(tween3) {
      const tweenId = tween3?.getId && tween3.getId();
      if (!tweenId) return NOOP;
      const prevActiveTweenCounter = this.activetweenCounter;
      this.activetweenCounter++;
      this.currentTween.push({
        tween: tween3,
        uniqueId: tweenId,
        id: prevActiveTweenCounter
      });
      return () => {
        this.currentTween = this.currentTween.filter(
          ({ id }) => id !== prevActiveTweenCounter
        );
      };
    }
    /**
     * @private
     * @type {() => void}
     */
    revertTween() {
      this.isReverse = !this.isReverse;
      this.tweenList = this.tweenList.reverse().map((group) => {
        return group.reverse().map((item) => {
          const { data: data2 } = item;
          const { action: action2, valuesFrom, syncProp, prevValueTo, valuesTo } = data2;
          const currentValueTo = valuesTo;
          const { from, to } = syncProp;
          switch (action2) {
            case "goTo": {
              return {
                ...item,
                data: {
                  ...data2,
                  valuesTo: prevValueTo,
                  prevValueTo: currentValueTo
                }
              };
            }
            case "goFromTo": {
              return {
                ...item,
                data: {
                  ...data2,
                  valuesFrom: valuesTo,
                  valuesTo: valuesFrom
                }
              };
            }
            case "sync": {
              return {
                ...item,
                data: {
                  ...data2,
                  syncProp: {
                    ...syncProp,
                    from: to,
                    to: from
                  }
                }
              };
            }
            case "goFrom": {
              timelineReverseGoFromWarning();
              this.stop();
            }
          }
          return item;
        });
      });
    }
    /**
     * @private
     * @type {import('./type').addToMainArray}
     */
    addToMainArray(obj) {
      const rowIndex = this.tweenList.findIndex((item) => {
        return item[0]?.group && item[0].group === this.groupId;
      });
      if (rowIndex !== -1) {
        this.tweenList[rowIndex].push({ group: this.groupId, data: obj });
        return;
      }
      this.tweenList.push([{ group: this.groupId, data: obj }]);
    }
    /**
     * @private
     * @type {import('./type').addTweenToStore} tween
     */
    addTweenToStore(tween3) {
      const uniqueId = tween3?.getId?.();
      const tweenIsStored = this.tweenStore.find(({ id }) => id === uniqueId);
      if (tweenIsStored) return;
      const obj = { id: uniqueId, tween: tween3 };
      this.tweenStore.push(obj);
    }
    /**
     * @private
     * @type {() => void}
     */
    resetAllTween() {
      this.tweenStore.forEach(({ tween: tween3 }) => tween3.resetData());
    }
    /**
     * @type {import('./type').asyncTimelineSet}
     */
    set(tween3, valuesSet = {}, tweenProps = {}) {
      if (!asyncTimelineTweenIsValid(tween3)) return this;
      tweenProps.delay = asyncTimelineDelayIsValid(tweenProps?.delay);
      const obj = {
        id: this.currentTweenCounter,
        tween: tween3,
        action: "set",
        valuesTo: valuesSet,
        valuesFrom: valuesSet,
        tweenProps,
        groupProps: { waitComplete: this.waitComplete }
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      this.addTweenToStore(tween3);
      return this;
    }
    /**
     * @type {import('./type').asyncTimelineGoTo}
     */
    goTo(tween3, valuesTo = {}, tweenProps = {}) {
      if (!asyncTimelineTweenIsValid(tween3)) return this;
      tweenProps.delay = asyncTimelineDelayIsValid(tweenProps?.delay);
      const obj = {
        id: this.currentTweenCounter,
        tween: tween3,
        action: "goTo",
        valuesTo,
        tweenProps: tweenProps ?? {},
        groupProps: { waitComplete: this.waitComplete }
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      this.addTweenToStore(tween3);
      return this;
    }
    /**
     * @type {import('./type').asyncTimelineGoFrom}
     */
    goFrom(tween3, valuesFrom = {}, tweenProps = {}) {
      if (!asyncTimelineTweenIsValid(tween3)) return this;
      tweenProps.delay = asyncTimelineDelayIsValid(tweenProps?.delay);
      const obj = {
        id: this.currentTweenCounter,
        tween: tween3,
        action: "goFrom",
        valuesFrom,
        tweenProps,
        groupProps: { waitComplete: this.waitComplete }
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      this.addTweenToStore(tween3);
      return this;
    }
    /**
     * @type {import('./type').asyncTimelineGoFromTo}
     */
    goFromTo(tween3, valuesFrom = {}, valuesTo = {}, tweenProps = {}) {
      if (!asyncTimelineTweenIsValid(tween3)) return this;
      tweenProps.delay = asyncTimelineDelayIsValid(tweenProps?.delay);
      const obj = {
        id: this.currentTweenCounter,
        tween: tween3,
        action: "goFromTo",
        valuesFrom,
        valuesTo,
        tweenProps,
        groupProps: { waitComplete: this.waitComplete }
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      this.addTweenToStore(tween3);
      return this;
    }
    /**
     * @type {import('./type').asyncTimelineAdd}
     */
    add(fn = NOOP) {
      const cb = functionIsValidAndReturnDefault(
        fn,
        () => {
        },
        "timeline add function"
      );
      if (this.groupId) {
        asyncTimelineMetodsInsideGroupWarining("add");
        return this;
      }
      const obj = {
        id: this.currentTweenCounter,
        tween: cb,
        action: "add",
        groupProps: { waitComplete: this.waitComplete }
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      return this;
    }
    /**
     * @type {import('./type').asyncTimelineAddAsync}
     */
    addAsync(fn) {
      const cb = addAsyncFunctionIsValid(fn);
      if (this.groupId) {
        asyncTimelineMetodsInsideGroupWarining("addAsync");
        return this;
      }
      const obj = {
        id: this.currentTweenCounter,
        tween: cb,
        action: "addAsync",
        groupProps: { waitComplete: this.waitComplete }
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      return this;
    }
    /**
     * @type {import('./type').asyncTimelineSync}
     */
    sync(syncProp) {
      if (this.groupId) {
        asyncTimelineMetodsInsideGroupWarining("sync");
        return this;
      }
      const fromIsTween = asyncTimelineTweenIsValid(syncProp?.from);
      const toIsTween = asyncTimelineTweenIsValid(syncProp?.to);
      if (!toIsTween || !fromIsTween) return this;
      const obj = {
        id: this.currentTweenCounter,
        action: "sync",
        groupProps: { waitComplete: this.waitComplete },
        syncProp
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      return this;
    }
    /**
     * @type {import('./type').asyncTimelineCreateGroup}
     */
    createGroup(groupProps = {}) {
      if (this.groupId) {
        asyncTimelineMetodsInsideGroupWarining("createGroup");
        return this;
      }
      const obj = {
        id: this.currentTweenCounter,
        action: "createGroup",
        groupProps
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      this.waitComplete = groupProps?.waitComplete ?? false;
      this.groupId = this.groupCounter++;
      return this;
    }
    /**
     * @type {import('./type').asyncTimelineCloseGroup}
     */
    closeGroup() {
      this.groupId = void 0;
      const obj = {
        id: this.currentTweenCounter,
        action: "closeGroup"
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      this.waitComplete = false;
      return this;
    }
    /**
     * @type {import('./type').asyncTimelineSuspend}
     */
    suspend(fn = () => true) {
      if (this.groupId) {
        asyncTimelineMetodsInsideGroupWarining("suspend");
        return this;
      }
      const obj = {
        id: this.currentTweenCounter,
        tween: fn,
        action: "suspend",
        groupProps: { waitComplete: this.waitComplete }
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      return this;
    }
    /**
     * @type {import('./type').asyncTimelineLabel}
     */
    label(labelProps = {}) {
      if (this.groupId) {
        asyncTimelineMetodsInsideGroupWarining("label");
        return this;
      }
      if (!valueStringIsValid(labelProps?.name, "asyncTimeline label:"))
        return this;
      const obj = {
        id: this.currentTweenCounter,
        action: "label",
        labelProps,
        groupProps: { waitComplete: this.waitComplete }
      };
      this.currentTweenCounter++;
      const mergedObj = { ...this.defaultObj, ...obj };
      this.addToMainArray(mergedObj);
      return this;
    }
    /**
     * @private
     * @type {() => void}
     *
     * @description
     * Add a set 'tween' at start and end of timeline.
     */
    addSetBlocks() {
      if (this.autoSetIsJustCreated) return;
      this.autoSetIsJustCreated = true;
      this.tweenStore.forEach(({ tween: tween3 }) => {
        const setValueTo = tween3.getInitialData();
        const obj = {
          id: this.currentTweenCounter,
          tween: tween3,
          action: "set",
          valuesFrom: setValueTo,
          valuesTo: setValueTo,
          groupProps: { waitComplete: this.waitComplete }
        };
        this.currentTweenCounter++;
        const mergedObj = { ...this.defaultObj, ...obj };
        this.tweenList = [
          [{ group: void 0, data: mergedObj }],
          ...this.tweenList
        ];
      });
      this.tweenStore.forEach(({ tween: tween3 }) => {
        const setValueTo = asyncReduceTween(
          this.tweenList,
          tween3,
          this.tweenList.length
        );
        const obj = {
          id: this.currentTweenCounter,
          tween: tween3,
          action: "set",
          valuesFrom: setValueTo,
          valuesTo: setValueTo,
          groupProps: { waitComplete: this.waitComplete }
        };
        this.currentTweenCounter++;
        const mergedObj = { ...this.defaultObj, ...obj };
        this.tweenList.push([{ group: void 0, data: mergedObj }]);
      });
    }
    /**
     * @type {import('./type').asyncTimelineSetTween}
     */
    setTween(label = "", items = []) {
      this.stop();
      const itemsIsArray = timelineSetTweenArrayIsValid(items);
      const labelIsString = timelineSetTweenLabelIsValid(label);
      if (!itemsIsArray || !labelIsString)
        return Promise.reject(
          new Error("timeline setTween: props is wrong")
        );
      const itemsId = new Set(items.map((item) => item?.getId?.()));
      const tweens = this.tweenStore.filter(({ id }) => {
        return itemsId.has(id);
      });
      const index = this.tweenList.findIndex((item) => {
        const [firstItem] = item;
        const labelCheck = firstItem.data.labelProps?.name;
        return labelCheck === label;
      });
      if (index === -1) {
        timelineSetTweenLabelNotFoundWarining(label);
        return Promise.reject(
          new Error(`asyncTimeline.setTween() label: ${label} not found`)
        );
      }
      return new Promise((resolve) => {
        const tweenPromise = tweens.map(({ tween: tween3 }) => {
          const data2 = asyncReduceTween(this.tweenList, tween3, index);
          return new Promise((resolveTween, rejectTween) => {
            tween3.set(data2).then(() => resolveTween({ resolve: true })).catch(() => rejectTween());
          });
        });
        Promise.all(tweenPromise).then(() => {
          resolve({ resolve: true });
        }).catch(() => {
          timelineSetTweenFailWarining();
        });
      });
    }
    /**
     * Private
     */
    rejectPromise() {
      if (this.currentReject) {
        this.currentReject(mobCore.ANIMATION_STOP_REJECT);
        this.currentReject = void 0;
      }
    }
    /**
     * @type {() => Promise<any>}
     */
    play() {
      return new Promise((resolve, reject) => {
        if (this.fpsIsInLoading) return;
        this.fpsIsInLoading = true;
        mobCore.useFps(() => {
          this.fpsIsInLoading = false;
          if (this.autoSet) this.addSetBlocks();
          if (this.freeMode) {
            if (this.tweenList.length === 0 || this.addAsyncIsActive)
              return;
            if (this.delayIsRunning && !this.actionAfterReject.active) {
              this.startOnDelay = true;
              this.actionAfterReject.fn = () => this.play();
              this.actionAfterReject.active = true;
              return;
            }
            this.startOnDelay = false;
            this.stop();
            this.isStopped = false;
            if (this.isReverse) this.revertTween();
            this.sessionId++;
            mobCore.useFrameIndex(() => {
              this.currentReject = reject;
              this.currentResolve = resolve;
              this.run();
            }, 1);
            return;
          }
          this.starterFunction.fn = () => {
            this.stop();
            this.isStopped = false;
            const tweenPromise = this.tweenStore.map(({ tween: tween3 }) => {
              const data2 = tween3.getInitialData();
              return new Promise((resolve2, reject2) => {
                tween3.set(data2).then(() => resolve2({ resolve: true })).catch(() => reject2());
              });
            });
            Promise.all(tweenPromise).then(() => {
              this.currentReject = reject;
              this.currentResolve = resolve;
              this.run();
            }).catch(() => {
            });
          };
          this.starterFunction.active = true;
          this.playReverse({ forceYoYo: true });
        });
      });
    }
    /**
     * @private
     * @type {import('./type').asyncTimelinePlayFromLabel}
     */
    playFromLabel({ isReverse = false, label = null }) {
      if (this.tweenList.length === 0 || this.addAsyncIsActive) return;
      if (this.isReverse) this.revertTween();
      this.currentIndex = 0;
      this.labelState.isReverse = isReverse;
      this.labelState.active = true;
      this.labelState.index = mobCore.checkType(String, label) ? this.tweenList.findIndex((item) => {
        const [firstItem] = item;
        const labelCheck = firstItem.data.labelProps?.name;
        return labelCheck === label;
      }) : label;
      if (mobCore.checkType(String, label))
        playLabelIsValid(this.labelState.index, label);
      this.run();
    }
    /**
     * @type {import('./type').asyncTimelinePlayFrom}
     */
    playFrom(label) {
      return new Promise((resolve, reject) => {
        if (this.fpsIsInLoading) return;
        this.fpsIsInLoading = true;
        mobCore.useFps(() => {
          this.fpsIsInLoading = false;
          this.starterFunction.fn = () => this.playFromLabel({
            isReverse: false,
            label
          });
          this.starterFunction.active = true;
          this.playReverse({ forceYoYo: false, resolve, reject });
        });
      });
    }
    /**
     * @type {import('./type').asyncTimelinePlayFromReverse}
     */
    playFromReverse(label) {
      return new Promise((resolve, reject) => {
        if (this.fpsIsInLoading) return;
        this.fpsIsInLoading = true;
        mobCore.useFps(() => {
          this.fpsIsInLoading = false;
          this.starterFunction.fn = () => this.playFromLabel({
            isReverse: true,
            label
          });
          this.starterFunction.active = true;
          this.playReverse({ forceYoYo: false, resolve, reject });
        });
      });
    }
    /**
     * @type {import('./type').asyncTimelinePlayReverse}
     */
    playReverse({ forceYoYo = true, resolve = null, reject = null } = {}) {
      return new Promise((resolveFromReverse, rejectFromReverse) => {
        const resolveInUse = resolve || resolveFromReverse;
        const rejectInUse = reject || rejectFromReverse;
        if (this.fpsIsInLoading) return;
        this.fpsIsInLoading = true;
        mobCore.useFps(() => {
          this.fpsIsInLoading = false;
          if (this.autoSet) this.addSetBlocks();
          const forceYoYonow = forceYoYo;
          if (this.tweenList.length === 0 || this.addAsyncIsActive)
            return;
          if (this.delayIsRunning && !this.actionAfterReject.active) {
            this.startOnDelay = true;
            this.actionAfterReject.fn = () => this.playReverse({ forceYoYo: forceYoYonow });
            this.actionAfterReject.active = true;
            return;
          }
          this.startOnDelay = false;
          this.stop();
          this.isStopped = false;
          if (forceYoYonow) this.forceYoyo = true;
          this.labelState.active = true;
          this.labelState.index = this.tweenList.length;
          this.loopCounter--;
          this.sessionId++;
          mobCore.useFrameIndex(() => {
            this.currentResolve = resolveInUse;
            this.currentReject = rejectInUse;
            this.run();
          }, 1);
        });
      });
    }
    /**
     * @type {() => void}
     */
    reverseNext() {
      this.isReverseNext = true;
    }
    /**
     * @type {import('./type').asyncTimelineStop}
     */
    stop({ clearCache = true } = {}) {
      this.isStopped = true;
      this.currentIndex = 0;
      this.loopCounter = 1;
      this.rejectPromise();
      this.isReverseNext = false;
      this.disableLabel();
      this.forceYoyo = false;
      this.isInPause = false;
      this.isInSuspension = false;
      this.addAsyncIsActive = false;
      this.timeOnPause = 0;
      this.labelState.isReverse = false;
      this.tweenStore.forEach(({ tween: tween3 }) => {
        tween3?.stop?.({ clearCache });
      });
      if (this.isReverse) this.revertTween();
      this.isReverse = false;
      if (!this.freeMode) this.resetAllTween();
    }
    /**
     * @type {import('./type').asyncTimelinePause}
     */
    pause() {
      this.isInPause = true;
      this.timeOnPause = mobCore.getTime();
      this.currentTween.forEach(({ tween: tween3 }) => {
        tween3?.pause?.();
      });
    }
    /**
     * @type {import('./type').asyncTimelineResume}
     */
    resume() {
      if (this.isInPause) {
        this.isInPause = false;
        this.timeOnPause = 0;
        this.resumeEachTween();
      }
      if (this.isInSuspension) {
        this.isInSuspension = false;
        this.timeOnPause = 0;
        if (this.currentIndex <= this.tweenList.length - 2) {
          this.currentIndex++;
          this.run();
        } else if (this.currentIndex === this.tweenList.length - 1) {
          this.currentIndex = this.yoyo && !this.isReverse ? 1 : 0;
          this.disableLabel();
          if (this.yoyo) this.revertTween();
          this.loopCounter++;
          this.run();
        }
      }
    }
    /**
     * @private
     * @type {() => void}
     */
    disableLabel() {
      this.labelState.active = false;
      this.labelState.index = -1;
    }
    /**
     * @private
     * @type {() => void}
     */
    resumeEachTween() {
      this.currentTween.forEach(({ tween: tween3 }) => {
        tween3?.resume?.();
      });
    }
    /**
     * @return {Array} - Returns an array with all tweens active at the time the method is called
     * @example
     * ```javascript
     * const tweens = myTimeline.get()
     *
     *
     * ```
     * @description
     * Get an array of active instance.
     */
    get() {
      return this.currentTween;
    }
    /**
     * @return {boolean} Returns a boolean value indicating whether the timeline is active
     * @example
     * ```javascript
     * const isActive = myTimeline.isActive();
     *
     *
     * ```
     * @description
     * Return active state.
     */
    isActive() {
      return !this.isStopped;
    }
    /**
     * @return {boolean} Returns a boolean value indicating whether the timeline is in pause
     * @example
     * ```javascript
     * const isPaused = myTimeline.isPaused():
     *
     *
     * ```
     * @description
     * Return pause state.
     */
    isPaused() {
      return this.isInPause;
    }
    /**
     * @return {boolean} Returns a boolean value indicating whether the timeline is suspended
     * @example
     * ```javascript
     * const isSuspended = myTimeline.isSuspended();
     *
     *
     * ```
     * @description
     * return suspended state.
     */
    isSuspended() {
      return this.isInSuspension;
    }
    /**
     * @return {import('../utils/timeline/type.js').directionType} Returns a boolean value indicating whether the timeline is suspended
     * @example
     * ```javascript
     * const direction = myTimeline.getDirection();
     *
     *
     * ```
     * @description
     * return current direction.
     */
    getDirection() {
      if (this.isStopped) return directionConstant.NONE;
      return this.isReverse ? directionConstant.BACKWARD : directionConstant.FORWARD;
    }
    /**
     * @type {import('./type').asyncTimelineOnLoopEnd}
     */
    onLoopEnd(cb) {
      this.callbackLoop.push({ cb, id: this.id });
      const cbId = this.id;
      return () => {
        this.callbackLoop = this.callbackLoop.filter(
          (item) => item.id !== cbId
        );
      };
    }
    /**
     * @type {import('./type').asyncTimelineOnComplete}
     */
    onComplete(cb) {
      this.callbackComplete.push({ cb, id: this.id });
      const cbId = this.id;
      this.id++;
      return () => {
        this.callbackComplete = this.callbackComplete.filter(
          (item) => item.id !== cbId
        );
      };
    }
    /**
     * @description
     * Destroy timeline and all the sequencer
     */
    destroy() {
      this.tweenStore.forEach(({ tween: tween3 }) => {
        tween3?.destroy?.();
      });
      this.tweenList = [];
      this.currentTween = [];
      this.callbackComplete = [];
      this.callbackLoop = [];
      this.tweenStore = [];
      this.currentIndex = 0;
      this.actionAfterReject = {
        active: false,
        fn: () => {
        }
      };
    }
  };

  // src/js/mobMotion/animation/syncTimeline/handleSyncTimeline.js
  var HandleSyncTimeline = class {
    /**
     * @param {import('./type.js').syncTimelineType} data
     *
     * @example
     * ```javascript
     * const myTimeline = new HandleSyncTimeline({
     *   duration: [ Number ],
     *   yoyo: [ Boolean ],
     *   repeat: [ Number ]
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * myTimeline.add()
     * myTimeline.onLoopEnd()
     * myTimeline.onComplete()
     * myTimeline.onUpdate()
     * myTimeline.stop()
     * myTimeline.play()
     * myTimeline.playReverse()
     * myTimeline.playFrom()
     * myTimeline.playFromReverse()
     * myTimeline.reverse()
     * myTimeline.pause()
     * myTimeline.resume()
     * myTimeline.isActive()
     * myTimeline.isPaused()
     * myTimeline.getDirection()
     * myTimeline.getTime()
     * myTimeline.destroy()
     * ```
     */
    constructor(data2 = {}) {
      this.duration = durationIsValid(data2?.duration);
      this.yoyo = valueIsBooleanAndReturnDefault(
        data2?.yoyo,
        "syncTimeline: yoyo",
        false
      );
      this.repeat = repeatIsValid(data2?.repeat);
      this.sequencers = [];
      this.startTime = 0;
      this.timeElapsed = 0;
      this.currentTime = 0;
      this.pauseTime = 0;
      this.timeAtReverse = 0;
      this.timeAtReverseBack = 0;
      this.isReverse = false;
      this.startReverse = false;
      this.isPlayngReverse = false;
      this.loopCounter = 0;
      this.loopIteration = 0;
      this.minLoopIteration = 10;
      this.isStopped = true;
      this.skipFirstRender = false;
      this.completed = false;
      this.fpsIsInLoading = false;
      this.isInPause = false;
      this.callbackId = 0;
      this.callbackLoop = [];
      this.callbackComplete = [];
      this.callbackOnUpdate = [];
      this.currentResolve = void 0;
      this.currentReject = void 0;
    }
    /**
     * @private
     * @param {number} time
     * @param {number} fps
     */
    updateTime(time2, fps2) {
      if (this.isStopped || this.fpsIsInLoading) return;
      const frameThreshold = !this.repeat || this.repeat >= 2 && this.loopCounter === this.repeat - 1 ? 0 : 1e3 / fps2 / 2;
      if (this.isInPause) {
        this.pauseTime = time2 - this.startTime - this.timeElapsed - this.timeAtReverseBack;
      }
      this.timeElapsed = Math.trunc(
        time2 - this.startTime - this.pauseTime - this.timeAtReverseBack
      );
      const partial = this.isReverse ? this.timeAtReverse - (this.timeElapsed - this.timeAtReverse) : this.timeElapsed;
      if (!this.isInPause) {
        this.currentTime = clamp(partial, 0, this.duration);
        if (!this.skipFirstRender) {
          this.sequencers.forEach((item) => {
            item.draw({
              partial: this.currentTime,
              isLastDraw: false,
              useFrame: true,
              direction: this.getDirection()
            });
          });
          this.callbackOnUpdate.forEach(({ cb }) => {
            cb({
              time: this.currentTime,
              direction: this.getDirection()
            });
          });
        }
      }
      this.skipFirstRender = false;
      this.loopIteration++;
      if (partial <= this.duration - frameThreshold && partial >= 0 + frameThreshold && !this.isStopped) {
        this.completed = false;
        this.goToNextFrame();
        return;
      }
      this.resetSequencerLastValue();
      if (this.startReverse) {
        this.isReverse = true;
        this.timeAtReverse = 0;
        this.timeAtReverseBack = 0;
        this.startReverse = false;
        this.goToNextFrame();
        return;
      }
      const direction2 = this.getDirection();
      mobCore.useNextFrame(() => {
        if (!this.fpsIsInLoading && !this.completed && this.loopIteration > this.minLoopIteration) {
          this.completed = true;
          this.loopCounter++;
          this.loopIteration = 0;
          this.callbackLoop.forEach(
            ({ cb }) => cb({
              direction: direction2,
              loop: this.loopCounter
            })
          );
        }
      });
      if (!this.repeat || this.loopCounter === this.repeat - 1 && this.loopIteration > this.minLoopIteration) {
        const endTime = this.currentTime;
        this.sequencers.forEach((item) => {
          item.draw({
            partial: endTime,
            isLastDraw: true,
            useFrame: true,
            direction: this.getDirection()
          });
        });
        this.isStopped = true;
        this.resetTime();
        this.startTime = time2;
        if (this.isReverse) this.isReverse = false;
        this.callbackComplete.forEach(({ cb }) => cb());
        if (this.currentResolve) this.currentResolve();
        return;
      }
      if (this.yoyo) {
        this.reverse();
        this.goToNextFrame();
        return;
      }
      if (this.isPlayngReverse) {
        this.resetTime();
        this.startTime = time2;
        if (!this.isReverse) this.isPlayngReverse = !this.isPlayngReverse;
        this.timeElapsed = this.duration;
        this.currentTime = this.duration;
        this.pauseTime = this.duration;
        this.goToNextFrame();
        return;
      }
      this.resetTime();
      this.startTime = time2;
      if (this.isReverse) this.isPlayngReverse = !this.isPlayngReverse;
      this.goToNextFrame();
    }
    /**
     * @private
     * @returns {void}
     */
    goToNextFrame() {
      mobCore.useFrame(() => {
        mobCore.useNextTick(({ time: time2, fps: fps2 }) => {
          if (!this.fpsIsInLoading) this.updateTime(time2, fps2);
        });
      });
    }
    /**
     * @private
     * @returns {void}
     */
    resetTime() {
      this.timeElapsed = 0;
      this.pauseTime = 0;
      this.currentTime = 0;
      this.timeAtReverse = 0;
      this.timeAtReverseBack = 0;
    }
    /**
     * @private
     * @param {string} label
     * @returns {number}
     */
    getTimeFromLabel(label) {
      const labelObj = this.sequencers.reduce(
        (previous, current) => {
          const currentLabels = current.getLabels();
          const labelsMatched = currentLabels.find(
            ({ name: currentName }) => currentName === label
          );
          return labelsMatched || previous;
        },
        { name: "", time: 0 }
      );
      if (!labelObj) syncTimelineLabelWarning(label);
      return labelObj.time;
    }
    /**
     * Private
     * @returns {void}
     */
    rejectPromise() {
      if (this.currentReject) {
        this.currentReject(mobCore.ANIMATION_STOP_REJECT);
        this.currentReject = void 0;
      }
    }
    /**
     * @type {import('./type.js').syncTimelinePlay}
     *
     * @description
     * Plays the timeline starting from the initial value
     * With useCurrent set to true and with the timeline active, it will reverse the direction from the current value if it is scrolling in reverse, otherwise it will continue in the current direction.
     * With useCurrent set to false (default) the animation will always start from frame 0 towards the final value.
     */
    play(props = {}) {
      return new Promise((resolve, reject) => {
        const useCurrent = props?.useCurrent;
        if (this.fpsIsInLoading) return;
        this.rejectPromise();
        this.currentResolve = resolve;
        this.currentReject = reject;
        if (!this.isStopped && !this.isReverse && useCurrent) return;
        if (!this.isStopped && this.isReverse && useCurrent) {
          this.reverse();
          return;
        }
        this.playFromTime();
      });
    }
    /**
         * @type {import('./type.js').syncTimelinePlayFrom} value
         *
         * @example
         * ```javascript
         * myTimeline.playFrom(1000).then(() => {
         *      // code
         * })
    
         * myTimeline.playFrom('myLabel').then(() => {
         *      // code
         * })
    
         *
         *
         * ```
         *
         * @description
         * Plays the timeline forward starting from the specific time or from a label defined in a Handle Sequencer | HandleMasterSequencer instance
         */
    playFrom(value = 0) {
      return new Promise((resolve, reject) => {
        if (this.fpsIsInLoading) return;
        const isNumber = mobCore.checkType(Number, value);
        const labelTime = isNumber ? value : this.getTimeFromLabel(value);
        this.rejectPromise();
        this.currentResolve = resolve;
        this.currentReject = reject;
        this.playFromTime(labelTime);
      });
    }
    /**
     * @private
     * @param {number} time
     */
    playFromTime(time2 = 0) {
      this.resetSequencerLastValue();
      this.resetTime();
      this.currentTime = time2;
      this.timeAtReverseBack = -this.currentTime;
      this.isPlayngReverse = false;
      this.loopIteration = 0;
      this.fpsIsInLoading = true;
      this.startAnimation(time2);
    }
    /**
         * @type {import('./type.js').syncTimelinePlayFromReverse} value
         *
         * @example
         * ```javascript
         * myTimeline.playFromReverse(1000).then(() => {
         *      // code
         * })
    
         * myTimeline.playFromReverse('myLabel').then(() => {
         *      // code
         * })
    
         *
         *
         * ```
         *
         * @description
         * Plays the timeline backward starting from the specific time or from a label defined in a Handle Sequencer | HandleMasterSequencer instance
         */
    playFromReverse(value) {
      return new Promise((resolve, reject) => {
        if (this.fpsIsInLoading) return;
        const isNumber = mobCore.checkType(Number, value);
        const labelTime = isNumber ? value : this.getTimeFromLabel(value);
        this.rejectPromise();
        this.currentResolve = resolve;
        this.currentReject = reject;
        this.playFromTimeReverse(labelTime, true);
      });
    }
    /**
         * @type {import('./type.js').syncTimelinePlayReverse} 
         *
         * @example
         * ```javascript
         * myTimeline.playReverse({
         *      useCurrent: true
         * }).then(() => {
         *      // code
         * })
    
         *
         *
         * ```
         *
         * @description
         * Plays the timeline starting from the end value
         * With useCurrent set to true and with the timeline active, it will reverse the direction from the current value if it is scrolling in reverse, otherwise it will continue in the current direction.
         * With useCurrent set to false (default) the animation will always start from the final value towards the initial value.
         */
    playReverse(props = {}) {
      return new Promise((resolve, reject) => {
        const useCurrent = props?.useCurrent;
        if (this.fpsIsInLoading) return;
        this.rejectPromise();
        this.currentResolve = resolve;
        this.currentReject = reject;
        if (!this.isStopped && this.isReverse && useCurrent) return;
        if (!this.isStopped && !this.isReverse && useCurrent) {
          this.reverse();
          return;
        }
        this.playFromTimeReverse(this.duration, true);
      });
    }
    /**
     * @private
     * @param {number} time
     * @returns {void}
     */
    playFromTimeReverse(time2 = 0) {
      this.resetSequencerLastValue();
      this.timeElapsed = time2;
      this.currentTime = time2;
      this.pauseTime = time2;
      this.timeAtReverse = 0;
      this.timeAtReverseBack = 0;
      this.startReverse = true;
      this.isPlayngReverse = true;
      this.skipFirstRender = true;
      this.loopIteration = 0;
      this.fpsIsInLoading = true;
      this.startAnimation(time2);
    }
    /**
     * @description
     * Find label than match the occurrency and return the time
     *
     * @param {number} partial
     * @returns {Promise}
     */
    async startAnimation(partial) {
      if (this.repeat === 0) return;
      const { averageFPS } = await mobCore.useFps();
      fpsLoadedLog("sequencer", averageFPS);
      this.isReverse = false;
      this.sequencers.forEach((item) => {
        item.inzializeStagger();
        item.disableStagger();
        item.draw({
          partial,
          isLastDraw: false,
          useFrame: true,
          direction: this.getDirection()
        });
      });
      mobCore.useFrame(() => {
        mobCore.useNextTick(({ time: time2, fps: fps2 }) => {
          this.startTime = time2;
          this.fpsIsInLoading = false;
          this.isStopped = false;
          this.isInPause = false;
          this.loopCounter = 0;
          this.updateTime(time2, fps2);
        });
      });
    }
    /**
     * @type {import('./type.js').syncTimelinePause}
     */
    pause() {
      if (this.isStopped || this.isInPause || this.fpsIsInLoading) return;
      this.isStopped = false;
      this.isInPause = true;
    }
    /**
     * @type {import('./type.js').syncTimelineResume}
     */
    resume() {
      if (this.isStopped || !this.isInPause || this.fpsIsInLoading) return;
      this.isStopped = false;
      this.isInPause = false;
    }
    /**
     * @type {import('./type.js').syncTimelineReverse}
     */
    reverse() {
      if (this.isStopped || this.isInPause || this.fpsIsInLoading) return;
      this.resetSequencerLastValue();
      this.isReverse = !this.isReverse;
      if (this.isReverse) {
        this.timeAtReverse = this.timeElapsed;
      } else {
        this.timeAtReverseBack += this.timeElapsed - this.currentTime;
      }
    }
    /**
     * @type {import('./type.js').syncTimelineStop}
     */
    stop({ clearCache = true } = {}) {
      this.isStopped = true;
      this.isInPause = false;
      this.rejectPromise();
      if (clearCache) {
        this.sequencers.forEach((item) => {
          item.cleanCachedId();
        });
        return;
      }
      this.sequencers.forEach((item) => {
        item.draw({
          partial: this.currentTime,
          isLastDraw: true,
          useFrame: true,
          direction: this.getDirection()
        });
      });
    }
    /**
     * @type {import('./type.js').syncTimelineAdd}
     *
     * @example
     * ```javascript
     * myTimeline.add(mySequencer);
     * myTimeline.add(myMasterSequencer);
     *
     *
     * ```
     *
     * @description
     * Add the instance of a sequencer | masterSequencer to the timeline
     */
    add(sequencer) {
      sequencer.setStretchFactor(this.duration);
      this.sequencers.push(sequencer);
      return this;
    }
    /**
     * @type {import('./type.js').syncTimelineSetDuration}
     */
    setDuration(duration2) {
      this.duration = duration2;
      return this;
    }
    /**
     * @returns {void}
     */
    resetSequencerLastValue() {
      this.sequencers.forEach((item) => item.resetLastValue());
    }
    /**
     * @type {import('./type.js').syncTimelineIsActive}
     *
     * @example
     * ```javascript
     * const isActive = myTimeline.isActive();
     *
     *
     * ```
     *
     * @description
     * Return active status
     */
    isActive() {
      return !this.isStopped;
    }
    /**
     * @type {import('./type.js').syncTimelineIsPaused}
     *
     * @example
     * ```javascript
     * const isPaused = myTimeline.isPaused();
     *
     *
     * ```
     *
     * @description
     * Return pause status
     */
    isPaused() {
      return this.isInPause;
    }
    /**
     * @type {import('./type.js').syncTimelineGetDirection}
     *
     * @example
     * ```javascript
     * myTimeline.getDirection();
     *
     *
     * ```
     *
     * @description
     * Return direction forward|backward|none
     */
    getDirection() {
      if (this.isStopped) return directionConstant.NONE;
      return this.isReverse ? directionConstant.BACKWARD : directionConstant.FORWARD;
    }
    /**
     * @type {import('./type.js').syncTimelineTime}
     *
     * @example
     * ```javascript
     * myTimeline.getTime();
     *
     *
     * ```
     *
     * @description
     * Get current time
     */
    getTime() {
      return this.currentTime;
    }
    /**
     * @type {import('./type.js').syncTimelineOnLoopEnd}
     *
     * @example
     *```javascript
     * const unsubscribeOnLoopEnd = myTimeline.onLoopEnd(({direction, loop})=>{
     *      /// code
     * })
     * unsubscribeOnLoopEnd();
     *
     *
     * ```
     * @description
     * Callback thrown at the end of each cycle
     */
    onLoopEnd(cb = () => {
    }) {
      this.callbackLoop.push({ cb, id: this.callbackId });
      const cbId = this.callbackId;
      this.callbackId++;
      return () => {
        this.callbackLoop = this.callbackLoop.filter(
          (item) => item.id !== cbId
        );
      };
    }
    /**
     * @type {import('./type.js').syncTimelineOnComplete}
     *
     * @example
     *```javascript
     * const unsubscribeOnComplete = myTimeline.onComplete(() => {
     *      /// code
     * })
     * unsubscribeOnComplete();
     *
     *
     * ```
     * @description
     * Callback thrown at the end of timeline
     */
    onComplete(cb = () => {
    }) {
      this.callbackComplete.push({ cb, id: this.callbackId });
      const cbId = this.callbackId;
      this.callbackId++;
      return () => {
        this.callbackComplete = this.callbackComplete.filter(
          (item) => item.id !== cbId
        );
      };
    }
    /**
     * @type {import('./type.js').syncTimelineOnUpdate}
     *
     * @example
     *```javascript
     * const unsubscribeOnUpdate = myTimeline.onUpdate(({direction, time}) => {
     *      /// code
     * })
     * unsubscribeOnUpdate();
     *
     *
     * ```
     * @description
     * Callback thrown at each frame during the animation
     */
    onUpdate(cb = () => {
    }) {
      this.callbackOnUpdate.push({ cb, id: this.callbackId });
      const cbId = this.callbackId;
      this.callbackId++;
      return () => {
        this.callbackOnUpdate = this.callbackOnUpdate.filter(
          (item) => item.id !== cbId
        );
      };
    }
    /**
     * @description
     * Destroy timeline and all the sequencer
     */
    destroy() {
      this.stop();
      this.sequencers.forEach((item) => item.destroy());
      this.sequencers = [];
      this.callbackOnUpdate = [];
      this.callbackLoop = [];
      this.callbackComplete = [];
    }
  };

  // src/js/mobMotion/timeline.js
  var timeline = {
    /**
     * @param {import('./animation/syncTimeline/type.js').syncTimelineType} data
     * @return {HandleSyncTimeline}
     *
     * @example
     * ```javascript
     * Property schema:
     *
     *
     * const myTimeline = timeline.createSyncTimeline({
     *   duration: [ Number ],
     *   yoyo: [ Boolean ],
     *   repeat: [ Number ]
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     * myTimeline.add()
     * myTimeline.onLoopEnd()
     * myTimeline.onComplete()
     * myTimeline.onUpdate()
     * myTimeline.stop()
     * myTimeline.play()
     * myTimeline.playReverse()
     * myTimeline.playFrom()
     * myTimeline.playFromReverse()
     * myTimeline.reverse()
     * myTimeline.pause()
     * myTimeline.resume()
     * myTimeline.isActive()
     * myTimeline.isPaused()
     * myTimeline.getDirection()
     * myTimeline.getTime()
     * myTimeline.destroy()
     * ```
     */
    createSyncTimeline(data2) {
      return new HandleSyncTimeline(data2);
    },
    /**
     * @param {import('./animation/asyncTimeline/type.js').asyncTimelineType} data
     * @return {HandleAsyncTimeline}
     *
     * @example
     * ```javascript
     * Property schema:
     *
     *
     * const myTimeline = timeline.createAsyncTimeline({
     *   yoyo: [ Boolean ],
     *   repeat: [ Number ],
     *   freeMode: [ Number ],
     *   autoSet: [ Number ],
     * })
     *
     *
     * ```
     *
     * @description
     * Available methods:
     * ```javascript
     *
     *
     * `Methods to create timeline`
     * myTimeline.set()
     * myTimeline.goTo()
     * myTimeline.goFrom()
     * myTimeline.goFromTo()
     * myTimeline.add()
     * myTimeline.addAsync()
     * myTimeline.sync()
     * myTimeline.createGroup()
     * myTimeline.closeGroup()
     * myTimeline.suspend()
     * myTimeline.label()
     *
     *
     * `Methods to control timeline`
     * myTimeline.play()
     * myTimeline.playFromLabel()
     * myTimeline.playFrom()
     * myTimeline.playFromReverse()
     * myTimeline.playReverse()
     * myTimeline.reverseNext()
     * myTimeline.stop()
     * myTimeline.pause()
     * myTimeline.resume()
     * myTimeline.isActive()
     * myTimeline.isPaused()
     * myTimeline.isSuspended()
     * myTimeline.getDirection()
     * myTimeline.setTween()
     * myTimeline.get()
     * myTimeline.onLoopEnd()
     * myTimeline.onComplete()
     * myTimeline.destroy()
     * ```
     */
    createAsyncTimeline(data2) {
      return new HandleAsyncTimeline(data2);
    }
  };

  // src/js/mobMotion/animation/parallax/parallaxEmitter.js
  var action = ({ prevValue, value, maxVal }) => {
    if (value >= maxVal && prevValue <= maxVal && maxVal >= 0 || value <= maxVal && prevValue >= maxVal && maxVal <= 0)
      return parallaxConstant.ON_LEAVE;
    if (value > maxVal && prevValue <= maxVal && maxVal <= 0 || value < maxVal && prevValue >= maxVal && maxVal >= 0)
      return parallaxConstant.ON_ENTER_BACK;
    if (value >= 0 && prevValue <= 0 && maxVal <= 0 || value <= 0 && prevValue >= 0 && maxVal >= 0)
      return parallaxConstant.ON_LEAVE_BACK;
    if (value > 0 && value < maxVal && prevValue <= 0 && maxVal >= 0 || value < 0 && prevValue >= 0 && maxVal <= 0)
      return parallaxConstant.ON_ENTER;
    return parallaxConstant.ON_NOOP;
  };
  function parallaxEmitter({
    prevValue,
    value,
    maxVal,
    onEnter,
    onEnterBack,
    onLeave,
    onLeaveBack
  }) {
    const fn = {
      [parallaxConstant.ON_LEAVE]: () => {
        if (onLeave) onLeave();
      },
      [parallaxConstant.ON_ENTER_BACK]: () => {
        if (onEnterBack) onEnterBack();
      },
      [parallaxConstant.ON_LEAVE_BACK]: () => {
        if (onLeaveBack) onLeaveBack();
      },
      [parallaxConstant.ON_ENTER]: () => {
        if (onEnter) onEnter();
      },
      [parallaxConstant.ON_NOOP]: () => {
      }
    };
    fn[action({ prevValue, value, maxVal })]();
  }

  // src/js/mobMotion/animation/parallax/parallaxMarker.js
  var getMarker = ({ startMarker, endMarker, label }) => {
    if (!startMarker && !endMarker) {
      const labelSanitized = label.replaceAll(/^[^a-z]+|[^\w.:-]+/gi, "-");
      const startMarkerEL = document.createElement("span");
      startMarkerEL.className += `p-marker p-marker--start  p-marker-${labelSanitized}`;
      startMarkerEL.innerHTML = `start ${labelSanitized}`;
      const endMarkerEL = document.createElement("span");
      endMarkerEL.className += `p-marker p-marker--end  p-marker-${labelSanitized}`;
      endMarkerEL.innerHTML = `end ${labelSanitized}`;
      document.body.append(startMarkerEL);
      document.body.append(endMarkerEL);
      const startMarkerGenerated = document.querySelector(
        `.p-marker--start.p-marker-${labelSanitized}`
      );
      const endMarkerElGenerated = document.querySelector(
        `.p-marker--end.p-marker-${labelSanitized}`
      );
      return {
        lastStartMarker: startMarkerGenerated ?? void 0,
        lastEndMarkerEl: endMarkerElGenerated ?? void 0
      };
    }
    return {
      lastStartMarker: startMarker,
      lastEndMarkerEl: endMarker
    };
  };
  var getPosition = ({ screen }) => {
    if (screen === window) {
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };
    }
    const rect = screen.getBoundingClientRect();
    return {
      top: rect.top,
      right: document.documentElement.clientWidth - // @ts-ignore
      (rect.left + screen.offsetWidth),
      // @ts-ignore
      bottom: window.innerHeight - (rect.top + screen.offsetHeight),
      left: rect.left
    };
  };
  var getStartStyle = ({
    startPoint,
    direction: direction2,
    invertSide,
    top,
    bottom,
    left,
    right
  }) => {
    if (direction2 === parallaxConstant.DIRECTION_VERTICAL) {
      return invertSide ? {
        right: 0,
        width: "100vw",
        height: "3px",
        top: `${startPoint + top}px`,
        padding: "0 30px",
        pointerEvents: "none"
      } : {
        right: 0,
        width: "100vw",
        height: "3px",
        bottom: `${startPoint + bottom}px`,
        padding: "0 30px",
        pointerEvents: "none"
      };
    }
    return invertSide ? {
      top: 0,
      height: "100vw",
      width: "3px",
      left: `${startPoint + left}px`,
      padding: "30px 0",
      pointerEvents: "none"
    } : {
      top: 0,
      height: "100vw",
      width: "3px",
      right: `${startPoint + right}px`,
      padding: "30px 0",
      pointerEvents: "none"
    };
  };
  var getEndStyle = ({
    startPoint,
    endPoint,
    direction: direction2,
    invertSide,
    top,
    bottom,
    left,
    right
  }) => {
    if (direction2 === parallaxConstant.DIRECTION_VERTICAL) {
      return invertSide ? {
        right: 0,
        width: "100vw",
        height: "3px",
        top: `${startPoint + endPoint + top}px`,
        padding: "0 30px",
        pointerEvents: "none"
      } : {
        right: 0,
        width: "100vw",
        height: "3px",
        bottom: `${startPoint + endPoint + bottom}px`,
        padding: "0 30px",
        pointerEvents: "none"
      };
    }
    return invertSide ? {
      top: 0,
      height: "100vw",
      width: "3px",
      left: `${startPoint + endPoint + left}px`,
      padding: "30px 0",
      pointerEvents: "none"
    } : {
      top: 0,
      height: "100vw",
      width: "3px",
      right: `${startPoint + endPoint + right}px`,
      padding: "30px 0",
      pointerEvents: "none"
    };
  };
  var parallaxMarker = ({
    startMarker,
    endMarker,
    startPoint,
    endPoint,
    screen,
    direction: direction2,
    invertSide,
    label
  }) => {
    const { lastStartMarker, lastEndMarkerEl } = getMarker({
      startMarker,
      endMarker,
      label
    });
    const { top, right, bottom, left } = getPosition({ screen });
    const startStyle = getStartStyle({
      startPoint,
      direction: direction2,
      invertSide,
      top,
      bottom,
      left,
      right
    });
    const endStyle = getEndStyle({
      startPoint,
      endPoint,
      direction: direction2,
      invertSide,
      top,
      bottom,
      left,
      right
    });
    const style = {
      position: "fixed",
      zIndex: "99999",
      background: handleSetUp.get("scrollTrigger")?.markerColor?.startEnd || "#ff0000",
      fontSize: "14px",
      whiteSpace: "nowrap",
      textTransform: "uppercase"
    };
    mobCore.useFrame(() => {
      Object.assign(lastStartMarker?.style, { ...style, ...startStyle });
      Object.assign(lastEndMarkerEl?.style, { ...style, ...endStyle });
    });
    return {
      startMarker: lastStartMarker,
      endMarker: lastEndMarkerEl
    };
  };

  // src/js/mobMotion/animation/parallax/parallaxPinUtils.js
  var getMarkerWrapperStyle = ({ marker, direction: direction2, invertSide }) => {
    if (!marker) return {};
    const borderColor = handleSetUp.get("scrollTrigger")?.markerColor?.item || "#14df3b";
    const borderStyle = `3px ${borderColor} solid`;
    if (direction2 === parallaxConstant.DIRECTION_VERTICAL) {
      return invertSide ? { borderBottom: borderStyle } : { borderTop: borderStyle };
    } else {
      return invertSide ? { borderRight: borderStyle } : { borderLeft: borderStyle };
    }
  };

  // src/js/mobMotion/animation/parallax/parallaxPin.js
  var ParallaxPin = class {
    constructor() {
      this.trasponderActive = false;
      this.scrollerHeight = 0;
      this.start = 0;
      this.startFromTop = 0;
      this.scroller = window;
      this.invertSide = void 0;
      this.end = 0;
      this.getStart = () => 0;
      this.getEnd = () => 0;
      this.direction = parallaxConstant.DIRECTION_VERTICAL;
      this.compesateValue = 0;
      this.trigger = null;
      this.item = void 0;
      this.spring = void 0;
      this.wrapper = void 0;
      this.pin = void 0;
      this.isOver = false;
      this.isInner = false;
      this.isUnder = false;
      this.unsubscribeScroll = () => {
      };
      this.unsubscribeScrollStart = () => {
      };
      this.unsubscribeSpring = () => {
      };
      this.firstTime = true;
      this.itemRequireStyleToWrapper = [
        "flex",
        "flex-shrink",
        "flex-basis",
        "float",
        "display",
        "grid-area",
        "grid-column-start",
        "grid-column-end",
        "grid-row-start",
        "grid-row-end",
        "box-sizing",
        "order",
        "place-self",
        "align-self",
        "justify-self"
      ];
      this.itemRequireStyleWhenTraspond = [
        "font-size",
        "padding",
        "margin",
        "line-height",
        "white-space"
      ];
      this.parentRequireStyle = ["text-align"];
      this.itemRequireStyleToPin = ["z-index", "pointer-events"];
      this.styleToTranspond = [
        "transform",
        "position",
        "translate",
        "rotate",
        "scale"
      ];
      this.nonRelevantRule = ["none", "static"];
      this.isInizialized = false;
      this.prevScroll = 0;
      this.prevscrollY = 0;
      this.animatePin = false;
      this.anticipateFactor = 1.5;
      this.forceTranspond = false;
      this.justPinned = false;
      this.afterPinCounter = 0;
      this.lastStep = 0;
      this.afterJustPinned = false;
      this.afterJustPinnedCounter = 0;
      this.numeCycleToFreeze = 3;
    }
    /**
     * @param {Object} data
     */
    init(data2) {
      this.item = data2.item;
      this.marker = data2.marker;
      this.trigger = data2.trigger || data2?.item;
      this.scroller = data2.scroller;
      this.screen = data2.screen;
      this.animatePin = data2.animatePin;
      this.anticipatePinOnLoad = data2.anticipatePinOnLoad;
      this.forceTranspond = data2.forceTranspond;
      this.invertSide = data2.invertSide;
      this.direction = data2.direction;
      this.getStart = data2.getStart;
      this.getEnd = data2.getEnd;
      this.start = this.getStart();
      this.end = this.getEnd();
      this.prevscrollY = window.scrollY;
      this.scrollerHeight = data2?.scrollerHeight;
      this.refreshCollisionPoint();
      this.collisionTranslateProp = this.direction === parallaxConstant.DIRECTION_VERTICAL ? "Y" : "X";
      this.collisionStyleProp = this.direction === parallaxConstant.DIRECTION_VERTICAL ? "top" : "left";
      this.isInizialized = true;
      this.firstTime = true;
      this.createPin();
      this.addStyleFromPinToWrapper();
      this.setPinSize();
      this.setUpMotion();
      this.unsubscribeScrollStart = mobCore.useScrollStart(() => {
        if (!this.isInizialized) return;
        if (this.screen !== window && this.isInner && this.pin) {
          mobCore.useFrame(() => {
            if (this.pin)
              this.pin.style.transition = `transform .85s cubic-bezier(0, 0.68, 0.45, 1.1)`;
          });
        }
      });
      this.unsubscribeScroll = mobCore.useScroll(({ scrollY: scrollY2 }) => {
        if (!this.isInizialized) return;
        if (
          // eslint-disable-next-line unicorn/prefer-global-this
          this.screen !== window && this.screen !== document.documentElement
        ) {
          if (this.direction === parallaxConstant.DIRECTION_VERTICAL) {
            this.refreshCollisionPoint();
          }
          const gap = scrollY2 - this.prevscrollY;
          this.prevscrollY = scrollY2;
          if (this.isInner && this.pin) {
            const { verticalGap } = this.spring.get();
            const translateValue = verticalGap - gap;
            this.spring.setData({
              collision: 0,
              verticalGap: translateValue
            });
            mobCore.useFrame(() => {
              if (this.pin)
                this.pin.style.transform = `translate(0px,${translateValue}px)`;
            });
          }
        }
      });
    }
    setUpMotion() {
      this.spring = new HandleSpring({
        data: { collision: 0, verticalGap: 0 },
        config: "wobbly"
      });
      this.unsubscribeSpring = this.spring.subscribe(
        ({ collision, verticalGap }) => {
          if (this.direction === parallaxConstant.DIRECTION_VERTICAL && this.pin) {
            this.pin.style.transform = `translate(0px, ${collision}px)`;
          } else if (this.pin) {
            this.pin.style.transform = `translate(${collision}px, ${verticalGap}px)`;
          }
        }
      );
    }
    resetSpring() {
      if (this.pin)
        this.spring.set({ collision: 0, verticalGap: 0 }).catch(() => {
        });
    }
    createPin() {
      if (!this.item) this.item = document.createElement("div");
      const wrapper2 = document.createElement("div");
      wrapper2.classList.add("pin-wrapper");
      const pin = document.createElement("div");
      pin.classList.add("pin");
      wrapper2.append(pin);
      const parentNode = this.item?.parentNode;
      if (parentNode) parentNode.insertBefore(wrapper2, this.item);
      pin.append(this.item);
      this.wrapper = this.item.closest(".pin-wrapper");
      this.pin = this.item.closest(".pin");
      const requiredStyleToadd = this.addRquiredStyle();
      const pinStyleFromItem = this.addPinStyleFromItem();
      const markerWrapperStyle = getMarkerWrapperStyle({
        marker: this.marker,
        invertSide: this.invertSide,
        direction: this.direction
      });
      const display = { display: "table" };
      mobCore.useFrame(() => {
        if (!this.pin || !this.wrapper) return;
        Object.assign(this.wrapper.style, { ...markerWrapperStyle });
        Object.assign(this.pin.style, {
          ...display,
          ...pinStyleFromItem,
          ...requiredStyleToadd
        });
      });
      this.checkIfShouldTranspond();
    }
    setPinSize() {
      if (!this.pin || !this.wrapper) return;
      const height = this.wrapper.offsetHeight;
      const width = this.wrapper.offsetWidth;
      this.wrapper.style.height = `${height}px`;
      this.wrapper.style.width = `${width}px`;
      this.pin.style.height = `${height}px`;
      this.pin.style.width = `${width}px`;
    }
    /**
     * @description
     * Get style from item and apply to wrapper ( es: flex)
     */
    addStyleFromPinToWrapper() {
      if (!this.item) return;
      const compStyles = window.getComputedStyle(this.item);
      const style = this.itemRequireStyleToWrapper.reduce((p, c) => {
        return { ...p, [c]: compStyles.getPropertyValue(c) };
      }, {});
      mobCore.useFrame(() => {
        if (!this.wrapper) return;
        Object.assign(this.wrapper.style, style);
      });
    }
    /**
     * @param {HTMLElement} target
     * @param {string} rule
     *
     * @returns {object|undefined}
     */
    findStyle(target, rule) {
      let node = target.parentNode;
      if (!node) return;
      while (node !== null && node !== document) {
        const style = getComputedStyle(node);
        if (style[rule] && !this.nonRelevantRule.includes(style[rule])) {
          return { [rule]: style[rule] };
        }
        node = node.parentNode;
      }
      return;
    }
    /**
     * @returns {object}
     */
    addRquiredStyle() {
      if (!this.pin) return {};
      return this.parentRequireStyle.map((item) => {
        return this.findStyle(this.pin, item);
      }).filter((item) => item !== null).reduce((p, c) => {
        return { ...p, ...c };
      }, {});
    }
    /**
     * @returns {void}
     */
    checkIfShouldTranspond() {
      if (this.forceTranspond) {
        this.shoulTranspond = true;
        return;
      }
      this.shoulTranspond = this.styleToTranspond.map((item) => {
        const style = this.findStyle(this.wrapper, item);
        if (!style) return false;
        const [key] = Object.keys(style);
        const [value] = Object.values(style);
        if (key === "position") {
          return value === "fixed" || value === "absolute" ? true : false;
        } else {
          return true;
        }
      }).includes(true);
    }
    /**
     * @returns {void}
     */
    updateStartEndValue() {
      this.start = this.getStart();
      this.end = this.getEnd();
    }
    /**
     * @returns {void}
     */
    refreshCollisionPoint() {
      this.updateStartEndValue();
      if (this.screen !== window) {
        this.start -= this.direction === parallaxConstant.DIRECTION_VERTICAL ? position(this.screen).top : position(this.screen).left;
      }
      this.startFromTop = this.invertSide ? this.start : this.scrollerHeight - this.start;
      this.compesateValue = this.invertSide ? -Math.trunc(this.end) : Math.trunc(this.end);
    }
    /**
     * @returns {void}
     */
    destroy() {
      if (!this.isInizialized) return;
      this.spring.stop();
      this.unsubscribeSpring();
      this.unsubscribeScroll();
      this.unsubscribeScrollStart();
      this.spring.destroy();
      this.spring = null;
      this.afterPinCounter = 0;
      this.justPinned = false;
      this.isUnder = false;
      this.isInner = false;
      this.isOver = false;
      if (this.pin && this.wrapper) {
        this.wrapper.parentNode?.insertBefore(this.item, this.wrapper);
        this.pin.remove();
        this.wrapper.remove();
        this.wrapper = void 0;
        this.pin = void 0;
        this.isInizialized = false;
      }
    }
    /**
     * @returns {number}
     */
    getGap() {
      if (!this.wrapper) return 0;
      return this.direction === parallaxConstant.DIRECTION_VERTICAL ? position(this.wrapper).top - this.startFromTop : position(this.wrapper).left - this.startFromTop;
    }
    /**
     * @returns {void}
     */
    animateCollision() {
      const gap = this.getGap();
      this.tween(gap);
    }
    /**
     * @returns {void}
     */
    animateCollisionBack() {
      const gap = this.invertSide ? this.getGap() - this.end : this.getGap() + this.end;
      this.tween(gap);
    }
    /**
     * @param {number} gap
     */
    tween(gap) {
      mobCore.useFrame(() => {
        if (!this.pin || !this.collisionStyleProp) return;
        this.pin.style[this.collisionStyleProp] = `${this.startFromTop}px`;
      });
      if (this.animatePin && !this.firstTime && this.pin) {
        this.spring.goFrom({ collision: gap }).then(() => {
          this.resetPinTransform();
        }).catch(() => {
        });
      }
    }
    /**
     * @returns {void}
     */
    resetPinTransform() {
      mobCore.useFrame(() => {
        if (!this.pin) return;
        this.pin.style.transform = `translate(0px, 0px)`;
      });
    }
    /**
     * @returns {void}
     */
    resetStyleWhenUnder() {
      this.resetSpring();
      mobCore.useFrame(() => {
        if (!this.pin) return;
        this.pin.style.transition = "";
        this.pin.style.position = "relative";
        this.pin.style.top = ``;
        this.pin.style.left = ``;
      });
    }
    /**
     * @returns {void}
     */
    resetStyleWhenOver() {
      this.resetSpring();
      mobCore.useFrame(() => {
        if (!this.pin) return;
        this.pin.style.transition = "";
        this.pin.style.position = "relative";
        if (this.direction === parallaxConstant.DIRECTION_VERTICAL) {
          this.pin.style.left = ``;
          this.pin.style.top = `${this.compesateValue}px`;
        } else {
          this.pin.style.top = ``;
          this.pin.style.left = `${this.compesateValue}px`;
        }
      });
    }
    /**
     * @returns {void}
     */
    setFixedPosition() {
      if (!this.pin) return;
      const left = this.direction === parallaxConstant.DIRECTION_VERTICAL ? position(this.pin).left : position(this.pin).top;
      const style = this.direction === parallaxConstant.DIRECTION_VERTICAL ? "left" : "top";
      mobCore.useFrame(() => {
        if (!this.pin) return;
        this.pin.style.position = "fixed";
        this.pin.style[style] = `${left}px`;
        this.justPinned = true;
        this.afterJustPinned = true;
      });
    }
    /**
     * @returns {object}
     */
    addPinStyleFromItem() {
      if (!this.item) return {};
      const compStyles = window.getComputedStyle(this.item);
      return this.itemRequireStyleToPin.reduce((p, c) => {
        return { ...p, [c]: compStyles.getPropertyValue(c) };
      }, {});
    }
    /**
     * @returns {object}
     */
    addStyleToItem() {
      if (!this.item) return {};
      const compStyles = window.getComputedStyle(this.item);
      return this.itemRequireStyleWhenTraspond.reduce((p, c) => {
        return { ...p, [c]: compStyles.getPropertyValue(c) };
      }, {});
    }
    /**
     * @returns {object}
     */
    removeStyleToItem() {
      return this.itemRequireStyleWhenTraspond.reduce((p, c) => {
        return { ...p, [c]: "" };
      }, {});
    }
    /**
     * @returns {void}
     */
    activateTrasponder() {
      if (this.shoulTranspond) {
        const requiredStyleToAdd = this.addRquiredStyle();
        const pinStyleFromItem = this.addPinStyleFromItem();
        const styleToAdd = this.addStyleToItem();
        mobCore.useFrame(() => {
          if (!this.pin) return;
          Object.assign(this.pin.style, {
            ...pinStyleFromItem,
            ...requiredStyleToAdd
          });
          if (this.item) Object.assign(this.item.style, styleToAdd);
          document.body.append(this.pin);
        });
        this.trasponderActive = true;
      }
    }
    /**
     * @returns {void}
     */
    deactivateTrasponder() {
      if (!this.shoulTranspond || !this.item || !this.wrapper) return;
      mobCore.useFrame(() => {
        if (!this.pin) return;
        Object.assign(this.item.style, this.removeStyleToItem());
        this.wrapper?.append(this.pin);
      });
      this.trasponderActive = false;
    }
    /**
     * @param {number} scrollTop
     *
     * @returns {number}
     */
    getAnticipate(scrollTop) {
      const step = this.afterJustPinned && this.afterJustPinnedCounter < 3 ? this.lastStep : clamp(Math.abs(scrollTop - this.prevScroll), 0, 250);
      if (this.afterJustPinned && this.afterJustPinnedCounter < this.numeCycleToFreeze) {
        this.afterJustPinnedCounter++;
      } else {
        this.afterJustPinnedCounter = 0;
        this.afterJustPinned = false;
      }
      this.lastStep = step;
      return step * this.anticipateFactor;
    }
    /**
     * @param {number} scrollTop
     * @param {string} scrollDirection
     *
     * @returns {{anticipateBottom:number,anticipateInnerIn:number,anticipateInnerOut:number}}
     */
    getAnticipateValue(scrollTop, scrollDirection) {
      if (this.animatePin && !this.firstTime || this.firstTime && !this.anticipatePinOnLoad) {
        return {
          anticipateBottom: 0,
          anticipateInnerIn: 0,
          anticipateInnerOut: 0
        };
      }
      const anticipate = this.getAnticipate(scrollTop);
      const anticipateBottom = scrollDirection === parallaxConstant.SCROLL_UP ? 0 : anticipate;
      const anticipateInnerIn = scrollDirection === parallaxConstant.SCROLL_UP ? 0 : anticipate * 2;
      const anticipateInnerOut = scrollDirection === parallaxConstant.SCROLL_UP ? anticipate : 0;
      return {
        anticipateBottom,
        anticipateInnerIn,
        anticipateInnerOut
      };
    }
    /**
     * @param {number} scrollTop
     * @param {string} scrollDirection
     *
     * @returns {{anticipateBottom:number,anticipateInnerIn:number,anticipateInnerOut:number}}
     */
    getAnticipateValueInverted(scrollTop, scrollDirection) {
      if (this.animatePin && !this.firstTime || this.firstTime && !this.anticipatePinOnLoad) {
        return {
          anticipateBottom: 0,
          anticipateInnerIn: 0,
          anticipateInnerOut: 0
        };
      }
      const anticipate = this.getAnticipate(scrollTop);
      const anticipateBottom = scrollDirection === parallaxConstant.SCROLL_UP ? anticipate : 0;
      const anticipateInnerIn = scrollDirection === parallaxConstant.SCROLL_UP ? anticipate * 2 : 0;
      const anticipateInnerOut = scrollDirection === parallaxConstant.SCROLL_UP ? 0 : anticipate;
      return {
        anticipateBottom,
        anticipateInnerIn,
        anticipateInnerOut
      };
    }
    /**
     * @param {number} scrollTop
     */
    onScroll(scrollTop) {
      if (!this.isInizialized || !this.wrapper) return;
      if (this.justPinned && this.afterPinCounter < this.numeCycleToFreeze) {
        this.afterPinCounter++;
        return;
      } else {
        this.afterPinCounter = 0;
        this.justPinned = false;
      }
      const scrollDirection = this.prevScroll > scrollTop ? parallaxConstant.SCROLL_UP : parallaxConstant.SCROLL_DOWN;
      const offsetTop = this.direction === parallaxConstant.DIRECTION_VERTICAL ? position(this.wrapper).top : position(this.wrapper).left;
      const { anticipateBottom, anticipateInnerIn, anticipateInnerOut } = this.invertSide ? this.getAnticipateValueInverted(scrollTop, scrollDirection) : this.getAnticipateValue(scrollTop, scrollDirection);
      const bottomCondition = this.invertSide ? offsetTop < this.start - anticipateBottom : offsetTop > this.scrollerHeight - this.start + anticipateBottom;
      const innerCondition = this.invertSide ? offsetTop >= this.start - anticipateInnerIn && offsetTop <= this.start + anticipateInnerOut + this.end : offsetTop <= this.scrollerHeight - this.start + anticipateInnerIn && this.scrollerHeight - offsetTop <= this.end + anticipateInnerOut + this.start;
      if (bottomCondition) {
        if (!this.isUnder) {
          this.resetStyleWhenUnder();
          this.deactivateTrasponder();
          this.isUnder = true;
          this.isInner = false;
          this.isOver = false;
        }
      } else if (innerCondition) {
        if (!this.isInner) {
          this.setFixedPosition();
          const fireSpring = scrollDirection === parallaxConstant.SCROLL_DOWN && !this.invertSide || scrollDirection === parallaxConstant.SCROLL_UP && this.invertSide;
          this.activateTrasponder();
          if (fireSpring) {
            this.animateCollision();
          } else {
            this.animateCollisionBack();
          }
          this.isUnder = false;
          this.isInner = true;
          this.isOver = false;
        }
      } else {
        if (!this.isOver) {
          this.resetStyleWhenOver();
          this.deactivateTrasponder();
          this.isUnder = false;
          this.isInner = false;
          this.isOver = true;
        }
      }
      this.prevScroll = scrollTop;
      this.firstTime = false;
    }
  };

  // src/js/mobMotion/animation/parallax/warning.js
  var parallaxWarningNoUnitMiusure = () => {
    console.warn(
      "parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px"
    );
  };
  var parallaxWarningVhIsNotAllowed = () => {
    console.warn(
      "parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px"
    );
  };
  var parallaxWarningVwIsNotAllowed = () => {
    console.warn(
      "parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px"
    );
  };

  // src/js/mobMotion/animation/parallax/parallaxUtils.js
  var returnWhenFail = () => {
    return {
      numberVal: 0,
      unitMisure: "",
      additionalVal: "",
      position: ""
    };
  };
  var getValueInPx = ({
    invert,
    endValInNumber,
    scrollerHeight,
    isNegative,
    startPoint,
    isFromTopLeft
  }) => {
    const valueFromTop = endValInNumber * isNegative - startPoint;
    const valueFromBottom = scrollerHeight - endValInNumber * isNegative - startPoint;
    if (invert) {
      return isFromTopLeft ? valueFromTop : valueFromBottom;
    } else {
      return isFromTopLeft ? valueFromBottom : valueFromTop;
    }
  };
  var getValueInVwVh = ({
    invert,
    scrollerHeight,
    screenUnit,
    endValInNumber,
    isNegative,
    startPoint,
    isFromTopLeft
  }) => {
    if (invert) {
      return isFromTopLeft ? scrollerHeight - screenUnit * (100 - endValInNumber * isNegative) - startPoint : screenUnit * (100 - endValInNumber * isNegative) - startPoint;
    } else {
      return isFromTopLeft ? scrollerHeight - screenUnit * endValInNumber * isNegative - startPoint : screenUnit * endValInNumber * isNegative - startPoint;
    }
  };
  var detectViewPortInterception = ({
    offset: offset2,
    height,
    gap,
    wScrollTop,
    wHeight
  }) => {
    return offset2 + height > wScrollTop - gap && offset2 < wScrollTop + (wHeight + gap);
  };
  var getStartEndValue = (values, direction2) => {
    const numberInString = values.find((item) => {
      return [...item].some((c) => !Number.isNaN(Number.parseFloat(c)));
    });
    const unitMisure = getStartEndUnitMisure(numberInString);
    if (numberInString && !unitMisure) {
      parallaxWarningNoUnitMiusure();
      return returnWhenFail();
    }
    if (numberInString && unitMisure === parallaxConstant.VH && direction2 === parallaxConstant.DIRECTION_HORIZONTAL) {
      parallaxWarningVhIsNotAllowed();
      return returnWhenFail();
    }
    if (numberInString && unitMisure === parallaxConstant.VW && direction2 === parallaxConstant.DIRECTION_VERTICAL) {
      parallaxWarningVwIsNotAllowed();
      return returnWhenFail();
    }
    const additionaChoice = [
      parallaxConstant.PLUS_HEIGHT,
      parallaxConstant.PLUS_HEIGHT_HALF,
      parallaxConstant.PLUS_WIDTH,
      parallaxConstant.PLUS_WIDTH_HALF,
      parallaxConstant.MINUS_HEIGHT,
      parallaxConstant.MINUS_HEIGHT_HALF,
      parallaxConstant.MINUS_WIDTH,
      parallaxConstant.MINUS_WIDTH_HALF
    ];
    const getAdditionalVal = values.find((item) => {
      return exactMatchInsesitivePropArray(additionaChoice, item);
    });
    const positionMap = [
      parallaxConstant.POSITION_BOTTOM,
      parallaxConstant.POSITION_TOP,
      parallaxConstant.POSITION_LEFT,
      parallaxConstant.POSITION_RIGHT
    ];
    const getPosition2 = values.find((item) => {
      return exactMatchInsesitivePropArray(positionMap, item);
    });
    return {
      numberVal: numberInString || 0,
      unitMisure,
      additionalVal: getAdditionalVal ?? "",
      position: getPosition2 ?? parallaxConstant.POSITION_BOTTOM
    };
  };
  var getStartPoint = (screenUnit, data2, direction2) => {
    const str = String(data2);
    const values = str.split(" ");
    const { numberVal, unitMisure, additionalVal, position: position2 } = getStartEndValue(
      values,
      direction2
    );
    const firstChar = String(numberVal).charAt(0);
    const isNegative = firstChar === "-" ? -1 : 1;
    const number = Number.parseFloat(
      // @ts-ignore
      String(numberVal).replaceAll(/^\D+/g, "")
    );
    const startValInNumber = number ?? 0;
    return unitMisure === parallaxConstant.PX ? {
      value: startValInNumber * isNegative,
      additionalVal,
      position: getParallaxPositionFromContanst(position2)
    } : {
      value: screenUnit * startValInNumber * isNegative,
      additionalVal,
      position: getParallaxPositionFromContanst(position2)
    };
  };
  var getEndPoint = (screenUnit, data2, startPoint, scrollerHeight, invertSide, direction2) => {
    const str = String(data2);
    const values = str.split(" ");
    const { numberVal, unitMisure, additionalVal, position: position2 } = getStartEndValue(
      values,
      direction2
    );
    const firstChar = String(numberVal).charAt(0);
    const isNegative = firstChar === "-" ? -1 : 1;
    const number = Number.parseFloat(
      // @ts-ignore
      String(numberVal).replaceAll(/^\D+/g, "")
    );
    const endValInNumber = number ?? 0;
    const positionFromConstant = getParallaxPositionFromContanst(position2);
    const isFromTopLeft = positionFromConstant === parallaxConstant.POSITION_TOP || positionFromConstant === parallaxConstant.POSITION_LEFT;
    return unitMisure === parallaxConstant.PX ? {
      value: invertSide ? getValueInPx({
        invert: true,
        endValInNumber,
        scrollerHeight,
        isNegative,
        startPoint,
        isFromTopLeft
      }) : getValueInPx({
        invert: false,
        endValInNumber,
        scrollerHeight,
        isNegative,
        startPoint,
        isFromTopLeft
      }),
      additionalVal,
      position: positionFromConstant
    } : {
      value: invertSide ? getValueInVwVh({
        invert: true,
        scrollerHeight,
        screenUnit,
        endValInNumber,
        isNegative,
        startPoint,
        isFromTopLeft
      }) : getValueInVwVh({
        invert: false,
        scrollerHeight,
        screenUnit,
        endValInNumber,
        isNegative,
        startPoint,
        isFromTopLeft
      }),
      additionalVal,
      position: positionFromConstant
    };
  };
  var processFixedLimit = (value, stringValue, height, width) => {
    const str = String(stringValue);
    if (exactMatchInsensitive(str, parallaxConstant.PLUS_HEIGHT_HALF)) {
      return value + height / 2;
    }
    if (exactMatchInsensitive(str, parallaxConstant.PLUS_HEIGHT)) {
      return value + height;
    }
    if (exactMatchInsensitive(str, parallaxConstant.PLUS_WIDTH_HALF)) {
      return value + width / 2;
    }
    if (exactMatchInsensitive(str, parallaxConstant.PLUS_WIDTH)) {
      return value + width;
    }
    if (exactMatchInsensitive(str, parallaxConstant.MINUS_HEIGHT_HALF)) {
      return value - height / 2;
    }
    if (exactMatchInsensitive(str, parallaxConstant.MINUS_HEIGHT)) {
      return value - height;
    }
    if (exactMatchInsensitive(str, parallaxConstant.MINUS_WIDTH_HALF)) {
      return value - width / 2;
    }
    if (exactMatchInsensitive(str, parallaxConstant.MINUS_WIDTH)) {
      return value - width;
    }
    return value;
  };
  var getValueOnSwitch = ({ switchPropierties, isReverse, value }) => {
    switch (switchPropierties) {
      case parallaxConstant.IN_STOP: {
        return !isReverse && value > 0 || isReverse && value < 0 ? 0 : value;
      }
      case parallaxConstant.IN_BACK: {
        return !isReverse && value > 0 || isReverse && value < 0 ? -value : value;
      }
      case parallaxConstant.OUT_STOP: {
        return !isReverse && value < 0 || isReverse && value > 0 ? 0 : value;
      }
      case parallaxConstant.OUT_BACK: {
        return !isReverse && value < 0 || isReverse && value > 0 ? -value : value;
      }
      default: {
        return value;
      }
    }
  };
  var getRetReverseValue = (propierties, val2) => {
    switch (propierties) {
      case parallaxConstant.PROP_OPACITY: {
        return 1 - val2;
      }
      default: {
        return -val2;
      }
    }
  };
  var getScrollFunction = ({ callback: callback2, pin, ease, useThrottle }) => {
    if (pin) return mobCore.useScrollImmediate(callback2);
    if (ease && useThrottle) return mobCore.useScrollThrottle(callback2);
    return mobCore.useScroll(callback2);
  };

  // src/js/mobMotion/animation/parallax/parallax.js
  var ParallaxClass = class {
    /**
     * @param  { import('./type.js').parallaxCommonType & import('./type.js').parallaxType &  import('./type.js').scrollTriggerType} data
     *
     * @example
     *
     * ```javascript
     *  Parallax property schema:
     *
     *
     *  const myParallax = new ParallaxClass({
     *      type: 'parallax',
     *      item: String | Element,
     *      applyTo: [ String | Element ],
     *      trigger: [ String | Element ],
     *      screen: [ String | Element ],
     *      scroller: [ String | Element ],
     *      breakpoint: [ String ],
     *      queryType: [ String ],
     *      direction: [ String ],
     *      propierties: [ String ],
     *      tween: [ HandleSequencer | ParallaxTween ],
     *      range: [ String | Number ],
     *      align: [ String ],
     *      onSwitch: [ String ],
     *      reverse: [ Boolean ],
     *      ease: [ Boolean ],
     *      easeType: [ String ],
     *      lerpConfig: [ Number ],
     *      springConfig: [ String ],
     *      opacityEnd: [ Number ],
     *      opacityStart: [ Number ],
     *      limiterOff: [ Boolean ],
     *      perspective: [ Number ],
     *      disableForce3D: [ Boolean ],
     *      useThrottle: [ Boolean ],
     *  });
     *
     *
     *
     *  Scrolltrigger property schema:
     *
     *
     *  const myScrollTrigger = new ParallaxClass({
     *      item: String | Element,
     *      applyTo: [ String | Element ],
     *      trigger: [ String | Element ],
     *      screen: [ String | Element ],
     *      scroller: [ String | Element ],
     *      breakpoint: [ String ],
     *      queryType: [ String ],
     *      direction: [ String ],
     *      propierties: [ String ],
     *      tween: [ HandleSequencer | ParallaxTween ],
     *      range: [ String ],
     *      dynamicRange: [ Function ],
     *      fromTo: [ Boolean ],
     *      start: [ String ],
     *      dynamicStart: {
     *         position: [ String ],
     *         value: [ Function ]
     *      },
     *      end: [ String ],
     *      dynamicEnd: {
     *         position: [ String ],
     *         value: [ Function ]
     *      },
     *      ease: [ Boolean ],
     *      easeType: [ String ],
     *      lerpConfig: [ Number ],
     *      springConfig: [ String ],
     *      pin: [ Boolean ],
     *      animatePin: [ Boolean ],
     *      anticipatePinOnLoad: [ Boolean ],
     *      marker: [ String ],
     *      forceTranspond: [ Boolean ],
     *      animateAtStart: [ Boolean ],
     *      disableForce3D: [ Boolean ],
     *      onEnter: [ Function ],
     *      onEnterBack: [ Function ],
     *      onLeave: [ Function ],
     *      onLeaveBack: [ Function ],
     *      onTick: [ Function ],
     *      perspective: [ Number ],
     *      useThrottle: [ Boolean ],
     *  });
     *
     *
     * ```
     *
     * @description
     * Available methods:
     *
     * ```javascript
     *
     *
     * myInstance.init()
     * myInstance.destroy()
     * myInstance.refresh()
     * myInstance.move()
     *
     * ```
     */
    constructor(data2) {
      this.isInzialized = false;
      this.firstScroll = false;
      this.willChangeIsActive = false;
      this.offset = 0;
      this.screenPosition = 0;
      this.endValue = 0;
      this.height = 0;
      this.width = 0;
      this.scrollerScroll = 0;
      this.scrollerHeight = 0;
      this.windowInnerWidth = window.innerWidth;
      this.windowInnerHeight = window.innerHeight;
      this.gap = 150;
      this.numericRange = 0;
      this.unsubscribeResize = () => {
      };
      this.unsubscribeScroll = () => {
      };
      this.unsubscribeScrollStart = () => {
      };
      this.unsubscribeScrollEnd = () => {
      };
      this.unsubscribeMarker = () => {
      };
      this.startMarker = void 0;
      this.endMarker = void 0;
      this.lastValue = void 0;
      this.prevFixedRawValue = 0;
      this.fixedShouldRender = false;
      this.prevFixedClamp = void 0;
      this.firstTime = true;
      this.isInViewport = false;
      this.iSControlledFromOutside = false;
      this.force3D = false;
      this.pinInstance = void 0;
      this.unitMisure = "";
      this.startPoint = 0;
      this.endPoint = 0;
      this.unsubscribeMotion = () => {
      };
      this.unsubscribeOnComplete = () => {
      };
      this.pin = valueIsBooleanAndReturnDefault(
        data2?.pin,
        "Scrolltrigger pin propierties error:",
        false
      );
      this.animatePin = valueIsBooleanAndReturnDefault(
        data2?.animatePin,
        "Scrolltrigger animatePin propierties error:",
        false
      );
      this.forceTranspond = valueIsBooleanAndReturnDefault(
        data2?.forceTranspond,
        "Scrolltrigger forceTranspond propierties error:",
        false
      );
      this.anticipatePinOnLoad = valueIsBooleanAndReturnDefault(
        data2?.anticipatePinOnLoad,
        "Scrolltrigger anticipatePinOnLoad propierties error:",
        false
      );
      this.start = valueIsStringAndReturnDefault(
        data2?.start,
        "Scrolltrigger start propierties error:",
        "bottom 0px"
      );
      this.end = valueIsStringAndReturnDefault(
        data2?.end,
        "Scrolltrigger end propierties error:",
        "top"
      );
      this.fromTo = valueIsBooleanAndReturnDefault(
        data2?.fromTo,
        "Scrolltrigger fromTo propierties error:",
        false
      );
      this.invertSide = valueIsBooleanAndReturnDefault(
        data2?.invertSide,
        "Scrolltrigger invertSide propierties error:",
        false
      );
      this.marker = valueIsStringAndReturnDefault(
        data2?.marker,
        "Scrolltrigger marker propierties error:",
        // eslint-disable-next-line unicorn/no-useless-undefined
        void 0
      );
      this.dynamicStart = data2?.dynamicStart ? parallaxDynamicValueIsValid(data2.dynamicStart, "dynamicStart") : null;
      this.dynamicEnd = data2?.dynamicEnd ? parallaxDynamicValueIsValid(data2.dynamicEnd, "dynamicEnd") : null;
      this.dynamicRange = parallaxDynamicRangeIsValid(data2?.dynamicRange);
      this.animateAtStart = valueIsBooleanAndReturnDefault(
        data2?.animateAtStart,
        "Scrolltrigger animateAtStart propierties error:",
        false
      );
      this.onEnter = functionIsValidAndReturnDefault(
        data2?.onEnter,
        false,
        "Scrolltrigger onEnter propierties error"
      );
      this.onEnterBack = functionIsValidAndReturnDefault(
        data2?.onEnterBack,
        false,
        "Scrolltrigger onEnterBack propierties error"
      );
      this.onLeave = functionIsValidAndReturnDefault(
        data2?.onLeave,
        false,
        "Scrolltrigger onLeave propierties error"
      );
      this.onLeaveBack = functionIsValidAndReturnDefault(
        data2?.onLeaveBack,
        false,
        "Scrolltrigger onLeaveBack propierties error"
      );
      this.onTickCallback = functionIsValidAndReturnDefault(
        data2?.onTick,
        false,
        "Scrolltrigger onTickCallback propierties error"
      );
      this.align = parallaxAlignIsValid(data2?.align);
      this.onSwitch = parallaxOnSwitchIsValid(data2?.onSwitch);
      this.reverse = valueIsBooleanAndReturnDefault(
        data2?.reverse,
        "Parallax reverse propierties error:",
        false
      );
      this.opacityStart = parallaxOpacityIsValid(
        data2?.opacityStart,
        "Parallax opacityStart propierties error:",
        100
      );
      this.opacityEnd = parallaxOpacityIsValid(
        data2?.opacityEnd,
        "Parallax opacityEnd propierties error:",
        0
      );
      this.limiterOff = valueIsBooleanAndReturnDefault(
        data2?.limiterOff,
        "Parallax|Scrolltrigger limiterOff propierties error:",
        false
      );
      this.useWillChange = data2?.useWillChange;
      this.tween = parallaxTweenIsValid(data2?.tween);
      const tweenIsSequencer = this.tween?.getType && this.tween.getType() === parallaxConstant.TWEEN_TIMELINE;
      const tweenIsParallaxTween = this.tween?.getType && this.tween.getType() === parallaxConstant.TWEEN_TWEEN;
      this.item = domNodeIsValidAndReturnElOrWin(data2?.item, false);
      this.scroller = domNodeIsValidAndReturnElOrWin(data2?.scroller, true);
      this.screen = domNodeIsValidAndReturnElOrWin(data2?.screen, true);
      this.trigger = domNodeIsValidAndReturnNull(data2?.trigger);
      this.applyTo = domNodeIsValidAndReturnNull(data2?.applyTo);
      this.direction = directionIsValid(
        data2?.direction,
        "Parallax/Scrolltrigger"
      );
      this.disableForce3D = valueIsBooleanAndReturnDefault(
        data2?.disableForce3D,
        "Parallax|Scrolltrigger disableForce3D propierties error:",
        false
      );
      this.useThrottle = valueIsBooleanAndReturnDefault(
        data2?.useThrottle,
        "Parallax|Scrolltrigger useThrottle propierties error:",
        false
      );
      this.type = parallaxTypeIsValid(data2?.type);
      this.perspective = valueIsNumberAndReturnDefault(
        data2?.perspective,
        "Parallax|Scrolltrigger perspective propierties error:",
        0
      );
      this.breakpoint = breakpointIsValid(
        data2?.breakpoint,
        "breakpoint",
        "parallax/scrolltrigger"
      );
      this.queryType = breakpointTypeIsValid(
        data2?.queryType,
        "queryType",
        "parallax/scrolltrigger"
      );
      const { propierties, shouldTrackOnlyEvents } = parallaxPropiertiesIsValid(
        data2?.propierties,
        this.type,
        tweenIsParallaxTween,
        tweenIsSequencer
      );
      this.propierties = propierties;
      this.shouldTrackOnlyEvents = shouldTrackOnlyEvents;
      this.range = shouldTrackOnlyEvents ? "100px" : parallaxRangeIsValid(data2?.range, this.type);
      this.ease = valueIsBooleanAndReturnDefault(
        data2?.ease,
        "Parallax|Scrolltrigger ease propierties error:",
        false
      );
      if (tweenIsSequencer && data2?.easeType === parallaxConstant.EASE_SPRING)
        parallaxEaseTypeSpringWarining();
      this.easeType = tweenIsSequencer ? parallaxConstant.EASE_LERP : parallaxEaseTypeIsValid(data2?.easeType);
      this.springConfig = parallaxSpringConfigIsValid(
        data2?.springConfig,
        this.type
      );
      this.lerpConfig = parallaxLerpConfigIsValid(
        data2?.lerpConfig,
        this.type
      );
      this.motionParameters = this.easeType === parallaxConstant.EASE_SPRING ? { configProp: { precision: parallaxConstant.EASE_PRECISION } } : { precision: parallaxConstant.EASE_PRECISION };
      this.motion = this.easeType === parallaxConstant.EASE_SPRING ? new HandleSpring() : new HandleLerp();
    }
    /**
     * @description
     * Initialize instance
     */
    init() {
      if (this.isInzialized) {
        console.warn(
          "Parallax/scrollTrigger: The init() method cannot be launched more than once. If you are passing the instance to components like horizontalScroller or smoothScroller via the children property, they will initialize the instance."
        );
        return;
      }
      this.isInzialized = true;
      this.setMotion();
      this.calcScreenPosition();
      this.calcOffset();
      this.calcHeight();
      this.calcWidth();
      this.getScreenHeight();
      this.setPerspective();
      if (this.propierties === parallaxConstant.PROP_TWEEN) {
        this.range = this?.tween?.getDuration ? this.tween.getDuration() : 0;
        this.dynamicRange = () => this.range;
        this.tween?.inzializeStagger?.();
      }
      if (this.type == parallaxConstant.TYPE_SCROLLTRIGGER) {
        this.limiterOff = true;
        this.calcRangeAndUnitMiusure();
        this.calcFixedLimit();
      }
      if (this.ease) {
        this.unsubscribeScrollStart = mobCore.useScrollStart(() => {
          this.firstScroll = true;
          if (!this.disableForce3D) this.force3D = true;
        });
        this.unsubscribeScrollEnd = mobCore.useScrollEnd(() => {
          mobCore.useFrame(() => {
            mobCore.useNextTick(() => {
              this.smoothParallaxJs();
            });
          });
        });
        if (this.scroller === window) {
          this.unsubscribeScroll = getScrollFunction({
            pin: this.pin,
            ease: this.ease,
            useThrottle: this.useThrottle,
            callback: () => {
              this.firstScroll = false;
              this.smoothParallaxJs();
            }
          });
        }
        this.smoothParallaxJs();
      } else {
        if (this.scroller === window) {
          this.unsubscribeScroll = getScrollFunction({
            pin: this.pin,
            ease: this.ease,
            useThrottle: this.useThrottle,
            callback: () => {
              this.computeValue();
              this.noEasingRender();
            }
          });
        }
        this.computeValue();
        this.noEasingRender();
        this.unsubscribeScrollEnd = mobCore.useScrollEnd(() => {
          this.noEasingRender({ forceRender: true });
        });
      }
      if (this.scroller !== window && this.marker) {
        this.unsubscribeMarker = mobCore.useScroll(() => {
          this.calcFixedLimit();
        });
      }
      this.unsubscribeResize = mobCore.useResize(({ horizontalResize }) => {
        if (horizontalResize) this.refresh();
      });
      if (this.pin) {
        this.pinInstance = new ParallaxPin();
        if (mq[this.queryType](this.breakpoint)) {
          mobCore.useNextTick(() => {
            this.getScrollerOffset();
            this.pinInstance?.init(this.getPinParams());
            this.pinInstance?.onScroll(this.scrollerScroll);
          });
        }
      }
    }
    getPinParams() {
      return {
        item: this.item,
        marker: this.marker,
        trigger: this.trigger,
        scroller: this.scroller,
        screen: this.screen,
        animatePin: this.animatePin,
        anticipatePinOnLoad: this.anticipatePinOnLoad,
        forceTranspond: this.forceTranspond,
        invertSide: this.invertSide,
        direction: this.direction,
        scrollerHeight: this.scrollerHeight,
        getStart: () => this.startPoint,
        getEnd: () => this.endPoint,
        instance: this
      };
    }
    /**
     * @description
     *
     * @param {HTMLElement|Window} scroller
     */
    setScroller(scroller2) {
      this.scroller = domNodeIsValidAndReturnElOrWin(scroller2, true);
    }
    /**
     * @description
     *
     * @param {HTMLElement|Window} screen
     */
    setScreen(screen) {
      this.screen = domNodeIsValidAndReturnElOrWin(screen, true);
    }
    /**
     * @description
     *
     * @param {string} direction
     */
    setDirection(direction2) {
      this.direction = directionIsValid(direction2, "Parallax/Scrolltrigger");
    }
    /**
     * @description
     *
     * @param {string} breakpoint
     */
    setBreakPoint(breakpoint) {
      this.breakpoint = breakpointIsValid(
        breakpoint,
        "breakpoint",
        "Parallax/Scrolltrigger"
      );
    }
    /**
     * @description
     *
     * @param {string} queryType
     */
    setQueryType(queryType) {
      this.queryType = breakpointTypeIsValid(
        queryType,
        "queryType",
        "Parallax/Scrolltrigger"
      );
    }
    /**
     * @private
     */
    setPerspective() {
      if (this.perspective && this.item && this.item.parentNode) {
        const style = {
          perspective: `${this.perspective}px`,
          "transform-style": "preserve-3d"
        };
        const parent = this.item.parentNode;
        Object.assign(parent.style, style);
      }
    }
    /**
     * @private
     */
    setMotion() {
      const initialValue = parallaxConstant.PROP_SCALE || parallaxConstant.PROP_SCALE_X || parallaxConstant.PROP_SCALE_Y || parallaxConstant.PROP_OPACITY ? 1 : 0;
      this.motion.setData({ val: initialValue });
      this.unsubscribeMotion = this.motion.subscribe(({ val: val2 }) => {
        if (val2 === this.lastValue) return;
        if (this.propierties === parallaxConstant.PROP_TWEEN && this.tween?.draw) {
          this.tween.draw({
            partial: val2,
            isLastDraw: false,
            useFrame: false
          });
          this.lastValue = val2;
          this.firstTime = false;
        } else {
          this.updateStyle(val2);
        }
        mobCore.useNextTick(() => {
          if (this.onTickCallback)
            this.onTickCallback({ value: val2, parentIsMoving: true });
        });
      });
      this.unsubscribeOnComplete = this.motion.onComplete(({ val: val2 }) => {
        this.force3D = false;
        if (this.propierties === parallaxConstant.PROP_TWEEN && this.tween?.draw) {
          this.tween.draw({
            partial: val2,
            isLastDraw: true,
            useFrame: false
          });
        } else {
          this.updateStyle(val2);
        }
        mobCore.useNextTick(() => {
          if (this.onTickCallback)
            this.onTickCallback({ value: val2, parentIsMoving: false });
        });
      });
      switch (this.easeType) {
        case parallaxConstant.EASE_LERP: {
          if (this.lerpConfig) {
            this.motion.updateVelocity(this.lerpConfig);
          }
          break;
        }
        case parallaxConstant.EASE_SPRING: {
          if (this.springConfig) {
            this.motion.updateConfig(this.springConfig);
          }
          break;
        }
      }
    }
    /**
     * @private
     */
    calcRangeAndUnitMiusure() {
      if (this.dynamicRange) {
        const range = this.dynamicRange();
        this.numericRange = Number.isNaN(range) ? 0 : Number.parseFloat(range);
        this.unitMisure = parallaxConstant.PX;
      } else {
        const str = String(this.range);
        const firstChar = str.charAt(0);
        const isNegative = firstChar === "-" ? -1 : 1;
        const strParsed = checkStringRangeOnPropierties(
          str,
          this.propierties
        );
        this.numericRange = // @ts-ignore
        Number.parseFloat(strParsed.replaceAll(/^\D+/g, "")) * isNegative;
        this.unitMisure = getRangeUnitMisure(strParsed);
      }
    }
    /**
     * @private
     */
    calcFixedLimit() {
      const screenUnit = this.scrollerHeight / 100;
      if (this.dynamicStart && this.dynamicStart?.position && this.dynamicStart?.value?.()) {
        const { position: position2, value: fn } = this.dynamicStart;
        const valueResult = fn();
        if (!Number.isNaN(valueResult)) {
          this.start = `${position2} ${valueResult}px`;
        }
      }
      const {
        value: startPoint,
        additionalVal: additionalStartVal,
        position: startPosition
      } = getStartPoint(screenUnit, this.start, this.direction);
      this.invertSide = startPosition === parallaxConstant.POSITION_TOP || startPosition === parallaxConstant.POSITION_LEFT;
      this.startPoint = processFixedLimit(
        startPoint,
        additionalStartVal,
        this.direction === parallaxConstant.DIRECTION_VERTICAL ? this.height : this.width,
        this.direction === parallaxConstant.DIRECTION_VERTICAL ? this.width : this.height
      );
      if (this.dynamicEnd && this.dynamicEnd?.position && this.dynamicEnd?.value?.()) {
        const { position: position2, value: fn } = this.dynamicEnd;
        const valueResult = fn();
        if (!Number.isNaN(valueResult)) {
          this.end = `${position2} ${valueResult}px`;
        }
      }
      const {
        value: endPoint,
        additionalVal: additionalEndVal,
        position: endPosition
      } = getEndPoint(
        screenUnit,
        this.end,
        this.startPoint,
        this.scrollerHeight,
        this.invertSide,
        this.direction
      );
      const multiplier = (() => {
        if (this.invertSide) {
          return endPosition === parallaxConstant.POSITION_BOTTOM || endPosition === parallaxConstant.POSITION_RIGHT ? -1 : 1;
        } else {
          return endPosition === parallaxConstant.POSITION_BOTTOM || endPosition === parallaxConstant.POSITION_RIGHT ? 1 : -1;
        }
      })();
      this.endPoint = processFixedLimit(
        endPoint,
        additionalEndVal,
        this.direction === parallaxConstant.DIRECTION_VERTICAL ? this.height * multiplier : this.width * multiplier,
        this.direction === parallaxConstant.DIRECTION_VERTICAL ? this.width * multiplier : this.height * multiplier
      );
      this.setMarker();
      if (this.invertSide) this.startPoint -= this.height;
    }
    /**
     * @private
     */
    setMarker() {
      if (this.marker) {
        const { startMarker, endMarker } = parallaxMarker({
          startMarker: this.startMarker,
          endMarker: this.endMarker,
          startPoint: this.startPoint,
          endPoint: this.endPoint,
          screen: this.screen,
          direction: this.direction,
          invertSide: this.invertSide,
          label: this.marker
        });
        this.startMarker = startMarker;
        this.endMarker = endMarker;
      }
    }
    /**
     * @private
     */
    calcOffset() {
      const el = this.trigger ?? this.item;
      if (!el) return;
      let x = 0;
      let y = 0;
      let z = 0;
      if (this.trigger) {
        x = getTranslateValues(this.trigger).x;
        y = getTranslateValues(this.trigger).y;
        z = getTranslateValues(this.trigger).z;
      }
      el.style.transform = "";
      if (this.direction === parallaxConstant.DIRECTION_VERTICAL) {
        this.offset = // eslint-disable-next-line unicorn/prefer-global-this
        this.scroller === window ? Math.trunc(offset(el).top) : (
          // @ts-ignore
          Math.trunc(offset(el).top) - offset(this.scroller).top
        );
      } else {
        this.offset = // eslint-disable-next-line unicorn/prefer-global-this
        this.scroller === window ? Math.trunc(offset(el).left) : (
          // @ts-ignore
          Math.trunc(offset(el).left) - offset(this.scroller).left
        );
      }
      if (this.screen && this.screen !== window) {
        this.offset -= this.direction === parallaxConstant.DIRECTION_VERTICAL ? (
          // @ts-ignore
          Math.trunc(offset(this.screen).top)
        ) : (
          // @ts-ignore
          Math.trunc(position(this.screen).left)
        );
      }
      if (this.trigger && (x !== 0 || y !== 0 || z !== 0)) {
        this.trigger.style.transform = `translate3D(${x}px, ${y}px, ${z}px)`;
      }
    }
    /**
     * @private
     */
    calcScreenPosition() {
      if (this.screen === window || !this.screen) return;
      this.screenPosition = this.direction === parallaxConstant.DIRECTION_VERTICAL ? (
        // @ts-ignore
        Number.parseInt(offset(this.screen).top)
      ) : (
        // @ts-ignore
        Number.parseInt(position(this.screen).left)
      );
    }
    /**
     * @private
     */
    calcHeight() {
      const el = this.trigger ?? this.item;
      if (!el) return;
      this.height = this.direction === parallaxConstant.DIRECTION_VERTICAL ? Math.trunc(el.offsetHeight) : Math.trunc(el.offsetWidth);
    }
    /**
     * @private
     */
    calcWidth() {
      const el = this.trigger ?? this.item;
      if (!el) return;
      this.width = this.direction === parallaxConstant.DIRECTION_VERTICAL ? Math.trunc(el.offsetWidth) : Math.trunc(el.offsetHeight);
    }
    /**
     * @private
     */
    getScrollerOffset() {
      if (!this.scroller) return;
      if (this.scroller === window) {
        this.scrollerScroll = this.direction === parallaxConstant.DIRECTION_VERTICAL ? this.scroller.scrollY : this.scroller.scrollX;
      } else {
        this.scrollerScroll = this.direction === parallaxConstant.DIRECTION_VERTICAL ? (
          // @ts-ignore
          -offset(this.scroller).top
        ) : (
          // @ts-ignore
          -offset(this.scroller).left
        );
      }
    }
    /**
     * @private
     */
    getScreenHeight() {
      if (!this.screen) return;
      this.windowInnerWidth = window.innerWidth;
      this.windowInnerHeight = window.innerHeight;
      if (this.screen === window) {
        this.scrollerHeight = this.direction === parallaxConstant.DIRECTION_VERTICAL ? window.innerHeight : window.innerWidth;
      } else {
        this.scrollerHeight = this.direction === parallaxConstant.DIRECTION_VERTICAL ? (
          // @ts-ignore
          Math.trunc(this.screen.offsetHeight)
        ) : (
          // @ts-ignore
          Math.trunc(this.screen.offsetWidth)
        );
      }
    }
    /**
     * @description
     * Recalculate positions and align all values
     */
    refresh() {
      if (this.pin && this.pinInstance) this.pinInstance.destroy();
      this.calcScreenPosition();
      this.calcOffset();
      this.calcHeight();
      this.calcWidth();
      this.getScreenHeight();
      if (this.type == parallaxConstant.TYPE_SCROLLTRIGGER) {
        this.calcFixedLimit();
        if (this.dynamicRange) this.calcRangeAndUnitMiusure();
        if (this.pin && this.pinInstance && mq[this.queryType](this.breakpoint)) {
          this.pinInstance?.init(this.getPinParams());
        }
      }
      this.lastValue = void 0;
      this.firstTime = true;
      this.firstScroll = false;
      if (mq[this.queryType](this.breakpoint)) {
        if (this.ease) {
          this.smoothParallaxJs();
        } else {
          this.computeValue();
          this.noEasingRender({ forceRender: true });
        }
      } else {
        if (this.ease) this.motion?.stop?.();
        mobCore.useFrameIndex(() => {
          if (this.applyTo) {
            this.resetTweenStyle(this.applyTo);
            Object.assign(this.applyTo.style, this.getResetStyle());
          } else {
            this.resetTweenStyle(this.item);
            if (this.item)
              Object.assign(this.item.style, this.getResetStyle());
          }
        }, 3);
      }
    }
    /**
     * @description
     * Method used to control the instance from the outside.
     * The methods accept two parameters:
     *
     * `value`: The scroll position of the parent.
     * If no value is provided, the instance will calculate it autonomously.
     *
     * `parentIsMoving`: Value that indicates if the component using the method is moving.
     * The value is used to manage the addition of the translate3D property.
     * The default value is false
     *
     *
     * @example
     * ```javascript
     *
     *
     * Control the instance from another scrollTrigger:
     *
     * const myScroller = mobbu.createScrollTrigger({
     *     ...
     *     onTick: ({ value, parentIsMoving }) => {
     *         myInstance.move({ value, parentIsMoving });
     *     },
     *     ...
     * });
     * ```
     *
     * @param {import('./type.js').parallaxMoveType} obj
     *
     */
    move({ value, parentIsMoving = false }) {
      if (!mq[this.queryType](this.breakpoint) || !value) return;
      this.iSControlledFromOutside = true;
      const scrollVal = this.getScrollValueOnMove(value);
      if (this.ease) {
        this.smoothParallaxJs(scrollVal);
      } else {
        this.computeValue(scrollVal);
        const forceRender = this.isInViewport || this.firstTime || void 0;
        this.noEasingRender({ forceRender, parentIsMoving });
      }
    }
    /**
     * @description
     * Trigger scrollStart event
     * Used by smoothScroll to activate 3D if child (this) have ease = true
     */
    triggerScrollStart() {
      if (!this.ease) return;
      this.firstScroll = true;
      if (!this.disableForce3D) this.force3D = true;
    }
    /**
     * @description
     * Trigger scrollEnd event
     * Used by smoothScroll to deactivate 3D if child (this) have ease = false
     */
    triggerScrollEnd() {
      if (this.ease) return;
      this.noEasingRender({ forceRender: true });
    }
    /**
     * @private
     *
     * @param {number|undefined} value
     */
    getScrollValueOnMove(value) {
      if (value === void 0) return;
      if (this.screen !== window) return value + this.screenPosition;
      return value;
    }
    /**
     * @description
     * Stop lerp|spring tween.
     */
    stopMotion() {
      this.motion?.stop?.();
    }
    /**
     * @private
     *
     * @param {number} [ scrollVal ]
     */
    smoothParallaxJs(scrollVal) {
      if (!mq[this.queryType](this.breakpoint)) return;
      this.computeValue(scrollVal);
      if (!this.fixedShouldRender && !this.firstTime && this.type === parallaxConstant.TYPE_SCROLLTRIGGER)
        return;
      if (!this.isInViewport && !this.firstTime && this.type === parallaxConstant.TYPE_PARALLAX)
        return;
      const action2 = this.firstTime && !this.animateAtStart ? "set" : "goTo";
      if (!this.motion) return;
      this.motion[action2](
        { val: this.endValue },
        this.motionParameters
      ).catch(() => {
      });
    }
    /**
     * @private
     *
     * @param {number} [ scrollVal ]
     */
    computeValue(scrollVal) {
      if (!mq[this.queryType](this.breakpoint)) return;
      if (scrollVal) {
        this.scrollerScroll = -scrollVal;
      } else {
        this.getScrollerOffset();
      }
      this.isInViewport = detectViewPortInterception({
        offset: this.offset,
        height: this.height,
        gap: this.gap,
        wScrollTop: this.scrollerScroll,
        wHeight: this.scrollerHeight
      });
      if (!this.isInViewport && !this.limiterOff && this.type === parallaxConstant.TYPE_PARALLAX)
        return;
      if (this.pin && this.pinInstance) {
        this.pinInstance.onScroll(this.scrollerScroll);
      }
      switch (this.type) {
        case parallaxConstant.TYPE_SCROLLTRIGGER: {
          this.endValue = getRoundedValue(this.getFixedValue());
          break;
        }
        default: {
          switch (this.propierties) {
            case parallaxConstant.PROP_OPACITY: {
              this.endValue = getRoundedValue(this.getOpacityValue());
              break;
            }
            default: {
              this.endValue = Number.isNaN(
                // @ts-ignore
                Number.parseInt(this.align)
              ) ? getRoundedValue(this.getIsNaNValue() / 2) : getRoundedValue(this.getIsANumberValue() / 2);
              break;
            }
          }
        }
      }
      const reverseValue = this.reverse && this.type !== parallaxConstant.TYPE_SCROLLTRIGGER ? getRetReverseValue(this.propierties, this.endValue) : this.endValue;
      this.endValue = this.type === parallaxConstant.TYPE_SCROLLTRIGGER ? reverseValue : this.getSwitchAfterZeroValue(reverseValue);
    }
    /**
     * @private
     */
    noEasingRender({ forceRender = false, parentIsMoving = false } = {}) {
      if (!mq[this.queryType](this.breakpoint)) return;
      mobCore.useFrame(() => {
        this.cleanRender({ forceRender, parentIsMoving });
      });
    }
    /**
     * @private
     */
    cleanRender({ forceRender = false, parentIsMoving = false } = {}) {
      if (this.endValue === this.lastValue && !forceRender || !this.isInViewport && !forceRender)
        return;
      if (!this.disableForce3D && !this.iSControlledFromOutside)
        this.force3D = !forceRender;
      if (!this.disableForce3D && this.iSControlledFromOutside)
        this.force3D = parentIsMoving && this.isInViewport;
      if (this.propierties === parallaxConstant.PROP_TWEEN) {
        this.tween.draw({
          partial: this.endValue,
          isLastDraw: !this.force3D,
          useFrame: false
        });
        this.lastValue = this.endValue;
        this.firstTime = false;
      } else {
        this.updateStyle(this.endValue);
      }
      mobCore.useNextTick(() => {
        if (this.onTickCallback)
          this.onTickCallback({
            value: this.endValue,
            parentIsMoving: this.force3D
          });
      });
    }
    /**
     * @private
     *
     * @param {number} value
     */
    updateStyle(value) {
      if (this.applyTo) {
        Object.assign(this.applyTo.style, this.getStyle(value));
      } else if (this.item) {
        Object.assign(this.item.style, this.getStyle(value));
      }
      this.lastValue = value;
      this.firstTime = false;
    }
    /**
     * @private
     */
    getFixedValue() {
      const partials = this.invertSide ? -(this.scrollerScroll + this.startPoint + this.endPoint - (this.offset + this.endPoint)) : -(this.scrollerScroll + this.scrollerHeight - this.startPoint - (this.offset + this.endPoint));
      const maxVal = this.endPoint / 100 * this.numericRange;
      const partialVal = partials / 100 * this.numericRange;
      const valePerDirections = (() => {
        if (this.fromTo) {
          return this.invertSide ? maxVal - partialVal : partialVal;
        } else {
          return this.invertSide ? partialVal : maxVal - partialVal;
        }
      })();
      const clampValue = maxVal > 0 ? -clamp(valePerDirections, 0, maxVal) : -clamp(valePerDirections, maxVal, 0);
      this.fixedShouldRender = this.prevFixedClamp !== clampValue;
      this.prevFixedClamp = clampValue;
      if (!this.fixedShouldRender && !this.firstTime) return this.endValue;
      const percentValue = clampValue * 100 / this.endPoint;
      if (this.onEnter || this.onEnterBack || this.onLeave || this.onLeaveBack) {
        parallaxEmitter({
          prevValue: this.prevFixedRawValue,
          value: valePerDirections,
          maxVal,
          onEnter: this.onEnter,
          onEnterBack: this.onEnterBack,
          onLeave: this.onLeave,
          onLeaveBack: this.onLeaveBack
        });
      }
      this.prevFixedRawValue = valePerDirections;
      switch (this.propierties) {
        case parallaxConstant.PROP_HORIZONTAL:
        case parallaxConstant.PROP_VERTICAL: {
          return this.getHVval(percentValue);
        }
        case parallaxConstant.PROP_SCALE:
        case parallaxConstant.PROP_SCALE_X:
        case parallaxConstant.PROP_SCALE_Y:
        case parallaxConstant.PROP_OPACITY: {
          return 1 - percentValue;
        }
        default: {
          return -percentValue;
        }
      }
    }
    /**
     * @private
     *
     * @param {number} percent
     */
    getHVval(percent) {
      switch (this.unitMisure) {
        case parallaxConstant.VW: {
          return this.windowInnerWidth / 100 * -percent;
        }
        case parallaxConstant.VH: {
          return this.windowInnerHeight / 100 * -percent;
        }
        case parallaxConstant.WPERCENT: {
          return this.direction === parallaxConstant.DIRECTION_VERTICAL ? this.width / 100 * -percent : this.height / 100 * -percent;
        }
        case parallaxConstant.HPERCENT: {
          return this.direction === parallaxConstant.DIRECTION_VERTICAL ? this.height / 100 * -percent : this.width / 100 * -percent;
        }
        default: {
          return -percent;
        }
      }
    }
    /**
     * @private
     */
    getOpacityValue() {
      const vhLimit = this.scrollerHeight / 100 * this.opacityEnd;
      const vhStart = this.scrollerHeight - this.scrollerHeight / 100 * this.opacityStart;
      const value = this.align == parallaxConstant.ALIGN_START ? -this.scrollerScroll * -1 : (this.scrollerScroll + vhLimit - this.offset) * -1;
      const valClamped = this.align == parallaxConstant.ALIGN_START ? 1 - value / this.offset : 1 - value / (this.scrollerHeight - vhStart - vhLimit);
      return clamp(valClamped, 0, 1);
    }
    /**
     * @private
     */
    getIsNaNValue() {
      const valuetoNumber = Number(this.range);
      const rangeNumber = Number.isNaN(valuetoNumber) ? 0 : valuetoNumber;
      const documentHeight = this.direction === parallaxConstant.DIRECTION_VERTICAL ? document.documentElement.scrollHeight : document.documentElement.scrollWidth;
      switch (this.align) {
        case parallaxConstant.ALIGN_START: {
          return this.scrollerScroll / rangeNumber;
        }
        case parallaxConstant.ALIGN_TOP:
        case parallaxConstant.ALIGN_LEFT: {
          return (this.scrollerScroll - this.offset) / rangeNumber;
        }
        case parallaxConstant.ALIGN_CENTER: {
          return (this.scrollerScroll + (this.scrollerHeight / 2 - this.height / 2) - this.offset) / rangeNumber;
        }
        case parallaxConstant.ALIGN_BOTTOM:
        case parallaxConstant.ALIGN_RIGHT: {
          return (this.scrollerScroll + (this.scrollerHeight - this.height) - this.offset) / rangeNumber;
        }
        case parallaxConstant.ALIGN_END: {
          return -(documentHeight - (this.scrollerScroll + this.scrollerHeight)) / rangeNumber;
        }
        default: {
          return 0;
        }
      }
    }
    /**
     * @private
     * Here the value is a number.
     */
    getIsANumberValue() {
      const align = Number(this.align);
      const range = Number(this.range);
      return (this.scrollerScroll + this.scrollerHeight / 100 * align - this.offset) / range;
    }
    /**
     * @private
     *
     * @param {number} value
     */
    getSwitchAfterZeroValue(value) {
      return getValueOnSwitch({
        switchPropierties: this.onSwitch,
        isReverse: this.reverse,
        value
      });
    }
    /**
     * @private
     *
     * @param {number} value
     */
    getStyle(value) {
      if (this.shouldTrackOnlyEvents) return;
      const force3DStyle = this.force3D ? "translate3D(0px, 0px, 0px)" : "";
      this.willChangeIsActive = this.useWillChange ? mobCore.mustMakeSomething() : false;
      const shouldWill = this.willChangeIsActive && this.force3D ? "transform" : "";
      const valueParsed = mobCore.shouldMakeSomething() ? Math.round(value) : value;
      switch (this.propierties) {
        case parallaxConstant.PROP_VERTICAL: {
          return {
            // translate: `0 ${val}px`,
            // transform: `${force3DStyle}`,
            transform: `${force3DStyle} translateY(${valueParsed}px)`,
            willChange: shouldWill
          };
        }
        case parallaxConstant.PROP_HORIZONTAL: {
          return {
            transform: `${force3DStyle} translateX(${valueParsed}px)`,
            willChange: shouldWill
          };
        }
        case parallaxConstant.PROP_ROTATE: {
          return {
            transform: `${force3DStyle} rotate(${valueParsed}deg)`,
            willChange: shouldWill
          };
        }
        case parallaxConstant.PROP_ROTATEY: {
          return {
            transform: `${force3DStyle} rotateY(${valueParsed}deg)`,
            willChange: shouldWill
          };
        }
        case parallaxConstant.PROP_ROTATEX: {
          return {
            transform: `${force3DStyle} rotateX(${valueParsed}deg)`,
            willChange: shouldWill
          };
        }
        case parallaxConstant.PROP_ROTATEZ: {
          return {
            transform: `${force3DStyle} rotateZ(${valueParsed}deg)`,
            willChange: shouldWill
          };
        }
        case parallaxConstant.PROP_OPACITY: {
          return { opacity: `${value}` };
        }
        case parallaxConstant.PROP_SCALE: {
          const scaleVal = this.type === parallaxConstant.TYPE_SCROLLTRIGGER ? value : 1 + value / 1e3;
          return {
            transform: `${force3DStyle} scale(${scaleVal})`,
            willChange: shouldWill
          };
        }
        case parallaxConstant.PROP_SCALE_X: {
          const scaleVal = this.type === parallaxConstant.TYPE_SCROLLTRIGGER ? value : 1 + value / 1e3;
          return {
            transform: `${force3DStyle} scaleX(${scaleVal})`,
            willChange: shouldWill
          };
        }
        case parallaxConstant.PROP_SCALE_Y: {
          const scaleVal = this.type === parallaxConstant.TYPE_SCROLLTRIGGER ? value : 1 + value / 1e3;
          return {
            transform: `${force3DStyle} scaleY(${scaleVal})`,
            willChange: shouldWill
          };
        }
        default: {
          return {
            [this.propierties.toLowerCase()]: `${value}px`
          };
        }
      }
    }
    /**
     * @private
     * Reset sequencer/parallaxTween style
     *
     * @param {HTMLElement|null} item
     */
    resetTweenStyle(item) {
      if (this.tween) item.style = "";
    }
    /**
     * @private
     * Reset default style
     */
    getResetStyle() {
      if (this.shouldTrackOnlyEvents) return;
      switch (this.propierties) {
        case parallaxConstant.PROP_VERTICAL:
        case parallaxConstant.PROP_HORIZONTAL:
        case parallaxConstant.PROP_ROTATE:
        case parallaxConstant.PROP_ROTATEY:
        case parallaxConstant.PROP_ROTATEX:
        case parallaxConstant.PROP_ROTATEZ:
        case parallaxConstant.PROP_SCALE: {
          return {
            transform: ``
          };
        }
        case parallaxConstant.PROP_OPACITY: {
          return { opacity: `` };
        }
        default: {
          return { [this.propierties.toLowerCase()]: `` };
        }
      }
    }
    /**
     * @description
     * Destroy instance
     */
    destroy() {
      this.motion?.stop?.();
      this.unsubscribeScroll();
      this.unsubscribeScrollStart();
      this.unsubscribeScrollEnd();
      this.unsubscribeResize();
      this.unsubscribeMotion();
      this.unsubscribeOnComplete();
      this.unsubscribeMarker();
      this.motion?.destroy?.();
      this.dynamicRange = () => {
      };
      this.onEnter = () => {
      };
      this.onEnterBack = () => {
      };
      this.onLeave = () => {
      };
      this.onLeaveBack = () => {
      };
      this.onTickCallback = () => {
      };
      if (this.pin && this.pinInstance) this.pinInstance?.destroy?.();
      if (this.startMarker) this.startMarker?.remove?.();
      if (this.endMarker) this.endMarker?.remove?.();
      this.startMarker = void 0;
      this.endMarker = void 0;
      this.pinInstance = null;
      this.endValue = 0;
      const el = this.applyTo ?? this.item;
      if (el && "style" in el) el.style = "";
      this.item = null;
      this.scroller = null;
      this.screen = null;
      this.trigger = null;
      this.applyTo = null;
    }
  };

  // src/js/mobMotion/scroller.js
  var scroller = {
    /**
     * @param {import('./animation/parallax/type.js').parallaxCommonType & import('./animation/parallax/type.js').parallaxType} data
     * @returns {ParallaxClass}
     *
     * @example
     * ```javascript
     *  Property schema:
     *
     *
     *  const myParallax = scroller.createParallax({
     *      item: String | Element,
     *      applyTo: [ String | Element ],
     *      trigger: [ String | Element ],
     *      screen: [ String | Element ],
     *      scroller: [ String | Element ],
     *      breakpoint: [ String ],
     *      queryType: [ String ],
     *      direction: [ String ],
     *      propierties: [ String ],
     *      tween: [ HandleSequencer | ParallaxTween ],
     *      range: [ String | Number ],
     *      align: [ String ],
     *      onSwitch: [ String ],
     *      reverse: [ Boolean ],
     *      ease: [ Boolean ],
     *      easeType: [ String ],
     *      lerpConfig: [ Number ],
     *      springConfig: [ String ],
     *      opacityEnd: [ Number ],
     *      opacityStart: [ Number ],
     *      limiterOff: [ Boolean ],
     *      perspective: [ Number ],
     *      disableForce3D: [ Boolean ],
     *      useThrottle: [ Boolean ],
     *  });
     *
     *
     * ```
     *
     * @description
     * Available methods:
     *
     * ```javascript
     *
     *
     * myParallax.init()
     * myParallax.destroy()
     * myParallax.refresh()
     * myParallax.move()
     *
     * ```
     *
     */
    createParallax(data2) {
      return new ParallaxClass({
        ...data2,
        // @ts-ignore
        type: parallaxConstant.TYPE_PARALLAX
      });
    },
    /**
     * @param {import('./animation/parallax/type.js').parallaxCommonType & import('./animation/parallax/type.js').scrollTriggerType } data
     * @returns {ParallaxClass}
     *
     * @example
     *
     * ```javascript
     *   Property schema:
     *
     *
     *   const myScrollTrigger = scroller.createScrollTrigger({
     *       item: String | Element,
     *       applyTo: [ String | Element ],
     *       trigger: [ String | Element ],
     *       screen: [ String | Element ],
     *       scroller: [ String | Element ],
     *       breakpoint: [ String ],
     *       queryType: [ String ],
     *       direction: [ String ],
     *       propierties: [ String ],
     *       tween: [ HandleSequencer | ParallaxTween ],
     *       range: [ String ],
     *       dynamicRange: [ Function ],
     *       fromTo: [ Boolean ],
     *       start: [ String ],
     *       dynamicStart: {
     *          position: [ String ],
     *          value: [ Function ]
     *       },
     *       end: [ String ],
     *       dynamicEnd: {
     *          position: [ String ],
     *          value: [ Function ]
     *       },
     *       ease: [ Boolean ],
     *       easeType: [ String ],
     *       lerpConfig: [ Number ],
     *       springConfig: [ String ],
     *       pin: [ Boolean ],
     *       animatePin: [ Boolean ],
     *       anticipatePinOnLoad: [ Boolean ],
     *       marker: [ String ],
     *       forceTranspond: [ Boolean ],
     *       animateAtStart: [ Boolean ],
     *       disableForce3D: [ Boolean ],
     *       onEnter: [ Function ],
     *       onEnterBack: [ Function ],
     *       onLeave: [ Function ],
     *       onLeaveBack: [ Function ],
     *       onTick: [ Function ],
     *       perspective: [ Number ],
     *       useThrottle: [ Boolean ],
     *   });
     *
     *
     *
     * ```
     *
     * @description
     * Available methods:
     *
     * ```javascript
     *
     *
     * myScrollTrigger.init()
     * myScrollTrigger.destroy()
     * myScrollTrigger.refresh()
     * myScrollTrigger.move()
     *
     * ```
     */
    createScrollTrigger(data2) {
      return new ParallaxClass({
        ...data2,
        // @ts-ignore
        type: parallaxConstant.TYPE_SCROLLTRIGGER
      });
    }
  };

  // src/js/mobjs/component/store.js
  var componentMap = /* @__PURE__ */ new Map();

  // src/js/mobjs/component/action/element.js
  var setElementById = ({
    id = "",
    newElement = document.createElement("div")
  }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    if (!item) return;
    componentMap.set(id, { ...item, element: newElement });
  };
  var getElementById = ({ id = "" }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    const element = item?.element;
    return element;
  };
  var getIdByElement = ({ element }) => {
    const item = [...componentMap.values()].find((item2) => {
      const currentElement = item2?.element;
      return currentElement === element;
    });
    return item?.id ?? "";
  };
  var getElementByKeyAndRepeatId = ({ key = "", repeatId = "" }) => {
    if (key?.length === 0) return;
    const values = [...componentMap.values()];
    const valuesFiltered = values.find(
      (item) => `${item.key}` === `${key}` && item.componentRepeatId === repeatId
    );
    return valuesFiltered?.element;
  };
  var getIdsByByRepeatId = ({ id, repeatId, filterById = false }) => {
    if (!id || id === "") return;
    const values = [...componentMap.values()];
    return values.filter((item) => {
      return item?.componentRepeatId === repeatId;
    }).filter((item) => {
      if (filterById) return item?.parentId === id;
      return item;
    }).map((item) => {
      return item.id;
    });
  };

  // src/js/mobjs/component/action/children.js
  var getChildrenIdByName = ({ id = "", componentName = "" }) => {
    if (!id || id === "") return [];
    const item = componentMap.get(id);
    const child2 = item?.child;
    if (!child2) {
      console.warn(`getChildIdById failed no id found`);
      return [];
    }
    return child2?.[componentName] ?? [];
  };
  var gerOrderedChildrenById = ({ children }) => {
    return children.map((id) => {
      return { id, element: getElementById({ id }) };
    }).sort(function(a, b) {
      const { element: elementA } = a;
      const { element: elementB } = b;
      if (elementA === elementB || !elementA || !elementB) return 0;
      if (elementA.compareDocumentPosition(elementB) & 2) {
        return 1;
      }
      return -1;
    }).map(({ id }) => id);
  };

  // src/js/mobjs/component/action/component.js
  var getIdByInstanceName = (name = "") => {
    if (!name) return;
    const instance = [...componentMap.values()].find(({ instanceName }) => {
      return instanceName === name;
    });
    const id = instance?.id;
    if (!id) {
      console.warn(`getIdByName failed no name`);
      return;
    }
    return id;
  };

  // src/js/mobjs/component/action/getTree.js
  var getTreeRecursive = ({ chunk }) => {
    return chunk.reduce((previous, current) => {
      const [key, value] = current;
      const { child: child2, componentName, instanceName } = value;
      const childrenId = new Set(Object.values(child2 ?? {}).flat());
      const childrenChunk = [...componentMap.entries()].filter(
        ([key2]) => childrenId.has(key2)
      );
      return [
        ...previous,
        {
          id: key,
          componentName,
          instanceName,
          children: getTreeRecursive({
            chunk: childrenChunk
          })
        }
      ];
    }, []);
  };
  var getTree = () => {
    const chunk = [...componentMap.entries()].filter(
      ([, value]) => !value?.parentId || value?.parentId === ""
    );
    return getTreeRecursive({ chunk });
  };

  // src/js/mobjs/component/action/methods.js
  var addMethodById = ({ id, name, fn }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    const methods = item?.methods;
    if (name in methods) {
      console.warn(`Method ${name}, is already used by ${id}`);
      return;
    }
    componentMap.set(id, {
      ...item,
      methods: { ...methods, [name]: fn }
    });
  };
  var getMethodsById = ({ id }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    const methods = item?.methods;
    if (Object.keys(methods).length === 0) {
      console.warn(`no methods available for ${id} component`);
      return {};
    }
    return methods;
  };
  var useMethodByName = (name) => {
    const id = getIdByInstanceName(name);
    if (!id || id === "") return;
    const methods = getMethodsById({ id });
    if (Object.keys(methods).length === 0) {
      console.warn(`no methods available for ${name} component`);
      return {};
    }
    return methods;
  };

  // src/js/mobjs/parse/useQuery.js
  var useQuery = false;
  var forceComponentChildQuery = true;
  var useSlotQuery = false;

  // src/js/mobjs/query/queryAllFutureComponent.js
  function* walkPreOrder(node) {
    if (!node) return;
    yield node;
    for (const child2 of node.children) {
      yield* walkPreOrder(child2);
    }
  }
  function selectAll(root2, firstOccurrence) {
    const result = [];
    for (const node of walkPreOrder(root2)) {
      if (result.length > 0 && firstOccurrence) break;
      if (node?.getIsPlaceholder?.()) {
        result.push(node);
      }
    }
    return result;
  }
  var queryAllFutureComponent = (node, firstOccurence = true) => {
    let result = [];
    const root2 = node || document.body;
    for (const child2 of root2.children) {
      result = [...result, ...selectAll(child2, firstOccurence)];
    }
    return result;
  };

  // src/js/mobjs/queque/utils.js
  function awaitNextLoop() {
    return new Promise((resolve) => mobCore.useNextLoop(() => resolve()));
  }

  // src/js/mobjs/queque/tick.js
  var queque = /* @__PURE__ */ new Map();
  var maxQueuqueSize = 1e5;
  var incrementTickQueuque = (props) => {
    if (queque.size >= maxQueuqueSize) {
      console.warn(`maximum loop event reached: (${maxQueuqueSize})`);
      return () => {
      };
    }
    const id = mobCore.getUnivoqueId();
    queque.set(id, props);
    return () => queque.delete(id);
  };
  var queueIsResolved = () => {
    return queque.size === 0 || queque.size >= maxQueuqueSize;
  };
  var tick = async ({ debug = false, previousResolve } = {}) => {
    await awaitNextLoop();
    if (debug) {
      queque.forEach((value) => {
        console.log(value);
      });
    }
    if (queueIsResolved() && previousResolve) {
      previousResolve();
      return;
    }
    return new Promise((resolve) => {
      if (queueIsResolved()) {
        resolve();
        return;
      }
      tick({ debug, previousResolve: previousResolve ?? resolve });
    });
  };

  // src/js/mobjs/modules/userComponent/index.js
  var userPlaceholder = /* @__PURE__ */ new Set();
  var addUserPlaceholder = (element) => {
    userPlaceholder.add(element);
  };
  var getFirstUserChildPlaceHolder = (element) => {
    const userComponent = [...userPlaceholder].find((item) => {
      return element?.contains(item) && item.getIsPlaceholder();
    });
    userPlaceholder.delete(userComponent);
    return [userComponent];
  };
  var getAllUserChildPlaceholder = ({ element }) => {
    return [...userPlaceholder].filter((component) => {
      return element.contains(component) && element !== component && component.getIsPlaceholder?.();
    }) ?? [];
  };
  var getAllUserComponentUseNamedSlot = ({ element }) => {
    return [...userPlaceholder].filter((component) => {
      return element.contains(component) && element !== component && component.getIsPlaceholder?.() && component?.getSlotPosition?.();
    }) ?? [];
  };
  var getUserChildPlaceholderSize = () => {
    return userPlaceholder.size;
  };
  var clearUserPlaceHolder = async () => {
    await tick();
    userPlaceholder.clear();
  };

  // src/js/mobjs/component/utils.js
  var updateChildrenArray = ({
    currentChild,
    id = "",
    componentName = ""
  }) => {
    const childGroupByName = currentChild?.[componentName] ?? [];
    currentChild[componentName] = [...childGroupByName, id];
    return currentChild;
  };
  var removeChildFromChildrenArray = ({
    currentChild,
    id = "",
    componentName = ""
  }) => {
    const childGroupByName = currentChild?.[componentName] ?? [];
    currentChild[componentName] = childGroupByName.filter(
      (currentId) => {
        return id !== currentId;
      }
    );
    return currentChild;
  };
  var addPropsToState = ({ props, store }) => {
    Object.entries(props).forEach(([key, value]) => {
      store.set(key, value);
    });
  };

  // src/js/mobjs/component/action/parent.js
  var getParentIdById = (id = "") => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    const parentId = item?.parentId;
    if (!parentId) {
      return;
    }
    return parentId;
  };
  var addSelfIdToParentComponent = ({ id = "" }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    const parentId = item?.parentId;
    const componentName = item?.componentName ?? "";
    if (!parentId) return;
    const value = componentMap.get(parentId);
    if (!value) return;
    const { child: child2 } = value;
    if (!child2) return;
    componentMap.set(parentId, {
      ...value,
      child: {
        ...child2,
        ...updateChildrenArray({
          currentChild: child2,
          id,
          componentName
        })
      }
    });
  };
  var addParentIdToFutureComponent = ({ element, id }) => {
    if (useQuery || forceComponentChildQuery) {
      const children = queryAllFutureComponent(element, false);
      children.forEach((child2) => {
        child2.setParentId(id);
      });
      return;
    }
    const childrenComponent = getAllUserChildPlaceholder({ element });
    childrenComponent.forEach((component) => {
      component.setParentId(id);
    });
  };
  var getFallBackParentByElement = ({ element }) => {
    return [...componentMap.values()].findLast((item) => {
      return item.element.contains(element) && item.element !== element;
    })?.id;
  };
  var compareIdOrParentIdRecursive = ({ id, compareValue }) => {
    if (id === compareValue) return true;
    const item = componentMap.get(id);
    if (!item) return;
    const { parentId } = item;
    return compareIdOrParentIdRecursive({ id: parentId, compareValue });
  };

  // src/js/mobjs/modules/bindProps/bindPropsMap.js
  var bindPropsMap = /* @__PURE__ */ new Map();

  // src/js/mobjs/modules/bindProps/removeCurrentIdToBindProps.js
  var removeCurrentIdToBindProps = ({ componentId }) => {
    if (!componentId) return;
    for (const [key, value] of bindPropsMap) {
      const { componentId: currentComponentId } = value;
      if (currentComponentId === componentId) {
        bindPropsMap.delete(key);
      }
    }
  };

  // src/js/mobjs/component/action/state/getStateById.js
  var getStateById = (id = "") => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    const state = item?.state;
    return state?.get();
  };

  // src/js/mobjs/component/action/watch.js
  var watchById = (id = "", prop = "", cb = () => {
  }) => {
    if ((!id || id === "") && (!prop || prop === "")) return;
    const item = componentMap.get(id);
    const state = item?.state;
    return state?.watch(prop, cb);
  };

  // src/js/mobjs/modules/bindtext/index.js
  var bindTextMap = /* @__PURE__ */ new Map();
  var bindTextPlaceHolderMap = /* @__PURE__ */ new Map();
  var addBindTextPlaceHolderMap = ({
    host,
    componentId,
    bindTextId
  }) => {
    bindTextPlaceHolderMap.set(host, {
      componentId,
      bindTextId
    });
  };
  var arrayValuesFromProp = (value) => value.match(/(?<=\[).+?(?=])/g);
  var splitPropUntilSquare = (value) => value.split("[")?.[0];
  var parsePropValue = ({ previous, current }) => {
    const arrayValues = arrayValuesFromProp(current);
    const isArray = arrayValues?.length > 0;
    return isArray ? arrayValues.reduce(
      (accumulator, currentProp) => accumulator?.[currentProp],
      previous[splitPropUntilSquare(current)]
    ) : previous?.[current];
  };
  var renderBindText = (id, strings, ...values) => {
    const props = getStateById(id);
    const states = values.map((prop) => {
      const propsToArray = prop.split(".");
      return propsToArray.reduce(
        (previous, current) => {
          const finalPropValue = parsePropValue({ previous, current });
          return finalPropValue ?? previous;
        },
        props
      );
    });
    return strings.raw.reduce(
      (accumulator, currentText, i) => accumulator + currentText + (states?.[i] ?? ""),
      ""
    );
  };
  var addBindTextParent = ({ id, bindTextId, parentElement }) => {
    const items = bindTextMap.get(id);
    const itemsUpdated = items && items.length > 0 ? (() => {
      const itemsFiltered = items.filter(
        (item) => item.bindTextId !== bindTextId
      );
      return [
        ...itemsFiltered,
        { parentNode: parentElement, bindTextId }
      ];
    })() : [{ parentNode: parentElement, bindTextId }];
    bindTextMap.set(id, itemsUpdated);
  };
  var switchBindTextMap = () => {
    [...bindTextPlaceHolderMap].forEach(
      ([placeholder, { componentId, bindTextId }]) => {
        addBindTextParent({
          id: componentId,
          bindTextId,
          parentElement: placeholder.parentElement
        });
        placeholder?.removeCustomComponent?.();
        placeholder?.remove();
      }
    );
    bindTextPlaceHolderMap.clear();
  };
  var removeBindTextParentById = ({ id }) => {
    bindTextMap.delete(id);
  };
  var getParentBindText = ({ id, bindTextId }) => {
    const item = bindTextMap.get(id);
    if (!item) return;
    const current = item.find((item2) => {
      return bindTextId === item2.bindTextId;
    });
    return current?.parentNode;
  };
  var getBindTextParentSize = () => {
    return [...bindTextMap].reduce(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (previous, [_, values]) => previous + values.length,
      0
    );
  };
  var getBindTextPlaceholderSize = () => bindTextPlaceHolderMap.size;
  var createBindTextWatcher = (id, bindTextId, render2, ...props) => {
    let watchIsRunning = false;
    props.forEach((state) => {
      const propsToArray = state.split(".");
      const stateToWatch = propsToArray?.[0];
      const arrayValues = arrayValuesFromProp(stateToWatch);
      const isArray = arrayValues?.length > 0;
      const finalStateTowatch = isArray ? splitPropUntilSquare(stateToWatch) : stateToWatch;
      if (!finalStateTowatch) return;
      watchById(id, finalStateTowatch, () => {
        if (watchIsRunning) return;
        watchIsRunning = true;
        mobCore.useNextLoop(() => {
          mobCore.useFrame(() => {
            const parentNode = getParentBindText({ id, bindTextId });
            if (!parentNode) {
              watchIsRunning = false;
              return;
            }
            parentNode.textContent = "";
            parentNode.insertAdjacentHTML("afterbegin", render2());
            watchIsRunning = false;
          });
        });
      });
    });
  };

  // src/js/mobjs/modules/invalidate/invalidateFunctionMap.js
  var invalidateFunctionMap = /* @__PURE__ */ new Map();

  // src/js/mobjs/modules/invalidate/invalidateIdPlaceHolderMap.js
  var invalidateIdPlaceHolderMap = /* @__PURE__ */ new Map();

  // src/js/mobjs/modules/invalidate/action/removeInvalidateId.js
  var removeInvalidateId = ({ id }) => {
    if (invalidateFunctionMap.has(id)) {
      const value = invalidateFunctionMap.get(id);
      value.forEach(({ invalidateId }) => {
        if (invalidateIdPlaceHolderMap.has(invalidateId)) {
          invalidateIdPlaceHolderMap.delete(invalidateId);
        }
      });
      invalidateFunctionMap.delete(id);
    }
  };

  // src/js/mobjs/modules/repeater/repeatFunctionMap.js
  var repeatFunctionMap = /* @__PURE__ */ new Map();

  // src/js/mobjs/modules/repeater/repeatIdPlaceHolderMap.js
  var repeatIdPlaceHolderMap = /* @__PURE__ */ new Map();

  // src/js/mobjs/modules/repeater/action/removeRepeaterId.js
  var removeRepeaterId = ({ id }) => {
    if (repeatFunctionMap.has(id)) {
      const value = repeatFunctionMap.get(id);
      value.forEach(({ repeatId }) => {
        if (repeatIdPlaceHolderMap.has(repeatId)) {
          repeatIdPlaceHolderMap.delete(repeatId);
        }
      });
      repeatFunctionMap.delete(id);
    }
  };

  // src/js/mobjs/modules/repeater/targetcomponent/index.js
  var repeaterTargetComponentMap = /* @__PURE__ */ new Map();
  var addRepeatTargetComponent = ({
    repeatId,
    repeaterParentId,
    targetComponent
  }) => {
    if (repeaterTargetComponentMap.has(repeatId)) return;
    repeaterTargetComponentMap.set(repeatId, {
      repeatId,
      repeaterParentId,
      targetComponent
    });
  };
  var getRepeaterComponentTarget = ({ id }) => {
    const item = repeaterTargetComponentMap.get(id);
    if (!item) return;
    return item?.targetComponent;
  };
  var removeRepeaterComponentTargetByParentId = ({ id }) => {
    for (const [key, value] of repeaterTargetComponentMap) {
      const { repeaterParentId } = value;
      if (repeaterParentId === id) {
        repeaterTargetComponentMap.delete(key);
      }
    }
  };

  // src/js/mobjs/component/action/removeAndDestroy/removeItselfFromParent.js
  var removeItselfFromParent = ({ id, parentId, componentName }) => {
    if (!id) return;
    const value = componentMap.get(parentId ?? "");
    if (!value) return;
    const { child: child2 } = value;
    if (!parentId || !child2) return;
    componentMap.set(parentId, {
      ...value,
      child: {
        ...child2,
        ...removeChildFromChildrenArray({
          currentChild: child2,
          id,
          componentName
        })
      }
    });
  };

  // src/js/mobjs/component/action/removeAndDestroy/removeAndDestroyById.js
  var removeAndDestroyById = ({ id = "" }) => {
    if (!id || id === "") return;
    const instanceValue = componentMap.get(id);
    if (!instanceValue) return;
    const {
      parentId,
      componentName,
      child: child2,
      element,
      state,
      destroy,
      parentPropsWatcher
    } = instanceValue;
    Object.values(child2 ?? {}).flat().forEach((childId) => {
      removeAndDestroyById({ id: childId });
    });
    removeItselfFromParent({ id, parentId, componentName });
    destroy?.();
    state.destroy();
    if (parentPropsWatcher) parentPropsWatcher.forEach((unwatch) => unwatch());
    removeRepeaterComponentTargetByParentId({ id });
    removeInvalidateId({ id });
    removeRepeaterId({ id });
    removeBindTextParentById({ id });
    removeCurrentIdToBindProps({ componentId: id });
    componentMap.delete(id);
    element?.removeCustomComponent?.();
    element?.remove();
  };

  // src/js/mobjs/component/action/freeze.js
  var freezePropById = ({ id = "", prop }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    if (!item) return;
    const { freezedPros } = item;
    if (!freezedPros) return;
    componentMap.set(id, {
      ...item,
      freezedPros: [.../* @__PURE__ */ new Set([...freezedPros, prop])]
    });
  };
  var unFreezePropById = ({ id = "", prop }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    if (!item) return;
    const { freezedPros } = item;
    if (!freezedPros) return;
    componentMap.set(id, {
      ...item,
      freezedPros: freezedPros.filter((currentProp) => currentProp !== prop)
    });
  };
  var getFreezePropStatus = ({ id = "", prop }) => {
    if (!id || id === "") return false;
    const item = componentMap.get(id);
    const freezedPros = item?.freezedPros;
    if (!freezedPros) return false;
    return freezedPros.includes(prop);
  };

  // src/js/mobjs/modules/repeater/repeatIdHostMap.js
  var repeatIdHostMap = /* @__PURE__ */ new Map();

  // src/js/mobjs/modules/repeater/action/setParentRepeater.js
  var setParentRepeater = ({ repeatId, host }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return;
    const parent = (
      /** @type{HTMLElement} */
      host.parentNode
    );
    repeatIdPlaceHolderMap.set(repeatId, {
      ...item,
      element: parent
    });
    repeatIdHostMap.set(repeatId, host);
  };

  // src/js/mobjs/constant.js
  var ATTR_IS_COMPONENT = "data-mobjs";
  var ATTR_COMPONENT_ID = "componentid";
  var ATTR_BIND_TEXT_ID = "bindtextid";
  var ATTR_PROPS = "staticprops";
  var ATTR_DYNAMIC = "bindprops";
  var ATTR_INSTANCENAME = "name";
  var ATTR_COMPONENT_NAME = "name";
  var ATTR_SLOT = "slot";
  var ATTR_CHILD_REPEATID = "repeaterchild";
  var ATTR_KEY = "key";
  var ATTR_CURRENT_LIST_VALUE = "currentRepeaterValue";
  var ATTR_REPEATER_PROP_BIND = "repeatPropBind";
  var ATTR_BIND_EVENTS = "bindevents";
  var ATTR_WEAK_BIND_EVENTS = "weakbindevents";
  var ATTR_PARENT_ID = "parentid";
  var ATTR_BIND_REFS_ID = "bindrefid";
  var ATTR_BIND_REFS_NAME = "bindrefname";
  var ATTR_INVALIDATE = "invalidateid";
  var ATTR_MOBJS_REPEAT = "mobjsrepeat";
  var frameDelayAfterParse = 5;
  var DEFAULT_CURRENT_REPEATER_STATE = { current: {}, index: -1 };
  var QUEQUE_TYPE_BINDPROPS = "QUEQUE_BINDPROPS";
  var QUEQUE_TYPE_REPEATER = "QUEQUE_REPEATER";
  var QUEQUE_TYPE_INVALIDATE = "QUEQUE_INVALIDATE";

  // src/js/mobjs/webComponent/repeat.js
  var defineRepeatComponent = () => {
    customElements.define(
      "mobjs-repeat",
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
          const { dataset } = this.shadowRoot?.host ?? {};
          if (dataset) {
            const host = this.shadowRoot.host;
            const repeatId = host.getAttribute(ATTR_MOBJS_REPEAT);
            setParentRepeater({ repeatId, host });
          }
        }
        removeCustomComponent() {
          if (!this.shadowRoot) return;
          this.parentElement?.removeChild(this);
        }
      }
    );
  };

  // src/js/mobjs/modules/invalidate/invalidateIdHostMap.js
  var invalidateIdHostMap = /* @__PURE__ */ new Map();

  // src/js/mobjs/modules/invalidate/action/setParentInvalidate.js
  var setParentInvalidate = ({ invalidateId, host }) => {
    const item = invalidateIdPlaceHolderMap.get(invalidateId);
    if (!item) return;
    const parent = (
      /** @type{HTMLElement} */
      host.parentNode
    );
    invalidateIdPlaceHolderMap.set(invalidateId, {
      ...item,
      element: parent
    });
    invalidateIdHostMap.set(invalidateId, host);
  };

  // src/js/mobjs/webComponent/invalidate.js
  var defineInvalidateComponent = () => {
    customElements.define(
      "mobjs-invalidate",
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
          const { dataset } = this.shadowRoot?.host ?? {};
          if (dataset) {
            const host = this.shadowRoot.host;
            const invalidateId = host.getAttribute(ATTR_INVALIDATE);
            setParentInvalidate({ invalidateId, host });
          }
        }
        removeCustomComponent() {
          if (!this.shadowRoot) return;
          this.parentElement?.removeChild(this);
        }
      }
    );
  };

  // src/js/mobjs/modules/slot/index.js
  var slotPlaceholder = /* @__PURE__ */ new Set();
  var addSlotPlaceholder = (slot) => {
    slotPlaceholder.add(slot);
  };
  var clearSlotPlaceHolder = () => {
    slotPlaceholder.clear();
  };
  var getUnamedPlaceholderSlot = ({ element }) => {
    return [...slotPlaceholder].find((slot) => {
      const hasSlot = !slot?.getSlotName?.() && element.contains(slot);
      if (hasSlot) slotPlaceholder.delete(slot);
      return hasSlot;
    });
  };
  var getSlotByName = ({ name, element }) => {
    return [...slotPlaceholder].find((slot) => {
      const hasSlot = slot?.getSlotName?.() === name && element.contains(slot);
      if (hasSlot) slotPlaceholder.delete(slot);
      return hasSlot;
    });
  };
  var getAllSlot = () => {
    return [...slotPlaceholder];
  };
  var getSlotPlaceholderSize = () => {
    return slotPlaceholder.size;
  };

  // src/js/mobjs/webComponent/slot.js
  var defineSlotComponent = () => {
    customElements.define(
      "mobjs-slot",
      class extends HTMLElement {
        /**
         * @type {string|undefined|null}
         */
        #slotName;
        /**
         * @type {string|undefined|null}
         */
        #staticProps;
        /**
         * @type {string|undefined|null}
         */
        #dynamicProps;
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
          this.#slotName = "";
          this.isSlot = true;
          const host = this.shadowRoot?.host;
          if (!host) return;
          if (!useSlotQuery) addSlotPlaceholder(host);
          const { dataset } = this.shadowRoot?.host ?? {};
          if (dataset) {
            this.#slotName = this.shadowRoot?.host.getAttribute(ATTR_COMPONENT_NAME);
            this.#staticProps = this.shadowRoot?.host.getAttribute(ATTR_PROPS);
            this.#dynamicProps = this.shadowRoot?.host.getAttribute(ATTR_DYNAMIC);
          }
        }
        removeCustomComponent() {
          if (!this.shadowRoot) return;
          this.parentElement?.removeChild(this);
        }
        getSlotName() {
          return this.#slotName;
        }
        getStaticProps() {
          return this.#staticProps;
        }
        getDynamicProps() {
          return this.#dynamicProps;
        }
      }
    );
  };

  // src/js/mobjs/webComponent/userComponent.js
  var defineUserComponent = (componentList) => {
    Object.entries(componentList).forEach(([key, value]) => {
      const {
        constructorCallback: _constructorCallback,
        connectedCallback: _connectedCallBack,
        disconnectedCallback: _disconnectedCallback,
        adoptedCallback: _adoptedCallback,
        attributeChangedCallback: _attributeChangedCallback,
        style,
        attributeToObserve
      } = value.componentParams;
      customElements.define(
        key,
        class extends HTMLElement {
          /**
           * @type {string}
           */
          #componentname;
          /**
           * @type {string}
           */
          #componentId;
          /**
           * @type {(prop: string) => void}
           */
          #emit;
          /**
           * @type {(prop: string) => Promise<{ success: boolean }>}
           */
          #emitAsync;
          /**
           * @type {(prop: string) => void}
           */
          #freezeProp;
          /**
           * @type {(componentName: string) => Array<string>}
           */
          #getChildren;
          /**
           * @type {() => string|undefined}
           */
          #getParentId;
          /**
           * @type {(arg0: string) => any}
           */
          #getState;
          /**
           * @type {() => void}
           */
          #remove;
          /**
           * @type {( prop: string, newValue: any, fireCallback?: boolean, clone?: boolean ) => void}
           */
          #setState;
          /**
           * @type {(arg0: { id: string }) => void}
           */
          #unBind;
          /**
           * @type {(prop: string) => void}
           */
          #unFreezeProp;
          /**
           * @type {(prop: string, callback: () => void) => void}
           */
          #watch;
          /**
           * @type {(prop: string, callback: () => void) => void}
           */
          #watchSync;
          /**
           * @type {(prop: string, callback: () => void) => void}
           */
          #watchParent;
          /**
           * @type {boolean}
           */
          #isPlaceholder;
          /**
           * @type {string|undefined|null}
           */
          #name;
          /**
           * @type {string|undefined|null}
           */
          #staticPropsId;
          /**
           * @type {string|undefined|null}
           */
          #dynamicPropsId;
          /**
           * @type {string|undefined|null}
           */
          #bindEventsId;
          /**
           * @type {string}
           */
          #dynamicPropsFromSlotId;
          /**
           * @type {string}
           */
          #propsFromSlotId;
          /**
           * @type {string|undefined|null}
           */
          #currentRepeatValueId;
          /**
           * @type {string|undefined|null}
           */
          #slotPosition;
          /**
           * @type {string|undefined|null}
           */
          #currentKey;
          /**
           * @type {string}
           */
          #parentId;
          /**
           * @type {string|undefined|null}
           */
          #componentRepeatId;
          /**
           * @type {string|undefined|null}
           */
          #delegateEventId;
          /**
           * @type {string|undefined|null}
           */
          #repeatPropBind;
          /**
           * @type {string|undefined|null}
           */
          #bindRefId;
          /**
           * @type {string|undefined|null}
           */
          #bindRefName;
          static get observedAttributes() {
            return attributeToObserve;
          }
          constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.active = false;
            this.#componentId = mobCore.getUnivoqueId();
            this.#emit = () => {
            };
            this.#emitAsync = () => Promise.resolve({ success: true });
            this.#freezeProp = () => {
            };
            this.#freezeProp = () => {
            };
            this.#getChildren = () => [""];
            this.#getParentId = () => "";
            this.#getState = () => {
            };
            this.#remove = () => {
            };
            this.#setState = () => {
            };
            this.#unBind = () => {
            };
            this.#unFreezeProp = () => {
            };
            this.#watch = () => {
            };
            this.#watchSync = () => {
            };
            this.#watchParent = () => {
            };
            this.#componentname = key;
            this.#isPlaceholder = true;
            this.isUserComponent = true;
            this.#dynamicPropsFromSlotId = "";
            this.#propsFromSlotId = "";
            const host = this.shadowRoot?.host;
            if (!host) return;
            if (!useQuery) addUserPlaceholder(host);
            [
              this.#name,
              this.#staticPropsId,
              this.#dynamicPropsId,
              this.#currentKey,
              this.#bindEventsId,
              this.#currentRepeatValueId,
              this.#slotPosition,
              this.#parentId,
              this.#componentRepeatId,
              this.#delegateEventId,
              this.#repeatPropBind,
              this.#bindRefId,
              this.#bindRefName
            ] = [
              ATTR_INSTANCENAME,
              ATTR_PROPS,
              ATTR_DYNAMIC,
              ATTR_KEY,
              ATTR_BIND_EVENTS,
              ATTR_CURRENT_LIST_VALUE,
              ATTR_SLOT,
              ATTR_PARENT_ID,
              ATTR_CHILD_REPEATID,
              ATTR_WEAK_BIND_EVENTS,
              ATTR_REPEATER_PROP_BIND,
              ATTR_BIND_REFS_ID,
              ATTR_BIND_REFS_NAME
            ].map((attribute) => host.getAttribute(attribute) ?? "");
            if (this.#slotPosition && !this.active) {
              this.style.visibility = "hidden";
            }
            if (!this.shadowRoot) return;
            if (style) {
              const styleTag = document.createElement("style");
              styleTag.textContent = style;
              this.shadowRoot.append(styleTag);
            }
            const slot = document.createElement("slot");
            this.shadowRoot.append(slot);
            _constructorCallback?.({
              context: this
            });
          }
          getComponentName() {
            return this.#componentname;
          }
          /**
           * @param { string } value
           */
          setId(value2) {
            this.#componentId = value2;
          }
          getId() {
            return this.#componentId;
          }
          getParentId() {
            return this.#parentId;
          }
          /**
           * @param { string } id
           */
          setParentId(id) {
            this.#parentId = id;
          }
          getIsPlaceholder() {
            return this.#isPlaceholder;
          }
          getInstanceName() {
            return this.#name;
          }
          getStaticPropsId() {
            return this.#staticPropsId;
          }
          getDynamicPropsid() {
            return this.#dynamicPropsId;
          }
          getBindEventsId() {
            return this.#bindEventsId;
          }
          getCurrentKey() {
            return this.#currentKey;
          }
          /**
           * @param {string} value
           */
          setDynamicPropsFromSlotId(value2) {
            this.#dynamicPropsFromSlotId = value2;
          }
          getDynamicPropsFromSlotId() {
            return this.#dynamicPropsFromSlotId;
          }
          /**
           * @param {string} value
           */
          setPropsFromSlotId(value2) {
            this.#propsFromSlotId = value2;
          }
          getPropsFromSlotId() {
            return this.#propsFromSlotId;
          }
          /**
           * @param {any} value
           */
          setRepeatValue(value2) {
            this.#currentRepeatValueId = value2;
          }
          getRepeatValue() {
            return this.#currentRepeatValueId;
          }
          getSlotPosition() {
            return this.#slotPosition;
          }
          getDelegateEventId() {
            return this.#delegateEventId;
          }
          getRepeaterPropBind() {
            return this.#repeatPropBind ?? void 0;
          }
          /**
           * @param {string} value
           */
          setRepeaterPropBind(value2) {
            this.#repeatPropBind = value2;
          }
          getComponentRepeatId() {
            return this.#componentRepeatId;
          }
          getBindRefId() {
            return this.#bindRefId;
          }
          getBindRefName() {
            return this.#bindRefName;
          }
          #getData() {
            return {
              componentId: this.#componentId,
              emit: this.#emit,
              emitAsync: this.#emitAsync,
              freezeProp: this.#freezeProp,
              getChildren: this.#getChildren,
              getParentId: this.#getParentId,
              getState: this.#getState,
              remove: this.#remove,
              setState: this.#setState,
              unBind: this.#unBind,
              unFreezeProp: this.#unFreezeProp,
              watch: this.#watch,
              watchSync: this.#watchSync,
              watchParent: this.#watchParent
            };
          }
          resetData() {
            this.active = false;
            this.#componentId = "";
            this.#emit = () => {
            };
            this.#emitAsync = () => Promise.resolve({ success: true });
            this.#freezeProp = () => {
            };
            this.#getChildren = () => [""];
            this.#getParentId = () => "";
            this.#getState = () => {
            };
            this.#remove = () => {
            };
            this.#setState = () => {
            };
            this.#unBind = () => {
            };
            this.#unFreezeProp = () => {
            };
            this.#watch = () => {
            };
            this.#watchSync = () => {
            };
            this.#watchParent = () => {
            };
          }
          /**
           * @param {object} data
           */
          inizializeCustomComponent(data2) {
            if (this.active) return;
            this.active = true;
            this.#componentId = data2.id;
            this.#emit = data2.emit;
            this.#emitAsync = data2.emitAsync;
            this.#freezeProp = data2.freezeProp;
            this.#getChildren = data2.getChildren;
            this.#getParentId = data2.getParentId;
            this.#getState = data2.getState;
            this.#remove = data2.remove;
            this.#setState = data2.setState;
            this.#unBind = data2.unBind;
            this.#unFreezeProp = data2.unFreezeProp;
            this.#watch = data2.watch;
            this.#watchSync = data2.watchSync;
            this.#watchParent = data2.watchParent;
            _connectedCallBack?.({
              context: this,
              data: this.#getData()
            });
            this.#isPlaceholder = false;
          }
          disconnectedCallback() {
            if (!this.shadowRoot || !this.active) return;
            _disconnectedCallback?.({
              context: this,
              data: this.#getData()
            });
            this.resetData();
          }
          removeCustomComponent() {
            if (!this.shadowRoot || !this.active) return;
            this.parentElement?.removeChild(this);
          }
          adoptedCallback() {
            if (!this.shadowRoot || !this.active) return;
            _adoptedCallback?.({
              context: this,
              data: this.#getData()
            });
          }
          /**
           * @param {string} name
           * @param {any} oldValue
           * @param {any} newValue
           */
          attributeChangedCallback(name, oldValue, newValue) {
            if (!this.shadowRoot || !this.active) return;
            _attributeChangedCallback?.({
              name,
              oldValue,
              newValue,
              context: this,
              data: this.#getData()
            });
          }
        }
      );
    });
  };

  // src/js/mobjs/webComponent/bindText.js
  var defineBindTextComponent = () => {
    customElements.define(
      "mobjs-bind-text",
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
          const { dataset } = this.shadowRoot?.host ?? {};
          if (dataset) {
            const host = this.shadowRoot.host;
            const componentId = host.getAttribute(ATTR_COMPONENT_ID);
            const bindTextId = host.getAttribute(ATTR_BIND_TEXT_ID);
            addBindTextPlaceHolderMap({
              host,
              componentId,
              bindTextId
            });
          }
        }
        removeCustomComponent() {
          if (!this.shadowRoot) return;
          this.parentElement?.removeChild(this);
        }
      }
    );
  };

  // src/js/mobjs/component/componentList.js
  var componentListMap = {};
  var availableComponent = /* @__PURE__ */ new Set();
  var setComponentList = () => {
    componentListMap = [...availableComponent.values()].reduce(
      (previous, current) => ({ ...previous, ...current }),
      {}
    );
    console.log(`component loaded:${Object.keys(componentListMap).length}`);
    defineUserComponent(componentListMap);
    defineSlotComponent();
    defineInvalidateComponent();
    defineRepeatComponent();
    defineBindTextComponent();
  };
  var useComponent = (components) => {
    components.forEach((component) => {
      availableComponent.add(component);
    });
  };

  // src/js/mobjs/component/getComponentList.js
  var getComponentList = () => {
    return componentListMap;
  };

  // src/js/mobjs/component/action/state/checkIfStateIsExportable.js
  var checkIfStateIsExportable = ({ componentName, propName }) => {
    const componentList = getComponentList();
    const exportableState = componentList?.[componentName]?.componentParams?.exportState ?? [];
    return exportableState.includes(propName);
  };

  // src/js/mobjs/component/action/state/setStateById.js
  var setStateById = (id = "", prop = "", value, fire4 = true) => {
    if ((!id || id === "") && (!prop || prop === "") && !value) return;
    const isFreezed = getFreezePropStatus({ id, prop });
    if (isFreezed) {
      return;
    }
    const item = componentMap.get(id);
    const state = item?.state;
    const componentName = item?.componentName ?? "";
    const stateIsExportable = checkIfStateIsExportable({
      componentName,
      propName: prop
    });
    if (!stateIsExportable) {
      console.warn(
        `setStateById failed ${prop} in: ${componentName} is not exportable, maybe a slot bind state that not exist here?`
      );
      return null;
    }
    if (!state) {
      console.warn(`setStateById failed no id found on prop: ${prop}`);
      return null;
    }
    state.set(prop, value, fire4);
  };

  // src/js/mobjs/component/action/state/setStateByName.js
  var setStateByName = (name = "") => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);
    return (prop, value, fire4) => setStateById(id, prop, value, fire4);
  };

  // src/js/mobjs/component/action/state/updateStateById.js
  var updateStateById = (id = "", prop = "", value, fire4 = true) => {
    if ((!id || id === "") && (!prop || prop === "") && !value) return;
    const isFreezed = getFreezePropStatus({ id, prop });
    if (isFreezed) {
      return;
    }
    const item = componentMap.get(id);
    const state = item?.state;
    const componentName = item?.componentName ?? "";
    const stateIsExportable = checkIfStateIsExportable({
      componentName,
      propName: prop
    });
    if (!stateIsExportable) {
      console.warn(
        `updateStateById failed ${prop} in: ${componentName} is not exportable, maybe a slot bind state that not exist here?`
      );
      return null;
    }
    if (!state) {
      console.warn(`updateStateById failed no id found on prop: ${prop}`);
      return null;
    }
    state.update(prop, value, fire4);
  };

  // src/js/mobjs/component/action/state/updateStateByName.js
  var updateStateByName = (name = "") => {
    const id = getIdByInstanceName(name);
    if (!id) console.warn(`component ${name}, not found`);
    return (prop, value, fire4) => updateStateById(id, prop, value, fire4);
  };

  // src/js/mobjs/component/createComponent/index.js
  var defaultComponent = {
    scoped: false,
    maxParseIteration: 5e3,
    debug: false
  };
  var setDefaultComponent = (obj) => {
    defaultComponent = { ...defaultComponent, ...obj };
  };
  var getDefaultComponent = () => defaultComponent;
  var getDebugMode = () => {
    const { debug } = getDefaultComponent();
    return debug;
  };
  var createComponent = ({
    name = "",
    component = () => "",
    state = {},
    exportState = [],
    scoped,
    constructorCallback = () => {
    },
    connectedCallback = () => {
    },
    disconnectedCallback = () => {
    },
    adoptedCallback = () => {
    },
    attributeToObserve = [],
    attributeChangedCallback = () => {
    },
    style = "",
    child: child2 = []
  }) => {
    useComponent(child2);
    return {
      [name]: {
        componentFunction: component,
        componentParams: {
          exportState,
          scoped,
          state,
          constructorCallback,
          connectedCallback,
          disconnectedCallback,
          adoptedCallback,
          attributeToObserve,
          attributeChangedCallback,
          style,
          child: child2
        }
      }
    };
  };

  // src/js/mobjs/route/routeList/index.js
  var routeList = [];
  var indexPage = "";
  var pageNotFound = "";
  var setRouteList = (list) => {
    routeList = [...list];
  };
  var getRouteByName = ({ routeName = "" }) => {
    return routeList.find(({ name }) => routeName === name);
  };
  var setIndex = ({ routeName = "" }) => {
    indexPage = routeName;
  };
  var getIndex = () => indexPage;
  var setPageNotFound = ({ routeName = "" }) => {
    pageNotFound = routeName;
  };
  var getPageNotFound = () => pageNotFound;

  // src/js/mobjs/mainStore/constant.js
  var MAIN_STORE_ACTIVE_ROUTE = "activeRoute";
  var MAIN_STORE_ACTIVE_PARAMS = "activeParams";
  var MAIN_STORE_BEFORE_ROUTE_LEAVES = "beforeRouteLeave";
  var MAIN_STORE_BEFORE_ROUTE_CHANGE = "beforeRouteChange";
  var MAIN_STORE_AFTER_ROUTE_CHANGE = "afterRouteChange";
  var MAIN_STORE_ROUTE_IS_LOADING = "routeIsLoading";
  var MAIN_STORE_ASYNC_PARSER = "repeaterParserAsync";

  // src/js/mobjs/mainStore/mainStore.js
  var mainStore = mobCore.createStore({
    [MAIN_STORE_ACTIVE_ROUTE]: () => ({
      value: { route: "", templateName: "" },
      type: "any",
      skipEqual: false
    }),
    [MAIN_STORE_ACTIVE_PARAMS]: () => ({
      value: {},
      type: "any",
      skipEqual: false
    }),
    [MAIN_STORE_BEFORE_ROUTE_LEAVES]: () => ({
      value: { route: "", templateName: "" },
      type: "any",
      skipEqual: false
    }),
    [MAIN_STORE_BEFORE_ROUTE_CHANGE]: () => ({
      value: { route: "", templateName: "" },
      type: "any",
      skipEqual: false
    }),
    [MAIN_STORE_AFTER_ROUTE_CHANGE]: () => ({
      value: { route: "", templateName: "" },
      type: "any",
      skipEqual: false
    }),
    [MAIN_STORE_ROUTE_IS_LOADING]: () => ({
      value: false,
      type: Boolean
    }),
    [MAIN_STORE_ASYNC_PARSER]: {
      element: () => ({
        value: document.createElement("div"),
        type: HTMLElement,
        skipEqual: false
      }),
      parentId: () => ({
        value: "",
        type: String,
        skipEqual: false
      }),
      persistent: () => ({
        value: false,
        type: Boolean,
        skipEqual: false
      })
    }
  });

  // src/js/mobjs/parse/counter.js
  var parserCounter = 0;
  var incrementParserCounter = () => {
    parserCounter += 1;
  };
  var decrementParserCounter = () => {
    parserCounter -= 1;
    return parserCounter;
  };

  // src/js/mobjs/query/queryComponentUseSlot.js
  function selectAll2(root2) {
    const result = [];
    for (const node of walkPreOrder(root2)) {
      if (node?.isUserComponent && node?.getSlotPosition?.()) {
        result.push(node);
      }
    }
    return result;
  }
  var queryComponentUseSlot = (node) => {
    let result = [];
    const root2 = node || document.body;
    for (const child2 of root2.children) {
      result = [...result, ...selectAll2(child2)];
    }
    return result;
  };

  // src/js/mobjs/query/queryGenericSlot.js
  function selectAll3(root2) {
    const result = [];
    for (const node of walkPreOrder(root2)) {
      if (node?.isSlot && node?.getSlotName?.()) {
        result.push(node);
      }
    }
    return result;
  }
  var queryGenericSlot = (node) => {
    let result = [];
    const root2 = node || document.body;
    for (const child2 of root2.children) {
      result = [...result, ...selectAll3(child2)];
    }
    return result;
  };

  // src/js/mobjs/query/querySpecificSlot.js
  function selectAll4(root2, slotName) {
    for (const node of walkPreOrder(root2)) {
      if (node?.isSlot && node?.getSlotName?.() === slotName) {
        return node;
      }
    }
    return null;
  }
  var querySecificSlot = (node, slotName) => {
    const root2 = node || document.body;
    for (const child2 of root2.children) {
      const result = selectAll4(child2, slotName);
      if (result) return result;
    }
    return null;
  };

  // src/js/mobjs/query/queryUnNamedSlot.js
  function selectAll5(root2) {
    for (const node of walkPreOrder(root2)) {
      if (node?.isSlot && !node?.getSlotName?.()) {
        return node;
      }
    }
    return null;
  }
  var queryUnNamedSlot = (node) => {
    const root2 = node || document.body;
    for (const child2 of root2.children) {
      const result = selectAll5(child2);
      if (result) return result;
    }
    return null;
  };

  // src/js/mobjs/modules/repeater/action/getRepeaterParent.js
  var getRepeatParent = ({ id }) => {
    if (!repeatIdPlaceHolderMap.has(id)) {
      return;
    }
    if (repeatIdHostMap.has(id)) {
      const host = repeatIdHostMap.get(id);
      host?.removeCustomComponent();
      host.remove();
      repeatIdHostMap.delete(id);
    }
    const parent = repeatIdPlaceHolderMap.get(id);
    return parent?.element;
  };

  // src/js/mobjs/component/action/repeater.js
  var setRepeaterStateById = ({ id = "", value }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    if (!item) return;
    componentMap.set(id, {
      ...item,
      currentRepeaterState: value
    });
  };
  var getFirstChildOfElementParentOfElement = ({ rootNode, currentNode }) => {
    if (!rootNode.contains(currentNode)) return;
    if (currentNode.parentElement === rootNode) return currentNode;
    return getFirstChildOfElementParentOfElement({
      rootNode,
      currentNode: currentNode.parentElement
    });
  };
  var findFirstRepeaterElementWrap = ({ rootNode, node }) => {
    if (!rootNode) return;
    return getFirstChildOfElementParentOfElement({
      rootNode,
      currentNode: node.parentElement
    });
  };
  var getRepeaterStateById = ({ id = "" }) => {
    if (!id || id === "") return DEFAULT_CURRENT_REPEATER_STATE;
    const item = componentMap.get(id);
    const currentRepeaterState = item?.currentRepeaterState;
    return currentRepeaterState;
  };
  var setRepeaterInnerWrap = ({ id = "", repeatId = "", element }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    if (!item) return;
    const repeaterParentElement = getRepeatParent({
      id: repeatId
    });
    const elementWrapper = findFirstRepeaterElementWrap({
      rootNode: (
        /** @type {HTMLElement} */
        repeaterParentElement
      ),
      node: (
        /** @type {HTMLElement} */
        element
      )
    });
    componentMap.set(id, {
      ...item,
      repeaterInnerWrap: elementWrapper
    });
  };
  var getRepeaterInnerWrap = ({ id }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    const repeaterInnerWrap = item?.repeaterInnerWrap;
    return repeaterInnerWrap;
  };

  // src/js/mobjs/component/action/props.js
  var setDynamicPropsWatch = ({ id = "", unWatchArray = [] }) => {
    const item = componentMap.get(id);
    if (!item) return;
    const { parentPropsWatcher } = item;
    if (!parentPropsWatcher) return;
    componentMap.set(id, {
      ...item,
      parentPropsWatcher: [...parentPropsWatcher, ...unWatchArray]
    });
  };
  var unBind = ({ id = "" }) => {
    if (!id || id === "") return;
    const item = componentMap.get(id);
    const parentPropsWatcher = item?.parentPropsWatcher ?? [];
    parentPropsWatcher.forEach((unwatch) => {
      unwatch();
    });
  };

  // src/js/mobjs/queque/tickRepeater.js
  var repeaterQueque = /* @__PURE__ */ new Map();
  var repeaterQuequeIsEmpty = () => repeaterQueque.size === 0;
  var maxQueuqueSize2 = 1e3;
  var incrementRepeaterTickQueuque = (props) => {
    if (repeaterQueque.size >= maxQueuqueSize2) {
      console.warn(`maximum loop event reached: (${maxQueuqueSize2})`);
      return () => {
      };
    }
    const id = mobCore.getUnivoqueId();
    repeaterQueque.set(id, props);
    return () => repeaterQueque.delete(id);
  };
  var queueIsResolved2 = () => {
    return repeaterQueque.size === 0 || repeaterQueque.size >= maxQueuqueSize2;
  };
  var repeaterTick = async ({ debug = false, previousResolve } = {}) => {
    await awaitNextLoop();
    if (debug) {
      repeaterQueque.forEach((value) => {
        console.log(value);
      });
    }
    if (queueIsResolved2() && previousResolve) {
      previousResolve();
      return;
    }
    return new Promise((resolve) => {
      if (queueIsResolved2()) {
        resolve();
        return;
      }
      repeaterTick({ debug, previousResolve: previousResolve ?? resolve });
    });
  };

  // src/js/mobjs/queque/tickInvalidate.js
  var invalidateQueque = /* @__PURE__ */ new Map();
  var invalidateQuequeIsEmpty = () => invalidateQueque.size === 0;
  var maxQueuqueSize3 = 1e3;
  var incrementInvalidateTickQueuque = (props) => {
    if (invalidateQueque.size >= maxQueuqueSize3) {
      console.warn(`maximum loop event reached: (${maxQueuqueSize3})`);
      return () => {
      };
    }
    const id = mobCore.getUnivoqueId();
    invalidateQueque.set(id, props);
    return () => invalidateQueque.delete(id);
  };
  var queueIsResolved3 = () => {
    return invalidateQueque.size === 0 || invalidateQueque.size >= maxQueuqueSize3;
  };
  var invalidateTick = async ({
    debug = false,
    previousResolve
  } = {}) => {
    await awaitNextLoop();
    if (debug) {
      invalidateQueque.forEach((value) => {
        console.log(value);
      });
    }
    if (queueIsResolved3() && previousResolve) {
      previousResolve();
      return;
    }
    return new Promise((resolve) => {
      if (queueIsResolved3()) {
        resolve();
        return;
      }
      invalidateTick({
        debug,
        previousResolve: previousResolve ?? resolve
      });
    });
  };

  // src/js/mobjs/modules/bindProps/index.js
  var setBindProps = (propsObj) => {
    const propsIsValid = "props" in propsObj;
    const propsObjUpdates = "bind" in propsObj ? propsObj : { ...propsObj, bind: [] };
    if (!propsIsValid) {
      console.warn(`bindProps not valid`);
      return;
    }
    const id = mobCore.getUnivoqueId();
    bindPropsMap.set(id, {
      ...propsObjUpdates,
      componentId: "",
      propsId: id
    });
    return id;
  };
  var setBindProp = ({
    componentId,
    bind,
    props,
    currentParentId,
    fireCallback
  }) => {
    if (!currentParentId) return;
    const parentState = getStateById(currentParentId);
    if (!parentState) return;
    const parentStateKeys = Object.keys(parentState);
    const bindArrayIsValid = bind.every(
      (state) => parentStateKeys.includes(state)
    );
    if (!bindArrayIsValid) {
      console.warn(
        `bind props error: Some prop ${JSON.stringify(bind)} doesn't exist`
      );
    }
    const componentExist = componentMap.has(componentId);
    if (!componentExist) return;
    const currentRepeaterState = getRepeaterStateById({
      id: componentId
    });
    let newProps;
    try {
      newProps = props?.(parentState, currentRepeaterState?.index);
    } catch {
      console.log("bindProps error:", componentId);
      const element = getElementById({ id: componentId });
      if (!document.body.contains(element))
        removeAndDestroyById({ id: componentId });
    }
    if (!newProps) return;
    Object.entries(newProps).forEach(([key, value]) => {
      setStateById(componentId, key, value, fireCallback);
    });
  };
  var addCurrentIdToBindProps = ({
    propsId,
    repeatPropBind,
    componentId
  }) => {
    if (!propsId) return;
    for (const [key, value] of bindPropsMap) {
      if (key === propsId) {
        bindPropsMap.set(key, { ...value, componentId });
      }
    }
    applyBindProps({
      componentId,
      repeatPropBind,
      inizilizeWatcher: false
    });
  };
  var removeCurrentToBindPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;
    bindPropsMap.delete(propsId);
  };
  var applyBindProps = async ({
    componentId,
    repeatPropBind,
    inizilizeWatcher
  }) => {
    const dynamicPropsFilteredArray = [...bindPropsMap.values()].filter(
      (item) => {
        const currentComponentId = item?.componentId;
        return currentComponentId === componentId;
      }
    );
    if (!dynamicPropsFilteredArray) return;
    for (const dynamicpropsfiltered of dynamicPropsFilteredArray) {
      const { bind, props, parentId } = dynamicpropsfiltered;
      const bindUpdated = repeatPropBind?.length > 0 && !bind.includes(repeatPropBind) ? [...bind, repeatPropBind] : [...bind];
      const currentParentId = parentId ?? getParentIdById(componentId);
      if (!inizilizeWatcher) {
        setBindProp({
          componentId,
          bind: bindUpdated,
          props,
          currentParentId: currentParentId ?? "",
          fireCallback: false
        });
      }
      if (!inizilizeWatcher && !repeaterQuequeIsEmpty()) {
        await repeaterTick();
        setBindProp({
          componentId,
          bind: bindUpdated,
          props,
          currentParentId: currentParentId ?? "",
          fireCallback: true
        });
      }
      if (!inizilizeWatcher && !invalidateQuequeIsEmpty()) {
        await invalidateTick();
        setBindProp({
          componentId,
          bind: bindUpdated,
          props,
          currentParentId: currentParentId ?? "",
          fireCallback: true
        });
      }
      if (!inizilizeWatcher) return;
      let watchIsRunning = false;
      const unWatchArray = bindUpdated.map((state) => {
        return watchById(currentParentId, state, async () => {
          await repeaterTick();
          await invalidateTick();
          if (watchIsRunning) return;
          const decrementQueue = incrementTickQueuque({
            state,
            id: componentId,
            type: QUEQUE_TYPE_BINDPROPS
          });
          watchIsRunning = true;
          mobCore.useNextLoop(() => {
            setBindProp({
              componentId,
              bind: bindUpdated,
              props,
              currentParentId: currentParentId ?? "",
              fireCallback: true
            });
            watchIsRunning = false;
            decrementQueue();
          });
        });
      });
      setDynamicPropsWatch({ id: componentId, unWatchArray });
    }
    if (!inizilizeWatcher) return;
    for (const [key, value] of bindPropsMap) {
      const { componentId: currentComponentId } = value;
      if (currentComponentId === componentId) {
        bindPropsMap.delete(key);
      }
    }
  };
  var removeOrphansBindProps = () => {
    bindPropsMap.clear();
  };

  // src/js/mobjs/modules/staticProps/index.js
  var staticPropsMap = /* @__PURE__ */ new Map();
  var setStaticProps = (props = {}) => {
    const id = mobCore.getUnivoqueId();
    staticPropsMap.set(id, props);
    return id;
  };
  var getPropsFromParent = (id = "") => {
    const props = staticPropsMap.get(id);
    staticPropsMap.delete(id);
    return props ?? {};
  };
  var removeCurrentToPropsByPropsId = ({ propsId }) => {
    if (!propsId) return;
    staticPropsMap.delete(propsId);
  };
  var removeOrphansPropsFromParent = () => {
    staticPropsMap.clear();
  };

  // src/js/mobjs/parse/steps/constant.js
  var ELEMENT_TYPE_NODE = "node";
  var ELEMENT_TYPE_TEXT = "text";
  var ELEMENT_TYPE_MIX_NODE_TEXT = "mix";
  var ELEMENT_TYPE_NOT_VALID = "not-valid";

  // src/js/mobjs/parse/steps/utils.js
  var renderHtml = String.raw;
  var getElementOrTextFromNode = (node) => {
    const childNodes = node.childNodes;
    if (childNodes.length === 0) {
      return {
        item: void 0,
        type: ELEMENT_TYPE_NOT_VALID
      };
    }
    const children = node.children;
    if (children.length === 1 && childNodes.length === 1) {
      return {
        item: node.children?.[0],
        type: ELEMENT_TYPE_NODE
      };
    }
    if (childNodes.length > 1)
      return {
        item: node.innerHTML,
        type: ELEMENT_TYPE_MIX_NODE_TEXT
      };
    const textContent = node.textContent;
    if (textContent.length > 0)
      return {
        item: textContent,
        type: ELEMENT_TYPE_TEXT
      };
    return {
      item: void 0,
      type: ELEMENT_TYPE_NOT_VALID
    };
  };
  var insertElementOrText = ({
    parent,
    itemObject,
    position: position2 = "afterend"
  }) => {
    const { item, type } = itemObject;
    if (type === ELEMENT_TYPE_MIX_NODE_TEXT) {
      parent.insertAdjacentHTML(
        position2,
        /** @type{string} */
        item
      );
      return;
    }
    if (type === ELEMENT_TYPE_NODE) {
      parent.insertAdjacentElement(
        position2,
        /** @type{Element} */
        item
      );
      return;
    }
    if (type === ELEMENT_TYPE_TEXT) {
      parent.insertAdjacentText(
        position2,
        /** @type{string} */
        item
      );
      return;
    }
    return;
  };

  // src/js/mobjs/parse/steps/convertToRealElement.js
  var getNewElement = ({ element, content }) => {
    const { debug } = getDefaultComponent();
    if (element.parentNode) {
      const node = document.createRange().createContextualFragment(content).firstElementChild;
      element.after(node);
      if (debug)
        element.insertAdjacentHTML(
          "afterend",
          `<!--  ${element.tagName.toLowerCase()} --> `
        );
      return (
        /** @type {HTMLElement} */
        element.nextElementSibling
      );
    }
    return;
  };
  var removeOrphanSlot = ({ element }) => {
    const slots = useSlotQuery ? queryGenericSlot(element) : getAllSlot();
    slots.forEach((slot) => {
      const dynamicPropsIdFromSlot = slot.getDynamicProps();
      if (dynamicPropsIdFromSlot && dynamicPropsIdFromSlot !== "") {
        removeCurrentToBindPropsByPropsId({
          propsId: dynamicPropsIdFromSlot
        });
      }
      const staticPropsIdFromSlot = slot.getStaticProps();
      if (staticPropsIdFromSlot && staticPropsIdFromSlot !== "") {
        removeCurrentToPropsByPropsId({ propsId: staticPropsIdFromSlot });
      }
      slot?.removeCustomComponent();
      slot?.remove();
    });
  };
  var addToNamedSlot = ({ element }) => {
    const componentWithSlot = useQuery || forceComponentChildQuery ? queryComponentUseSlot(element) : getAllUserComponentUseNamedSlot({ element });
    if (componentWithSlot.length === 0) return;
    const slots = [...componentWithSlot].map((component) => {
      const slotName = component?.getSlotPosition();
      const slot = useSlotQuery ? querySecificSlot(element, slotName) : getSlotByName({ name: slotName, element });
      if (!slot) return { slot: null, elementMoved: null };
      slot.parentNode?.insertBefore(component, slot);
      const elementMoved = (
        /** @type {HTMLElement} */
        slot.previousSibling
      );
      return { slot, elementMoved };
    });
    slots.forEach(({ slot, elementMoved }) => {
      if (!slot) return;
      const propsIdFromSlot = slot.getStaticProps();
      if (propsIdFromSlot)
        elementMoved?.setPropsFromSlotId?.(propsIdFromSlot);
      const bindPropsIdFromSlot = slot.getDynamicProps();
      if (bindPropsIdFromSlot)
        elementMoved?.setDynamicPropsFromSlotId?.(bindPropsIdFromSlot);
      slot?.removeCustomComponent();
      slot?.remove();
    });
  };
  var executeConversion = ({ element, content }) => {
    const prevContent = getElementOrTextFromNode(element);
    const newElement = getNewElement({ element, content });
    if (newElement) {
      const id = element.getId();
      const delegateEventId = element?.getDelegateEventId();
      const bindRefId = element?.getBindRefId();
      const bindRefName = element?.getBindRefName();
      const unNamedSlot = useSlotQuery ? queryUnNamedSlot(newElement) : getUnamedPlaceholderSlot({ element: newElement });
      if (unNamedSlot) {
        insertElementOrText({
          parent: unNamedSlot,
          itemObject: prevContent,
          position: "afterend"
        });
        unNamedSlot.remove();
      }
      if (!unNamedSlot) {
        insertElementOrText({
          parent: newElement,
          itemObject: prevContent,
          position: "afterbegin"
        });
      }
      addToNamedSlot({ element: newElement });
      removeOrphanSlot({ element: newElement });
      if (delegateEventId && delegateEventId.length > 0)
        newElement.setAttribute(ATTR_WEAK_BIND_EVENTS, delegateEventId);
      if (bindRefId && bindRefId.length > 0)
        newElement.setAttribute(ATTR_BIND_REFS_ID, bindRefId);
      if (bindRefName && bindRefName.length > 0)
        newElement.setAttribute(ATTR_BIND_REFS_NAME, bindRefName);
      const { debug } = getDefaultComponent();
      if (debug) newElement.setAttribute(ATTR_IS_COMPONENT, id ?? "");
    }
    element.remove();
    return newElement;
  };
  var convertToRealElement = ({ element, content }) => {
    return {
      newElement: executeConversion({
        element,
        content
      })
    };
  };

  // src/js/mobjs/parse/utils.js
  var currentIterationCounter = 0;
  var incrementCurrentIterationCounter = () => {
    currentIterationCounter += 1;
  };
  var getCurrentIterationCounter = () => currentIterationCounter;
  var resetCurrentIterationCounter = () => {
    currentIterationCounter = 0;
  };
  var getParseSourceArray = ({ element, currentSelectors }) => {
    if (currentSelectors.length > 0) {
      const componentToParse = currentSelectors[0];
      const parseSourceArray = currentSelectors.slice(1);
      return { componentToParse, parseSourceArray };
    } else {
      const query = useQuery ? [...queryAllFutureComponent(element)] : getFirstUserChildPlaceHolder(element);
      const componentToParse = query?.[0];
      const parseSourceArray = query.slice(1);
      return { componentToParse, parseSourceArray };
    }
  };

  // src/js/mobjs/component/action/removeAndDestroy/setDestroyCallback.js
  var setDestroyCallback = ({ cb = () => {
  }, id = null }) => {
    if (!id) return;
    const item = componentMap.get(id);
    if (!item) return;
    componentMap.set(id, { ...item, destroy: cb });
  };

  // src/js/mobjs/modules/onMount/index.js
  var onMountCallbackMap = /* @__PURE__ */ new Map();
  var addOnMoutCallback = ({ id, cb = () => {
  } }) => {
    onMountCallbackMap.set(id, cb);
  };
  var fireOnMountCallBack = async ({ id, element }) => {
    const callback2 = onMountCallbackMap.get(id);
    const destroyCallback = await callback2?.({
      element
    });
    setDestroyCallback({ cb: destroyCallback, id });
    onMountCallbackMap.delete(id);
  };

  // src/js/mobjs/modules/commonEvent.js
  var shouldFireEvent = true;
  var allowFireEvent = () => {
    shouldFireEvent = true;
  };
  var preventFireEvent = () => {
    shouldFireEvent = false;
  };
  var getFireEvent = () => shouldFireEvent;

  // src/js/mobjs/modules/bindEvents/index.js
  var bindEventMap = /* @__PURE__ */ new Map();
  var setBindEvents = (eventsData = []) => {
    const eventsDataParsed = checkType(Object, eventsData) ? [eventsData] : eventsData;
    const id = mobCore.getUnivoqueId();
    bindEventMap.set(id, eventsDataParsed);
    return id;
  };
  var applyBindEvents = ({ element, componentId, bindEventsId }) => {
    const eventArray = bindEventMap.get(bindEventsId);
    if (!eventArray) return;
    eventArray.forEach((event) => {
      const [eventName] = Object.keys(event);
      const [callback2] = Object.values(event);
      if (!eventName || !callback2) return;
      element.addEventListener(eventName, async (e) => {
        if (!getFireEvent()) return;
        preventFireEvent();
        await tick();
        allowFireEvent();
        const currentRepeaterState = getRepeaterStateById({
          id: componentId
        });
        callback2(e, currentRepeaterState?.index);
      });
    });
    bindEventMap.delete(bindEventsId);
  };
  var removeOrphansBindEvent = () => {
    bindEventMap.clear();
  };

  // src/js/mobjs/modules/repeater/action/setRepeatFunction.js
  var setRepeatFunction = ({ id, repeatId, fn }) => {
    const currentFunctions = repeatFunctionMap.get(id) ?? [];
    repeatFunctionMap.set(id, [
      ...currentFunctions,
      { repeatId, fn, unsubscribe: () => {
      } }
    ]);
  };

  // src/js/mobjs/modules/repeater/action/setRepeaterPlaceholderMapScopeId.js
  var setRepeaterPlaceholderMapScopeId = ({ repeatId, scopeId }) => {
    repeatIdPlaceHolderMap.set(repeatId, {
      element: void 0,
      initialized: false,
      scopeId
    });
  };

  // src/js/mobjs/modules/repeater/action/setRepeaterPlaceholderMapInitialized.js
  var setRepeaterPlaceholderMapInitialized = ({ repeatId }) => {
    const item = repeatIdPlaceHolderMap.get(repeatId);
    if (!item) return;
    repeatIdPlaceHolderMap.set(repeatId, {
      ...item,
      initialized: true
    });
  };

  // src/js/mobjs/component/action/removeAndDestroy/destroyComponentInsideNodeById.js
  var destroyComponentInsideNodeById = ({ id, container }) => {
    const instanceValue = componentMap.get(id);
    const child2 = instanceValue?.child;
    if (!child2) return;
    const allChild = Object.values(child2 ?? {}).flat();
    allChild.forEach((id2) => {
      const state = componentMap.get(id2);
      const element = state?.element;
      if (element && container?.contains(element) && element !== container) {
        removeAndDestroyById({ id: id2 });
      }
    });
  };

  // src/js/mobjs/modules/commonRepeatInvalidate.js
  var MODULE_REPEATER = "repeater";
  var MODULE_INVALIDATE = "invalidate";
  var getRepeatOrInvalidateInsideElement = ({
    element,
    skipInitialized = false,
    onlyInitialized = false,
    componentId,
    module
  }) => {
    const entries = module === MODULE_REPEATER ? [...repeatIdPlaceHolderMap.entries()] : [...invalidateIdPlaceHolderMap.entries()];
    return entries.filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_id, parent]) => {
        if (componentId && !compareIdOrParentIdRecursive({
          id: parent.scopeId,
          compareValue: componentId
        }))
          return;
        if (skipInitialized && parent?.initialized) return false;
        if (onlyInitialized && !parent?.initialized) return false;
        return element?.contains(parent.element) && element !== parent.element;
      }
    ).map(([id, parent]) => ({
      id,
      parent: parent?.element
    }));
  };

  // src/js/mobjs/modules/repeater/action/removeRepeatByRepeatId.js
  var removeRepeatByRepeatId = ({ id, repeatId }) => {
    if (!repeatFunctionMap.has(id)) return;
    const value = repeatFunctionMap.get(id);
    const valueParsed = value.filter((item) => item.repeatId !== repeatId);
    if (repeatIdPlaceHolderMap.has(repeatId)) {
      repeatIdPlaceHolderMap.delete(repeatId);
    }
    repeatFunctionMap.set(id, valueParsed);
  };

  // src/js/mobjs/modules/repeater/action/destroyNestedRepeat.js
  var destroyNestedRepeat = ({ id, repeatParent }) => {
    const repeatChildToDelete = getRepeatOrInvalidateInsideElement({
      element: repeatParent,
      skipInitialized: false,
      onlyInitialized: true,
      componentId: id,
      module: MODULE_REPEATER
    });
    const repeatChildToDeleteParsed = [...repeatFunctionMap.values()].flat().filter((item) => {
      return repeatChildToDelete.some((current) => {
        return current.id === item.repeatId;
      });
    });
    repeatChildToDeleteParsed.forEach((item) => {
      item.unsubscribe();
      removeRepeatByRepeatId({
        id,
        repeatId: item.repeatId
      });
    });
  };

  // src/js/mobjs/modules/repeater/watch/inizializeNestedRepeat.js
  var inizializeNestedRepeat = ({ repeatParent, id }) => {
    const newRepeatChild = getRepeatOrInvalidateInsideElement({
      element: repeatParent,
      skipInitialized: true,
      onlyInitialized: false,
      componentId: id,
      module: MODULE_REPEATER
    });
    const repeatChildToInizialize = [...repeatFunctionMap.values()].flat().filter(({ repeatId }) => {
      return newRepeatChild.some((current) => {
        return current.id === repeatId;
      });
    });
    repeatChildToInizialize.forEach(({ fn }) => {
      fn();
    });
  };

  // src/js/mobjs/modules/invalidate/action/addInvalidateUnsubcribe.js
  var addInvalidateUnsubcribe = ({ id, invalidateId, unsubscribe: unsubscribe3 }) => {
    const currentFunctions = invalidateFunctionMap.get(id) ?? [];
    const item = currentFunctions.map((item2) => {
      if (item2.invalidateId === invalidateId) {
        return { ...item2, unsubscribe: unsubscribe3 };
      }
      return item2;
    });
    invalidateFunctionMap.set(id, item);
  };

  // src/js/mobjs/modules/invalidate/action/removeInvalidateByInvalidateId.js
  var removeInvalidateByInvalidateId = ({ id, invalidateId }) => {
    if (!invalidateFunctionMap.has(id)) return;
    const value = invalidateFunctionMap.get(id);
    const valueParsed = value.filter(
      (item) => item.invalidateId !== invalidateId
    );
    if (invalidateIdPlaceHolderMap.has(invalidateId)) {
      invalidateIdPlaceHolderMap.delete(invalidateId);
    }
    invalidateFunctionMap.set(id, valueParsed);
  };

  // src/js/mobjs/modules/invalidate/action/destroyNestedInvalidate.js
  var destroyNestedInvalidate = ({ id, invalidateParent }) => {
    const invalidatechildToDelete = getRepeatOrInvalidateInsideElement({
      element: invalidateParent,
      skipInitialized: false,
      onlyInitialized: true,
      componentId: id,
      module: MODULE_INVALIDATE
    });
    const invalidateChildToDeleteParsed = [...invalidateFunctionMap.values()].flat().filter((item) => {
      return invalidatechildToDelete.some((current) => {
        return current.id === item.invalidateId;
      });
    });
    invalidateChildToDeleteParsed.forEach((item) => {
      item.unsubscribe.forEach((fn) => {
        fn();
      });
      removeInvalidateByInvalidateId({
        id,
        invalidateId: item.invalidateId
      });
    });
  };

  // src/js/mobjs/modules/invalidate/action/getInvalidateParent.js
  var getInvalidateParent = ({ id }) => {
    if (!invalidateIdPlaceHolderMap.has(id)) {
      return;
    }
    if (invalidateIdHostMap.has(id)) {
      const host = invalidateIdHostMap.get(id);
      host?.removeCustomComponent();
      host.remove();
      invalidateIdHostMap.delete(id);
    }
    const parent = invalidateIdPlaceHolderMap.get(id);
    return parent?.element;
  };

  // src/js/mobjs/modules/invalidate/action/inizializeNestedInvalidate.js
  var inizializeNestedInvalidate = ({ invalidateParent, id }) => {
    const newInvalidateChild = getRepeatOrInvalidateInsideElement({
      element: invalidateParent,
      skipInitialized: true,
      onlyInitialized: false,
      componentId: id,
      module: MODULE_INVALIDATE
    });
    const invalidateChildToInizialize = [...invalidateFunctionMap.values()].flat().filter(({ invalidateId }) => {
      return newInvalidateChild.some((current) => {
        return current.id === invalidateId;
      });
    });
    invalidateChildToInizialize.forEach(({ fn }) => {
      fn();
    });
  };

  // src/js/mobjs/modules/invalidate/action/inizializeInvalidateWatch.js
  var inizializeInvalidateWatch = async ({
    bind = [],
    beforeUpdate = () => Promise.resolve(),
    afterUpdate = () => {
    },
    watch,
    id,
    invalidateId,
    persistent = false,
    renderFunction
  }) => {
    let watchIsRunning = false;
    const fallBackParentId = getFallBackParentByElement({
      element: getInvalidateParent({ id: invalidateId })
    });
    const unsubScribeArray = bind.map((state) => {
      const unsubscribe3 = watch(state, async () => {
        if (watchIsRunning) return;
        freezePropById({ id, prop: state });
        const invalidateParent = getInvalidateParent({
          id: invalidateId
        });
        const descrementQueue = incrementTickQueuque({
          state,
          id,
          type: QUEQUE_TYPE_INVALIDATE
        });
        const decrementInvalidateQueque = incrementInvalidateTickQueuque({
          state,
          id,
          type: QUEQUE_TYPE_INVALIDATE
        });
        watchIsRunning = true;
        mobCore.useNextLoop(async () => {
          if (!invalidateParent) {
            unFreezePropById({ id, prop: state });
            return;
          }
          await beforeUpdate();
          destroyNestedInvalidate({ id, invalidateParent });
          destroyNestedRepeat({ id, repeatParent: invalidateParent });
          destroyComponentInsideNodeById({
            id: fallBackParentId ?? id,
            container: invalidateParent
          });
          invalidateParent.textContent = "";
          invalidateParent.insertAdjacentHTML(
            "afterbegin",
            renderFunction()
          );
          mainStore.set(
            MAIN_STORE_ASYNC_PARSER,
            {
              element: invalidateParent,
              parentId: fallBackParentId ?? id,
              persistent
            },
            false
          );
          await mainStore.emitAsync(MAIN_STORE_ASYNC_PARSER);
          watchIsRunning = false;
          descrementQueue();
          decrementInvalidateQueque();
          inizializeNestedInvalidate({ invalidateParent, id });
          inizializeNestedRepeat({ repeatParent: invalidateParent, id });
          unFreezePropById({ id, prop: state });
          afterUpdate();
        });
      });
      return unsubscribe3;
    });
    addInvalidateUnsubcribe({
      id,
      invalidateId,
      unsubscribe: unsubScribeArray
    });
  };

  // src/js/mobjs/modules/invalidate/action/setInvalidateFunction.js
  var setInvalidateFunction = ({ id, invalidateId, fn }) => {
    const currentFunctions = invalidateFunctionMap.get(id) ?? [];
    invalidateFunctionMap.set(id, [
      ...currentFunctions,
      { invalidateId, fn, unsubscribe: [() => {
      }] }
    ]);
  };

  // src/js/mobjs/modules/invalidate/action/setInvalidatePlaceholderMapInitialized.js
  var setInvalidatePlaceholderMapInitialized = ({ invalidateId }) => {
    const item = invalidateIdPlaceHolderMap.get(invalidateId);
    if (!item) return;
    invalidateIdPlaceHolderMap.set(invalidateId, {
      ...item,
      initialized: true
    });
  };

  // src/js/mobjs/modules/invalidate/action/setInvalidatePlaceholderMapScopedId.js
  var setInvalidatePlaceholderMapScopedId = ({
    invalidateId,
    scopeId
  }) => {
    invalidateIdPlaceHolderMap.set(invalidateId, {
      element: void 0,
      initialized: false,
      scopeId
    });
  };

  // src/js/mobjs/route/domRef/root.js
  var root = document.createElement("div");
  var setRoot = ({ element }) => {
    root = element;
  };
  var getRoot = () => root;

  // src/js/mobjs/modules/delegateEvents/index.js
  var tempDelegateEventMap = /* @__PURE__ */ new Map();
  var eventDelegationMap = /* @__PURE__ */ new WeakMap();
  var eventToAdd = [];
  var eventRegistered = [];
  var setDelegateBindEvent = (eventsData = []) => {
    const eventsDataParsed = checkType(Object, eventsData) ? [eventsData] : eventsData;
    const id = mobCore.getUnivoqueId();
    tempDelegateEventMap.set(id, eventsDataParsed);
    return id;
  };
  var findParentElementInMap = (target) => {
    let parent = target?.parentNode;
    while (parent) {
      if (eventDelegationMap.has(parent))
        return { target: parent, data: eventDelegationMap.get(parent) };
      parent = parent?.parentNode;
    }
    return { target: void 0, data: void 0 };
  };
  var getItemFromTarget = (target) => {
    const data2 = eventDelegationMap.get(target);
    if (data2) return { target, data: eventDelegationMap.get(target) };
    return findParentElementInMap(target);
  };
  async function handleAction(eventKey, event) {
    const target = event?.target;
    if (!target) return;
    if (!getFireEvent()) return;
    preventFireEvent();
    await tick();
    allowFireEvent();
    const { target: targetParsed, data: data2 } = getItemFromTarget(target);
    if (!data2 || !document.contains(targetParsed)) return;
    const currentEvent = data2.find(({ event: event2 }) => event2 === eventKey);
    if (!currentEvent) return;
    const { callback: callback2 } = currentEvent;
    const componentId = getIdByElement({ element: targetParsed });
    const currentRepeaterState = componentId ? getRepeaterStateById({
      id: componentId
    }) : DEFAULT_CURRENT_REPEATER_STATE;
    Object.defineProperty(event, "target", { value: targetParsed });
    callback2(event, currentRepeaterState?.index);
  }
  var applyDelegationBindEvent = async (root2) => {
    await repeaterTick();
    await invalidateTick();
    const parent = root2.parentNode;
    const elements = parent?.querySelectorAll(`[${ATTR_WEAK_BIND_EVENTS}]`) ?? [];
    [...elements].forEach((element) => {
      const id = element.getAttribute(ATTR_WEAK_BIND_EVENTS) ?? "";
      element.removeAttribute(ATTR_WEAK_BIND_EVENTS);
      const data2 = tempDelegateEventMap.get(id);
      tempDelegateEventMap.delete(id);
      const dataParsed = data2?.flatMap((item) => {
        return Object.entries(item).map((current) => {
          const [event, callback2] = current;
          if (!eventToAdd.includes(event)) eventToAdd.push(event);
          return { event, callback: callback2 };
        });
      });
      eventDelegationMap.set(element, dataParsed);
    });
    const rootElement = getRoot();
    eventToAdd.forEach((eventKey) => {
      if (eventRegistered.includes(eventKey)) return;
      eventRegistered.push(eventKey);
      rootElement.addEventListener(
        eventKey,
        handleAction.bind(null, eventKey)
      );
    });
  };

  // src/js/mobjs/modules/repeater/repeaterValue/index.js
  var currentRepeaterValueMap = /* @__PURE__ */ new Map();
  var setComponentRepeaterState = (current) => {
    const id = mobCore.getUnivoqueId();
    currentRepeaterValueMap.set(id, current);
    return id;
  };
  var getComponentRepeaterState = (id = "") => {
    if (!id) return DEFAULT_CURRENT_REPEATER_STATE;
    const value = currentRepeaterValueMap.get(id);
    currentRepeaterValueMap.delete(id);
    return value ?? DEFAULT_CURRENT_REPEATER_STATE;
  };

  // src/js/mobjs/modules/repeater/utils.js
  var getNewElement2 = (current = [], previous = [], key = "") => {
    return current.filter((el) => {
      const value = el?.[key];
      return !previous.some((a) => a?.[key] === value);
    });
  };
  var mixPreviousAndCurrentData = (current, previous, key) => {
    return current.map((el, index) => {
      const value = el?.[key];
      const isNewElement = !previous.some((a) => a?.[key] === value);
      return isNewElement ? { isNewElement: true, key: el?.[key], index } : { isNewElement: false, key: el?.[key], index };
    });
  };
  var arrayhaskey = ({ arr = [], key = "" }) => {
    return arr.every((item) => {
      return mobCore.checkType(Object, item) && key in item;
    });
  };
  var listKeyExist = ({ current, previous, key }) => {
    return arrayhaskey({ arr: current, key }) && arrayhaskey({ arr: previous, key });
  };
  var getUnivoqueByKey = ({ data: data2 = [], key = "" }) => {
    return data2.filter(
      (v, i, a) => a.findIndex((v2) => v2?.[key] === v?.[key]) === i
    );
  };
  var chunkIdsByRepeaterWrapper = ({ children }) => {
    const chunkMap = /* @__PURE__ */ new Map();
    children.forEach((child2) => {
      const elementWrapper = getRepeaterInnerWrap({ id: child2 });
      if (!elementWrapper) {
        chunkMap.set(mobCore.getUnivoqueId(), [child2]);
        return;
      }
      if (chunkMap.has(elementWrapper)) {
        const children2 = chunkMap.get(elementWrapper);
        chunkMap.set(elementWrapper, [...children2, child2]);
        return;
      }
      chunkMap.set(elementWrapper, [child2]);
    });
    const childrenChunkedByWrapper = [...chunkMap.values()];
    chunkMap.clear();
    return childrenChunkedByWrapper;
  };

  // src/js/mobjs/modules/bindRefs/index.js
  var getBindRefs = ({ element }) => {
    const hasRef = element.querySelector(`[${ATTR_BIND_REFS_ID}]`);
    if (!hasRef) return {};
    const refs = element.querySelectorAll(`[${ATTR_BIND_REFS_ID}]`);
    return [...refs].reduce((previous, current) => {
      const refId = current.getAttribute(ATTR_BIND_REFS_ID);
      const refName = current.getAttribute(ATTR_BIND_REFS_NAME);
      current.removeAttribute(ATTR_BIND_REFS_ID);
      current.removeAttribute(ATTR_BIND_REFS_NAME);
      const newRefsByName = refName in previous ? [...previous[refName], { element: current, scopeId: refId }] : [{ element: current, scopeId: refId }];
      return { ...previous, [refName]: newRefsByName };
    }, {});
  };
  var getRefsSorter = (refs) => {
    return [
      ...new Set(
        refs.sort(function(a, b) {
          if (a === b || !a || !b) return 0;
          if (a.compareDocumentPosition(b) & 2) {
            return 1;
          }
          return -1;
        })
      )
    ];
  };
  var mergeRefsAndOrder = ({ refs, refName, element }) => {
    return {
      ...refs,
      [refName]: getRefsSorter([...refs[refName], element])
    };
  };
  var addBindRefsToComponent = (refs) => {
    Object.entries(refs).forEach(([refName, entries]) => {
      entries.forEach(({ element, scopeId }) => {
        const item = componentMap.get(scopeId);
        if (!item) return;
        const { refs: previousRef } = item;
        if (!previousRef) return;
        const newRefs = refName in previousRef ? mergeRefsAndOrder({ refs: previousRef, refName, element }) : { ...previousRef, [refName]: [element] };
        componentMap.set(scopeId, {
          ...item,
          refs: newRefs
        });
      });
    });
  };
  var getBindRefsById = ({ id }) => {
    const item = componentMap.get(id);
    if (!item) return {};
    const { refs, element } = item;
    if (!refs) return {};
    const refsUpdated = Object.entries(refs).map(([name, collection]) => {
      return {
        name,
        collection: collection.filter((ref) => element.contains(ref))
      };
    }).reduce((previous, current) => {
      return { ...previous, [current.name]: current.collection };
    }, {});
    componentMap.set(id, {
      ...item,
      refs: refsUpdated
    });
    return refsUpdated;
  };
  var getBindRefById = ({ id }) => {
    const refs = getBindRefsById({ id });
    return Object.entries(refs).reduce((previous, [name, collection]) => {
      return { ...previous, [name]: collection?.[0] };
    }, {});
  };

  // src/js/mobjs/modules/repeater/action/addRepeatUnsubcribe.js
  var addRepeatUnsubcribe = ({ id, repeatId, unsubscribe: unsubscribe3 }) => {
    const currentFunctions = repeatFunctionMap.get(id) ?? [];
    const item = currentFunctions.map((item2) => {
      if (item2.repeatId === repeatId) {
        return { ...item2, unsubscribe: unsubscribe3 };
      }
      return item2;
    });
    repeatFunctionMap.set(id, item);
  };

  // src/js/mobjs/modules/repeater/activeRepeater/index.js
  var activeRepeatMap = /* @__PURE__ */ new Set();
  var addActiveRepeat = ({ id, state, container }) => {
    activeRepeatMap.add({ id, state, container });
  };
  var removeActiveRepeat = ({ id, state, container }) => {
    activeRepeatMap.forEach((repeat) => {
      if (id === repeat.id && state === repeat.state && container === repeat.container) {
        activeRepeatMap.delete(repeat);
      }
    });
  };
  var getActiveRepeater = ({ id = "", state = "", container }) => {
    const repeatIsActive = [...activeRepeatMap].some((repeat) => {
      return id === repeat.id && state === repeat.state && container === repeat.container;
    });
    return repeatIsActive;
  };

  // src/js/mobjs/modules/repeater/update/addWithKey.js
  function getPartialsComponentList({
    state,
    key,
    currentUnique,
    index,
    render: render2,
    repeatId
  }) {
    const currentValue = currentUnique?.[index];
    const sync = (
      /* HTML */
      () => ` ${ATTR_KEY}="${key}"
    ${ATTR_REPEATER_PROP_BIND}="${state}"
    ${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState({
        current: currentValue,
        index
      })}"
    ${ATTR_CHILD_REPEATID}="${repeatId}"`
    );
    return render2({
      sync,
      index,
      currentValue,
      html: renderHtml
    });
  }
  var addWithKey = ({
    state = "",
    current = [],
    previous = [],
    repeaterParentElement = document.createElement("div"),
    targetComponent = "",
    key = "",
    id = "",
    render: render2,
    repeatId
  }) => {
    const currentUnique = getUnivoqueByKey({ data: current, key });
    const keyToRemove = getNewElement2(previous, currentUnique, key);
    const elementToRemoveByKey = keyToRemove.map((item) => {
      const keyValue = item?.[key];
      return getElementByKeyAndRepeatId({
        key: keyValue,
        repeatId
      });
    });
    elementToRemoveByKey.forEach((element) => {
      const currentId = getIdByElement({ element });
      if (!currentId) return;
      destroyNestedInvalidate({ id, invalidateParent: element });
      destroyNestedRepeat({ id, repeatParent: element });
      const elementWrapper = getRepeaterInnerWrap({ id: currentId });
      if (elementWrapper) {
        destroyComponentInsideNodeById({
          id: getParentIdById(currentId),
          container: elementWrapper
        });
        elementWrapper.remove();
      } else {
        removeAndDestroyById({ id: currentId });
      }
    });
    const newSequenceByKey = mixPreviousAndCurrentData(
      currentUnique,
      previous,
      key
    ).map(({ key: key2, isNewElement, index }) => {
      if (isNewElement)
        return { key: key2, isNewElement, index, wrapper: void 0 };
      const element = getElementByKeyAndRepeatId({
        key: key2,
        repeatId
      });
      const id2 = getIdByElement({ element });
      const wrapper2 = getRepeaterInnerWrap({ id: id2 });
      return { key: key2, isNewElement, index, wrapper: wrapper2 };
    });
    repeaterParentElement.replaceChildren();
    newSequenceByKey.forEach(({ isNewElement, key: key2, index, wrapper: wrapper2 }) => {
      if (!isNewElement) {
        const persistentElement = getElementByKeyAndRepeatId({
          key: key2,
          repeatId
        });
        if (!persistentElement) return;
        const { debug } = getDefaultComponent();
        if (debug)
          repeaterParentElement.insertAdjacentHTML(
            "beforeend",
            `<!--  ${targetComponent} --> `
          );
        if (wrapper2) {
          repeaterParentElement.append(wrapper2);
        } else {
          repeaterParentElement.append(persistentElement);
        }
        return;
      }
      const node = document.createRange().createContextualFragment(
        getPartialsComponentList({
          state,
          key: key2,
          currentUnique,
          index,
          render: render2,
          repeatId
        })
      ).firstElementChild;
      repeaterParentElement.append(node);
    });
    return currentUnique;
  };

  // src/js/mobjs/modules/repeater/update/addWithoutKey.js
  var addWithoutKey = ({
    state = "",
    current = [],
    previous = [],
    repeaterParentElement = document.createElement("div"),
    render: render2,
    repeatId,
    id
  }) => {
    const currentLenght = current.length;
    const previousLenght = previous.length;
    const diff = currentLenght - previousLenght;
    if (diff > 0) {
      const elementToAdd = [...new Array(diff).keys()].map((_item, index) => {
        const currentValue = current?.[index + previousLenght];
        const currentIndex = index + previousLenght;
        const sync = (
          /* HTML */
          () => `${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState(
            {
              current: currentValue,
              index: currentIndex
            }
          )}"
            ${ATTR_REPEATER_PROP_BIND}="${state}"
            ${ATTR_CHILD_REPEATID}="${repeatId}"`
        );
        return render2({
          sync,
          index,
          currentValue,
          html: renderHtml
        });
      });
      const elementsParsed = document.createRange().createContextualFragment(elementToAdd.join(""));
      repeaterParentElement.append(elementsParsed);
    }
    if (diff < 0) {
      const idsByRepeatId = getIdsByByRepeatId({
        id,
        repeatId
      });
      const childrenChunkedByWrapper = chunkIdsByRepeaterWrapper({
        children: idsByRepeatId
      });
      const elementToRemoveByKey = childrenChunkedByWrapper.filter(
        (_child, i) => {
          return i >= current.length;
        }
      );
      elementToRemoveByKey.forEach((childArray) => {
        childArray.forEach((childId) => {
          const element = getElementById({ id: childId });
          destroyNestedInvalidate({ id, invalidateParent: element });
          destroyNestedRepeat({ id, repeatParent: element });
          const elementWrapper = getRepeaterInnerWrap({ id: childId });
          if (elementWrapper) {
            destroyComponentInsideNodeById({
              id: getParentIdById(childId),
              container: elementWrapper
            });
            elementWrapper.remove();
          } else {
            removeAndDestroyById({ id: childId });
          }
        });
      });
    }
    return current;
  };

  // src/js/mobjs/modules/repeater/update/index.js
  var updateRepeater = async ({
    state = "",
    persistent,
    repeaterParentElement = document.createElement("div"),
    targetComponent = "",
    current = [],
    previous = [],
    key = "",
    id,
    fallBackParentId,
    render: render2,
    repeatId
  }) => {
    const hasKey = listKeyExist({ current, previous, key });
    const fn = hasKey ? addWithKey : addWithoutKey;
    const currentUnivoque = fn({
      state,
      current,
      previous,
      repeaterParentElement,
      targetComponent,
      key,
      id,
      render: render2,
      repeatId
    });
    mainStore.set(
      MAIN_STORE_ASYNC_PARSER,
      {
        element: repeaterParentElement,
        parentId: fallBackParentId ?? id,
        persistent
      },
      false
    );
    await mainStore.emitAsync(MAIN_STORE_ASYNC_PARSER);
    return currentUnivoque;
  };

  // src/js/mobjs/modules/repeater/watch/index.js
  var watchRepeat = ({
    state = "",
    setState,
    persistent,
    watch,
    clean: clean2 = false,
    beforeUpdate,
    afterUpdate,
    key = "",
    id = "",
    repeatId = "",
    render: render2
  }) => {
    const mainComponent = getElementById({ id });
    const fallBackParentId = getFallBackParentByElement({
      element: getRepeatParent({ id: repeatId })
    });
    const unsubscribe3 = watch(
      state,
      async (current, previous) => {
        if (!mobCore.checkType(Array, current)) return;
        const repeaterParentElement = getRepeatParent({
          id: repeatId
        });
        const descrementQueue = incrementTickQueuque({
          state,
          id,
          type: QUEQUE_TYPE_REPEATER
        });
        const descrementRepeaterQueue = incrementRepeaterTickQueuque({
          state,
          id,
          type: QUEQUE_TYPE_REPEATER
        });
        freezePropById({ id, prop: state });
        const repeatIsRunning = getActiveRepeater({
          id,
          state,
          container: repeaterParentElement
        });
        if (repeatIsRunning) {
          unFreezePropById({ id, prop: state });
          setState(state, previous, false);
          descrementQueue();
          descrementRepeaterQueue();
          return;
        }
        const targetComponentBeforeParse = getRepeaterComponentTarget({
          id: repeatId
        });
        const childrenBeforeUdateByRepeatId = getIdsByByRepeatId({
          id,
          repeatId
        });
        const childrenBeforeUdateFilterdByParent = getIdsByByRepeatId({
          id,
          repeatId,
          filterById: true
        });
        if (mainComponent) {
          await beforeUpdate({
            element: mainComponent,
            container: repeaterParentElement,
            childrenId: childrenBeforeUdateFilterdByParent
          });
        }
        if (targetComponentBeforeParse && clean2) {
          const currentChildern = getIdsByByRepeatId({
            id,
            repeatId
          });
          currentChildern.forEach((id2) => {
            removeAndDestroyById({ id: id2 });
          });
          repeaterParentElement.textContent = "";
        }
        addActiveRepeat({ id, state, container: repeaterParentElement });
        const currentUnivoque = await updateRepeater({
          state,
          persistent,
          repeaterParentElement,
          targetComponent: targetComponentBeforeParse,
          current,
          previous: clean2 ? [] : previous,
          key,
          id,
          fallBackParentId,
          render: render2,
          repeatId
        });
        const childrenFilteredByRepeatId = getIdsByByRepeatId({
          id,
          repeatId
        });
        const childrenFilteredByParent = getIdsByByRepeatId({
          id,
          repeatId,
          filterById: true
        });
        const childrenFilteredSorted = [
          ...gerOrderedChildrenById({
            children: childrenFilteredByRepeatId
          })
        ];
        const childrenChunkedByWrapper = chunkIdsByRepeaterWrapper({
          children: childrenFilteredSorted
        });
        const hasKey = key && key !== "";
        childrenChunkedByWrapper.forEach((childArray, index) => {
          childArray.forEach((id2) => {
            const currentValue = currentUnivoque?.[index];
            if (!currentValue) return;
            const realIndex = hasKey ? current.findIndex((value) => {
              return `${value?.[key]}` === `${currentUnivoque?.[index]?.[key]}`;
            }) : index;
            setRepeaterStateById({
              id: id2,
              value: { current: currentValue, index: realIndex }
            });
          });
        });
        mobCore.useNextLoop(async () => {
          if (mainComponent) {
            afterUpdate({
              element: mainComponent,
              container: repeaterParentElement,
              childrenId: childrenFilteredByParent
            });
          }
          removeActiveRepeat({
            id,
            state,
            container: repeaterParentElement
          });
          unFreezePropById({ id, prop: state });
          descrementQueue();
          descrementRepeaterQueue();
          const newChildren = childrenFilteredByRepeatId.filter(
            (x) => !childrenBeforeUdateByRepeatId.includes(x)
          );
          newChildren.forEach((childId) => {
            const element = getElementById({ id: childId });
            inizializeNestedInvalidate({
              invalidateParent: element,
              id
            });
            inizializeNestedRepeat({
              repeatParent: element,
              id
            });
          });
        });
      }
    );
    return unsubscribe3;
  };

  // src/js/mobjs/modules/repeater/action/inizializeRepeatWatch.js
  var inizializeRepeatWatch = ({
    repeatId,
    persistent,
    state,
    setState,
    emit,
    watch,
    clean: clean2,
    beforeUpdate,
    afterUpdate,
    key,
    id,
    render: render2
  }) => {
    const unsubscribe3 = watchRepeat({
      state,
      setState,
      persistent,
      emit,
      watch,
      clean: clean2,
      beforeUpdate,
      afterUpdate,
      key,
      id,
      repeatId,
      render: render2
    });
    addRepeatUnsubcribe({
      id,
      repeatId,
      unsubscribe: unsubscribe3
    });
  };

  // src/js/mobjs/parse/steps/getParamsForComponent.js
  var getParamsForComponentFunction = ({
    getState,
    setState,
    updateState,
    emit,
    emitAsync,
    computed,
    watch,
    id,
    key,
    bindEventsId,
    debug
  }) => {
    const repeatIdArray = [];
    return {
      bindEventsId,
      key,
      id,
      getState,
      setState,
      updateState,
      emit,
      emitAsync,
      computed,
      watch,
      debug,
      repeatIdArray,
      renderComponent: async ({
        attachTo,
        component,
        position: position2 = "afterbegin",
        clean: clean2 = true,
        persistent = false
      }) => {
        if (clean2) {
          destroyComponentInsideNodeById({ id, container: attachTo });
          attachTo.textContent = "";
        }
        attachTo.insertAdjacentHTML(position2, component);
        mainStore.set(
          MAIN_STORE_ASYNC_PARSER,
          { element: attachTo, parentId: id, persistent },
          false
        );
        return mainStore.emitAsync(MAIN_STORE_ASYNC_PARSER);
      },
      getChildren: (componentName) => {
        return getChildrenIdByName({ id, componentName });
      },
      watchSync: (state, callback2) => {
        const unsubscribe3 = watch(state, callback2);
        emit(state);
        return unsubscribe3;
      },
      freezeProp: (prop) => freezePropById({ id, prop }),
      unFreezeProp: (prop) => unFreezePropById({ id, prop }),
      unBind: () => unBind({ id }),
      bindProps: (obj) => {
        return `${ATTR_DYNAMIC}="${setBindProps({
          ...obj,
          parentId: obj?.forceParent ? void 0 : id
        })}" `;
      },
      staticProps: (obj) => ` ${ATTR_PROPS}="${setStaticProps(obj)}" `,
      remove: () => {
        removeAndDestroyById({ id });
      },
      removeDOM: (element) => {
        destroyComponentInsideNodeById({ id, container: element });
        element.textContent = "";
      },
      getParentId: () => getParentIdById(id),
      watchParent: (prop, cb) => {
        const unsubscribeParent = watchById(getParentIdById(id), prop, cb);
        setDynamicPropsWatch({ id, unWatchArray: [unsubscribeParent] });
      },
      html: (strings, ...values) => {
        return renderHtml(strings, ...values);
      },
      onMount: (cb) => addOnMoutCallback({ id, cb }),
      bindEvents: (eventsData) => {
        return `${ATTR_BIND_EVENTS}="${setBindEvents(eventsData)}"`;
      },
      delegateEvents: (eventsData) => {
        return `${ATTR_WEAK_BIND_EVENTS}="${setDelegateBindEvent(
          eventsData
        )}"`;
      },
      addMethod: (name, fn) => {
        addMethodById({ id, name, fn });
      },
      setRef: (value) => {
        return `${ATTR_BIND_REFS_ID}="${id}" ${ATTR_BIND_REFS_NAME}="${value}"`;
      },
      getRef: () => {
        return getBindRefById({ id });
      },
      getRefs: () => {
        return getBindRefsById({ id });
      },
      bindText: (strings, ...values) => {
        const bindTextId = mobCore.getUnivoqueId();
        const render2 = () => renderBindText(id, strings, ...values);
        createBindTextWatcher(id, bindTextId, render2, ...values);
        return `<mobjs-bind-text ${ATTR_COMPONENT_ID}="${id}" ${ATTR_BIND_TEXT_ID}="${bindTextId}"></mobjs-bind-text>${render2()}`;
      },
      invalidate: ({
        bind,
        render: render2,
        persistent = false,
        beforeUpdate = () => Promise.resolve(),
        afterUpdate = () => {
        }
      }) => {
        const invalidateId = mobCore.getUnivoqueId();
        const sync = `${ATTR_INVALIDATE}=${invalidateId}`;
        const invalidateRender = () => render2({ html: renderHtml });
        let isInizialized = false;
        setInvalidatePlaceholderMapScopedId({ invalidateId, scopeId: id });
        setInvalidateFunction({
          id,
          invalidateId,
          fn: () => {
            if (isInizialized) return;
            inizializeInvalidateWatch({
              bind: (
                /** @type{Array<string>} */
                mobCore.checkType(Array, bind) ? bind : [bind]
              ),
              watch,
              beforeUpdate,
              afterUpdate,
              persistent,
              id,
              invalidateId,
              renderFunction: invalidateRender
            });
            isInizialized = true;
            setInvalidatePlaceholderMapInitialized({
              invalidateId
            });
          }
        });
        return `<mobjs-invalidate ${sync} style="display:none;"></mobjs-invalidate>${invalidateRender()}`;
      },
      repeat: ({
        bind,
        clean: clean2 = false,
        persistent = false,
        beforeUpdate = () => Promise.resolve(),
        afterUpdate = () => {
        },
        key: key2,
        render: render2
      }) => {
        const repeatId = mobCore.getUnivoqueId();
        const hasKey = key2 && key2 !== "";
        const initialState = getState()?.[bind];
        const currentUnique = hasKey ? getUnivoqueByKey({ data: initialState, key: key2 }) : initialState;
        const firstRender = () => {
          return currentUnique.map(
            (item, index) => {
              const sync = (
                /* HTML */
                () => `${ATTR_CURRENT_LIST_VALUE}="${setComponentRepeaterState(
                  {
                    current: item,
                    index
                  }
                )}"
                            ${ATTR_KEY}="${hasKey ? item?.[key2] : ""}"
                            ${ATTR_REPEATER_PROP_BIND}="${bind}"
                            ${ATTR_CHILD_REPEATID}="${repeatId}"`
              );
              return render2({
                sync,
                index,
                currentValue: item,
                html: renderHtml
              });
            }
          ).join("");
        };
        let isInizialized = false;
        setRepeaterPlaceholderMapScopeId({
          repeatId,
          scopeId: id
        });
        setRepeatFunction({
          id,
          repeatId,
          fn: () => {
            if (isInizialized) return;
            inizializeRepeatWatch({
              repeatId,
              persistent,
              state: bind,
              setState,
              emit,
              watch,
              clean: clean2,
              beforeUpdate,
              afterUpdate,
              key: key2,
              id,
              render: render2
            });
            isInizialized = true;
            setRepeaterPlaceholderMapInitialized({
              repeatId
            });
          }
        });
        return `<mobjs-repeat ${ATTR_MOBJS_REPEAT}="${repeatId}" style="display:none;"></mobjs-repeat>${firstRender()}`;
      }
    };
  };

  // src/js/mobjs/component/action/state/exportState.js
  var filterExportableStateFromObject = ({
    componentName,
    currentProps = {}
  }) => {
    const componentList = getComponentList();
    const exportableState = componentList?.[componentName]?.componentParams?.exportState ?? [];
    return Object.entries(currentProps).filter(([key]) => {
      return exportableState.includes(key);
    }).reduce((previous, current) => {
      const [key, value] = current;
      return { ...previous, [key]: value };
    }, {});
  };

  // src/js/mobjs/parse/steps/getParamsFromWebComponent.js
  var getParamsFromWebComponent = ({ element, parentIdForced }) => {
    const id = element.getId();
    const instanceName = element.getInstanceName();
    const parentIdFromWebComponent = element.getParentId();
    const parentId = parentIdFromWebComponent && parentIdFromWebComponent.length > 0 ? parentIdFromWebComponent : parentIdForced;
    const propsId = element.getStaticPropsId();
    const dynamicPropsId = element.getDynamicPropsid();
    const bindEventsId = element.getBindEventsId();
    const dynamicPropsIdFromSlot = element.getDynamicPropsFromSlotId();
    const propsSlot = element.getPropsFromSlotId();
    const currentRepeaterValueId = element.getRepeatValue();
    const componentRepeatId = element.getComponentRepeatId();
    const key = element.getCurrentKey() ?? "";
    const componentName = element.getComponentName();
    const cleanProsId = propsId?.split(" ").join("");
    const cleanProsFromSlot = propsSlot?.split(" ").join("");
    const propsFromParent = getPropsFromParent(cleanProsId);
    const propsFromSlot = getPropsFromParent(cleanProsFromSlot);
    const baseProps = { ...element.dataset };
    const repeatPropBind = element.getRepeaterPropBind();
    const currentRepeatValue = getComponentRepeaterState(
      currentRepeaterValueId
    );
    return {
      element,
      props: {
        ...filterExportableStateFromObject({
          componentName,
          currentProps: baseProps
        }),
        ...filterExportableStateFromObject({
          componentName,
          currentProps: propsFromParent
        }),
        ...filterExportableStateFromObject({
          componentName,
          currentProps: propsFromSlot
        })
      },
      id,
      componentName,
      instanceName,
      key,
      dynamicPropsId,
      dynamicPropsIdFromSlot,
      repeatPropBind,
      bindEventsId,
      currentRepeatValue,
      parentId,
      componentRepeatId
    };
  };

  // src/js/mobjs/component/index.js
  var addComponentToStore = ({
    element,
    instanceName = "",
    props = {},
    state = {},
    methods = {},
    key = "",
    currentRepeaterState = DEFAULT_CURRENT_REPEATER_STATE,
    repeaterInnerWrap,
    repeatPropBind = "",
    componentRepeatId = "",
    parentPropsWatcher = [() => {
    }],
    refs = {},
    destroy = () => {
    },
    freezedPros = [],
    persistent = false,
    child: child2 = {},
    parentId = "",
    id = "",
    componentName = ""
  }) => {
    const store = mobCore.createStore(state);
    addPropsToState({ props, store });
    componentMap.set(id, {
      element,
      componentName,
      instanceName,
      destroy,
      parentPropsWatcher,
      refs,
      methods,
      key,
      currentRepeaterState,
      repeaterInnerWrap,
      repeatPropBind,
      componentRepeatId,
      persistent,
      id,
      parentId,
      freezedPros,
      child: child2,
      state: store
    });
    return {
      getState: () => store.get(),
      setState: (prop = "", value = {}, fire4 = true) => {
        const isFreezed = getFreezePropStatus({ id, prop });
        if (isFreezed) return;
        store.set(prop, value, fire4);
      },
      updateState: (prop = "", updateFunction = () => {
      }, fire4 = true) => {
        const isFreezed = getFreezePropStatus({ id, prop });
        if (isFreezed) return;
        store.update(prop, updateFunction, fire4);
      },
      emit: (prop = "") => store.emit(prop),
      emitAsync: async (prop = "") => await store.emitAsync(prop),
      computed: (prop = "", keys = [], fn = () => {
      }) => store.computed(prop, keys, fn),
      watch: (prop = "", cb = () => {
      }) => store.watch(prop, cb),
      debug: () => store.debug()
    };
  };

  // src/js/mobjs/modules/invalidate/action/getInvalidateFunctions.js
  var getInvalidateFunctions = ({ id }) => {
    return invalidateFunctionMap.get(id) ?? [];
  };

  // src/js/mobjs/modules/repeater/action/getRepeatFunctions.js
  var getRepeatFunctions = ({ id }) => {
    return repeatFunctionMap.get(id) ?? [];
  };

  // src/js/mobjs/parse/parseFunction.js
  var parseComponentsRecursive = async ({
    element,
    functionToFireAtTheEnd = [],
    persistent = false,
    currentSelectors = [],
    parentIdForced = ""
  }) => {
    if (!element) return;
    const componentList = getComponentList();
    const { componentToParse, parseSourceArray } = getParseSourceArray({
      element,
      currentSelectors
    });
    const parseLimitReached = getCurrentIterationCounter() === getDefaultComponent().maxParseIteration;
    incrementCurrentIterationCounter();
    if (parseLimitReached)
      console.warn(
        `dom parse reached max parse limit: ${getCurrentIterationCounter()}`
      );
    if (!componentToParse || parseLimitReached) {
      const activeParser = decrementParserCounter();
      if (!activeParser) {
      }
      const bindRefs = getBindRefs({ element });
      if (Object.keys(bindRefs).length > 0) addBindRefsToComponent(bindRefs);
      for (const item of functionToFireAtTheEnd.reverse()) {
        const {
          onMount,
          fireDynamic,
          fireInvalidateFunction,
          fireRepeatFunction
        } = item;
        await onMount();
        fireRepeatFunction();
        fireInvalidateFunction();
        fireDynamic();
      }
      functionToFireAtTheEnd.length = 0;
      currentSelectors.length = 0;
      applyDelegationBindEvent(element);
      switchBindTextMap();
      return;
    }
    const componentToParseName = componentToParse.getComponentName();
    const userFunctionComponent = componentList?.[componentToParseName]?.componentFunction;
    const componentParams = componentList?.[componentToParseName]?.componentParams;
    const { scoped } = componentParams;
    if (!userFunctionComponent) {
      console.warn(`${componentToParseName} component is not registered.`);
      componentToParse.remove();
      await parseComponentsRecursive({
        element,
        functionToFireAtTheEnd,
        persistent,
        currentSelectors: parseSourceArray,
        parentIdForced
      });
      return;
    }
    const {
      props,
      id,
      componentName,
      instanceName,
      key,
      dynamicPropsId,
      dynamicPropsIdFromSlot,
      currentRepeatValue,
      bindEventsId,
      parentId,
      componentRepeatId,
      repeatPropBind
    } = getParamsFromWebComponent({
      element: componentToParse,
      parentIdForced
    });
    const { state } = componentParams;
    const {
      getState,
      setState,
      updateState,
      emit,
      emitAsync,
      computed,
      watch,
      debug
    } = addComponentToStore({
      element: componentToParse,
      props,
      state,
      id,
      componentName,
      instanceName,
      key,
      repeatPropBind,
      persistent,
      parentId,
      componentRepeatId
    });
    addSelfIdToParentComponent({ id });
    if (componentRepeatId && componentRepeatId !== "") {
      addRepeatTargetComponent({
        repeatId: componentRepeatId,
        repeaterParentId: parentId ?? "",
        targetComponent: componentName
      });
    }
    if (componentRepeatId && componentRepeatId?.length > 0) {
      setRepeaterStateById({ id, value: currentRepeatValue });
      setRepeaterInnerWrap({
        id,
        repeatId: componentRepeatId,
        element: componentToParse
      });
    }
    addCurrentIdToBindProps({
      propsId: dynamicPropsId,
      repeatPropBind,
      componentId: id
    });
    addCurrentIdToBindProps({
      propsId: dynamicPropsIdFromSlot,
      componentId: id
    });
    const objectFromComponentFunction = getParamsForComponentFunction({
      getState,
      setState,
      updateState,
      emit,
      emitAsync,
      computed,
      watch,
      id,
      key,
      bindEventsId,
      debug
    });
    const content = await userFunctionComponent(objectFromComponentFunction);
    const classList = componentToParse.classList;
    const { newElement } = convertToRealElement({
      content,
      // @ts-ignore
      element: componentToParse
    });
    if (!useSlotQuery) clearSlotPlaceHolder();
    newElement.classList.add(...classList);
    addParentIdToFutureComponent({ element: newElement, id });
    if (!newElement) {
      const activeParser = decrementParserCounter();
      if (!activeParser) {
      }
      return;
    }
    setElementById({ id, newElement });
    const invalidateFunctions = getInvalidateFunctions({ id });
    const repeatFunctions = getRepeatFunctions({ id });
    if (bindEventsId) {
      applyBindEvents({
        element: newElement,
        componentId: id,
        bindEventsId
      });
    }
    const shoulBeScoped = scoped ?? getDefaultComponent().scoped;
    if (shoulBeScoped) {
      await fireOnMountCallBack({
        id,
        element: newElement
      });
    }
    newElement?.inizializeCustomComponent?.(objectFromComponentFunction);
    functionToFireAtTheEnd.push({
      onMount: async () => {
        if (shoulBeScoped) return;
        await fireOnMountCallBack({
          id,
          element: newElement
        });
      },
      fireDynamic: () => {
        applyBindProps({
          componentId: id,
          repeatPropBind,
          inizilizeWatcher: true
        });
      },
      fireInvalidateFunction: invalidateFunctions.length > 0 ? () => {
        invalidateFunctions.forEach(({ fn }) => {
          fn?.();
        });
      } : () => {
      },
      fireRepeatFunction: repeatFunctions.length > 0 ? () => {
        repeatFunctions.forEach(({ fn }) => {
          fn?.();
        });
      } : () => {
      }
    });
    await parseComponentsRecursive({
      element,
      functionToFireAtTheEnd,
      persistent,
      currentSelectors: parseSourceArray,
      parentIdForced
    });
  };

  // src/js/mobjs/parse/index.js
  var parseComponents = async ({
    element,
    persistent = false,
    parentIdForced = ""
  }) => {
    incrementParserCounter();
    await parseComponentsRecursive({
      element,
      persistent,
      parentIdForced
    });
    resetCurrentIterationCounter();
    if (!useQuery) clearUserPlaceHolder();
  };
  var initParseWatcher = () => {
    mainStore.watch(
      MAIN_STORE_ASYNC_PARSER,
      async ({ element, parentId, persistent = false }) => {
        await parseComponents({
          element,
          parentIdForced: parentId ?? "",
          persistent
        });
      }
    );
  };

  // src/js/mobjs/route/constant.js
  var HISTORY_BACK = "BACK";
  var HISTORY_NEXT = "NEXT";

  // src/js/mobjs/route/scroll/index.js
  var historyBack = [];
  var historyNext = [];
  var deleteLastHistoryBack = () => {
    const arrayLenght = historyBack.length;
    if (arrayLenght >= 1) historyBack.length = historyBack.length - 1;
  };
  var deleteLastHistoryNext = () => {
    const arrayLenght = historyNext.length;
    if (arrayLenght >= 1) historyNext.length = historyNext.length - 1;
  };
  var setHistoryBack = (value) => {
    historyBack.push(value);
  };
  var setHistoryNext = (value) => {
    historyNext.push(value);
  };
  var resetNext = () => {
    historyNext = [];
  };
  var historyBackSize = () => {
    return historyBack.length;
  };
  var getLastHistoryBack = () => {
    const value = historyBack.at(-1);
    deleteLastHistoryBack();
    return value;
  };
  var getPenultimateHistoryNext = () => {
    const value = historyNext.at(-2);
    deleteLastHistoryNext();
    return value;
  };
  var getLastHistoryNext = () => {
    const value = historyNext.at(-1);
    return value;
  };
  var getLastHistory = (direction2) => {
    if (direction2 === HISTORY_BACK) {
      return getLastHistoryBack();
    }
    return getPenultimateHistoryNext();
  };

  // src/js/mobjs/component/action/removeAndDestroy/removeOrphanTempIds.js
  var removeOrphanTempIds = () => {
    removeOrphansPropsFromParent();
    removeOrphansBindEvent();
    removeOrphansBindProps();
  };

  // src/js/mobjs/component/action/removeAndDestroy/removeCancellableComponent.js
  var removeCancellableComponent = () => {
    const cancellableComponents = [...componentMap.values()].filter(
      ({ persistent }) => !persistent
    );
    cancellableComponents.forEach(({ id }) => removeAndDestroyById({ id }));
  };

  // src/js/mobjs/route/domRef/content.js
  var domContentID = "";
  var setContentId = ({ contentId = "" }) => {
    domContentID = contentId;
  };
  var getContentId = () => domContentID;

  // src/js/mobjs/route/pageTransition/index.js
  var pageTransition = () => {
  };
  var beforePageTransition = () => {
  };
  var setBeforePageTransition = ({ fn }) => {
    if (!fn) return;
    beforePageTransition = fn;
  };
  var setPageTransition = ({ fn }) => {
    if (!fn) return;
    pageTransition = fn;
  };
  var getBeforePageTransition = () => beforePageTransition;
  var getPageTransition = () => pageTransition;

  // src/js/mobjs/route/scroll/restoreScroll.js
  var restoreScroll = true;
  var setRestoreScroll = (value) => {
    restoreScroll = value;
  };
  var getRestoreScroll = () => restoreScroll;

  // src/js/mobjs/route/loadRoute/index.js
  var loadRoute = async ({
    route = "",
    templateName = "",
    params = {},
    scrollY: scrollY2,
    comeFromHistory = false
  }) => {
    mainStore.set(MAIN_STORE_ROUTE_IS_LOADING, true);
    await tick();
    const contentId = getContentId();
    const contentEl = document?.querySelector(contentId);
    if (!contentEl) return;
    const { activeRoute } = mainStore.get();
    mainStore.set(MAIN_STORE_BEFORE_ROUTE_LEAVES, {
      route: activeRoute.route,
      templateName
    });
    mainStore.set(MAIN_STORE_BEFORE_ROUTE_CHANGE, { route, templateName });
    let skip = false;
    const unWatchRouteChange = mainStore.watch(
      MAIN_STORE_BEFORE_ROUTE_CHANGE,
      () => {
        skip = true;
      }
    );
    removeOrphanTempIds();
    mainStore.set(MAIN_STORE_ACTIVE_ROUTE, { route, templateName });
    mainStore.set(MAIN_STORE_ACTIVE_PARAMS, params);
    const routeObejct = getRouteByName({ routeName: route });
    const props = routeObejct?.props ?? {};
    const content = await routeObejct?.layout?.({ params, props }) ?? "";
    const beforePageTransition3 = getBeforePageTransition();
    let clone = contentEl?.cloneNode(true);
    if (beforePageTransition3 && clone && !comeFromHistory) {
      await beforePageTransition3({
        // @ts-ignore
        oldNode: clone,
        oldRoute: activeRoute.route,
        newRoute: route,
        oldTemplateName: activeRoute.templateName,
        newTemplateName: templateName
      });
      contentEl?.parentNode?.insertBefore(clone, contentEl);
    }
    contentEl.replaceChildren();
    removeCancellableComponent();
    contentEl.insertAdjacentHTML("afterbegin", content);
    await parseComponents({ element: contentEl });
    if (!skip)
      mainStore.set(MAIN_STORE_AFTER_ROUTE_CHANGE, { route, templateName });
    if (getRestoreScroll()) scrollTo(0, scrollY2);
    const pageTransition3 = getPageTransition();
    if (pageTransition3 && !comeFromHistory) {
      await pageTransition3({
        oldNode: clone,
        newNode: contentEl,
        oldRoute: activeRoute.route,
        newRoute: route,
        oldTemplateName: activeRoute.templateName,
        newTemplateName: templateName
      });
      clone.remove();
    }
    clone = null;
    document.body.dataset["route"] = route;
    document.body.dataset["template"] = templateName;
    unWatchRouteChange?.();
    mainStore.set(MAIN_STORE_ROUTE_IS_LOADING, false);
  };

  // src/js/mobjs/route/utils.js
  var getRouteModule = ({ url = "" }) => {
    const index = getIndex();
    const pageNotFound3 = getPageNotFound();
    if (url === "") return index;
    return getRouteByName({ routeName: url }) ? url : pageNotFound3;
  };
  var getTemplateName = ({ url = "" }) => {
    return getRouteByName({ routeName: url })?.templateName ?? "";
  };

  // src/js/mobjs/route/index.js
  var previousHash = "";
  var previousParamsToPush = "";
  var currentSearch;
  var historyDirection = "back";
  var previousHistory;
  var currentHistory;
  var sanitizeParams = (value) => {
    return value.replace("?", "").replace("/", "");
  };
  var sanitizeHash = (value) => {
    return value.replace("#", "").replace("/", "").replace(".", "");
  };
  var getParams = (value) => {
    return value.split("&").reduce((previous, current) => {
      const currentParams = current.split("=");
      const key = sanitizeParams(currentParams?.[0] ?? "");
      const value2 = currentParams?.[1];
      return key && key.length > 0 ? { ...previous, [key]: value2 } : previous;
    }, {});
  };
  var hashHandler = async () => {
    const historyObejct = { time: mobCore.getTime(), scrollY: window.scrollY };
    const { routeIsLoading } = mainStore.get();
    if (routeIsLoading) {
      history.replaceState(
        { nextId: historyObejct },
        "",
        `#${previousHash}${previousParamsToPush}`
      );
      return;
    }
    const hashOriginal = globalThis.location.hash.slice(1);
    const parts = hashOriginal.split("?");
    const search = sanitizeParams(parts?.[1] ?? "");
    const hash = sanitizeHash(parts?.[0] ?? "");
    const params = getParams(currentSearch ?? search);
    const paramsToPush = currentSearch || Object.keys(search).length > 0 ? `?${currentSearch ?? search}` : "";
    if (!currentHistory)
      history.replaceState(
        { nextId: historyObejct },
        "",
        `#${hash}${paramsToPush}`
      );
    currentSearch = void 0;
    previousHash = hash;
    previousParamsToPush = paramsToPush;
    if (!currentHistory) {
      setHistoryBack(historyObejct);
    }
    if (currentHistory && historyDirection === HISTORY_BACK) {
      setHistoryNext(historyObejct);
    }
    if (currentHistory && historyDirection === HISTORY_NEXT) {
      setHistoryBack(getLastHistoryNext());
    }
    await loadRoute({
      route: getRouteModule({ url: hash }),
      templateName: getTemplateName({ url: hash }),
      params,
      scrollY: currentHistory ? getLastHistory(historyDirection)?.scrollY : 0,
      comeFromHistory: currentHistory ? true : false
    });
  };
  var router = () => {
    hashHandler();
    globalThis.addEventListener("popstate", (event) => {
      currentHistory = event?.state?.nextId;
      if (currentHistory && !previousHistory && historyBackSize() > 0) {
        previousHistory = currentHistory;
        historyDirection = HISTORY_BACK;
        return;
      }
      if (currentHistory && previousHistory?.time > currentHistory?.time && historyBackSize() > 0) {
        previousHistory = currentHistory;
        historyDirection = HISTORY_BACK;
        return;
      }
      if (currentHistory && previousHistory?.time < currentHistory?.time) {
        previousHistory = currentHistory;
        historyDirection = HISTORY_NEXT;
        return;
      }
      previousHistory = void 0;
      historyDirection = "";
      resetNext();
    });
    globalThis.addEventListener("hashchange", () => {
      hashHandler();
    });
  };
  var loadUrl = ({ url = "" }) => {
    const parts = url.split("?");
    const hash = sanitizeHash(parts?.[0] ?? "");
    const search = sanitizeParams(parts?.[1] ?? "");
    if (search.length > 0) currentSearch = search;
    globalThis.location.hash = hash;
    if (hash === previousHash || previousHash === "") {
      globalThis.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  };

  // src/js/mobjs/route/test.js
  var debugRoute = () => {
    mainStore.watch(MAIN_STORE_BEFORE_ROUTE_LEAVES, (current) => {
      console.log("----------------");
      console.log(`before route leave`, current);
    });
    mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, (current, previous) => {
      console.log("before route change:");
      console.log(`previous:`, previous);
      console.log(`current:`, current);
    });
    mainStore.watch(MAIN_STORE_ACTIVE_ROUTE, (current) => {
      console.log(`active route:`, current);
    });
    mainStore.watch(MAIN_STORE_AFTER_ROUTE_CHANGE, (current) => {
      console.log(`after route change`, current);
      console.log("----------------");
    });
  };

  // src/js/mobjs/inizializeApp/index.js
  var inizializeApp = async ({
    rootId,
    wrapper: wrapper2,
    contentId,
    routes: routes2 = [],
    afterInit = () => {
    },
    index = "home",
    pageNotFound: pageNotFound3 = "pageNotFound",
    beforePageTransition: beforePageTransition3,
    pageTransition: pageTransition3,
    restoreScroll: restoreScroll2 = true
  }) => {
    const rootEl = (
      /** @type{HTMLElement} */
      document.querySelector(rootId)
    );
    const wrapperDOM = await wrapper2();
    if (!contentId || !rootEl) return;
    setContentId({ contentId });
    setRoot({ element: rootEl });
    setPageTransition({ fn: pageTransition3 });
    setBeforePageTransition({ fn: beforePageTransition3 });
    setRestoreScroll(restoreScroll2);
    initParseWatcher();
    setComponentList();
    setRouteList(routes2);
    setIndex({ routeName: index });
    setPageNotFound({ routeName: pageNotFound3 });
    rootEl.insertAdjacentHTML("afterbegin", wrapperDOM);
    await parseComponents({ element: rootEl, persistent: true });
    mobCore.useFrameIndex(() => {
      mobCore.useNextTick(() => {
        afterInit();
      });
    }, frameDelayAfterParse);
    debugRoute();
    router();
  };

  // src/js/mobjs/modules/invalidate/action/getNumberOfActiveInvalidate.js
  var getNumberOfActiveInvalidate = () => invalidateIdPlaceHolderMap.size;

  // src/js/mobjs/modules/repeater/action/getNumberOfActiveRepeater.js
  var getNumberOfActiveRepeater = () => {
    return repeatIdPlaceHolderMap.size;
  };

  // src/js/mobjs/utils.js
  var staticProps = (props = {}) => {
    return `${ATTR_PROPS}="${setStaticProps(props)}"`;
  };

  // src/js/component/common/animationTitle/animationTitle.js
  var AnimationTitleFn = ({
    html,
    onMount,
    watchSync,
    setRef,
    getRef,
    bindText
  }) => {
    onMount(({ element }) => {
      if (motionCore.mq("max", "desktop")) return;
      const { titleEl } = getRef();
      watchSync("align", (value) => {
        element.classList.remove("is-left");
        element.classList.remove("is-right");
        element.classList.add(`is-${value}`);
      });
      watchSync("color", (value) => {
        titleEl.classList.remove("is-white");
        titleEl.classList.remove("is-black");
        titleEl.classList.remove("is-highlight");
        titleEl.classList.add(`is-${value}`);
      });
      mobCore.useFrame(() => {
        titleEl.classList.add("visible");
      });
      return () => {
      };
    });
    return html`<div class="c-animation-title">
        <h4 ${setRef("titleEl")}>${bindText`${"title"}`}</h4>
    </div>`;
  };

  // src/js/component/common/animationTitle/definition.js
  var AnimationTitle = createComponent({
    name: "animation-title",
    component: AnimationTitleFn,
    exportState: ["title", "align", "color"],
    state: {
      title: () => ({
        value: "",
        type: String
      }),
      align: () => ({
        value: "left",
        type: String,
        validate: (value) => {
          return ["left", "right"].includes(value);
        }
      }),
      color: () => ({
        value: "white",
        type: String,
        validate: (value) => {
          return ["white", "black", "highlight"].includes(value);
        }
      })
    }
  });

  // src/svg/icon-code.svg
  var icon_code_default = '<?xml version="1.0" encoding="UTF-8"?>\n<svg width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n <g>\n  <path d="m221.2 367.92-102.48-85.684 102.48-85.117c7.2812-6.1602 8.3984-16.801 2.2383-24.078-3.3594-3.9219-8.3984-6.1602-13.441-6.1602-3.9219 0-7.8398 1.1211-11.199 3.9219l-117.6 98.555c-3.9219 3.3594-6.1602 7.8398-6.1602 13.441 0 5.6016 2.2383 10.078 6.1602 13.441l118.16 98.559c3.3594 2.8008 6.7188 3.9219 11.199 3.9219 5.0391 0 10.078-2.2383 13.441-6.1602 5.6016-7.8438 4.4805-18.484-2.8008-24.641z"/>\n  <path d="m623.28 288.96c0-5.0391-2.2383-10.078-6.1602-13.441l-118.72-98.559c-3.3594-2.8008-7.2812-3.9219-11.199-3.9219-5.0391 0-10.078 2.2383-13.441 6.1602-6.1602 7.2812-5.0391 17.922 2.2383 24.078l102.48 85.68-101.92 85.684c-7.2812 6.1602-8.3984 16.801-2.2383 24.078 3.3594 3.9219 7.8398 6.1602 13.441 6.1602 3.9219 0 7.8398-1.6797 11.199-3.9219l118.16-98.559c3.918-3.3594 6.1602-8.3984 6.1602-13.438z"/>\n  <path d="m408.8 72.801c-1.6797-0.55859-3.3594-0.55859-5.0391-0.55859-7.2812 0-14 4.4805-16.238 12.32l-124.88 399.84c-2.8008 8.9609 2.2383 18.48 11.199 21.281 1.6797 0.55859 3.3594 0.55859 5.0391 0.55859 7.8398 0 14-5.0391 16.238-12.32l124.32-400.4c3.3633-8.3984-1.6758-17.918-10.637-20.719z"/>\n </g>\n</svg>\n';

  // src/js/component/layout/navigation/store/navStore.js
  var navigationStore = mobCore.createStore({
    activeNavigationSection: () => ({
      value: "",
      type: String,
      skipEqual: false
    }),
    navigationIsOpen: () => ({
      value: false,
      type: Boolean
    })
  });

  // src/js/component/common/codeButton/codeButton.js
  var CodeButtonFn = ({
    getState,
    watchSync,
    onMount,
    html,
    delegateEvents
  }) => {
    const setCodeOvrlayState = setStateByName("codeOverlay");
    onMount(({ element }) => {
      watchSync("color", (value) => {
        if (value === "black") {
          element.classList.remove("c-code-btn--white");
          element.classList.add("c-code-btn--black");
        }
        if (value === "white") {
          element.classList.add("c-code-btn--white");
          element.classList.remove("c-code-btn--black");
        }
      });
      watchSync("drawers", (value) => {
        const isActive = value.length > 0;
        element.classList.toggle("active", isActive);
      });
      const unsubscribeOpenNav = navigationStore.watch(
        "navigationIsOpen",
        (val2) => {
          if (val2) {
            element.classList.remove("active");
            return;
          }
          const { drawers } = getState();
          if (drawers.length === 0) return;
          element.classList.add("active");
        }
      );
      return () => {
        unsubscribeOpenNav();
        element.remove();
      };
    });
    return html`
        <button
            class="c-code-btn"
            ${delegateEvents({
      click: () => {
        const { drawers } = getState();
        setCodeOvrlayState("urls", drawers);
      }
    })}
        >
            <span class="c-code-btn__icon">${icon_code_default}</span>
        </button>
    `;
  };

  // src/js/component/common/codeButton/definition.js
  var CodeButton = createComponent({
    name: "code-button",
    component: CodeButtonFn,
    exportState: ["drawers", "color"],
    state: {
      drawers: () => ({
        value: [],
        type: Array
      }),
      color: () => ({
        value: "black",
        type: String
      })
    }
  });

  // src/js/component/common/loader/loader.js
  var LoaderFn = ({ onMount, html, watch, remove: remove2, getState }) => {
    const { position: position2 } = getState();
    onMount(({ element }) => {
      let tweenOut = tween.createTween({
        data: { opacity: 1, scale: 1 },
        duration: 500
      });
      tweenOut.subscribe(({ opacity, scale }) => {
        element.style.opacity = opacity;
        element.style.transform = `scale(${scale})`;
      });
      watch("shouldRemove", async (shouldRemove) => {
        if (!shouldRemove) return;
        await tweenOut.goTo({ opacity: 0, scale: 0.9 });
        remove2();
      });
      return () => {
        tweenOut.destroy();
        tweenOut = null;
      };
    });
    return html`
        <div class="c-loader ${position2}">
            <span class="c-loader__inner"></span>
        </div>
    `;
  };

  // src/js/component/common/loader/definition.js
  var Loader = createComponent({
    name: "mob-loader",
    component: LoaderFn,
    exportState: ["position", "shouldRemove"],
    state: {
      shouldRemove: () => ({
        value: false,
        type: Boolean
      }),
      position: () => ({
        value: "center-viewport",
        type: String,
        validate: (val2) => {
          return ["center-viewport", "center-component"].includes(val2);
        }
      })
    }
  });

  // node_modules/highlight.js/es/core.js
  var import_core2 = __toESM(require_core(), 1);
  var core_default = import_core2.default;

  // node_modules/highlight.js/es/languages/javascript.js
  var IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
  var KEYWORDS = [
    "as",
    // for exports
    "in",
    "of",
    "if",
    "for",
    "while",
    "finally",
    "var",
    "new",
    "function",
    "do",
    "return",
    "void",
    "else",
    "break",
    "catch",
    "instanceof",
    "with",
    "throw",
    "case",
    "default",
    "try",
    "switch",
    "continue",
    "typeof",
    "delete",
    "let",
    "yield",
    "const",
    "class",
    // JS handles these with a special rule
    // "get",
    // "set",
    "debugger",
    "async",
    "await",
    "static",
    "import",
    "from",
    "export",
    "extends"
  ];
  var LITERALS = [
    "true",
    "false",
    "null",
    "undefined",
    "NaN",
    "Infinity"
  ];
  var TYPES = [
    // Fundamental objects
    "Object",
    "Function",
    "Boolean",
    "Symbol",
    // numbers and dates
    "Math",
    "Date",
    "Number",
    "BigInt",
    // text
    "String",
    "RegExp",
    // Indexed collections
    "Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Int32Array",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array",
    // Keyed collections
    "Set",
    "Map",
    "WeakSet",
    "WeakMap",
    // Structured data
    "ArrayBuffer",
    "SharedArrayBuffer",
    "Atomics",
    "DataView",
    "JSON",
    // Control abstraction objects
    "Promise",
    "Generator",
    "GeneratorFunction",
    "AsyncFunction",
    // Reflection
    "Reflect",
    "Proxy",
    // Internationalization
    "Intl",
    // WebAssembly
    "WebAssembly"
  ];
  var ERROR_TYPES = [
    "Error",
    "EvalError",
    "InternalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
  ];
  var BUILT_IN_GLOBALS = [
    "setInterval",
    "setTimeout",
    "clearInterval",
    "clearTimeout",
    "require",
    "exports",
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "unescape"
  ];
  var BUILT_IN_VARIABLES = [
    "arguments",
    "this",
    "super",
    "console",
    "window",
    "document",
    "localStorage",
    "sessionStorage",
    "module",
    "global"
    // Node.js
  ];
  var BUILT_INS = [].concat(
    BUILT_IN_GLOBALS,
    TYPES,
    ERROR_TYPES
  );
  function javascript(hljs) {
    const regex = hljs.regex;
    const hasClosingTag = (match, { after }) => {
      const tag = "</" + match[0].slice(1);
      const pos = match.input.indexOf(tag, after);
      return pos !== -1;
    };
    const IDENT_RE$1 = IDENT_RE;
    const FRAGMENT = {
      begin: "<>",
      end: "</>"
    };
    const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
    const XML_TAG = {
      begin: /<[A-Za-z0-9\\._:-]+/,
      end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
      /**
       * @param {RegExpMatchArray} match
       * @param {CallbackResponse} response
       */
      isTrulyOpeningTag: (match, response) => {
        const afterMatchIndex = match[0].length + match.index;
        const nextChar = match.input[afterMatchIndex];
        if (
          // HTML should not include another raw `<` inside a tag
          // nested type?
          // `<Array<Array<number>>`, etc.
          nextChar === "<" || // the , gives away that this is not HTML
          // `<T, A extends keyof T, V>`
          nextChar === ","
        ) {
          response.ignoreMatch();
          return;
        }
        if (nextChar === ">") {
          if (!hasClosingTag(match, { after: afterMatchIndex })) {
            response.ignoreMatch();
          }
        }
        let m;
        const afterMatch = match.input.substring(afterMatchIndex);
        if (m = afterMatch.match(/^\s*=/)) {
          response.ignoreMatch();
          return;
        }
        if (m = afterMatch.match(/^\s+extends\s+/)) {
          if (m.index === 0) {
            response.ignoreMatch();
            return;
          }
        }
      }
    };
    const KEYWORDS$1 = {
      $pattern: IDENT_RE,
      keyword: KEYWORDS,
      literal: LITERALS,
      built_in: BUILT_INS,
      "variable.language": BUILT_IN_VARIABLES
    };
    const decimalDigits = "[0-9](_?[0-9])*";
    const frac = `\\.(${decimalDigits})`;
    const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
    const NUMBER2 = {
      className: "number",
      variants: [
        // DecimalLiteral
        { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b` },
        { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },
        // DecimalBigIntegerLiteral
        { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
        // NonDecimalIntegerLiteral
        { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
        { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
        { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
        // LegacyOctalIntegerLiteral (does not include underscore separators)
        // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
        { begin: "\\b0[0-7]+n?\\b" }
      ],
      relevance: 0
    };
    const SUBST = {
      className: "subst",
      begin: "\\$\\{",
      end: "\\}",
      keywords: KEYWORDS$1,
      contains: []
      // defined later
    };
    const HTML_TEMPLATE = {
      begin: ".?html`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST
        ],
        subLanguage: "xml"
      }
    };
    const CSS_TEMPLATE = {
      begin: ".?css`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST
        ],
        subLanguage: "css"
      }
    };
    const GRAPHQL_TEMPLATE = {
      begin: ".?gql`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST
        ],
        subLanguage: "graphql"
      }
    };
    const TEMPLATE_STRING = {
      className: "string",
      begin: "`",
      end: "`",
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ]
    };
    const JSDOC_COMMENT = hljs.COMMENT(
      /\/\*\*(?!\/)/,
      "\\*/",
      {
        relevance: 0,
        contains: [
          {
            begin: "(?=@[A-Za-z]+)",
            relevance: 0,
            contains: [
              {
                className: "doctag",
                begin: "@[A-Za-z]+"
              },
              {
                className: "type",
                begin: "\\{",
                end: "\\}",
                excludeEnd: true,
                excludeBegin: true,
                relevance: 0
              },
              {
                className: "variable",
                begin: IDENT_RE$1 + "(?=\\s*(-)|$)",
                endsParent: true,
                relevance: 0
              },
              // eat spaces (not newlines) so we can find
              // types or variables
              {
                begin: /(?=[^\n])\s/,
                relevance: 0
              }
            ]
          }
        ]
      }
    );
    const COMMENT = {
      className: "comment",
      variants: [
        JSDOC_COMMENT,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_LINE_COMMENT_MODE
      ]
    };
    const SUBST_INTERNALS = [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER2
      // This is intentional:
      // See https://github.com/highlightjs/highlight.js/issues/3288
      // hljs.REGEXP_MODE
    ];
    SUBST.contains = SUBST_INTERNALS.concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: KEYWORDS$1,
      contains: [
        "self"
      ].concat(SUBST_INTERNALS)
    });
    const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
    const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
      // eat recursive parens in sub expressions
      {
        begin: /(\s*)\(/,
        end: /\)/,
        keywords: KEYWORDS$1,
        contains: ["self"].concat(SUBST_AND_COMMENTS)
      }
    ]);
    const PARAMS = {
      className: "params",
      // convert this to negative lookbehind in v12
      begin: /(\s*)\(/,
      // to match the parms with 
      end: /\)/,
      excludeBegin: true,
      excludeEnd: true,
      keywords: KEYWORDS$1,
      contains: PARAMS_CONTAINS
    };
    const CLASS_OR_EXTENDS = {
      variants: [
        // class Car extends vehicle
        {
          match: [
            /class/,
            /\s+/,
            IDENT_RE$1,
            /\s+/,
            /extends/,
            /\s+/,
            regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
          ],
          scope: {
            1: "keyword",
            3: "title.class",
            5: "keyword",
            7: "title.class.inherited"
          }
        },
        // class Car
        {
          match: [
            /class/,
            /\s+/,
            IDENT_RE$1
          ],
          scope: {
            1: "keyword",
            3: "title.class"
          }
        }
      ]
    };
    const CLASS_REFERENCE = {
      relevance: 0,
      match: regex.either(
        // Hard coded exceptions
        /\bJSON/,
        // Float32Array, OutT
        /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
        // CSSFactory, CSSFactoryT
        /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
        // FPs, FPsT
        /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
        // P
        // single letters are not highlighted
        // BLAH
        // this will be flagged as a UPPER_CASE_CONSTANT instead
      ),
      className: "title.class",
      keywords: {
        _: [
          // se we still get relevance credit for JS library classes
          ...TYPES,
          ...ERROR_TYPES
        ]
      }
    };
    const USE_STRICT = {
      label: "use_strict",
      className: "meta",
      relevance: 10,
      begin: /^\s*['"]use (strict|asm)['"]/
    };
    const FUNCTION_DEFINITION = {
      variants: [
        {
          match: [
            /function/,
            /\s+/,
            IDENT_RE$1,
            /(?=\s*\()/
          ]
        },
        // anonymous function
        {
          match: [
            /function/,
            /\s*(?=\()/
          ]
        }
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      label: "func.def",
      contains: [PARAMS],
      illegal: /%/
    };
    const UPPER_CASE_CONSTANT = {
      relevance: 0,
      match: /\b[A-Z][A-Z_0-9]+\b/,
      className: "variable.constant"
    };
    function noneOf(list) {
      return regex.concat("(?!", list.join("|"), ")");
    }
    const FUNCTION_CALL = {
      match: regex.concat(
        /\b/,
        noneOf([
          ...BUILT_IN_GLOBALS,
          "super",
          "import"
        ].map((x) => `${x}\\s*\\(`)),
        IDENT_RE$1,
        regex.lookahead(/\s*\(/)
      ),
      className: "title.function",
      relevance: 0
    };
    const PROPERTY_ACCESS = {
      begin: regex.concat(/\./, regex.lookahead(
        regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
      )),
      end: IDENT_RE$1,
      excludeBegin: true,
      keywords: "prototype",
      className: "property",
      relevance: 0
    };
    const GETTER_OR_SETTER = {
      match: [
        /get|set/,
        /\s+/,
        IDENT_RE$1,
        /(?=\()/
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        {
          // eat to avoid empty params
          begin: /\(\)/
        },
        PARAMS
      ]
    };
    const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
    const FUNCTION_VARIABLE = {
      match: [
        /const|var|let/,
        /\s+/,
        IDENT_RE$1,
        /\s*/,
        /=\s*/,
        /(async\s*)?/,
        // async is optional
        regex.lookahead(FUNC_LEAD_IN_RE)
      ],
      keywords: "async",
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        PARAMS
      ]
    };
    return {
      name: "JavaScript",
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: KEYWORDS$1,
      // this will be extended by TypeScript
      exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
      illegal: /#(?![$_A-z])/,
      contains: [
        hljs.SHEBANG({
          label: "shebang",
          binary: "node",
          relevance: 5
        }),
        USE_STRICT,
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        HTML_TEMPLATE,
        CSS_TEMPLATE,
        GRAPHQL_TEMPLATE,
        TEMPLATE_STRING,
        COMMENT,
        // Skip numbers when they are part of a variable name
        { match: /\$\d+/ },
        NUMBER2,
        CLASS_REFERENCE,
        {
          className: "attr",
          begin: IDENT_RE$1 + regex.lookahead(":"),
          relevance: 0
        },
        FUNCTION_VARIABLE,
        {
          // "value" container
          begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
          keywords: "return throw case",
          relevance: 0,
          contains: [
            COMMENT,
            hljs.REGEXP_MODE,
            {
              className: "function",
              // we have to count the parens to make sure we actually have the
              // correct bounding ( ) before the =>.  There could be any number of
              // sub-expressions inside also surrounded by parens.
              begin: FUNC_LEAD_IN_RE,
              returnBegin: true,
              end: "\\s*=>",
              contains: [
                {
                  className: "params",
                  variants: [
                    {
                      begin: hljs.UNDERSCORE_IDENT_RE,
                      relevance: 0
                    },
                    {
                      className: null,
                      begin: /\(\s*\)/,
                      skip: true
                    },
                    {
                      begin: /(\s*)\(/,
                      end: /\)/,
                      excludeBegin: true,
                      excludeEnd: true,
                      keywords: KEYWORDS$1,
                      contains: PARAMS_CONTAINS
                    }
                  ]
                }
              ]
            },
            {
              // could be a comma delimited list of params to a function call
              begin: /,/,
              relevance: 0
            },
            {
              match: /\s+/,
              relevance: 0
            },
            {
              // JSX
              variants: [
                { begin: FRAGMENT.begin, end: FRAGMENT.end },
                { match: XML_SELF_CLOSING },
                {
                  begin: XML_TAG.begin,
                  // we carefully check the opening tag to see if it truly
                  // is a tag and not a false positive
                  "on:begin": XML_TAG.isTrulyOpeningTag,
                  end: XML_TAG.end
                }
              ],
              subLanguage: "xml",
              contains: [
                {
                  begin: XML_TAG.begin,
                  end: XML_TAG.end,
                  skip: true,
                  contains: ["self"]
                }
              ]
            }
          ]
        },
        FUNCTION_DEFINITION,
        {
          // prevent this from getting swallowed up by function
          // since they appear "function like"
          beginKeywords: "while if switch catch for"
        },
        {
          // we have to count the parens to make sure we actually have the correct
          // bounding ( ).  There could be any number of sub-expressions inside
          // also surrounded by parens.
          begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
          // end parens
          returnBegin: true,
          label: "func.def",
          contains: [
            PARAMS,
            hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
          ]
        },
        // catch ... so it won't trigger the property rule below
        {
          match: /\.\.\./,
          relevance: 0
        },
        PROPERTY_ACCESS,
        // hack: prevents detection of keywords in some circumstances
        // .keyword()
        // $keyword = x
        {
          match: "\\$" + IDENT_RE$1,
          relevance: 0
        },
        {
          match: [/\bconstructor(?=\s*\()/],
          className: { 1: "title.function" },
          contains: [PARAMS]
        },
        FUNCTION_CALL,
        UPPER_CASE_CONSTANT,
        CLASS_OR_EXTENDS,
        GETTER_OR_SETTER,
        {
          match: /\$[(.]/
          // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
        }
      ]
    };
  }

  // src/js/utils/utils.js
  function detectSafari() {
    const userAgentString = navigator.userAgent;
    let safariAgent = userAgentString.includes("Safari");
    const chromeAgent = userAgentString.includes("Chrome");
    if (chromeAgent && safariAgent) safariAgent = false;
    return safariAgent;
  }
  function detectFirefox() {
    const userAgentString = navigator.userAgent;
    let firefixAgent = userAgentString.includes("Firefox");
    const chromeAgent = userAgentString.includes("Chrome");
    if (chromeAgent && firefixAgent) firefixAgent = false;
    return firefixAgent;
  }
  function setBrowserClass() {
    const userAgent = navigator.userAgent;
    const body = document.body;
    if (/chrome|chromium|crios/i.test(userAgent)) {
      body.classList.add("is-chrome");
      return;
    }
    if (/firefox|fxios/i.test(userAgent)) {
      body.classList.add("is-firefox");
      return;
    }
    if (/safari/i.test(userAgent)) {
      body.classList.add("is-safari");
      return;
    }
    if (/edg/i.test(userAgent)) {
      body.classList.add("is-edge");
      return;
    }
  }
  var loadTextContent = async ({ source }) => {
    const response = await fetch(source);
    if (!response.ok) {
      console.warn(`${source} not found`);
      return {
        success: false,
        data: ""
      };
    }
    const data2 = await response.text();
    return {
      success: true,
      data: data2
    };
  };
  var loadJsonContent = async ({ source }) => {
    const response = await fetch(source);
    if (!response.ok) {
      console.warn(`${source} not found`);
      return {
        success: false,
        data: ""
      };
    }
    const data2 = await response.json();
    return {
      success: true,
      data: data2
    };
  };

  // src/js/component/common/snippet/snippet.js
  core_default.registerLanguage("javascript", javascript);
  var loadSnippet = async ({ ref, source }) => {
    if (!ref) return;
    const { success, data: data2 } = await loadTextContent({ source });
    if (!success) {
      ref.textContent = `something went wrong`;
      return;
    }
    ref.textContent = data2;
    core_default.highlightElement(ref);
    ref.style.height = "";
  };
  var SnippetFn = ({ html, onMount, getState, setRef, getRef }) => {
    const { source, isFull, hasBorder, hasOverflow, numLines } = getState();
    const isFullClass = isFull ? "is-full" : "";
    const hasBorderClass = hasBorder ? "has-border" : "";
    const hasOverflowClass = hasOverflow ? "has-overflow" : "";
    const remValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--snippet-rem-value");
    const lineHeight = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--snippet-line-height-value");
    onMount(async () => {
      const { codeEl } = getRef();
      const stateObject = getState();
      const awaitLoad = stateObject?.awaitLoad;
      if (awaitLoad) {
        await loadSnippet({ ref: codeEl, source });
      } else {
        loadSnippet({ ref: codeEl, source });
      }
      return () => {
      };
    });
    return html`<div class="snippet">
        <code class="${isFullClass} ${hasBorderClass}">
            <pre
                class="${isFullClass} ${hasOverflowClass}"
                ${setRef("codeEl")}
                style="height:${numLines * Number(lineHeight) * Number(remValue)}rem;"
            >
Loading snippet ...</pre
            >
        </code>
    </div>`;
  };

  // src/js/component/common/snippet/definition.js
  var Snippet = createComponent({
    name: "mob-snippet",
    component: SnippetFn,
    exportState: [
      "source",
      "isFull",
      "hasOverflow",
      "hasBorder",
      "numLines",
      "awaitLoad"
    ],
    state: {
      source: () => ({
        value: "",
        type: String
      }),
      contentIsLoaded: () => ({
        value: false,
        type: Boolean
      }),
      isFull: () => ({
        value: false,
        type: Boolean
      }),
      hasOverflow: () => ({
        value: true,
        type: Boolean
      }),
      hasBorder: () => ({
        value: false,
        type: Boolean
      }),
      numLines: () => ({
        value: 1,
        type: Number
      }),
      awaitLoad: () => ({
        value: false,
        type: Boolean
      })
    }
  });

  // src/js/component/common/scrollTo/scrollToStore.js
  var anchorStore = mobCore.createStore({
    items: () => ({
      value: [],
      type: Array
    }),
    computedItems: () => ({
      value: [],
      type: Array
    }),
    activeLabelFromObeserver: () => ({
      value: "",
      type: String
    })
  });
  anchorStore.computed("computedItems", ["items"], ({ items }) => {
    return items;
  });
  mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, () => {
    anchorStore.set("items", []);
  });

  // src/js/component/common/spacerAnchor/spacerAnchor.js
  function hasAnchor({ id }) {
    return id && id.length > 0;
  }
  var options = {
    root: null,
    rootMargin: "0% 0% -100% 0%",
    threshold: 0.5
  };
  var SpacerAnchorFn = ({ html, getState, onMount }) => {
    const { style, line, id, label } = getState();
    const lineClass = line ? "spacer--line" : "";
    onMount(({ element }) => {
      const shouldAddToAnchor = hasAnchor({ id });
      if (!shouldAddToAnchor) return;
      anchorStore.update("items", (val2) => {
        return [...val2, { id, label, element }];
      });
      const observer = new IntersectionObserver((entries) => {
        entries.map((entry) => {
          if (entry.isIntersecting) {
            anchorStore.set("activeLabelFromObeserver", label);
          }
        });
      });
      observer.observe(element, options);
      return () => {
        observer.unobserve(element);
      };
    });
    return html`<div id="${id}" class="spacer spacer--${style} ${lineClass}">
        <span></span>
    </div>`;
  };

  // src/js/component/common/spacerAnchor/definition.js
  var SpacerAnchor = createComponent({
    name: "mob-spacer",
    component: SpacerAnchorFn,
    exportState: ["style", "line", "id", "label"],
    state: {
      style: () => ({
        value: "medium",
        type: String,
        validate: (val2) => ["small", "medium", "big"].includes(val2),
        strict: true
      }),
      line: () => ({
        value: false,
        type: Boolean
      }),
      id: () => ({
        value: "",
        type: String
      }),
      label: () => ({
        value: "",
        type: String
      })
    }
  });

  // src/js/mobMotion/plugin/smoothScroller/smoothScroller.js
  var SmoothScroller = class {
    /**
         * @param { smoothScrollerConstructorType } data
         *
         * @description
         *
           Create new SmoothScroller instance.
    
           Available methods:
           mySmoothScroll.init();
           mySmoothScroll.refresh();
           mySmoothScroll.destroy();
           mySmoothScroll.move();
           mySmoothScroll.set();
    
         * @example
           ```javascript
           const mySmoothScroller = new SmoothScroller({
               screen: [String | Element],
               scroller: [String | Element],
               direction: [String],
               speed: [Number],
               drag: [Boolean],
               scopedEvent: [Boolean],
               children: [child1,child2, ...],
               ease: [Boolean],
               easeType: [String],
               afterInit: () => {
                   ...
               },
               onTick: ({ value, parentIsMoving, percent }) => {
                   ...
               },
               onUpdate: ({ value, percent }) => {
                   ...
               },
               afterRefresh: () => {
                   ...
               },
           });
    
           mySmoothScroller.init();
           ```
         */
    constructor(data2 = {}) {
      this.propsIsValid = true;
      this.endValue = 0;
      this.percent = 0;
      this.screenWidth = 0;
      this.screenHeight = 0;
      this.firstTouchValue = 0;
      this.threshold = 30;
      this.maxValue = 0;
      this.minValue = 0;
      this.dragEnable = null;
      this.touchend = null;
      this.touchmove = null;
      this.prevTouchVal = 0;
      this.touchVal = 0;
      this.onUpdateScrollBar = NOOP;
      this.subscribeResize = NOOP;
      this.subscribeScrollStart = NOOP;
      this.subscribeScrollEnd = NOOP;
      this.subscribeTouchStart = NOOP;
      this.subscribeTouchEnd = NOOP;
      this.subscribeMouseDown = NOOP;
      this.subscribeMouseUp = NOOP;
      this.subscribeMouseWheel = NOOP;
      this.subscribeMouseMove = NOOP;
      this.subscribeTouchMove = NOOP;
      this.subscribeMouseClick = NOOP;
      this.motion = null;
      this.unsubscribeMotion = NOOP;
      this.unsubscribeOnComplete = NOOP;
      this.scrollbarIsRunning = false;
      this.direction = directionIsValid(data2?.direction, "SmoothScroller");
      this.isDestroyed = false;
      this.easeType = genericEaseTypeIsValid(
        data2?.easeType,
        "SmoothScroller"
      );
      this.breakpoint = breakpointIsValid(
        data2?.breakpoint,
        "breakpoint",
        "SmoothScroller"
      );
      this.queryType = breakpointTypeIsValid(
        data2?.queryType,
        "queryType",
        "SmoothScroller"
      );
      this.scroller = mobCore.checkType(String, data2?.scroller) ? document.querySelector(data2.scroller) : data2.scroller;
      if (!this.scroller) {
        console.warn("SmoothScroller: scroller node not found");
        this.propsIsValid = false;
        return;
      }
      this.screen = data2?.screen ? (() => {
        return mobCore.checkType(String, data2.screen) ? document.querySelector(data2.screen) : data2.screen;
      })() : document.documentElement;
      if (!this.screen) {
        this.propsIsValid = false;
        console.warn("SmoothScroller: screen node not found");
        return;
      }
      this.scopedEvent = valueIsBooleanAndReturnDefault(
        data2?.scopedEvent,
        "SmoothScroller: scopedEvent",
        false
      );
      this.speed = valueIsNumberAndReturnDefault(
        data2?.speed,
        "SmoothScroller: speed",
        60
      );
      this.drag = valueIsBooleanAndReturnDefault(
        data2?.drag,
        "SmoothScroller: drag",
        false
      );
      this.onTickCallback = valueIsFunctionAndReturnDefault(
        data2?.onTick,
        "SmoothScroller: onTick",
        NOOP
      );
      this.onUpdateCallback = valueIsFunctionAndReturnDefault(
        data2?.onUpdate,
        "SmoothScroller: onUpdate",
        NOOP
      );
      this.onAfterRefresh = valueIsFunctionAndReturnDefault(
        data2?.afterRefresh,
        "SmoothScroller: afterRefresh",
        NOOP
      );
      this.afterInit = valueIsFunctionAndReturnDefault(
        data2?.afterInit,
        "SmoothScroller: afterInit",
        NOOP
      );
      this.children = data2?.children || [];
      this.children.forEach((element) => {
        element.setScroller(this.scroller);
        element.setDirection(this.direction);
        element.setScreen(this.screen);
        element.setBreakPoint(this.breakpoint);
        element.setQueryType(this.queryType);
        element.init();
      });
      this.scopedWhell = (e) => {
        const { spinY } = mobCore.normalizeWheel(e);
        this.onScopedWhell({
          target: e.target,
          spinY
        });
      };
      this.scopedTouchMove = (e) => {
        const { clientX, clientY } = e.touches ? e.touches[0] : e;
        this.onScopedTouchMove({
          client: {
            x: clientX,
            y: clientY
          }
        });
      };
    }
    /**
     * @description
     * Initialize insatance
     *
     * @example
     * myInstance.init()
     */
    init() {
      if (!this.propsIsValid) return;
      switch (this.easeType) {
        case parallaxConstant.EASE_SPRING: {
          this.motion = new HandleSpring();
          break;
        }
        default: {
          this.motion = new HandleLerp();
          break;
        }
      }
      if (this.scopedEvent) {
        this.scroller.addEventListener("wheel", this.scopedWhell, {
          passive: true
        });
        this.scroller.addEventListener("mousemove", this.scopedTouchMove, {
          passive: true
        });
        this.scroller.addEventListener("touchmove", this.scopedTouchMove, {
          passive: true
        });
      } else {
        this.subscribeMouseWheel = mobCore.useMouseWheel(
          (data2) => this.onWhell(data2)
        );
        this.subscribeMouseMove = mobCore.useMouseMove(
          (data2) => this.onTouchMove(data2)
        );
        this.subscribeTouchMove = mobCore.useTouchMove(
          (data2) => this.onTouchMove(data2)
        );
      }
      this.subscribeResize = mobCore.useResize(() => this.refresh());
      this.subscribeScrollStart = mobCore.useScrollStart(
        () => this.refreshScroller()
      );
      this.subscribeScrollEnd = mobCore.useScrollEnd(
        () => this.refreshScroller()
      );
      this.subscribeTouchStart = mobCore.useTouchStart(
        (data2) => this.onMouseDown(data2)
      );
      this.subscribeTouchEnd = mobCore.useTouchEnd(
        (data2) => this.onMouseUp(data2)
      );
      this.subscribeMouseDown = mobCore.useMouseDown(
        (data2) => this.onMouseDown(data2)
      );
      this.subscribeMouseUp = mobCore.useMouseUp(
        (data2) => this.onMouseUp(data2)
      );
      if (this.drag) {
        this.subscribeMouseClick = mobCore.useMouseClick(
          ({ target, preventDefault }) => {
            this.preventChecker({ target, preventDefault });
          }
        );
      }
      this.initMotion();
      if (mq[this.queryType](this.breakpoint)) {
        this.setScrolerStyle();
        this.refreshScroller();
      }
      mobCore.useFrameIndex(() => {
        mobCore.useNextTick(() => {
          if (this.isDestroyed) return;
          this.afterInit?.();
          this.children.forEach((element) => {
            element.refresh();
          });
        });
      }, 3);
    }
    /**
     * @private
     */
    setScrolerStyle() {
      this.scroller.style["user-select"] = "none";
      const activeElement = this.scroller.querySelectorAll("a, button");
      [...activeElement].forEach((item) => {
        item.setAttribute("draggable", false);
        item.style["user-select"] = "none";
      });
    }
    /**
     * @private
     */
    removeScrolerStyle() {
      if (!this.scroller) return;
      this.scroller.style["user-select"] = "";
      const activeElement = this.scroller.querySelectorAll("a, button");
      [...activeElement].forEach((item) => {
        item.removeAttribute("draggable");
        item.style["user-select"] = "";
      });
    }
    /**
     * @private
     */
    initMotion() {
      this.motion.setData({ val: 0 });
      this.unsubscribeMotion = this.motion.subscribe(({ val: val2 }) => {
        this.scroller.style.transform = this.direction == parallaxConstant.DIRECTION_VERTICAL ? `translate3d(0px, 0px, 0px) translateY(${-val2}px)` : `translate3d(0px, 0px, 0px) translateX(${-val2}px)`;
        this.children.forEach((element) => {
          element.triggerScrollStart();
        });
        mobCore.useNextTick(() => {
          this.onTickCallback({
            value: -val2,
            percent: this.percent,
            parentIsMoving: true
          });
          this.children.forEach((element) => {
            element.move({
              value: -val2,
              parentIsMoving: true
            });
          });
        });
      });
      this.unsubscribeOnComplete = this.motion.onComplete(({ val: val2 }) => {
        this.scroller.style.transform = this.direction == parallaxConstant.DIRECTION_VERTICAL ? `translateY(${-val2}px)` : `translateX(${-val2}px)`;
        mobCore.useNextTick(() => {
          this.onTickCallback({
            value: -val2,
            percent: this.percent,
            parentIsMoving: false
          });
          this.children.forEach((element) => {
            element.triggerScrollEnd();
            element.move({
              value: -val2,
              parentIsMoving: false
            });
          });
        });
      });
    }
    /**
     * @private
     */
    refreshScroller() {
      this.screenWidth = this.screen === document.documentElement ? window.innerWidth : outerWidth(this.screen);
      this.screenHeight = this.screen === document.documentElement ? window.innerHeight : outerHeight(this.screen);
      this.maxValue = this.direction === parallaxConstant.DIRECTION_VERTICAL ? this.scroller.offsetHeight - this.screenHeight : this.scroller.offsetWidth - this.screenWidth;
      this.calculateValue();
    }
    /**
     * @private
     */
    onScopedTouchMove({ client }) {
      if (!this.dragEnable || !this.drag) return;
      this.prevTouchVal = this.touchVal;
      this.touchVal = this.getMousePos(client);
      this.endValue += Number.parseInt(this.prevTouchVal - this.touchVal);
      this.calculateValue();
      this.scrollbarIsRunning = false;
    }
    /**
     * @private
     */
    onScopedWhell({ spinY }) {
      if (!mq[this.queryType](this.breakpoint)) return;
      this.dragEnable = false;
      this.endValue += spinY * this.speed;
      this.calculateValue();
      this.scrollbarIsRunning = false;
    }
    /**
     * Listener related event.
     * Global
     */
    /**
     * @private
     */
    onMouseDown({ target, client }) {
      if (!mq[this.queryType](this.breakpoint)) return;
      if (target === this.scroller || isDescendant(this.scroller, target)) {
        this.firstTouchValue = this.endValue;
        this.dragEnable = true;
        this.prevTouchVal = this.getMousePos(client);
        this.touchVal = this.getMousePos(client);
        this.scrollbarIsRunning = false;
      }
    }
    /**
     * @private
     */
    onMouseUp() {
      this.dragEnable = false;
      this.scrollbarIsRunning = false;
    }
    /**
     * @private
     */
    onTouchMove({ target, client, preventDefault }) {
      if ((target === this.scroller || isDescendant(this.scroller, target)) && this.dragEnable && this.drag) {
        preventDefault();
        this.prevTouchVal = this.touchVal;
        this.touchVal = this.getMousePos(client);
        const result = Number.parseInt(this.prevTouchVal - this.touchVal);
        this.endValue += result;
        this.calculateValue();
        this.scrollbarIsRunning = false;
      }
    }
    onWhell({ target, spinY, preventDefault }) {
      const bodyIsOverflow = document.body.style.overflow === "hidden" && this.direction === parallaxConstant.DIRECTION_VERTICAL;
      if (!mq[this.queryType](this.breakpoint) || bodyIsOverflow) return;
      if (target === this.scroller || isDescendant(this.scroller, target)) {
        this.dragEnable = false;
        preventDefault();
        this.endValue += spinY * this.speed;
        this.calculateValue();
        this.scrollbarIsRunning = false;
      }
    }
    /**
     * @description
     * Move scroller
     *
     * @prop {number} new position in percent, from 0 to 100
     *
     * @example
     * myInstance.move(val);
     */
    move(percent) {
      if (!mq[this.queryType](this.breakpoint)) return;
      this.scrollbarIsRunning = true;
      this.percent = percent;
      this.endValue = this.percent * this.maxValue / 100;
      this.motion.goTo({ val: this.endValue }).catch(() => {
      });
    }
    /**
     *
     * @description
     * Move scroller immediatr
     *
     * @prop {number} new position in percent, from 0 to 100
     *
     * @example
     * myInstance.set(val);
     */
    set(percent) {
      if (!mq[this.queryType](this.breakpoint)) return;
      this.scrollbarIsRunning = true;
      this.percent = percent;
      this.endValue = this.percent * this.maxValue / 100;
      this.motion.set({ val: this.endValue }).catch(() => {
      });
    }
    /**
     * Utils
     */
    calculateValue() {
      const percentValue = this.endValue * 100 / this.maxValue;
      this.percent = clamp(percentValue, 0, 100);
      this.endValue = clamp(this.endValue, 0, this.maxValue);
      this.motion.goTo({ val: this.endValue }).catch(() => {
      });
      if (this.onUpdateCallback)
        this.onUpdateCallback({
          value: -this.endValue,
          percent: this.percent,
          parentIsMoving: true
        });
    }
    /**
     * @private
     */
    preventChecker({ target, preventDefault }) {
      if (mq[this.queryType](this.breakpoint) && (target === this.scroller || isDescendant(this.scroller, target)) && Math.abs(this.endValue - this.firstTouchValue) > this.threshold) {
        preventDefault();
      }
    }
    getMousePos(client) {
      const { x, y } = client;
      return this.direction === parallaxConstant.DIRECTION_VERTICAL ? y : x;
    }
    /**
     * @description
     * Refresh instance
     *
     * @example
     * myInstance.refresh()
     */
    refresh() {
      if (!mq[this.queryType](this.breakpoint)) {
        this.removeScrolerStyle();
        this.motion?.stop?.();
        mobCore.useFrame(() => {
          mobCore.useNextTick(() => {
            this.scroller.style.transform = "";
          });
        });
        return;
      }
      this.refreshScroller();
      this.setScrolerStyle();
      mobCore.useFrameIndex(() => {
        mobCore.useNextTick(() => {
          if (this.onAfterRefresh) this.onAfterRefresh();
          this.children.forEach((element) => {
            element?.refresh?.();
          });
        });
      }, 2);
    }
    /**
     * @description
     * Destroy instance
     *
     * @example
     * myInstance.destroy()
     */
    destroy() {
      this.isDestroyed = true;
      this.removeScrolerStyle();
      this.subscribeResize();
      this.subscribeScrollStart();
      this.subscribeScrollEnd();
      this.subscribeTouchStart();
      this.subscribeTouchEnd();
      this.subscribeMouseDown();
      this.subscribeMouseUp();
      this.subscribeMouseWheel();
      this.subscribeMouseMove();
      this.subscribeTouchMove();
      this.subscribeMouseClick();
      this.unsubscribeMotion();
      this.unsubscribeOnComplete();
      this.onUpdateScrollBar = NOOP;
      this.motion?.destroy();
      this.motion = null;
      this.children.forEach((element) => {
        element?.destroy?.();
        element = null;
      });
      this.children = [];
      this.onTickCallback = NOOP;
      this.onUpdateCallback = NOOP;
      this.onAfterRefresh = NOOP;
      this.afterInit = NOOP;
      if (this.scopedEvent) {
        this.scroller?.removeEventListener("wheel", this.scopedWhell);
        this.scroller?.removeEventListener(
          "mousemove",
          this.scopedTouchMove
        );
        this.scroller?.removeEventListener(
          "touchmove",
          this.scopedTouchMove
        );
      }
      mobCore.useFrameIndex(() => {
        mobCore.useNextTick(() => {
          this.scroller = null;
          this.screen = null;
        });
      }, 3);
    }
  };

  // src/js/mobMotion/plugin/bodyScroll/bodyScroll.js
  var defaultPreset = "easeOutQuad";
  var tween2 = new HandleTween({ ease: defaultPreset, data: { val: 0 } });
  var isRunning = false;
  var overflow = false;
  tween2.subscribe(({ val: val2 }) => {
    window.scrollTo({
      top: val2,
      left: 0,
      behavior: "auto"
    });
  });
  var onComplete = () => {
    if (overflow) document.body.style.overflow = "";
    tween2?.updateEase?.(defaultPreset);
  };
  var stopTween = () => {
    if (!isRunning) return;
    tween2.stop();
    onComplete();
  };
  mobCore.useMouseWheel(() => {
    stopTween();
  });
  mobCore.useMouseDown(() => {
    stopTween();
  });
  mobCore.useTouchStart(() => {
    stopTween();
  });
  var bodyScroll = /* @__PURE__ */ (() => {
    const to = (target, data2) => {
      if (typeof globalThis === "undefined") return;
      const targetParsed = (() => {
        if (!target) return 0;
        const isValid = isNode(target) || mobCore.checkType(Number, target);
        if (!isValid) {
          console.warn(
            `bodyScroll ${target} is not valid target, must be a node or a number`
          );
          return 0;
        }
        return isNode(target) ? offset(
          /** @type{HTMLElement} */
          target
        ).top : (
          /** @type{number} */
          target
        );
      })();
      const duration2 = valueIsNumberAndReturnDefault(
        data2?.duration,
        "bodyScroll: duration",
        500
      );
      overflow = valueIsBooleanAndReturnDefault(
        data2?.overflow,
        "bodyScroll: overflow",
        false
      );
      if (easeTweenIsValid(data2?.ease)) {
        tween2?.updateEase?.(
          /** @type{import('../../animation/tween/type.js').easeTypes} */
          data2?.ease
        );
      }
      if (overflow) document.body.style.overflow = "hidden";
      return new Promise((resolve) => {
        isRunning = true;
        tween2.goFromTo(
          { val: window.scrollY },
          { val: targetParsed },
          { duration: duration2 }
        ).then(() => {
          onComplete();
          isRunning = false;
          resolve(true);
        }).catch(() => {
          onComplete();
          isRunning = false;
          resolve(true);
        });
      });
    };
    return {
      to
    };
  })();

  // src/js/mobMotion/plugin/slide/slide.js
  var slideItems = /* @__PURE__ */ new Map();
  var isNode2 = (target) => {
    const isValid = mobCore.checkType(Element, target);
    if (!isValid)
      console.warn(`slide utils ${target} is not a valid Dom element`);
    return isValid;
  };
  var setSlideData = (target) => {
    const tween3 = new HandleTween({ ease: "easeOutQuad", data: { val: 0 } });
    return {
      tween: tween3,
      unsubscribe: tween3.subscribe(({ val: val2 }) => {
        target.style.height = `${val2}px`;
      })
    };
  };
  var slide = /* @__PURE__ */ (() => {
    const subscribe = (target) => {
      if (!isNode2(target)) return () => {
      };
      const alreadySubscribe = slideItems.has(target);
      if (alreadySubscribe) {
        console.warn(`slide utils ${target} is alredysubscribed`);
        return () => {
        };
      }
      const data2 = setSlideData(target);
      slideItems.set(target, data2);
      return () => {
        data2.unsubscribe();
        const { tween: tween3 } = data2;
        tween3.destroy();
        slideItems.delete(target);
      };
    };
    const reset = (target) => {
      if (!isNode2(target)) return;
      target.style.height = "0";
      target.style.overflow = "hidden";
    };
    const up = async (target) => {
      if (!isNode2(target)) {
        return new Promise((resolve) => resolve(true));
      }
      const currentItem = slideItems.get(target);
      if (!currentItem) {
        console.warn("slide element not exist in slide store");
        return new Promise((resolve) => resolve(true));
      }
      const { tween: tween3 } = currentItem;
      const currentHeight = outerHeight(target);
      await tween3.goFromTo(
        { val: currentHeight },
        { val: 0 },
        { duration: 500 }
      );
    };
    const down = async (target) => {
      if (!isNode2(target)) {
        return new Promise((resolve) => resolve(true));
      }
      const currentItem = slideItems.get(target);
      if (!currentItem) {
        console.warn("slide element not exist in slide store");
        return new Promise((resolve) => resolve(true));
      }
      const { tween: tween3 } = currentItem;
      const { val: currentHeight } = tween3.get();
      target.style.height = `auto`;
      const height = outerHeight(target);
      target.style.height = `${currentHeight}px`;
      await tween3.goTo({ val: height }, { duration: 500 });
      mobCore.useNextTick(() => {
        target.style.height = `auto`;
      });
    };
    return { subscribe, reset, up, down };
  })();

  // src/js/mobMotion/plugin/horizontalScroller/js/horizontalScrollerConstant.js
  var horizontalScrollerContstant = {
    END: "END",
    START: "START",
    CENTER: "CENTER"
  };

  // src/js/mobMotion/plugin/horizontalScroller/js/horizontalScrollerCss.js
  var getAlign = (columnAlign) => {
    switch (columnAlign) {
      case horizontalScrollerContstant.END: {
        return "align-items:flex-end;";
      }
      case horizontalScrollerContstant.CENTER: {
        return "align-items:center;";
      }
      default: {
        return "align-items:flex-start;";
      }
    }
  };
  var horizontalScrollerCss = ({
    mainContainer,
    queryType,
    breakpoint,
    container,
    trigger,
    row,
    column,
    shadow,
    useSticky,
    columnHeight,
    columnWidth,
    columnAlign
  }) => {
    const media = mq.getBreackpoint(breakpoint);
    const userSelect = `user-select:none`;
    const triggerPosition = useSticky ? "relative" : "absolute";
    const rowSticky = useSticky ? "position:sticky;top:0;" : "";
    const align = getAlign(columnAlign);
    const width = columnWidth ? `width:${columnWidth}vw;` : "";
    const css = `
      @media (${queryType}-width:${media}px){${container}{position:relative;${userSelect}}}@media (${queryType}-width:${media}px){${trigger}{z-index:10;position:${triggerPosition};pointer-events:none;overflow:hidden;top:0;left:0;right:0}}@media (${queryType}-width:${media}px){${row}{--sectionheight:${columnHeight}vh}}@media (${queryType}-width:${media}px){${row}{display:flex;height:100vh;${rowSticky}${align}}}@media (${queryType}-width:${media}px){${column}{height:var(--sectionheight);flex:0 0 auto;${width}}}.${shadow}{display:none}@media (${queryType}-width:${media}px){.${shadow}{width:100%;display:block;pointer-events:none}}.${shadow}{display:none}@media (${queryType}-width:${media}px){.${shadow}{pointer-events:none;display:block;position:absolute;left:0;right:0}.${shadow}--end,.${shadow}--in-center,.${shadow}--left,.${shadow}--out-center{opacity:0;border:1px red dashed;width:25%}.${shadow}--end.debug,.${shadow}--in-center.debug,.${shadow}--left.debug,.${shadow}--out-center.debug{opacity:1}.${shadow}--in-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${shadow}--out-center{position:absolute;top:0;right:0;padding:0 40px;text-align:center}.${shadow}--left{position:absolute;top:0;left:50%;transform:translateX(-50%);padding:0 40px;text-align:center}.${shadow}--end{position:absolute;top:0;left:0;padding-left:40px}}`;
    const styleDiv = document.createElement("div");
    styleDiv.classList.add("scroller-style");
    const style = document.createElement("style");
    style.append(document.createTextNode(css));
    styleDiv.append(style);
    mainContainer.prepend(styleDiv);
  };

  // src/js/mobMotion/plugin/horizontalScroller/js/horizontalScroller.js
  var HorizontalScroller = class {
    /**
     * @param  { horizontalScrollerConstructorType } data
    *
    * @description
    *
    * Create new HorizontalScroller instance.
    *
    * Special attributes to handle shadow elements:
    * Apply the following data-attributes to any element
    *
    * `data-shadow="<String>"`
    * Create a vertical shadow element with a custom className.
    *
    * `data-debug`
    * Makes the shadow element visible
    *
    * Available methods:
    * myHorizontalScroller.init();
    * myHorizontalScroller.refresh();
    * myHorizontalScroller.destroy();
    *
    * @example
    *
    ```html
        HTML:
        <div class="root">
            <div class="container">
                <div class="row">
                    <section class="column" data-shadow="section1">
                        <h1>title</h1>
                    </section>
                    <section class="column">
                        <h1 data-shadow="title" data-debug>title</h1>
                    </section>
                    ...
                </div>
                <div class="trigger"></div>
            </div>
        </div>
    ```
    ```javascript
        JS:
        const myHorizontalScroller = new HorizontalScroller({
            root: '.root',
            container: '.container',
            row: '.row',
            column: '.column',
            trigger: '.trigger',
            shadowClass: '.myShadowClass,
            useThrottle: [ Boolean ],
            useSticky: [ Boolean ],
            animatePin: [ Boolean ],
            forceTranspond: [ Boolean ],
            useWillChange: [ Boolean ],
            animateAtStart: [ Boolean ],
            queryType: [ String ],
            breakpoint: [ String ],
            ease: [ Boolean ],
            easeType: [ String ],
            addCss: [ Boolean ],
            columnHeight: [ Number ],
            columnWidth: [ Number ],
            columnAlign: [ String ],
            children: [child1,child2, ...],
            onEnter: () => {
                ...
            },
            onEnterBack: () => {
                ...
            },
            onLeave: () => {
                ...
            },
            onLeaveBack: () => {
                ...
            },
            afterInit: () => {
                ...
            },
            onTick: ({ value, parentIsMoving, percent }) => {
                ...
            },
            afterRefresh: () => {
                ...
            },
            afterDestroy: () => {
                ...
            },
        });
    ```
    *
     */
    constructor(data2 = {}) {
      this.propsisValid = true;
      this.triggerTopPosition = 0;
      this.touchActive = false;
      this.lastTouchValueX = 0;
      this.dragSecureAreaBottom = 100;
      this.dragSecureAreaTop = 100;
      this.shouldDragValue = false;
      this.button = [];
      this.scrollValue = 0;
      this.unsubscribeScroll = () => {
      };
      this.useDrag = valueIsBooleanAndReturnDefault(
        data2?.useDrag,
        "HorizontalScroller: useDrag",
        false
      );
      this.threshold = valueIsNumberAndReturnDefault(
        data2?.threshold,
        "HorizontalScroller: threshold",
        30
      );
      this.useWillChange = valueIsBooleanAndReturnDefault(
        data2?.useWillChange,
        "HorizontalScroller: useWillChange",
        false
      );
      this.breakpoint = breakpointIsValid(
        data2?.breakpoint,
        "breakpoint",
        "horizontalScroller"
      );
      this.queryType = breakpointTypeIsValid(
        data2?.queryType,
        "queryType",
        "horizontalScroller"
      );
      this.forceTranspond = valueIsBooleanAndReturnDefault(
        data2?.forceTranspond,
        "HorizontalScroller: forceTranspond",
        false
      );
      this.addCss = valueIsBooleanAndReturnDefault(
        data2?.addCss,
        "HorizontalScroller: addCss",
        true
      );
      this.animateAtStart = valueIsBooleanAndReturnDefault(
        data2?.animateAtStart,
        "HorizontalScroller: animateAtStart",
        false
      );
      this.ease = valueIsBooleanAndReturnDefault(
        data2?.ease,
        "HorizontalScroller: ease",
        false
      );
      this.easeType = genericEaseTypeIsValid(
        data2?.easeType,
        "HorizontalScroller"
      );
      this.useSticky = valueIsBooleanAndReturnDefault(
        data2?.useSticky,
        "HorizontalScroller: useSticky",
        false
      );
      this.animatePin = valueIsBooleanAndReturnDefault(
        data2?.animatePin,
        "HorizontalScroller: animatePin",
        false
      );
      this.reverse = valueIsBooleanAndReturnDefault(
        data2?.reverse,
        "HorizontalScroller: reverse",
        false
      );
      this.useThrottle = valueIsBooleanAndReturnDefault(
        data2?.useThrottle,
        "HorizontalScroller: useThrottle",
        false
      );
      this.columnHeight = valueIsNumberAndReturnDefault(
        data2?.columnHeight,
        "HorizontalScroller: columnHeight",
        100
      );
      this.columnWidth = valueIsNumberAndReturnDefault(
        data2?.columnWidth,
        "HorizontalScroller: columnWidth",
        null
      );
      this.columnAlign = data2?.columnAlign ? data2.columnAlign.toUpperCase() : horizontalScrollerContstant.START;
      this.onEnter = valueIsFunctionAndReturnDefault(
        data2?.onEnter,
        "HorizontalScroller: onEnter",
        NOOP
      );
      this.onEnterBack = valueIsFunctionAndReturnDefault(
        data2?.onEnterBack,
        "HorizontalScroller: onEnterBack",
        NOOP
      );
      this.onLeave = valueIsFunctionAndReturnDefault(
        data2?.onLeave,
        "HorizontalScroller: onLeave",
        NOOP
      );
      this.onLeaveBack = valueIsFunctionAndReturnDefault(
        data2?.onLeaveBack,
        "HorizontalScroller: onLeaveBack",
        NOOP
      );
      this.afterInit = valueIsFunctionAndReturnDefault(
        data2?.afterInit,
        "HorizontalScroller: afterInit",
        NOOP
      );
      this.afterRefresh = valueIsFunctionAndReturnDefault(
        data2?.afterRefresh,
        "HorizontalScroller: afterRefresh",
        NOOP
      );
      this.afterDestroy = valueIsFunctionAndReturnDefault(
        data2?.afterDestroy,
        "HorizontalScroller: afterDestroy",
        NOOP
      );
      this.onTick = valueIsFunctionAndReturnDefault(
        data2?.onTick,
        "HorizontalScroller: onTick",
        null
      );
      this.mainContainer = mobCore.checkType(String, data2.root) ? document.querySelector(data2.root) : data2.root;
      if (!this.mainContainer) {
        this.propsisValid = false;
        console.warn("horizontal custom: root node not found");
        return;
      }
      this.container = data2?.container;
      const scrollerTester = this.mainContainer.querySelector(this.container);
      if (!scrollerTester) {
        this.propsisValid = false;
        console.warn("horizontal custom: container node not found");
        return;
      }
      this.trigger = this.mainContainer.querySelector(data2.trigger);
      if (!this.trigger) {
        this.propsisValid = false;
        console.warn("horizontal custom: trigger node not found");
        return;
      }
      this.row = this.mainContainer.querySelector(data2.row);
      if (!this.row) {
        this.propsisValid = false;
        console.warn("horizontal custom: row node not found");
        return;
      }
      this.column = this.mainContainer.querySelectorAll(data2.column);
      if (this.column.length === 0) {
        this.propsisValid = false;
        console.warn("horizontal custom: column nodeList not found");
        return;
      }
      this.shadow = this.mainContainer.querySelectorAll("[data-shadow]");
      const originalShadowClass = data2?.shadowClass || "shadow";
      this.shadowMainClassTransition = originalShadowClass.replace(".", "");
      this.button = this.row.querySelectorAll("a, button");
      this.moduleisActive = false;
      this.horizontalWidth = 0;
      this.scrollTriggerInstance = {};
      this.percentRange = 0;
      this.children = data2?.children || [];
      this.children.forEach((element) => {
        element.setScroller(this.row);
        element.setDirection("horizontal");
        element.setBreakPoint(this.breakpoint);
        element.setQueryType(this.queryType);
        element.init();
      });
      if (this.addCss)
        horizontalScrollerCss({
          mainContainer: this.mainContainer,
          queryType: this.queryType,
          breakpoint: this.breakpoint,
          container: this.container,
          trigger: data2?.trigger ?? "trigger",
          row: data2.row,
          column: data2.column,
          shadow: this.shadowMainClassTransition,
          useSticky: this.useSticky,
          columnHeight: this.columnHeight,
          columnWidth: this.columnWidth,
          columnAlign: this.columnAlign
        });
      this.onMouseMove = (e) => {
        if (!this.touchActive) return;
        const { movementX } = e;
        const value = this.reverse ? movementX : -movementX;
        this.onDrag(value);
        this.touchStart = false;
      };
      this.onMouseDown = () => {
        if (!mq[this.queryType](this.breakpoint)) return;
        if (this.shouldDragValue) this.row.style.cursor = "move";
        this.touchActive = true;
        this.firstTouchValue = this.scrollValue;
      };
      this.onMouseUp = () => {
        this.touchActive = false;
        mobCore.useFrame(() => this.row.style.cursor = "");
      };
      this.onMouseLeave = () => {
        this.touchActive = false;
        mobCore.useFrame(() => this.row.style.cursor = "");
      };
      this.onTouchStart = (e) => {
        if (!mq[this.queryType](this.breakpoint)) return;
        this.lastTouchValueX = -e.touches[0].clientX;
        this.touchActive = true;
        this.firstTouchValue = this.scrollValue;
      };
      this.onTouchEnd = () => {
        this.touchActive = false;
      };
      this.onTouchMove = (e) => {
        const touchValueX = -e.touches[0].clientX;
        const gapX = this.reverse ? -touchValueX + this.lastTouchValueX : touchValueX - this.lastTouchValueX;
        this.onDrag(gapX);
        this.lastTouchValueX = touchValueX;
        if (this.shouldDragValue && e.cancelable) e.preventDefault();
      };
      this.preventFireClick = (e) => {
        if (Math.abs(this.scrollValue - this.firstTouchValue) > this.threshold)
          e.preventDefault();
      };
    }
    /**
     * @description
     * Initialize insatance
     *
     * @example
     * myInstance.init()
     */
    init() {
      if (!this.propsisValid) return;
      pipe(
        this.getWidth.bind(this),
        this.setDimension.bind(this),
        this.createShadow.bind(this),
        this.updateShadow.bind(this)
      )().then(() => {
        this.initScroller();
        if (this.useDrag) this.addDragListener();
        mobCore.useResize(
          ({ horizontalResize }) => this.onResize(horizontalResize)
        );
        mobCore.useFrameIndex(() => {
          mobCore.useNextTick(() => {
            this.afterInit?.();
            this.children.forEach((element) => {
              element.refresh();
            });
          });
        }, 3);
      });
    }
    /**
     * @private
     */
    setLinkAttribute() {
      [...this.button].forEach(
        (item) => item.setAttribute("draggable", false)
      );
    }
    /**
     * @private
     */
    removeLinkAttribute() {
      [...this.button].forEach((item) => item.removeAttribute("draggable"));
    }
    /**
     * @private
     */
    onDrag(value) {
      if (!this.shouldDragValue) return;
      mobCore.useFrame(
        () => window.scrollBy({ top: value, left: 0, behavior: "instant" })
      );
    }
    shouldDrag() {
      const documentScrollTop = window.scrollY;
      this.shouldDragValue = this.triggerTopPosition - this.dragSecureAreaTop < documentScrollTop && this.triggerTopPosition + this.dragSecureAreaBottom + this.horizontalWidth > documentScrollTop + window.innerHeight;
    }
    addDragListener() {
      this.unsubscribeScroll = mobCore.useScroll(() => this.shouldDrag());
      this.shouldDrag();
      this.row.addEventListener("click", this.preventFireClick, {
        passive: false
      });
      this.row.addEventListener("mousedown", this.onMouseDown, {
        passive: true
      });
      this.row.addEventListener("mouseup", this.onMouseUp, {
        passive: true
      });
      this.row.addEventListener("mouseleave", this.onMouseLeave, {
        passive: true
      });
      this.row.addEventListener("touchstart", this.onTouchStart, {
        passive: true
      });
      this.row.addEventListener("touchend", this.onTouchEnd, {
        passive: true
      });
      this.row.addEventListener("mousemove", this.onMouseMove, {
        passive: true
      });
      this.row.addEventListener("touchmove", this.onTouchMove, {
        passive: true
      });
    }
    removeDragListener() {
      this.unsubscribeScroll();
      this.row.removeEventListener("click", this.preventFireClick);
      this.row.removeEventListener("mousedown", this.onMouseDown);
      this.row.removeEventListener("mouseup", this.onMouseUp);
      this.row.removeEventListener("mouseleave", this.onMouseLeave);
      this.row.removeEventListener("touchstart", this.onTouchStart);
      this.row.removeEventListener("touchend", this.onTouchEnd);
      this.row.removeEventListener("mousemove", this.onMouseMove);
      this.row.removeEventListener("touchmove", this.onTouchMove);
    }
    /**
     * @private
     */
    setDimension() {
      if (!this.trigger || !this.mainContainer || !this.row) {
        return new Promise((resolve) => {
          resolve();
        });
      }
      return new Promise((resolve) => {
        mobCore.useFrame(() => {
          const width = this.horizontalWidth;
          this.percentRange = 100 * (width - window.innerWidth) / width;
          if (width > 0) {
            this.trigger.style.height = `${width}px`;
            this.mainContainer.style.height = `${width}px`;
            this.row.style.width = `${width}px`;
          }
          resolve();
        });
      });
    }
    /**
     * @private
     */
    getWidth() {
      return new Promise((resolve) => {
        mobCore.useFrame(() => {
          if (!mq[this.queryType](this.breakpoint)) {
            resolve();
            return;
          }
          this.horizontalWidth = [...this.column].map((item) => {
            return outerWidth(item);
          }).reduce((a, b) => a + b, 0);
          resolve();
        });
      });
    }
    /**
     * @private
     */
    createShadow() {
      if (!this.trigger) {
        return new Promise((resolve) => {
          resolve();
        });
      }
      return new Promise((resolve) => {
        mobCore.useFrame(() => {
          if (!mq[this.queryType](this.breakpoint)) {
            resolve();
            return;
          }
          const shadowsTransition = [...this.shadow].map((item) => {
            const shadowClass = item.dataset.shadow;
            const debug = item.dataset.debug ? "debug" : "";
            const left = item.dataset.debug ? `left left : ${shadowClass}` : "";
            const inCenter = item.dataset.debug ? `in center : ${shadowClass}` : "";
            const outCenter = item.dataset.debug ? `center out : ${shadowClass}` : "";
            const end = item.dataset.debug ? `in out : ${shadowClass}` : "";
            return `
                            <div class='${this.shadowMainClassTransition} ${this.shadowMainClassTransition}--${shadowClass}' data-shadow='${shadowClass}'>
                                <span class="${this.shadowMainClassTransition}--in-center ${debug}">
                                    ${inCenter}
                                </span>
                                <span class="${this.shadowMainClassTransition}--out-center ${debug}">
                                    ${outCenter}
                                </span>
                                <span class="${this.shadowMainClassTransition}--left ${debug}">
                                    ${left}
                                </span>
                                <span class="${this.shadowMainClassTransition}--end ${debug}">
                                    ${end}
                                </span>
                            </div>`;
          }).join("");
          this.trigger.innerHTML = shadowsTransition;
          resolve();
        });
      });
    }
    /**
     * @private
     */
    removeShadow() {
      if (this.trigger) this.trigger.innerHTML = "";
    }
    /**
     * @private
     */
    updateShadow() {
      return new Promise((resolve) => {
        if (!mq[this.queryType](this.breakpoint)) {
          resolve();
          return;
        }
        mobCore.useFrame(() => {
          [...this.shadow].forEach((item) => {
            const percentrange = this.percentRange / 100;
            const shadowData = item.dataset.shadow;
            const width = outerWidth(item);
            const height = outerHeight(this.row);
            const { x } = getTranslateValues(this.row);
            const offset2 = this.reverse ? this.horizontalWidth - (item.getBoundingClientRect().right - x) : item.getBoundingClientRect().left - x;
            const screenRatio = window.innerWidth / window.innerHeight;
            const windowDifference = window.innerWidth - window.innerHeight;
            const widthAmount = offset2 / screenRatio;
            const diffAmount = offset2 - offset2 / screenRatio;
            const shadowTransitionEl = this.mainContainer.querySelector(
              `.${this.shadowMainClassTransition}[data-shadow="${shadowData}"]`
            );
            const inCenterMarker = shadowTransitionEl.querySelector(
              `.${this.shadowMainClassTransition}--in-center`
            );
            const outCenterMarker = shadowTransitionEl.querySelector(
              `.${this.shadowMainClassTransition}--out-center`
            );
            const leftMarker = shadowTransitionEl.querySelector(
              `.${this.shadowMainClassTransition}--left`
            );
            const endMarker = shadowTransitionEl.querySelector(
              `.${this.shadowMainClassTransition}--end`
            );
            const plusFull = window.innerWidth > window.innerHeight ? window.innerHeight : 0;
            const plusHalf = window.innerWidth > window.innerHeight ? window.innerHeight / 2 : 0;
            const start = (() => {
              switch (offset2) {
                case 0: {
                  return 0;
                }
                default: {
                  return widthAmount + diffAmount / percentrange - windowDifference / percentrange;
                }
              }
            })();
            const left = (() => {
              const val2 = window.innerWidth > window.innerHeight ? windowDifference / percentrange : windowDifference / percentrange + window.innerWidth / screenRatio;
              switch (offset2) {
                case 0: {
                  return 0;
                }
                default: {
                  return val2;
                }
              }
            })();
            const end = (() => {
              const val1 = width / screenRatio;
              const val2 = (width - width / screenRatio) / percentrange;
              return val1 + val2 + left;
            })();
            const inCenter = (() => {
              return end / 2 + plusHalf;
            })();
            if (this.useSticky) {
              this.trigger.style["margin-top"] = `-${height}px`;
            }
            shadowTransitionEl.style.top = `${start}px`;
            inCenterMarker.style.height = `${inCenter}px`;
            outCenterMarker.style.height = `${inCenter}px`;
            outCenterMarker.style.top = `${inCenter}px`;
            leftMarker.style.height = `${left}px`;
            endMarker.style.height = `${end + plusFull}px`;
            shadowTransitionEl.style.height = `${left}px`;
          });
          resolve();
        });
      });
    }
    /**
     * @private
     */
    initScroller() {
      if (!this.trigger || !mq[this.queryType](this.breakpoint)) return;
      const scrollTriggerInstance = new ParallaxClass({
        type: "scrolltrigger",
        item: this.row,
        useWillChange: this.useWillChange,
        trigger: this.trigger,
        propierties: "x",
        breakpoint: "xSmall",
        pin: !this.useSticky,
        animatePin: this.animatePin,
        ease: this.ease,
        forceTranspond: this.forceTranspond,
        useThrottle: this.useThrottle,
        easeType: this.easeType,
        springConfig: "scroller",
        animateAtStart: this.animateAtStart,
        fromTo: this.reverse,
        dynamicRange: () => {
          return -(this.horizontalWidth - window.innerWidth);
        },
        dynamicStart: {
          position: "bottom",
          value: () => {
            return window.innerHeight;
          }
        },
        dynamicEnd: {
          position: "bottom",
          value: () => {
            return this.horizontalWidth;
          }
        },
        onTick: ({ value, parentIsMoving }) => {
          const percent = Math.abs(
            -Number.parseInt(
              value * 100 / (this.horizontalWidth - window.innerWidth)
            )
          );
          this.scrollValue = value;
          if (this.onTick)
            this.onTick({
              value,
              parentIsMoving,
              percent: this.reverse ? 100 - percent : percent
            });
          this.children.forEach((element) => {
            element.move({ value, parentIsMoving });
          });
        },
        onEnter: this.onEnter,
        onEnterBack: this.onEnterBack,
        onLeave: this.onLeave,
        onLeaveBack: this.onLeaveBack
      });
      scrollTriggerInstance.init();
      this.moduleisActive = true;
      this.scrollTriggerInstance = scrollTriggerInstance;
      this.triggerTopPosition = offset(this.trigger).top;
      this.setLinkAttribute();
    }
    /**
     * @private
     */
    createScroller() {
      pipe(
        this.getWidth.bind(this),
        this.setDimension.bind(this),
        this.createShadow.bind(this),
        this.updateShadow.bind(this)
      )().then(() => {
        this.initScroller();
        this.refreshChildren();
      });
    }
    /**
     * @private
     */
    refreshChildren() {
      mobCore.useFrameIndex(() => {
        mobCore.useNextTick(() => {
          this.afterRefresh?.();
          this.children.forEach((element) => {
            element?.refresh?.();
          });
        });
      }, 3);
    }
    /**
     * @description
     * Refresh instance
     *
     * @example
     * myInstance.refresh()
     */
    refresh() {
      if (!this.moduleisActive || !mq[this.queryType](this.breakpoint))
        return;
      return new Promise((resolve) => {
        pipe(
          this.getWidth.bind(this),
          this.setDimension.bind(this),
          this.updateShadow.bind(this)
        )().then(() => {
          this.scrollTriggerInstance?.stopMotion?.();
          this.triggerTopPosition = offset(this.trigger).top;
          if (this.moduleisActive) {
            this.scrollTriggerInstance?.refresh?.();
            this.refreshChildren();
          }
          resolve();
        });
      });
    }
    /**
     * @private
     */
    killScroller({ destroyAll = false }) {
      if (this.moduleisActive || destroyAll) {
        this.scrollTriggerInstance?.destroy?.();
        this.scrollTriggerInstance = null;
        if (this.trigger) this.trigger.style.height = "";
        if (this.mainContainer) this.mainContainer.style.height = "";
        if (this.trigger) this.trigger.style.marginTop = "";
        this.removeShadow();
        this.removeLinkAttribute();
        this.moduleisActive = false;
        mobCore.useFrameIndex(() => {
          this.row.style = "";
          if (destroyAll && this.mainContainer) {
            if (this.useDrag) this.removeDragListener();
            const styleDiv = this.mainContainer.querySelector(".scroller-style");
            if (styleDiv) styleDiv.remove();
            this.mainContainer = null;
            this.trigger = null;
            this.row = [];
            this.column = [];
            this.shadow = [];
            this.afterInit = null;
            this.afterRefresh = null;
            this.onTick = null;
            this.onEnter = null;
            this.onEnterBack = null;
            this.onLeave = null;
            this.onLeaveBack = null;
            this.scrollTriggerInstance = null;
            this.moduleisActive = false;
            this.button = [];
            this.mainContainer = null;
            this.container = null;
            this.trigger = null;
            this.row = null;
            mobCore.useNextTick(() => {
              this.afterDestroy?.();
              this.afterDestroy = null;
              this.children.forEach((element) => {
                element?.destroy?.();
                element = null;
              });
              this.children = [];
            });
          }
        }, 3);
      }
    }
    /**
     * @private
     */
    onResize(horizontalResize) {
      if (this.moduleisActive && mq[this.queryType](this.breakpoint)) {
        if (horizontalResize) this.refresh();
      } else if (!this.moduleisActive && mq[this.queryType](this.breakpoint)) {
        this.createScroller();
      } else if (this.moduleisActive && !mq[this.queryType](this.breakpoint)) {
        this.killScroller({ destroyAll: false });
      }
    }
    /**
     * @description
     * Destroy instance
     *
     * @example
     * myInstance.destroy()
     */
    destroy() {
      this.killScroller({ destroyAll: true });
    }
  };

  // src/js/component/common/typography/AnchorButton/AnchorButton.js
  var AnchorButtonFn = ({ html, getState, delegateEvents }) => {
    const { content, anchor } = getState();
    return html`<div>
        <button
            type="button"
            class="anchor-button"
            ${delegateEvents({
      click: () => {
        const target = document.querySelector(anchor);
        if (!target) return;
        const offsetTop = offset(target).top - 50;
        bodyScroll.to(offsetTop);
      }
    })}
        >
            ${content}
        </button>
    </div>`;
  };

  // src/js/component/common/typography/AnchorButton/definition.js
  var AnchorButton = createComponent({
    name: "anchor-button",
    component: AnchorButtonFn,
    exportState: ["anchor", "content"],
    state: {
      anchor: () => ({
        value: "",
        type: String
      }),
      content: () => ({
        value: "",
        type: String
      })
    }
  });

  // src/js/component/common/typography/list/list.js
  var getList = ({ items }) => {
    return items.map((item) => renderHtml` <li>${item}</li> `).join("");
  };
  var ListFn = ({ html, getState }) => {
    const { style, color, items, dots } = getState();
    const colorClass = `is-${color}`;
    const dotsClass = dots ? "" : `hide-dots`;
    return html`<ul class="ul ul--${style} ${colorClass} ${dotsClass}">
        ${getList({ items })}
    </ul>`;
  };

  // src/js/component/common/typography/list/definition.js
  var List = createComponent({
    name: "mob-list",
    component: ListFn,
    exportState: ["style", "color", "items", "dots"],
    state: {
      style: () => ({
        value: "medium",
        type: String,
        validate: (val2) => ["small", "medium", "big"].includes(val2),
        strict: true
      }),
      dots: () => ({
        value: true,
        type: Boolean
      }),
      color: () => ({
        value: "black",
        type: String,
        validate: (val2) => {
          return ["white", "black", "grey", "hightlight"].includes(val2);
        }
      }),
      items: () => ({
        value: [],
        type: Array
      })
    }
  });

  // src/js/component/common/typography/paragraph/paragraph.js
  var ParagraphFn = ({ html, getState }) => {
    const { style, color } = getState();
    const colorClass = `is-${color}`;
    return html`<p class="p p--${style} ${colorClass}">
        <mobjs-slot></mobjs-slot>
    </p>`;
  };

  // src/js/component/common/typography/paragraph/definition.js
  var Paragraph = createComponent({
    name: "mob-paragraph",
    component: ParagraphFn,
    exportState: ["style", "color"],
    state: {
      style: () => ({
        value: "medium",
        type: String,
        validate: (val2) => ["small", "medium", "big"].includes(val2),
        strict: true
      }),
      color: () => ({
        value: "black",
        type: String,
        validate: (val2) => {
          return ["white", "grey", "black", "highlight"].includes(val2);
        }
      })
    }
  });

  // src/js/component/common/typography/titles/title.js
  var TitleFn = ({ html, getState }) => {
    const { tag, color, isBold } = getState();
    const colorClass = `is-${color}`;
    const boldClass = isBold ? `is-bold` : "";
    return html`<${tag} class="mob-title ${colorClass} ${boldClass}">
        <mobjs-slot></mobjs-slot>
    </${tag}>`;
  };

  // src/js/component/common/typography/titles/definition.js
  var Title = createComponent({
    name: "mob-title",
    component: TitleFn,
    exportState: ["tag", "color", "isBold"],
    state: {
      tag: () => ({
        value: "h1",
        type: String
      }),
      color: () => ({
        value: "black",
        type: String,
        validate: (val2) => {
          return ["white", "hightlight", "black"].includes(val2);
        }
      }),
      isBold: () => ({
        value: false,
        type: Boolean
      })
    }
  });

  // src/js/component/common/htmlContent/htmlContent.js
  var getComponents = ({ data: data2, staticProps: staticProps2, awaitLoadSnippet }) => {
    return data2.map((item) => {
      const { component, props, content } = item;
      return renderHtml`
                <${component} ${staticProps2({ ...props, awaitLoad: awaitLoadSnippet })}>
                    ${content ?? ""}
                </${component}>
            `;
    }).join("");
  };
  var getData2 = async ({ source, data: data2 }) => {
    if (data2 && data2.length > 0) return data2;
    const { success, data: currentData } = await loadJsonContent({ source });
    if (!success) return [];
    return currentData.data;
  };
  var getLoader = ({ data: data2, bindProps }) => {
    if (data2 && data2.length > 0) return "";
    return renderHtml`
        <mob-loader
            ${bindProps({
      bind: ["contentIsLoaded"],
      props: ({ contentIsLoaded }) => {
        return { shouldRemove: contentIsLoaded };
      }
    })}
        ></mob-loader>
    `;
  };
  var HtmlContentFn = async ({
    html,
    getState,
    setState,
    staticProps: staticProps2,
    bindProps,
    onMount
  }) => {
    const { source, data: data2 } = getState();
    const currentData = await getData2({ source, data: data2 });
    const { useMinHeight, useMaxWidth, awaitLoadSnippet } = getState();
    const useMinHeightClass = useMinHeight ? "is-min-100" : "";
    const useMaxWidthClass = useMaxWidth ? "is-max-width" : "";
    onMount(async () => {
      setState("contentIsLoaded", true);
      return () => {
      };
    });
    return html`
        <section class="html-content ${useMinHeightClass} ${useMaxWidthClass}">
            ${getLoader({ data: data2, bindProps })}
            ${getComponents({
      data: currentData,
      staticProps: staticProps2,
      awaitLoadSnippet
    })}
        </section>
    `;
  };

  // src/js/component/common/htmlContent/definition.js
  var HtmlContent = createComponent({
    name: "html-content",
    component: HtmlContentFn,
    exportState: [
      "source",
      "useMinHeight",
      "useMaxWidth",
      "data",
      "awaitLoadSnippet"
    ],
    state: {
      source: () => ({
        value: "",
        type: String
      }),
      data: () => ({
        value: [],
        type: Array
      }),
      contentIsLoaded: () => ({
        value: false,
        type: Boolean
      }),
      useMinHeight: () => ({
        value: false,
        type: Boolean
      }),
      useMaxWidth: () => ({
        value: false,
        type: Boolean
      }),
      awaitLoadSnippet: () => ({
        value: false,
        type: Boolean
      })
    },
    child: [
      List,
      Paragraph,
      Title,
      Loader,
      Snippet,
      SpacerAnchor,
      AnchorButton
    ]
  });

  // src/js/component/common/codeOverlay/animation/overlayScroller.js
  var overlayScroller = ({ screen, scroller: scroller2, scrollbar }) => {
    const instance = new SmoothScroller({
      screen,
      scroller: scroller2,
      direction: "vertical",
      drag: true,
      scopedEvent: true,
      breakpoint: "xSmall",
      onTick: ({ percent }) => {
        scrollbar.value = percent;
      }
    });
    instance.init();
    return {
      updateScroller: () => {
        const scrollerHeight = outerHeight(scroller2);
        const screenHeight = outerHeight(screen);
        const scrollBarHeight = outerWidth(scrollbar);
        const thumbWidth = screenHeight / scrollerHeight * scrollBarHeight;
        scrollbar.style.setProperty("--thumb-width", `${thumbWidth}px`);
        instance.refresh();
      },
      move: (val2) => instance.move(val2),
      goToTop: () => instance.set(0)
    };
  };

  // src/svg/icon-copy.svg
  var icon_copy_default = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Generator: Gravit.io --><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 466.726 466.722" width="466.726pt" height="466.722pt"><defs><clipPath id="_clipPath_NGPjDQvH1wIrClzh8RPwl8j4Z0sPfcPA"><rect width="466.726" height="466.722"/></clipPath></defs><g clip-path="url(#_clipPath_NGPjDQvH1wIrClzh8RPwl8j4Z0sPfcPA)"><path d=" M 64.164 0 C 28.918 0 0 28.918 0 64.164 L 0 306.614 C 0 341.86 28.918 370.778 64.164 370.778 L 306.614 370.778 C 341.86 370.778 370.778 341.86 370.778 306.614 L 370.778 64.164 C 370.778 28.918 341.86 0 306.614 0 L 64.164 0 Z  M 64.164 34.969 L 306.614 34.969 C 323.075 34.969 335.723 47.703 335.723 64.164 L 335.723 306.614 C 335.723 323.075 323.075 335.723 306.614 335.723 L 64.164 335.723 C 47.703 335.723 34.969 323.075 34.969 306.614 L 34.969 64.164 C 34.969 47.703 47.703 34.969 64.164 34.969 Z " fill-rule="evenodd" /><path d=" M 353.214 95.945 C 348.577 95.949 344.132 97.793 340.855 101.07 C 337.578 104.347 335.734 108.793 335.73 113.429 C 335.734 118.062 337.578 122.507 340.855 125.784 C 344.132 129.061 348.578 130.905 353.214 130.913 L 402.566 130.913 C 418.882 130.913 431.675 143.792 431.675 160.108 L 431.675 402.558 C 431.675 418.874 418.882 431.667 402.566 431.667 L 160.116 431.667 C 143.8 431.667 130.921 418.874 130.921 402.558 L 130.917 353.292 C 130.937 348.643 129.105 344.175 125.823 340.878 C 122.542 337.581 118.085 335.726 113.432 335.722 C 108.78 335.726 104.323 337.581 101.045 340.878 C 97.764 344.175 95.928 348.643 95.948 353.292 L 95.948 402.558 C 95.948 437.792 124.882 466.722 160.112 466.722 L 402.562 466.722 C 437.796 466.722 466.726 437.788 466.726 402.558 L 466.726 160.108 C 466.726 124.874 437.792 95.944 402.562 95.944 L 353.214 95.945 Z " /></g></svg>\n';

  // src/js/component/common/codeOverlay/codeOverlay.js
  var copyToClipboard = ({ getState }) => {
    const { rawContent } = getState();
    navigator.clipboard.writeText(rawContent);
  };
  function getRepeaterCard({
    sync,
    bindProps,
    setState,
    delegateEvents,
    getState
  }) {
    return renderHtml`
        <code-overlay-button
            ${sync()}
            ${bindProps({
      bind: ["activeContent"],
      props: ({ activeContent, urls }, index) => {
        const { label, source } = urls[index];
        return {
          key: label,
          disable: !source || source.length === 0,
          selected: label === activeContent
        };
      }
    })}
            ${delegateEvents({
      click: (_e, index) => {
        const { urls } = getState();
        const { label } = urls[index];
        setState("activeContent", label);
      }
    })}
        >
        </code-overlay-button>
    `;
  }
  var printContent = async ({
    setState,
    getState,
    codeEl,
    currentKey,
    updateScroller,
    goToTop,
    staticProps: staticProps2,
    renderComponent
  }) => {
    const { urls } = getState();
    const currentItem = urls.find(({ label }) => {
      return label === currentKey;
    });
    const source = currentItem?.source;
    if (!source?.length) return;
    const htmlContent = renderHtml`<html-content
        ${staticProps2({ source, useMinHeight: true, awaitLoadSnippet: true })}
    ></html-content>`;
    await renderComponent({
      attachTo: codeEl,
      component: htmlContent
    });
    setState("rawContent", codeEl?.textContent ?? "");
    updateScroller();
    goToTop();
  };
  var CodeOverlayFn = ({
    onMount,
    setState,
    getState,
    repeat,
    html,
    bindProps,
    delegateEvents,
    watch,
    renderComponent,
    removeDOM,
    staticProps: staticProps2,
    setRef,
    getRef
  }) => {
    onMount(({ element }) => {
      const { screenEl, scrollerEl, codeEl, scrollbar } = getRef();
      const { updateScroller, move, goToTop } = overlayScroller({
        screen: screenEl,
        scroller: scrollerEl,
        scrollbar
      });
      scrollbar.addEventListener("input", () => {
        move(scrollbar.value);
      });
      mainStore.watch(MAIN_STORE_BEFORE_ROUTE_LEAVES, () => {
        setState("urls", []);
      });
      watch("activeContent", (currentKey) => {
        printContent({
          staticProps: staticProps2,
          setState,
          getState,
          codeEl,
          currentKey,
          updateScroller,
          goToTop,
          renderComponent
        });
      });
      watch("urls", async (urls) => {
        const shouldOpen = urls.length > 0;
        if (shouldOpen) {
          element.classList.add("active");
          document.body.style.overflow = "hidden";
          const firstActiveItem = urls?.[0]?.label;
          if (!firstActiveItem) return;
          setState("activeContent", firstActiveItem);
          return;
        }
        element.classList.remove("active");
        document.body.style.overflow = "";
        setState("activeContent", "");
        removeDOM(codeEl);
        goToTop();
      });
      return () => {
      };
    });
    return html`
        <div class="c-code-overlay js-overlay">
            <span
                class="c-code-overlay__background"
                ${delegateEvents({
      click: () => {
        setState("urls", []);
      }
    })}
            ></span>
            <div class="c-code-overlay__wrap js-overlay-wrap">
                <button
                    type="button"
                    class="c-code-overlay__close"
                    ${delegateEvents({
      click: () => {
        setState("urls", []);
      }
    })}
                ></button>
                <button
                    type="button"
                    class="c-code-overlay__copy"
                    ${delegateEvents({
      click: () => {
        copyToClipboard({ getState });
      }
    })}
                >
                    ${icon_copy_default}
                </button>
                <div class="c-code-overlay__header">
                    ${repeat({
      clean: true,
      bind: "urls",
      render: ({ sync }) => {
        return getRepeaterCard({
          sync,
          bindProps,
          delegateEvents,
          setState,
          getState
        });
      }
    })}
                </div>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${setRef("scrollbar")}
                    class="c-code-overlay__scrollbar"
                />
                <div class="c-code-overlay__content" ${setRef("screenEl")}>
                    <div ${setRef("scrollerEl")}>
                        <div
                            class="c-code-overlay__content__description"
                            ${setRef("codeEl")}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/common/codeOverlay/codeOverlayButton.js
  var CodeOverlayButtonFn = ({ onMount, watchSync, html, getState }) => {
    const { key, disable } = getState();
    onMount(({ element }) => {
      const unwatchSelected = watchSync("selected", (selected) => {
        element.classList.toggle("selected", selected);
      });
      return () => {
        unwatchSelected();
      };
    });
    const isDisable = disable ? "disable" : "";
    return html`
        <button class="c-code-overlay__button ${isDisable}">${key}</button>
    `;
  };

  // src/js/component/common/codeOverlay/definition.js
  var CodeOverlayButton = createComponent({
    name: "code-overlay-button",
    component: CodeOverlayButtonFn,
    exportState: ["key", "selected", "disable"],
    state: {
      key: "",
      selected: () => ({
        value: false,
        type: Boolean
      }),
      disable: () => ({
        value: true,
        type: Boolean
      })
    }
  });
  var CodeOverlay = createComponent({
    name: "code-overlay",
    component: CodeOverlayFn,
    exportState: ["urls", "activeContent"],
    state: {
      urls: () => ({
        value: [],
        type: Array,
        skipEqual: false
      }),
      activeContent: () => ({
        value: "",
        type: String,
        skipEqual: true
      }),
      rawContent: () => ({
        value: "",
        type: String
      })
    },
    child: [CodeOverlayButton, HtmlContent]
  });

  // src/js/component/common/mLogo1/mLogo1.js
  var Mlogo1Fn = ({
    html,
    onMount,
    getState,
    watchSync,
    setRef,
    getRef
  }) => {
    const { svg, active } = getState();
    const activeClass = active ? "active" : "";
    onMount(() => {
      const { logo } = getRef();
      watchSync("active", (isActive) => {
        logo.classList.toggle("active", isActive);
      });
      return () => {
      };
    });
    return html`<div>
        <div class="m-logo-1 ${activeClass}" ${setRef("logo")}>${svg}</div>
    </div>`;
  };

  // src/js/component/common/mLogo1/definition.js
  var MLogo1 = createComponent({
    name: "m-logo-1",
    component: Mlogo1Fn,
    exportState: ["svg", "active"],
    state: {
      svg: () => ({
        value: "",
        type: String
      }),
      active: () => ({
        value: false,
        type: Boolean
      })
    }
  });

  // src/svg/scroll_arrow.svg
  var scroll_arrow_default = '<?xml version="1.0" encoding="UTF-8"?>\n<!-- Created with Inkscape (http://www.inkscape.org/) -->\n<svg width="50.51" height="51.18" version="1.1" viewBox="0 0 13.364 13.541" xmlns="http://www.w3.org/2000/svg">\n <g transform="translate(-6.0855 -4.2559)">\n  <path d="m7.5846 9.2554h10.366l-5.1892 7.0421z" color="#000000" stroke-linejoin="round" stroke-width="3" style="-inkscape-stroke:none"/>\n  <path d="m7.584 7.7559a1.5002 1.5002 0 0 0-1.207 2.3887l5.1758 7.041a1.5002 1.5002 0 0 0 2.416 2e-3l5.1895-7.043a1.5002 1.5002 0 0 0-1.207-2.3887zm2.9648 3h4.4316l-2.2188 3.0117z" color="#000000" style="-inkscape-stroke:none"/>\n  <path d="m10.712 5.7557h4.1113v4.4858h-4.1113z" color="#000000" stroke-linejoin="round" stroke-width="3" style="-inkscape-stroke:none"/>\n  <path d="m10.711 4.2559a1.5002 1.5002 0 0 0-1.5 1.5v4.4863a1.5002 1.5002 0 0 0 1.5 1.5h4.1113a1.5002 1.5002 0 0 0 1.5-1.5v-4.4863a1.5002 1.5002 0 0 0-1.5-1.5zm1.5 3h1.1113v1.4863h-1.1113z" color="#000000" style="-inkscape-stroke:none"/>\n </g>\n</svg>\n';

  // src/js/component/common/nextPage/nextPage.js
  var QuickNavFn = ({
    getState,
    onMount,
    html,
    watchSync,
    setRef,
    getRef
  }) => {
    const { active } = getState();
    const activeClass = active ? "active" : "";
    onMount(({ element }) => {
      if (motionCore.mq("max", "desktop")) return;
      const { prev: prev2, next } = getRef();
      watchSync("active", (isActive) => {
        element.classList.toggle("active", isActive);
      });
      watchSync("nextRoute", (route) => {
        next.classList.toggle("is-disable", !route);
        next.href = route;
      });
      watchSync("prevRoute", (route) => {
        prev2.classList.toggle("is-disable", !route);
        prev2.href = route;
      });
      watchSync("color", (color) => {
        if (color === "white") {
          element.classList.remove("fill-black");
          element.classList.add("fill-white");
          return;
        }
        if (color === "black") {
          element.classList.remove("fill-white");
          element.classList.add("fill-black");
          return;
        }
      });
      return () => {
      };
    });
    return html`<div class="c-quick-nav-container ${activeClass}">
        <a class="c-quick-nav c-quick-nav--prev" ${setRef("prev")}>${scroll_arrow_default}</a>
        <a class="c-quick-nav c-quick-nav--next" ${setRef("next")}>${scroll_arrow_default}</a>
    </div>`;
  };

  // src/js/component/common/nextPage/definition.js
  var QuickNav = createComponent({
    name: "quick-nav",
    component: QuickNavFn,
    exportState: ["color", "active", "prevRoute", "nextRoute"],
    state: {
      color: () => ({
        value: "white",
        type: String,
        validate: (value) => {
          return ["white", "black"].includes(value);
        }
      }),
      active: () => ({
        value: false,
        type: Boolean
      }),
      prevRoute: () => ({
        value: "",
        type: String
      }),
      nextRoute: () => ({
        value: "",
        type: String
      })
    }
  });

  // src/js/component/common/routeLoader/routeLoader.js
  var RouteLoaderFn = ({ html, onMount }) => {
    onMount(({ element }) => {
      element.classList.add("disable");
      let tweenOut = tween.createTween({
        data: { opacity: 1, scale: 1 },
        duration: 500
      });
      tweenOut.subscribe(({ opacity, scale }) => {
        element.style.opacity = opacity;
        element.style.transform = `scale(${scale})`;
      });
      mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, () => {
        element.classList.remove("disable");
        tweenOut.goTo({ opacity: 1, scale: 1 });
      });
      mainStore.watch(MAIN_STORE_AFTER_ROUTE_CHANGE, async () => {
        await tweenOut.goTo({ opacity: 0, scale: 0.9 });
        element.classList.add("disable");
      });
      return () => {
        tweenOut.destroy();
        tweenOut = null;
      };
    });
    return html`
        <div class="c-loader center-viewport">
            <span class="c-loader__inner"></span>
        </div>
    `;
  };

  // src/js/component/common/routeLoader/definition.js
  var RouteLoader = createComponent({
    name: "route-loader",
    component: RouteLoaderFn,
    state: {
      isLoading: () => ({
        value: false,
        type: Boolean
      })
    }
  });

  // src/js/component/common/scrolldownLabel/scrolldownLabel.js
  var ScrollDownLabelFn = ({ html, onMount, getState, watchSync }) => {
    const { active } = getState();
    const activeClass = active ? "active" : "";
    onMount(({ element }) => {
      watchSync("active", (isActive) => {
        element.classList.toggle("active", isActive);
      });
      return () => {
      };
    });
    return html`
        <div class="c-scroller-down-label ${activeClass}">
            <h1>Scroll down</h1>
            ${scroll_arrow_default}
        </div>
    `;
  };

  // src/js/component/common/scrolldownLabel/definition.js
  var ScrollDownLabel = createComponent({
    name: "scroll-down-label",
    component: ScrollDownLabelFn,
    exportState: ["active"],
    state: {
      active: () => ({
        value: false,
        type: Boolean
      })
    }
  });

  // src/js/component/common/scrollToTop/ScrollToTop.js
  var ScrollToTopFn = ({ html, onMount, delegateEvents, watchSync }) => {
    onMount(({ element }) => {
      watchSync("active", (isActive) => {
        element.classList.toggle("active", isActive);
      });
      return () => {
      };
    });
    return html`
        <button
            type="button"
            class="scroll-to-top"
            ${delegateEvents({
      click: () => {
        bodyScroll.to(0);
      }
    })}
        ></button>
    `;
  };

  // src/js/component/common/scrollToTop/definition.js
  var ScrollToTop = createComponent({
    name: "scroll-to-top",
    component: ScrollToTopFn,
    exportState: ["active"],
    state: {
      active: () => ({
        value: false,
        type: Boolean
      })
    }
  });

  // src/js/component/common/debug/debugButton.js
  var DebugButtonFn = ({ html }) => {
    return html`
        <button type="button" class="c-btn-debug">
            <mobjs_slot></mobjs_slot>
        </button>
    `;
  };

  // src/js/component/common/debug/definition.js
  var DebugButton = createComponent({
    name: "debug-button",
    component: DebugButtonFn
  });

  // src/js/component/common/debug/consoleLog.js
  var consoleLogDebug = () => {
    mainStore.debugStore();
    console.log("componentMap", componentMap);
    console.log("Tree structure:", getTree());
    console.log("bindEventMap", bindEventMap);
    console.log("currentListValueMap", currentRepeaterValueMap);
    console.log("activeRepeatMap", activeRepeatMap);
    console.log("onMountCallbackMap", onMountCallbackMap);
    console.log("staticPropsMap", staticPropsMap);
    console.log("dynamicPropsMap", bindPropsMap);
    console.log("repeaterTargetComponent", repeaterTargetComponentMap);
    console.log("eventDelegationMap", eventDelegationMap);
    console.log("tempDelegateEventMap", tempDelegateEventMap);
    console.log("invalidateIdPlaceHolderMap", invalidateIdPlaceHolderMap);
    console.log("invalidateIdHostMap", invalidateIdHostMap.size);
    console.log("invalidateFunctionMap", invalidateFunctionMap);
    console.log("repeatIdPlaceHolderMap", repeatIdPlaceHolderMap);
    console.log("repeatFunctionMap", repeatFunctionMap);
    console.log("userChildPlaceholderSize", getUserChildPlaceholderSize());
    console.log("slotPlaceholderSize", getSlotPlaceholderSize());
    console.log("bindTextMapSize", getBindTextParentSize());
    console.log("bindTextPlaceholderMapSize", getBindTextPlaceholderSize());
  };

  // src/js/component/layout/footer/footer.js
  var FooterFn = ({ html, delegateEvents }) => {
    return html`
        <footer class="l-footer">
            <div class="l-footer__container">
                <footer-nav></footer-nav>
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${delegateEvents({
      click: () => {
        useMethodByName("debugOverlay").toggle();
      }
    })}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${delegateEvents({
      click: () => {
        consoleLogDebug();
      }
    })}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `;
  };

  // src/js/component/layout/footer/footerNav/footerButton.js
  var FooterNavButtonFn = ({ html, onMount, getState }) => {
    const { label, section } = getState();
    onMount(({ element }) => {
      navigationStore.watch("activeNavigationSection", (current) => {
        const isActiveSection = current === section;
        element.classList.toggle("current", isActiveSection);
      });
      return () => {
      };
    });
    return html`
        <button type="button" class="footer-nav__button">${label}</button>
    `;
  };

  // src/js/component/layout/footer/footerNav/footerNav.js
  var data = [
    {
      label: "About",
      url: "about",
      section: "about"
    },
    {
      label: "Canvas 2d",
      url: "canvas-overview",
      section: "canvas"
    },
    {
      label: "Illustration",
      url: "svg-overview",
      section: "svg"
    },
    {
      label: "MobCore",
      url: "mobCore-overview",
      section: "mobCore"
    },
    {
      label: "MobJs",
      url: "mobJs-overview",
      section: "mobJs"
    },
    {
      label: "MobMotion",
      url: "mobMotion-overview",
      section: "mobMotion"
    },
    {
      label: "Plugin",
      url: "plugin-overview",
      section: "plugin"
    }
  ];
  var getItems = ({ delegateEvents, staticProps: staticProps2 }) => {
    return data.map(({ label, url, section }) => {
      return renderHtml`<li class="footer-nav__item">
                <footer-nav-button
                    ${delegateEvents({
        click: () => {
          loadUrl({ url });
          navigationStore.set("navigationIsOpen", false);
        }
      })}
                    ${staticProps2({
        label,
        section
      })}
                ></footer-nav-button>
            </li> `;
    }).join("");
  };
  var FooterNavFn = ({ html, delegateEvents, staticProps: staticProps2 }) => {
    return html`
        <ul class="footer-nav">
            ${getItems({ delegateEvents, staticProps: staticProps2 })}
        </ul>
    `;
  };

  // src/js/component/layout/footer/footerNav/definition.js
  var FooterNavButton = createComponent({
    name: "footer-nav-button",
    component: FooterNavButtonFn,
    exportState: ["label", "section"],
    state: {
      label: () => ({
        value: "",
        type: String
      }),
      section: () => ({
        value: "",
        type: String
      })
    }
  });
  var FooterNav = createComponent({
    name: "footer-nav",
    component: FooterNavFn,
    child: [FooterNavButton]
  });

  // src/js/component/layout/footer/definition.js
  var Footer = createComponent({
    name: "mob-footer",
    component: FooterFn,
    child: [FooterNav, DebugButton]
  });

  // src/js/component/layout/header/header.js
  function openInfo({ navInfo }) {
    mobCore.useFrame(() => {
      navInfo.classList.add("open");
    });
  }
  function closeInfo({ navInfo }) {
    mobCore.useFrame(() => {
      navInfo.classList.remove("open");
    });
  }
  function titleHandler() {
    loadUrl({ url: "#home" });
    navigationStore.set("navigationIsOpen", false);
    useMethodByName("main_navigation")?.closeAllAccordion();
    useMethodByName("navigation-container")?.scrollTop();
  }
  var HeaderFn = ({ html, onMount, delegateEvents, setRef, getRef }) => {
    onMount(() => {
      const { navInfo, title, beta } = getRef();
      navigationStore.watch("navigationIsOpen", (val2) => {
        if (val2) {
          openInfo({ navInfo });
          return;
        }
        closeInfo({ navInfo });
      });
      mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, ({ route }) => {
        title.classList.toggle("visible", route !== "home");
        beta.classList.toggle("visible", route !== "home");
      });
      return () => {
      };
    });
    return html`
        <header class="l-header">
            <div class="l-header__container">
                <div class="l-header__grid">
                    <div class="l-header__toggle">
                        <mob-header-toggle></mob-header-toggle>
                    </div>
                    <button
                        type="button"
                        class="l-header__title"
                        ${setRef("titleLink")}
                        ${delegateEvents({
      click: () => {
        titleHandler();
      }
    })}
                    >
                        <div class="l-header__title-container">
                            <h3 ${setRef("title")}><span>Mob</span>Project</h3>
                            <h5 ${setRef("beta")}>beta 0.0.1</h5>
                        </div>
                    </button>
                    <div class="l-header__utils">
                        <mob-header-nav></mob-header-nav>
                    </div>
                </div>
                <div class="l-header__navinfo" ${setRef("navInfo")}>
                    <p class="p--small"></p>
                </div>
            </div>
        </header>
    `;
  };

  // src/svg/icon-github.svg
  var icon_github_default = '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>\n\n';

  // src/js/component/layout/header/headernav.js
  var icon = {
    github: icon_github_default
  };
  var onClick = ({ event }) => {
    const button = event.target;
    console.log(button);
    const { url } = button.dataset;
    loadUrl({ url });
    navigationStore.set("navigationIsOpen", false);
  };
  function additems({ delegateEvents }) {
    const { header } = getCommonData();
    const { links } = header;
    return links.map((link) => {
      const { svg, url, internal } = link;
      return renderHtml`<li class="l-header__sidenav__item">
                ${internal ? renderHtml`
                          <button
                              type="button"
                              data-url="${url}"
                              class="l-header__sidenav__link"
                              ${delegateEvents({
        click: (event) => {
          console.log("click");
          onClick({ event });
        }
      })}
                          >
                              ${icon[svg]}
                          </button>
                      ` : renderHtml`
                          <a
                              href="${url}"
                              target="_blank"
                              class="l-header__sidenav__link"
                          >
                              ${icon[svg]}
                          </a>
                      `}
            </li>`;
    }).join("");
  }
  var HeadernavFn = ({ html, delegateEvents }) => {
    return html`
        <ul class="l-header__sidenav">
            ${additems({ delegateEvents })}
        </ul>
    `;
  };

  // src/js/component/layout/header/headerToggle.js
  var hanburgerHandler = () => {
    navigationStore.update("navigationIsOpen", (state) => !state);
  };
  var HeaderToggleFn = ({ onMount, html, delegateEvents }) => {
    onMount(({ element }) => {
      navigationStore.watch("navigationIsOpen", (val2) => {
        mobCore.useFrame(() => {
          if (val2) {
            element.classList.add("is-open");
            return;
          }
          element.classList.remove("is-open");
        });
      });
      return () => {
      };
    });
    return html`
        <button
            class="hamburger hamburger--squeeze"
            type="button"
            ${delegateEvents({
      click: () => hanburgerHandler()
    })}
        >
            <div class="hamburger-box">
                <div class="hamburger-inner"></div>
            </div>
        </button>
    `;
  };

  // src/js/component/layout/header/definition.js
  var HeaderNav = createComponent({
    name: "mob-header-nav",
    component: HeadernavFn
  });
  var HeaderToggle = createComponent({
    name: "mob-header-toggle",
    component: HeaderToggleFn
  });
  var Header = createComponent({
    name: "mob-header",
    component: HeaderFn,
    child: [HeaderNav, HeaderToggle]
  });

  // src/js/component/layout/navigation/animation/navScroller.js
  var currentPercent = 0;
  var initNavigationScoller = ({ root: root2 }) => {
    const screenEl = root2.querySelector(".l-navcontainer__wrap");
    const scrollerEl = root2.querySelector(".l-navcontainer__scroll");
    const percentEl = root2.querySelector(".l-navcontainer__percent");
    const setDelay = 200;
    const navScroller = new SmoothScroller({
      screen: screenEl,
      scroller: scrollerEl,
      direction: "vertical",
      drag: true,
      scopedEvent: true,
      breakpoint: "small",
      onUpdate: ({ percent }) => {
        const { navigationIsOpen } = navigationStore.get();
        if (!navigationIsOpen) return;
        currentPercent = Number.parseInt(percent) / 100;
        percentEl.style.transform = `translateZ(0) scaleX(${currentPercent})`;
      }
    });
    navScroller.init();
    navigationStore.watch("activeNavigationSection", (section) => {
      const currentSection = document.querySelector(
        `[data-sectionname='${section}']`
      );
      if (!currentSection) return;
      const header = document.querySelector(".l-header");
      const navHeight = outerHeight(scrollerEl);
      const headerHeight = outerHeight(header);
      const percent = 100 * currentSection.offsetTop / (navHeight - window.innerHeight + headerHeight);
      const maxValue = Math.min(percent, 100);
      navScroller.move(maxValue);
    });
    navigationStore.watch("navigationIsOpen", (val2) => {
      if (val2) {
        percentEl.style.transform = `translateZ(0) scaleX(${currentPercent})`;
        return;
      }
      percentEl.style.transform = `translateZ(0) scaleX(0)`;
    });
    return {
      scrollNativationToTop: () => {
        setTimeout(() => {
          navScroller.move(0);
          navigationStore.set("activeNavigationSection", "no-section");
        }, setDelay);
      },
      refreshScroller: () => {
        navScroller.refresh();
      }
    };
  };

  // src/js/component/layout/navigation/navContainer.js
  function closeNavigation({ element, main }) {
    mobCore.useFrame(() => {
      document.body.style.overflow = "";
      element.classList.remove("active");
      main.classList.remove("shift");
    });
  }
  function openNavigation({ element, main }) {
    useMethodByName("navigation-container")?.refresh();
    mobCore.useFrame(() => {
      document.body.style.overflow = "hidden";
      element.classList.add("active");
      main.classList.add("shift");
    });
  }
  function addHandler({ main, toTopBtn }) {
    main.addEventListener("click", () => {
      navigationStore.set("navigationIsOpen", false);
    });
    toTopBtn.addEventListener("click", () => {
      useMethodByName("navigation-container")?.scrollTop();
      useMethodByName("main_navigation")?.closeAllAccordion();
      const { navigationIsOpen } = navigationStore.get();
      if (!navigationIsOpen) bodyScroll.to(0);
    });
  }
  var NavigationContainerFn = ({
    html,
    onMount,
    addMethod,
    setRef,
    getRef
  }) => {
    onMount(({ element }) => {
      const main = document.querySelector("main.main");
      let lastMq = "";
      const { toTopBtn, wrap } = getRef();
      navigationStore.watch("navigationIsOpen", (val2) => {
        if (val2) {
          openNavigation({ element, main });
          return;
        }
        closeNavigation({ element, main });
      });
      mobCore.useResize(() => {
        const isDesktop = motionCore.mq("max", "desktop");
        const currentMq = isDesktop ? "desk" : "mob";
        if (currentMq !== lastMq) wrap.scrollTo(0, 0);
        lastMq = currentMq;
      });
      addHandler({ main, toTopBtn });
      const { scrollNativationToTop, refreshScroller } = initNavigationScoller({
        root: element
      });
      addMethod("scrollTop", scrollNativationToTop);
      addMethod("refresh", refreshScroller);
      return () => {
      };
    });
    return html`
        <div class="l-navcontainer">
            <div class="l-navcontainer__side">
                <div class="l-navcontainer__percent"></div>
                <button
                    class="l-navcontainer__totop"
                    ${setRef("toTopBtn")}
                ></button>
            </div>
            <div class="l-navcontainer__wrap" ${setRef("wrap")}>
                <div class="l-navcontainer__scroll">
                    <mob-navigation name="main_navigation"></mob-navigation>
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/layout/navigation/navigation.js
  function getItems2({ data: data2, staticProps: staticProps2, setState, bindProps }) {
    return data2.map((item, index) => {
      const {
        label,
        url,
        activeId,
        children,
        section,
        sectioName,
        scrollToSection
      } = item;
      if (section) {
        return renderHtml`
                    <mob-navigation-label
                        ${staticProps2({ label, sectioName })}
                    ></mob-navigation-label>
                `;
      }
      return children ? renderHtml`
                      <mob-navigation-submenu
                          ${staticProps2({
        headerButton: {
          label,
          url
        },
        children,
        callback: () => setState("currentAccordionId", index)
      })}
                          ${bindProps({
        bind: ["currentAccordionId"],
        props: ({ currentAccordionId }) => {
          return {
            isOpen: currentAccordionId === index
          };
        }
      })}
                      >
                      </mob-navigation-submenu>
                  ` : renderHtml`
                      <li class="l-navigation__item">
                          <mob-navigation-button
                              ${staticProps2({
        label,
        url,
        scrollToSection: scrollToSection ?? "no-scroll",
        activeId: activeId ?? -1
      })}
                          ></mob-navigation-button>
                      </li>
                  `;
    }).join("");
  }
  var NavigationFn = ({
    html,
    staticProps: staticProps2,
    setState,
    bindProps,
    addMethod
  }) => {
    const { navigation: data2 } = getCommonData();
    addMethod("closeAllAccordion", ({ fireCallback = true } = {}) => {
      setState("currentAccordionId", -1, fireCallback);
    });
    return html`
        <nav class="l-navigation">
            <ul class="l-navigation__list">
                ${getItems2({
      data: data2,
      staticProps: staticProps2,
      setState,
      bindProps
    })}
            </ul>
        </nav>
    `;
  };

  // src/js/component/layout/navigation/navigationButton.js
  var NavigationButtonFn = ({
    getState,
    html,
    onMount,
    watch,
    delegateEvents
  }) => {
    const {
      label,
      url,
      arrowClass,
      subMenuClass,
      fireRoute,
      callback: callback2,
      scrollToSection,
      activeId
    } = getState();
    onMount(({ element }) => {
      watch("isOpen", (isOpen) => {
        mobCore.useFrame(() => {
          element.classList.toggle("active", isOpen);
        });
      });
      mainStore.watch(MAIN_STORE_ACTIVE_ROUTE, ({ route }) => {
        mobCore.useFrame(() => {
          const urlParsed = url.split("?");
          const hash = urlParsed?.[0] ?? "";
          const { activeParams } = mainStore.get();
          const paramsMatch = activeId === -1 || activeParams?.["activeId"] === activeId;
          const isActiveRoute = route === hash && paramsMatch;
          element.classList.toggle("current", isActiveRoute);
          if (isActiveRoute && fireRoute) {
            callback2();
            navigationStore.set(
              "activeNavigationSection",
              scrollToSection
            );
          }
        });
      });
      return () => {
      };
    });
    return html`
        <button
            type="button"
            class="l-navigation__link  ${arrowClass} ${subMenuClass}"
            ${delegateEvents({
      click: () => {
        callback2();
        if (!fireRoute) return;
        loadUrl({ url });
        navigationStore.set("navigationIsOpen", false);
      }
    })}
        >
            ${label}
        </button>
    `;
  };

  // src/js/component/layout/navigation/navigationLabel.js
  var NavigationLabelFn = ({ getState, html }) => {
    const { label, sectioName } = getState();
    return html`
        <div class="l-navigation__label" data-sectionname="${sectioName}">
            ${label}
        </div>
    `;
  };

  // src/js/component/layout/navigation/navigationSubmenu.js
  function getSubmenu({ children, staticProps: staticProps2, callback: callback2 }) {
    return children.map((child2) => {
      const { label, url, scrollToSection, activeId } = child2;
      return renderHtml`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${staticProps2({
        callback: callback2,
        label,
        url,
        subMenuClass: "l-navigation__link--submenu",
        scrollToSection,
        activeId: activeId ?? -1
      })}
                    ></mob-navigation-button>
                </li>
            `;
    }).join("");
  }
  var NavigationSubmenuFn = ({
    onMount,
    html,
    getState,
    updateState,
    staticProps: staticProps2,
    bindProps,
    watchSync,
    setRef,
    getRef
  }) => {
    const { children, headerButton, callback: callback2 } = getState();
    const { label, url, activeId } = headerButton;
    onMount(() => {
      const { content } = getRef();
      slide.subscribe(content);
      slide.reset(content);
      watchSync("isOpen", async (isOpen) => {
        const action2 = isOpen ? "down" : "up";
        await slide[action2](content);
        useMethodByName("navigation-container")?.refresh();
        if (isOpen) return;
        useMethodByName("main_navigation")?.closeAllAccordion({
          fireCallback: false
        });
      });
      return () => {
      };
    });
    return html`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${staticProps2({
      label,
      url,
      arrowClass: "l-navigation__link--arrow",
      fireRoute: false,
      activeId: activeId ?? -1,
      callback: () => {
        updateState("isOpen", (prev2) => !prev2);
        const { isOpen } = getState();
        if (isOpen) callback2();
      }
    })}
                ${bindProps({
      bind: ["isOpen"],
      /** @returns {Partial<import('./type').NavigationButton>} */
      props: ({ isOpen }) => {
        return { isOpen };
      }
    })}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${setRef("content")}>
                ${getSubmenu({ children, staticProps: staticProps2, callback: callback2 })}
            </ul>
        </li>
    `;
  };

  // src/js/component/layout/navigation/definition.js
  var NavigationButton = createComponent({
    name: "mob-navigation-button",
    component: NavigationButtonFn,
    exportState: [
      "label",
      "url",
      "arrowClass",
      "subMenuClass",
      "fireRoute",
      "callback",
      "isOpen",
      "scrollToSection",
      "activeId"
    ],
    state: {
      label: () => ({
        value: "",
        type: String
      }),
      url: () => ({
        value: "",
        type: String
      }),
      activeId: () => ({
        value: -1,
        type: Number
      }),
      scrollToSection: () => ({
        value: "",
        type: String
      }),
      arrowClass: () => ({
        value: "",
        type: String
      }),
      subMenuClass: () => ({
        value: "",
        type: String
      }),
      fireRoute: () => ({
        value: true,
        type: Boolean
      }),
      callback: () => ({
        value: () => {
        },
        type: Function
      }),
      isOpen: () => ({
        value: false,
        type: Boolean
      })
    }
  });
  var NavigationLabel = createComponent({
    name: "mob-navigation-label",
    component: NavigationLabelFn,
    exportState: ["label", "sectioName"],
    state: {
      label: () => ({
        value: "",
        type: String
      }),
      sectioName: () => ({
        value: "",
        type: String
      })
    }
  });
  var NavigationSubmenu = createComponent({
    name: "mob-navigation-submenu",
    component: NavigationSubmenuFn,
    exportState: ["children", "headerButton", "isOpen", "callback"],
    state: {
      callback: () => ({
        value: () => {
        },
        type: Function
      }),
      headerButton: () => ({
        value: {},
        type: "Any"
      }),
      children: () => ({
        value: [],
        type: Array
      }),
      isOpen: () => ({
        value: false,
        type: Boolean
      })
    },
    child: [NavigationButton]
  });
  var Navigation = createComponent({
    name: "mob-navigation",
    component: NavigationFn,
    exportState: ["currentAccordionId"],
    state: {
      currentAccordionId: () => ({
        value: -1,
        type: Number,
        skipEqual: false
      })
    },
    child: [NavigationLabel, NavigationSubmenu, NavigationButton]
  });
  var NavigationContainer = createComponent({
    name: "mob-navigation-container",
    component: NavigationContainerFn,
    child: [Navigation]
  });

  // src/js/pages/404/index.js
  useComponent([Title]);
  var pageNotFound2 = () => {
    return renderHtml`
        <div class="page-not-found">
            <mob-title ${staticProps({ tag: "h3", color: "highlight" })}>
                Page not found
            </mob-title>
            <a href="./#home">back to home</a>
        </div>
    `;
  };

  // src/js/component/common/docsContainer/docContainer.js
  var DocContainerFn = ({ html, onMount }) => {
    const setLogoState = setStateByName("m1_logo");
    const setToTopState = setStateByName("scroll-to-top");
    onMount(() => {
      setLogoState("active", true);
      setToTopState("active", true);
      return () => {
        setLogoState("active", false);
        setToTopState("active", false);
      };
    });
    return html`
        <div class="c-doc-container">
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__side">
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <mobjs-slot name="section-title"></mobjs-slot>
                <mobjs-slot name="section-links"></mobjs-slot>
            </div>
        </div>
    `;
  };

  // src/js/component/common/docsContainer/definition.js
  var DocContainer = createComponent({
    name: "doc-container",
    component: DocContainerFn
  });

  // src/js/component/common/doctitle/docSide.js
  var DocTitleFn = ({ html }) => {
    return html`
        <div class="c-doc-title">
            <h2><mobjs-slot></mobjs-slot></h2>
        </div>
    `;
  };

  // src/js/component/common/doctitle/definition.js
  var DocTitle = createComponent({
    name: "doc-title",
    component: DocTitleFn,
    state: {}
  });

  // src/js/component/common/doctitleSmall/docSide.js
  var DocTitleSmallFn = ({ html }) => {
    return html`
        <div class="c-doc-title-small">
            <mobjs-slot></mobjs-slot>
        </div>
    `;
  };

  // src/js/component/common/doctitleSmall/definition.js
  var DocsTitleSmall = createComponent({
    name: "doc-title-small",
    component: DocTitleSmallFn,
    state: {}
  });

  // src/js/component/common/scrollTo/button/scrollToButton.js
  var ScrollToButtonFn = ({
    html,
    getState,
    onMount,
    watchSync,
    setRef
  }) => {
    const { label } = getState();
    onMount(({ element }) => {
      watchSync("active", (val2) => {
        element.classList.toggle("active", val2);
      });
      return () => {
      };
    });
    return html`
        <button type="button">
            <span ${setRef("labelRef")}> ${label} </span>
        </button>
    `;
  };

  // src/js/component/common/scrollTo/button/definition.js
  var ScrollToButton = createComponent({
    name: "scroll-to-button",
    component: ScrollToButtonFn,
    exportState: ["label", "active"],
    state: {
      label: () => ({
        value: "",
        type: String
      }),
      active: () => ({
        value: false,
        type: Boolean
      })
    }
  });

  // src/js/component/common/scrollTo/scrollTo.js
  var disableObservereffect = false;
  function getButtons({ delegateEvents, setState, bindProps, getState }) {
    const { anchorItems } = getState();
    return anchorItems.map((item) => {
      return renderHtml`
                <li>
                    <scroll-to-button
                        ${delegateEvents({
        click: async () => {
          const { id: scroll, label, element } = item;
          const offsetTop = scroll === "start" ? 0 : offset(element).top - 50;
          disableObservereffect = true;
          setState("activeLabel", label);
          await bodyScroll.to(offsetTop);
          disableObservereffect = false;
        }
      })}
                        ${bindProps({
        bind: ["activeLabel"],
        props: ({ activeLabel }) => {
          const { label } = item;
          return {
            active: activeLabel === label,
            label
          };
        }
      })}
                    >
                    </scroll-to-button>
                </li>
            `;
    }).join("");
  }
  var ScrollToFn = ({
    html,
    onMount,
    delegateEvents,
    bindProps,
    setState,
    getState,
    invalidate,
    setRef
  }) => {
    onMount(() => {
      if (motionCore.mq("max", "large")) return;
      const unWatchStoreComputed = anchorStore.watch(
        "computedItems",
        async (val2) => {
          setState("anchorItems", val2.reverse());
          await tick();
          console.log("resolve sctollto tick");
        }
      );
      const unWatchStoreActive = anchorStore.watch(
        "activeLabelFromObeserver",
        (label) => {
          if (disableObservereffect) return;
          setState("activeLabel", label);
        }
      );
      return () => {
        unWatchStoreComputed();
        unWatchStoreActive();
      };
    });
    return html`
        <div class="c-scroll-to">
            <ul ${setRef("list")}>
                ${invalidate({
      bind: "anchorItems",
      render: () => {
        return getButtons({
          delegateEvents,
          bindProps,
          setState,
          getState
        });
      }
    })}
            </ul>
        </div>
    `;
  };

  // src/js/component/common/scrollTo/definition.js
  var ScrollTo = createComponent({
    name: "scroll-to",
    component: ScrollToFn,
    exportState: ["activeId"],
    state: {
      activeLabel: () => ({
        value: "",
        type: String
      }),
      anchorItems: () => ({
        value: [],
        type: Array
      })
    },
    child: [ScrollToButton]
  });

  // src/js/pages/Layout/layoutSidebarAnchor.js
  useComponent([DocContainer, DocsTitleSmall, ScrollTo, DocTitle, HtmlContent]);
  var getBreadCrumbs = ({ breadCrumbs, section }) => {
    if (breadCrumbs.length > 0) {
      return renderHtml` <a href="${breadCrumbs}">${section}</a> / `;
    }
    return ``;
  };
  var layoutSidebarAnchor = async ({ props }) => {
    const { source, title, section, breadCrumbs } = props;
    const { data: data2 } = await loadJsonContent({ source });
    return renderHtml` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${staticProps({
      data: data2.data,
      useMaxWidth: true
    })}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${getBreadCrumbs({
      breadCrumbs,
      section
    })}${title}
                </div></doc-title-small
            >
            <scroll-to slot="section-links"></scroll-to>
            <doc-title slot="section-title">${title}</doc-title>
        </div>
    </doc-container>`;
  };

  // src/js/pages/Layout/layoutSidebarLinks.js
  useComponent([DocContainer, DocsTitleSmall, DocTitle, HtmlContent]);
  var getBreadCrumbs2 = ({ breadCrumbs }) => breadCrumbs.map((item) => renderHtml` <a href="${item.url}">${item.title}</a> / `).join("");
  var layoutSidebarLinks = async ({ props }) => {
    const { source, title, breadCrumbs } = props;
    const { data: data2 } = await loadJsonContent({ source });
    return renderHtml` <doc-container>
        <div>
            <html-content
                slot="docs"
                ${staticProps({
      data: data2.data,
      useMaxWidth: true
    })}
            ></html-content>
            <doc-title-small slot="section-title-small"
                ><div>
                    ${getBreadCrumbs2({
      breadCrumbs
    })}<span>${title}</span>
                </div></doc-title-small
            >
            <doc-title slot="section-title">${title}</doc-title>
        </div>
    </doc-container>`;
  };

  // src/js/component/pages/benchMark/fakeComponent/benchmarkFakeComponent.js
  var BenchMarkFakeComponentFn = ({
    html,
    bindText,
    delegateEvents,
    onMount,
    id
  }) => {
    let isSelected = false;
    let rootRef;
    onMount(({ element }) => {
      rootRef = element;
      return () => {
      };
    });
    return html`<div class="benchmark-fake">
        <div class="benchmark-fake__row">
            <strong>id:</strong><br />
            ${id}
        </div>
        <div class="benchmark-fake__row">
            ${bindText`<strong>label:</strong><br/> ${"label"}`}
        </div>
        <div class="benchmark-fake__row">
            ${bindText`<strong>counter: </strong><br/> ${"counter"}`}
        </div>
        <div class="benchmark-fake__row">
            <button
                class="benchmark-fake__button"
                type="button"
                ${delegateEvents({
      click: () => {
        isSelected = !isSelected;
        rootRef.classList.toggle("selected", isSelected);
      }
    })}
            >
                Select
            </button>
        </div>
    </div> `;
  };

  // src/js/component/pages/benchMark/fakeComponent/definition.js
  var BenchMarkFakeComponent = createComponent({
    name: "benchmark-fake-component",
    component: BenchMarkFakeComponentFn,
    exportState: ["counter", "label"],
    state: {
      counter: () => ({
        value: 0,
        type: Number
      }),
      label: () => ({
        value: "",
        type: String
      })
    }
  });

  // src/js/component/pages/benchMark/partials/definitionPartial.js
  var benchMarkDefinitionPartial = {
    exportState: ["svg"],
    state: {
      counter: () => ({
        value: 0,
        type: Number
      }),
      data: () => ({
        value: [],
        type: Array,
        validate: (value) => value.length < 2001,
        strict: true,
        skipEqual: false
      }),
      time: () => ({
        value: 0,
        type: Number,
        transform: (value) => Math.round(value),
        skipEqual: false
      }),
      isLoading: () => ({
        value: false,
        type: Boolean
      })
    },
    child: [BenchMarkFakeComponent]
  };

  // src/js/component/pages/benchMark/partials/benchMarkGarbagePartial.js
  var benchMarkGarbagePartial = () => {
    return renderHtml`
        <p>
            Generation of up to 2000 basic components with a reactive prop<br />
            Generating a large number of components repeatedly can increase
            memory consumption until they are deleted and the garbage collector
            empties the memory
        </p>
    `;
  };

  // src/js/component/pages/benchMark/partials/benchMarkListPartial.js
  var shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  var createBenchMarkArray = (numberOfItem) => {
    return [...new Array(numberOfItem).keys()].map((i) => ({
      label: `comp-${i + 1}`
    }));
  };
  var setData = async ({ setState, value, useShuffle = false }) => {
    setState("isLoading", true);
    await tick();
    mobCore.useFrame(() => {
      mobCore.useNextTick(async () => {
        const startTime2 = performance.now();
        setState(
          "data",
          useShuffle ? shuffle(createBenchMarkArray(value)) : createBenchMarkArray(value)
        );
        await tick();
        const endTime = performance.now();
        const difference = endTime - startTime2;
        setState("time", difference);
        setState("isLoading", false);
      });
    });
  };
  var benchMarkListPartial = ({
    delegateEvents,
    setRef,
    getRef,
    updateState,
    getState,
    setState
  }) => {
    return renderHtml`
        <div class="benchmark__loading" ${setRef("loading")}>
            generate components
        </div>
        <div class="benchmark__head__controls">
            <input
                class="benchmark__head__input"
                type="text"
                placeholder="Number of component"
                ${setRef("input")}
                ${delegateEvents({
      keypress: (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          const value = Number(
            /** @type{HTMLInputElement} */
            event.target?.value ?? 0
          );
          setData({ setState, value });
        }
      }
    })}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${delegateEvents({
      click: () => {
        const { input } = getRef();
        const value = Number(
          /** @type{HTMLInputElement} */
          input?.value ?? 0
        );
        setData({ setState, value });
      }
    })}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${delegateEvents({
      click: () => {
        const { data: data2 } = getState();
        setData({
          setState,
          value: data2.length,
          useShuffle: true
        });
      }
    })}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${delegateEvents({
      click: () => {
        updateState("counter", (value) => value + 1);
      }
    })}
            >
                Update counter
            </button>
        </div>
    `;
  };

  // src/js/component/pages/benchMark/invalidate/benchmarkInvalidate.js
  var BenchMarkInvalidateFn = ({
    onMount,
    html,
    delegateEvents,
    bindText,
    invalidate,
    getState,
    staticProps: staticProps2,
    setRef,
    getRef,
    setState,
    updateState,
    bindProps,
    watch
  }) => {
    onMount(() => {
      const { loading } = getRef();
      watch("isLoading", (value) => {
        loading.classList.toggle("active", value);
      });
      return () => {
      };
    });
    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Invalidate:</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${benchMarkGarbagePartial()}
            ${benchMarkListPartial({
      setRef,
      getRef,
      setState,
      updateState,
      delegateEvents,
      getState
    })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${invalidate({
      bind: "data",
      render: ({ html: html2 }) => {
        const { data: data2 } = getState();
        return html2`
                        ${data2.map(({ label }) => {
          return html2`
                                    <benchmark-fake-component
                                        ${staticProps2({
            label
          })}
                                        ${bindProps({
            bind: ["counter"],
            /** @returns{Partial<import('../fakeComponent/type').BenchMarkFakeComponent>} */
            props: ({ counter }) => {
              return {
                counter
              };
            }
          })}
                                    ></benchmark-fake-component>
                                `;
        }).join("")}
                    `;
      }
    })}
        </div>
    </div>`;
  };

  // src/js/component/pages/benchMark/invalidate/definition.js
  var BenchMarkInvalidate = createComponent({
    name: "benchmark-invalidate",
    component: BenchMarkInvalidateFn,
    ...benchMarkDefinitionPartial
  });

  // src/js/component/pages/benchMark/repeatKey/benchmarkRepeatWithKey.js
  var BenchMarkRepeatWithKyFn = ({
    onMount,
    html,
    delegateEvents,
    bindText,
    setRef,
    getRef,
    getState,
    setState,
    updateState,
    bindProps,
    watch,
    repeat
  }) => {
    onMount(() => {
      const { loading } = getRef();
      watch("isLoading", (value) => {
        loading.classList.toggle("active", value);
      });
      return () => {
      };
    });
    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${benchMarkGarbagePartial()}
            ${benchMarkListPartial({
      setRef,
      getRef,
      setState,
      updateState,
      delegateEvents,
      getState
    })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${repeat({
      bind: "data",
      key: "label",
      render: ({ html: html2, sync }) => {
        return html2`
                        <benchmark-fake-component
                            ${sync()}
                            ${bindProps({
          bind: ["counter"],
          /** @returns{Partial<import('../fakeComponent/type').BenchMarkFakeComponent>} */
          props: ({ counter, data: data2 }, index) => {
            return {
              label: data2[index]?.label,
              counter
            };
          }
        })}
                        ></benchmark-fake-component>
                    `;
      }
    })}
        </div>
    </div>`;
  };

  // src/js/component/pages/benchMark/repeatKey/definition.js
  var BenchMarkRepeatWithKey = createComponent({
    name: "benchmark-repeat-key",
    component: BenchMarkRepeatWithKyFn,
    ...benchMarkDefinitionPartial
  });

  // src/js/component/pages/benchMark/repeatNoKey/benchmarkRepeatNoKey.js
  var BenchMarkRepeatNoKyFn = ({
    onMount,
    html,
    delegateEvents,
    bindText,
    setRef,
    getRef,
    getState,
    setState,
    updateState,
    bindProps,
    watch,
    repeat
  }) => {
    onMount(() => {
      const { loading } = getRef();
      watch("isLoading", (value) => {
        loading.classList.toggle("active", value);
      });
      return () => {
      };
    });
    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${benchMarkGarbagePartial()}
            ${benchMarkListPartial({
      setRef,
      getRef,
      setState,
      updateState,
      delegateEvents,
      getState
    })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${"time"}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${repeat({
      bind: "data",
      render: ({ html: html2, sync }) => {
        return html2`
                        <benchmark-fake-component
                            ${sync()}
                            ${bindProps({
          bind: ["counter"],
          /** @returns{Partial<import('../fakeComponent/type').BenchMarkFakeComponent>} */
          props: ({ counter, data: data2 }, index) => {
            return {
              label: data2[index]?.label,
              counter
            };
          }
        })}
                        ></benchmark-fake-component>
                    `;
      }
    })}
        </div>
    </div>`;
  };

  // src/js/component/pages/benchMark/repeatNoKey/definition.js
  var BenchMarkRepeatNoKey = createComponent({
    name: "benchmark-repeat-no-key",
    component: BenchMarkRepeatNoKyFn,
    ...benchMarkDefinitionPartial
  });

  // src/js/pages/benchmark/index.js
  useComponent([
    BenchMarkInvalidate,
    BenchMarkRepeatNoKey,
    BenchMarkRepeatWithKey
  ]);
  var benchMark = async ({ props }) => {
    const { rootComponent } = props;
    console.log(rootComponent);
    return renderHtml`<div class="l-benchMark"><${rootComponent}></${rootComponent}></div>`;
  };

  // src/js/utils/canvasUtils.js
  var canvasBackground = "#000000";
  var getCanvasContext = ({ disableOffcanvas }) => {
    const useOffscreen = "OffscreenCanvas" in globalThis && !disableOffcanvas;
    const context = useOffscreen ? "bitmaprenderer" : "2d";
    return { useOffscreen, context };
  };
  var getOffsetCanvas = ({ useOffscreen, canvas }) => {
    const offscreen = useOffscreen ? new OffscreenCanvas(canvas.width, canvas.height) : null;
    const offScreenCtx = useOffscreen ? offscreen.getContext("2d") : null;
    return { offscreen, offScreenCtx };
  };
  var copyCanvasBitmap = ({ useOffscreen, offscreen, ctx }) => {
    if (useOffscreen) {
      const bitmap = offscreen.transferToImageBitmap();
      ctx.transferFromImageBitmap(bitmap);
    }
  };
  var roundRectIsSupported = (ctx) => "roundRect" in ctx;
  var roundRectCustom = (ctx, x, y, w, h, r) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };
  var createGrid = ({
    canvas,
    numberOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter
  }) => {
    return [
      ...new Array(numberOfRow * numberOfColumn + numberOfRow).keys()
    ].reduce(
      (previous) => {
        const { row, col, items: previousItems } = previous;
        const newCol = col < numberOfColumn ? col + 1 : 0;
        const newRow = newCol === 0 ? row + 1 : row;
        const x = (cellWidth + gutter) * newCol;
        const y = (cellHeight + gutter) * newRow;
        return {
          row: newRow,
          col: newCol,
          items: [
            ...previousItems,
            {
              width: cellWidth,
              height: cellHeight,
              x,
              y,
              centerX: x + cellWidth / 2,
              centerY: y + cellHeight / 2,
              offsetXCenter: getOffsetXCenter({
                canvasWidth: canvas.width,
                width: cellWidth,
                gutter,
                numberOfColumn
              }),
              offsetYCenter: getOffsetYCenter({
                canvasHeight: canvas.height,
                height: cellHeight,
                gutter,
                numberOfRow
              }),
              gutter,
              numberOfColumn
            }
          ]
        };
      },
      { row: 0, col: -1, items: [] }
    );
  };
  var getOffsetXCenter = ({
    canvasWidth,
    width,
    gutter,
    numberOfColumn
  }) => {
    return canvasWidth / 2 - (width + gutter) * numberOfColumn / 2 - width / 2;
  };
  var getOffsetYCenter = ({
    canvasHeight,
    height,
    gutter,
    numberOfRow
  }) => {
    return canvasHeight / 2 - (height + gutter) * (numberOfRow + 1) / 2 - height / 2;
  };

  // src/js/component/pages/animatedPattern/animatedPatternN0/animation/animation.js
  var animatedPatternN0Animation = ({
    canvas,
    numberOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
    fill,
    disableOffcanvas,
    stagger,
    reorder
  }) => {
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });
    let isActive = true;
    let gridData = [];
    let data2 = [];
    let gridTween = {};
    let gridTimeline = {};
    let ctx = canvas.getContext(context, { alpha: false });
    const { activeRoute } = mainStore.get();
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gridData = createGrid({
      canvas,
      numberOfRow,
      numberOfColumn,
      cellWidth,
      cellHeight,
      gutter
    }).items;
    data2 = reorder ? gridData.map((item, i) => {
      return {
        ...item,
        scale: 1,
        rotate: 0,
        hasFill: fill.includes(i)
      };
    }).sort((value) => value.hasFill ? -1 : 1).reverse() : gridData.map((item, i) => {
      const hasFill = fill.includes(i);
      return {
        ...item,
        scale: 1,
        rotate: 0,
        hasFill
      };
    });
    gridTween = tween.createTween({
      ease: "easeInOutQuad",
      stagger,
      data: { scale: 1, rotate: 0 }
    });
    data2.forEach((item) => {
      gridTween.subscribeCache(item, ({ scale, rotate }) => {
        item.rotate = rotate;
        item.scale = scale;
      });
    });
    const draw = () => {
      if (!ctx) return;
      if (useOffscreen) {
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;
      }
      const context2 = useOffscreen ? offScreenCtx : ctx;
      context2.fillStyle = canvasBackground;
      context2.fillRect(0, 0, canvas.width, canvas.height);
      data2.forEach(
        ({
          x,
          y,
          centerX,
          centerY,
          width,
          height,
          rotate,
          scale,
          hasFill,
          offsetXCenter,
          offsetYCenter
        }) => {
          const rotation = Math.PI / 180 * rotate;
          const xx = Math.cos(rotation) * scale;
          const xy = Math.sin(rotation) * scale;
          context2.setTransform(
            xx,
            xy,
            -xy,
            xx,
            Math.round(centerX + offsetXCenter),
            Math.round(centerY + offsetYCenter)
          );
          context2.beginPath();
          context2.rect(
            Math.round(-centerX + x),
            Math.round(-centerY + y),
            width,
            height
          );
          if (hasFill) {
            context2.fillStyle = "#fff";
            context2.fill();
          } else {
            context2.fillStyle = "#000";
            context2.fill();
            context2.strokeStyle = "#333";
            context2.stroke();
          }
          context2.setTransform(1, 0, 0, 1, 0, 0);
        }
      );
      copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };
    gridTimeline = timeline.createAsyncTimeline({ repeat: -1, yoyo: true }).label({ name: "label1" }).goTo(gridTween, { scale: 1.5, rotate: 90 }, { duration: 1e3 }).goTo(gridTween, { scale: 0.5 }, { duration: 500 }).goTo(gridTween, { rotate: 180, scale: 1.2 }, { duration: 500 }).goTo(gridTween, { scale: 1.3 }, { duration: 500 }).goTo(gridTween, { scale: 1 }, { duration: 1200 });
    gridTimeline.onLoopEnd(({ direction: direction2, loop: loop2 }) => {
      console.log(`loop end: ${direction2}, ${loop2}`);
    });
    gridTimeline.play();
    const loop = () => {
      draw();
      if (!isActive) return;
      mobCore.useNextFrame(() => loop());
    };
    mobCore.useFrame(({ time: time2 }) => {
      loop({ time: time2 });
    });
    const unsubscribeResize = mobCore.useResize(() => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      data2.forEach((item) => {
        const { width, height, gutter: gutter2, numberOfColumn: numberOfColumn2 } = item;
        item.offsetXCenter = getOffsetXCenter({
          canvasWidth: canvas.width,
          width,
          gutter: gutter2,
          numberOfColumn: numberOfColumn2
        });
        item.offsetYCenter = getOffsetYCenter({
          canvasHeight: canvas.height,
          height,
          gutter: gutter2,
          numberOfRow
        });
      });
      mobCore.useFrame(() => draw());
    });
    const unWatchPause = navigationStore.watch("navigationIsOpen", (val2) => {
      if (val2) {
        gridTimeline?.stop();
        isActive = false;
        return;
      }
      setTimeout(async () => {
        isActive = true;
        const { activeRoute: currentRoute } = mainStore.get();
        if (currentRoute.route !== activeRoute.route) return;
        gridTimeline?.play();
        mobCore.useFrame(() => loop());
      }, 500);
    });
    return () => {
      gridTween.destroy();
      gridTimeline.destroy();
      unsubscribeResize();
      unWatchPause();
      gridTween = null;
      gridTimeline = null;
      ctx = null;
      offscreen = null;
      offScreenCtx = null;
      gridData = [];
      data2 = [];
      isActive = false;
    };
  };

  // src/js/component/pages/animatedPattern/animatedPatternN0/animatedPatternN0.js
  var AnimatedPatternN0Fn = ({
    onMount,
    html,
    getState,
    setRef,
    getRef
  }) => {
    const { prevRoute, nextRoute, title } = getState();
    document.body.style.background = "#000000";
    const setQuickNavState = setStateByName("quick_nav");
    const setMainTitleState = setStateByName("animation_title");
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(() => {
      if (motionCore.mq("max", "desktop")) {
        document.body.style.background = "";
        return;
      }
      const { wrap, canvas } = getRef();
      setQuickNavState("active", true);
      setQuickNavState("prevRoute", prevRoute);
      setQuickNavState("nextRoute", nextRoute);
      setQuickNavState("color", "white");
      setMainTitleState("align", "left");
      setMainTitleState("color", "white");
      setMainTitleState("title", title);
      const { animatedPatternN0: animatedPatternN02 } = getLegendData();
      const { source } = animatedPatternN02;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "component",
          source: source.component
        },
        {
          label: "animation",
          source: source.animation
        }
      ]);
      setCodeButtonState("color", "white");
      const destroyAnimation = animatedPatternN0Animation({
        canvas,
        ...getState()
      });
      mobCore.useFrame(() => {
        wrap.classList.add("active");
      });
      return () => {
        destroyAnimation();
        setQuickNavState("active", false);
        setQuickNavState("prevRoute", "");
        setQuickNavState("nextRoute", "");
        setMainTitleState("align", "");
        setMainTitleState("title", "");
        setCodeButtonState("drawers", []);
        document.body.style.background = "";
      };
    });
    return html`
        <div>
            <div class="c-canvas">
                <div class="c-canvas__wrap" ${setRef("wrap")}>
                    <canvas ${setRef("canvas")}></canvas>
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/pages/animatedPattern/animatedPatternN0/definition.js
  var AnimatedPatternN0 = createComponent({
    name: "animatedpattern-n0",
    component: AnimatedPatternN0Fn,
    exportState: [
      "title",
      "nextRoute",
      "prevRoute",
      "numberOfRow",
      "numberOfColumn",
      "cellWidth",
      "cellHeight",
      "gutter",
      "fill",
      "stagger",
      "reorder",
      "disableOffcanvas"
    ],
    state: {
      title: () => ({
        value: "",
        type: String
      }),
      nextRoute: () => ({
        value: "",
        type: String
      }),
      prevRoute: () => ({
        value: "",
        type: String
      }),
      numberOfRow: () => ({
        value: 10,
        type: Number
      }),
      numberOfColumn: () => ({
        value: 10,
        type: Number
      }),
      cellWidth: () => ({
        value: 65,
        type: Number
      }),
      cellHeight: () => ({
        value: 65,
        type: Number
      }),
      gutter: () => ({
        value: 1,
        type: Number
      }),
      fill: () => ({
        value: [16, 27, 38, 49, 60, 71, 82, 93],
        type: Array
      }),
      stagger: () => ({
        value: {
          each: 5,
          grid: { col: 11, row: 11, direction: "row" },
          waitComplete: false
        },
        type: "any"
      }),
      reorder: () => ({
        value: true,
        type: Boolean
      }),
      disableOffcanvas: () => ({
        value: detectFirefox() || detectSafari() ? true : false,
        type: Boolean
      })
    }
  });

  // src/js/pages/canvas/animatedPatternN0/animatedPatternN0Params.js
  var animatedPatternN0Params = [
    {
      title: "Animated pattern N.0 v0",
      animation: {},
      nav: {
        prevRoute: "#caterpillarN2",
        nextRoute: "#animatedPatternN0?version=1&activeId=1"
      }
    },
    {
      title: "Animated pattern N.0 v1",
      animation: {
        fill: [
          0,
          13,
          20,
          45,
          65,
          71,
          72,
          73,
          74,
          75,
          76,
          77,
          83,
          92,
          96,
          113,
          117,
          134,
          138,
          155,
          156,
          157,
          158,
          159,
          189,
          209
        ],
        gutter: 1,
        numberOfColumn: 20,
        numberOfRow: 10,
        cellWidth: 50,
        cellHeight: 50,
        stagger: {
          each: 2,
          from: "random",
          waitComplete: false
        },
        reorder: false
      },
      nav: {
        prevRoute: "#animatedPatternN0?version=0&activeId=0",
        nextRoute: "#animatedPatternN0?version=2&activeId=2"
      }
    },
    {
      title: "Animated pattern N.0 v2",
      animation: {
        fill: [
          0,
          13,
          20,
          45,
          65,
          71,
          72,
          73,
          74,
          75,
          76,
          77,
          83,
          92,
          96,
          113,
          117,
          134,
          138,
          155,
          156,
          157,
          158,
          159,
          189,
          209
        ],
        gutter: 1,
        numberOfColumn: 10,
        numberOfRow: 10,
        cellWidth: 50,
        cellHeight: 50,
        stagger: {
          each: 10,
          from: "edges",
          waitComplete: false
        },
        reorder: false
      },
      nav: {
        prevRoute: "#animatedPatternN0?version=1&activeId=1",
        nextRoute: "#animatedPatternN0?version=3&activeId=3"
      }
    },
    {
      title: "Animated pattern N.0 v3",
      animation: {
        fill: [],
        gutter: 1,
        numberOfColumn: 12,
        numberOfRow: 13,
        cellWidth: 50,
        cellHeight: 50,
        stagger: {
          each: 20,
          from: { x: 6, y: 6 },
          grid: {
            col: 13,
            row: 13,
            direction: "radial"
          },
          waitComplete: false
        },
        reorder: false
      },
      nav: {
        prevRoute: "#animatedPatternN0?version=2&activeId=2",
        nextRoute: "#animatedPatternN1"
      }
    }
  ];

  // src/js/pages/canvas/animatedPatternN0/index.js
  useComponent([AnimatedPatternN0]);
  var animatedPatternN0 = ({ params }) => {
    const { version } = params;
    const props = animatedPatternN0Params[Math.max(
      0,
      Math.min(Number(version), animatedPatternN0Params.length - 1)
    )];
    return renderHtml`<div class="l-padding">
        <animatedpattern-n0
            ${staticProps({
      ...props.animation,
      prevRoute: props.nav.prevRoute,
      nextRoute: props.nav.nextRoute,
      title: props.title
    })}
        ></animatedpattern-n0>
    </div>`;
  };

  // src/js/component/pages/animatedPattern/animatedPatternN1/animation/animation.js
  var animatedPatternN1Animation = ({
    canvas,
    numberOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
    fill,
    disableOffcanvas
  }) => {
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });
    let isActive = true;
    let gridData = [];
    let data2 = [];
    let centerTween = {};
    let gridTween = {};
    let gridTimeline = {};
    let { top, left } = offset(canvas);
    let ctx = canvas.getContext(context, { alpha: false });
    const { activeRoute } = mainStore.get();
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gridData = createGrid({
      canvas,
      numberOfRow,
      numberOfColumn,
      cellWidth,
      cellHeight,
      gutter
    }).items;
    data2 = gridData.map((item, i) => {
      return {
        ...item,
        scale: 0,
        mouseX: 0,
        mouseY: 0,
        hasFill: fill.includes(i)
      };
    }).sort((value) => value.hasFill ? -1 : 1);
    centerTween = tween.createLerp({
      data: { mouseX: 0, mouseY: 0 }
    });
    data2.forEach((item) => {
      centerTween.subscribeCache(item, ({ mouseX, mouseY }) => {
        item.mouseX = mouseX;
        item.mouseY = mouseY;
      });
    });
    gridTween = tween.createTween({
      ease: "easeInOutSine",
      stagger: {
        each: 5,
        from: "center",
        // grid: { col: 15, row: 7, direction: 'row' },
        waitComplete: false
      },
      data: { scale: 0 }
    });
    data2.forEach((item) => {
      gridTween.subscribeCache(item, ({ scale }) => {
        item.scale = scale;
      });
    });
    const draw = () => {
      if (!ctx) return;
      if (useOffscreen) {
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;
      }
      const context2 = useOffscreen ? offScreenCtx : ctx;
      context2.fillStyle = canvasBackground;
      context2.fillRect(0, 0, canvas.width, canvas.height);
      data2.forEach(
        ({
          x,
          y,
          centerX,
          centerY,
          width,
          height,
          mouseX,
          mouseY,
          scale,
          hasFill,
          offsetXCenter,
          offsetYCenter
        }) => {
          const mouseXparsed = mouseX - (canvas.width - (width + gutter) * numberOfColumn) / 2;
          const mouseYparsed = mouseY - (canvas.height - (height + gutter) * numberOfRow) / 2;
          const xScale = (x - mouseXparsed) / 250;
          const yScale = (y - mouseYparsed) / 250;
          const delta = Math.sqrt(
            Math.pow(Math.abs(xScale), 2) + Math.pow(Math.abs(yScale), 2)
          );
          const scaleFactor = clamp(Math.abs(delta), 0, 2);
          const rotation = 0;
          const xx = Math.cos(rotation) * (scaleFactor + scale);
          const xy = Math.sin(rotation) * (scaleFactor + scale);
          context2.setTransform(
            xx,
            xy,
            -xy,
            xx,
            Math.round(centerX + offsetXCenter),
            Math.round(centerY + offsetYCenter)
          );
          context2.beginPath();
          context2.rect(
            Math.round(-centerX + x),
            Math.round(-centerY + y),
            width,
            height
          );
          if (hasFill) {
            context2.fillStyle = "#fff";
            context2.fill();
          } else {
            context2.fillStyle = "#000";
            context2.fill();
          }
          context2.setTransform(1, 0, 0, 1, 0, 0);
        }
      );
      copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };
    gridTimeline = timeline.createAsyncTimeline({ repeat: -1, yoyo: true }).goTo(gridTween, { scale: 0.3 }, { duration: 1e3 });
    gridTimeline.play();
    const move = ({ x, y }) => {
      centerTween.goTo({ mouseX: x - left, mouseY: y - top });
    };
    const unsubscribeMouseMove = mobCore.useMouseMove(({ client }) => {
      const { x, y } = client;
      move({ x, y });
    });
    const unsubscribeTouchMove = mobCore.useTouchMove(({ client }) => {
      const { x, y } = client;
      move({ x, y });
    });
    const loop = () => {
      draw();
      if (!isActive) return;
      mobCore.useNextFrame(() => loop());
    };
    mobCore.useFrame(({ time: time2 }) => {
      loop({ time: time2 });
    });
    const unsubscribeResize = mobCore.useResize(() => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      top = offset(canvas).top;
      left = offset(canvas).left;
      data2.forEach((item) => {
        const { width, height, gutter: gutter2, numberOfColumn: numberOfColumn2 } = item;
        item.offsetXCenter = getOffsetXCenter({
          canvasWidth: canvas.width,
          width,
          gutter: gutter2,
          numberOfColumn: numberOfColumn2
        });
        item.offsetYCenter = getOffsetYCenter({
          canvasHeight: canvas.height,
          height,
          gutter: gutter2,
          numberOfRow
        });
      });
      mobCore.useFrame(() => draw());
    });
    const unWatchPause = navigationStore.watch("navigationIsOpen", (val2) => {
      if (val2) {
        gridTimeline?.stop();
        isActive = false;
        return;
      }
      setTimeout(async () => {
        isActive = true;
        const { activeRoute: currentRoute } = mainStore.get();
        if (currentRoute.route !== activeRoute.route) return;
        gridTimeline?.play();
        mobCore.useFrame(() => loop());
      }, 500);
    });
    return () => {
      gridTween.destroy();
      gridTimeline.destroy();
      centerTween.destroy();
      unsubscribeResize();
      unsubscribeMouseMove();
      unsubscribeTouchMove();
      unWatchPause();
      gridTween = null;
      gridTimeline = null;
      centerTween = null;
      ctx = null;
      offscreen = null;
      offScreenCtx = null;
      gridData = [];
      data2 = [];
      isActive = false;
    };
  };

  // src/js/component/pages/animatedPattern/animatedPatternN1/animatedPatternN1.js
  var AnimatedPatternN1Fn = ({
    onMount,
    html,
    getState,
    setRef,
    getRef
  }) => {
    document.body.style.background = "#000000";
    const setQuickNavState = setStateByName("quick_nav");
    const setMainTitleState = setStateByName("animation_title");
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(() => {
      if (motionCore.mq("max", "desktop")) {
        document.body.style.background = "";
        return;
      }
      const { wrap, canvas } = getRef();
      setQuickNavState("active", true);
      setQuickNavState(
        "prevRoute",
        "#animatedPatternN0?version=3&activeId=3"
      );
      setQuickNavState("nextRoute", "#scrollerN0?version=0&activeId=0");
      setQuickNavState("color", "white");
      setMainTitleState("align", "left");
      setMainTitleState("color", "white");
      setMainTitleState("title", "Animated pattern N1");
      const { animatedPatternN1: animatedPatternN12 } = getLegendData();
      const { source } = animatedPatternN12;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "component",
          source: source.component
        },
        {
          label: "animation",
          source: source.animation
        }
      ]);
      setCodeButtonState("color", "white");
      const destroyAnimation = animatedPatternN1Animation({
        canvas,
        ...getState()
      });
      mobCore.useFrame(() => {
        wrap.classList.add("active");
      });
      return () => {
        setQuickNavState("active", false);
        setQuickNavState("prevRoute", "");
        setQuickNavState("nextRoute", "");
        setMainTitleState("align", "");
        setMainTitleState("title", "");
        setCodeButtonState("drawers", []);
        document.body.style.background = "";
        destroyAnimation();
      };
    });
    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped"
                    ${setRef("wrap")}
                >
                    <canvas ${setRef("canvas")}></canvas>
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/pages/animatedPattern/animatedPatternN1/definition.js
  var AnimatedPatternN1 = createComponent({
    name: "animatedpattern-n1",
    component: AnimatedPatternN1Fn,
    exportState: [
      "numberOfRow",
      "numberOfColumn",
      "cellWidth",
      "cellHeight",
      "gutter",
      "fill",
      "disableOffcanvas"
    ],
    state: {
      numberOfRow: 7,
      numberOfColumn: 15,
      cellWidth: 70,
      cellHeight: 70,
      gutter: 10,
      fill: [
        2,
        18,
        10,
        27,
        21,
        22,
        23,
        24,
        25,
        25,
        26,
        37,
        42,
        53,
        58,
        69,
        74,
        85,
        86,
        87,
        88,
        89,
        90,
        44,
        60,
        65,
        66
      ],
      disableOffcanvas: () => ({
        value: detectFirefox() || detectSafari() ? true : false,
        type: Boolean
      })
    }
  });

  // src/js/pages/canvas/animatedPatternN1/index.js
  useComponent([AnimatedPatternN1]);
  var animatedPatternN1 = () => {
    return renderHtml`<div class="l-padding">
        <animatedpattern-n1></animatedpattern-n1>
    </div>`;
  };

  // src/js/component/pages/canvas/caterpillarN0/animation/animation.js
  function getWithRounded({ width, relativeIndex, amountOfPath }) {
    return Math.sqrt(
      Math.pow(width * relativeIndex, 2) - Math.pow(
        width * relativeIndex / amountOfPath * relativeIndex,
        2
      )
    ) * 2;
  }
  function getHeightRounded({ height, relativeIndex, amountOfPath }) {
    return Math.sqrt(
      Math.pow(height * relativeIndex, 2) - Math.pow(
        height * relativeIndex / amountOfPath * relativeIndex,
        2
      )
    ) * 2;
  }
  var caterpillarN0Animation = ({
    canvas,
    amountOfPath,
    width,
    height,
    fill,
    stroke,
    opacity,
    spacerY,
    intialRotation,
    perpetualRatio,
    mouseMoveRatio,
    disableOffcanvas
  }) => {
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });
    let isActive = true;
    let ctx = canvas.getContext(context, { alpha: false });
    let stemData = [];
    let steamDataReorded = [];
    let mainTween = {};
    let { left } = offset(canvas);
    const { activeRoute } = mainStore.get();
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    const useRadius = false;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    stemData = [...new Array(amountOfPath).keys()].map((_item, i) => {
      const count = i;
      const index = count < amountOfPath / 2 ? amountOfPath - count : count;
      const relativeIndex = index - (amountOfPath - index);
      return {
        width: Math.floor(
          getWithRounded({ width, relativeIndex, amountOfPath })
        ),
        height: Math.floor(
          getHeightRounded({ height, relativeIndex, amountOfPath })
        ),
        fill,
        stroke,
        opacity: relativeIndex * opacity,
        rotate: 0,
        y: 0,
        relativeIndex,
        index: i
      };
    });
    steamDataReorded = stemData.splice(0, stemData.length / 2).concat(stemData.reverse());
    mainTween = tween.createSpring({
      data: { rotate: 0, y: 0 },
      stagger: { each: 5, from: "center" }
    });
    [...steamDataReorded].forEach((item) => {
      mainTween.subscribeCache(item, ({ rotate }) => {
        item.rotate = rotate;
      });
    });
    const draw = ({ time: time2 = 0 }) => {
      if (!ctx) return;
      if (useOffscreen) {
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;
      }
      const context2 = useOffscreen ? offScreenCtx : ctx;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      context2.fillStyle = canvasBackground;
      context2.fillRect(0, 0, canvas.width, canvas.height);
      steamDataReorded.forEach(
        ({ width: width2, height: height2, opacity: opacity2, rotate, relativeIndex, index: i }) => {
          const offset2 = Math.sin(time2 / 1e3) * perpetualRatio * relativeIndex;
          const offsetInverse = i < amountOfPath / 2 ? offset2 + 15 * relativeIndex / 2 : -offset2 - 15 * relativeIndex / 2;
          const centerDirection = i < amountOfPath / 2 ? -1 : 1;
          const scale = 1;
          const rotation = Math.PI / 180 * (rotate - intialRotation);
          const xx = Math.cos(rotation) * scale;
          const xy = Math.sin(rotation) * scale;
          context2.setTransform(
            xx,
            xy,
            -xy,
            xx,
            centerX,
            centerY + height2 / 2
          );
          if (useRadius) {
            context2.beginPath();
            context2.roundRect(
              -(width2 * centerDirection) / 2,
              -height2 / 2 + offsetInverse + spacerY(i < amountOfPath / 2),
              width2,
              height2,
              [200, 0]
            );
          } else {
            context2.beginPath();
            context2.rect(
              -(width2 * centerDirection) / 2,
              -height2 / 2 + offsetInverse + spacerY(i < amountOfPath / 2),
              width2,
              height2
            );
          }
          context2.strokeStyle = `rgba(255, 255, 255, ${opacity2})`;
          context2.fillStyle = `rgba(26, 27, 38, ${opacity2})`;
          context2.stroke();
          context2.fill();
          context2.setTransform(1, 0, 0, 1, 0, 0);
        }
      );
      copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };
    const loop = ({ time: time2 = 0 }) => {
      draw({ time: time2 });
      if (!isActive) return;
      mobCore.useNextFrame(({ time: time3 }) => loop({ time: time3 }));
    };
    mobCore.useFrame(({ time: time2 }) => {
      loop({ time: time2 });
    });
    const unsubscribeResize = mobCore.useResize(() => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      left = offset(canvas).left;
      mobCore.useFrame(({ time: time2 }) => {
        draw({ time: time2 });
      });
    });
    const move = ({ x }) => {
      const xCenter = x - canvas.width / 2 - left;
      mainTween.goTo({
        rotate: xCenter / mouseMoveRatio
      });
    };
    const unsubscribeMouseMove = mobCore.useMouseMove(({ client }) => {
      const { x } = client;
      move({ x });
    });
    const unsubscribeTouchMove = mobCore.useTouchMove(({ client }) => {
      const { x } = client;
      move({ x });
    });
    const unWatchPause = navigationStore.watch("navigationIsOpen", (val2) => {
      if (val2) {
        isActive = false;
        return;
      }
      setTimeout(() => {
        isActive = true;
        const { activeRoute: currentRoute } = mainStore.get();
        if (currentRoute.route !== activeRoute.route) return;
        mobCore.useFrame(({ time: time2 }) => loop({ time: time2 }));
      }, 500);
    });
    return () => {
      mainTween.destroy();
      unsubscribeResize();
      unsubscribeMouseMove();
      unsubscribeTouchMove();
      unWatchPause();
      ctx = null;
      offscreen = null;
      offScreenCtx = null;
      mainTween = null;
      steamDataReorded = [];
      stemData = [];
      isActive = false;
    };
  };

  // src/js/component/pages/canvas/caterpillarN0/caterpillarN0.js
  var CaterpillarN0Fn = ({
    onMount,
    html,
    getState,
    setRef,
    getRef
  }) => {
    document.body.style.background = "#000000";
    const setQuickNavState = setStateByName("quick_nav");
    const setMainTitleState = setStateByName("animation_title");
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(() => {
      if (motionCore.mq("max", "desktop")) {
        document.body.style.background = "";
        return;
      }
      const { wrap, canvas } = getRef();
      setQuickNavState("active", true);
      setQuickNavState("nextRoute", "#caterpillarN1");
      setQuickNavState("color", "white");
      setMainTitleState("align", "left");
      setMainTitleState("color", "white");
      setMainTitleState("title", "Caterpillar N0");
      const { caterpillarN0: caterpillarN02 } = getLegendData();
      const { source } = caterpillarN02;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "component",
          source: source.component
        },
        {
          label: "animation",
          source: source.animation
        }
      ]);
      setCodeButtonState("color", "white");
      const destroyAnimation = caterpillarN0Animation({
        canvas,
        ...getState()
      });
      mobCore.useFrame(() => {
        wrap.classList.add("active");
      });
      return () => {
        destroyAnimation();
        setQuickNavState("active", false);
        setQuickNavState("prevRoute", "");
        setQuickNavState("nextRoute", "");
        setMainTitleState("align", "");
        setMainTitleState("title", "");
        setCodeButtonState("drawers", []);
        document.body.style.background = "";
      };
    });
    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped c-canvas__wrap--border"
                    ${setRef("wrap")}
                >
                    <canvas ${setRef("canvas")}></canvas>
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/pages/canvas/caterpillarN0/definition.js
  var CaterpillarN0 = createComponent({
    name: "caterpillar-n0",
    component: CaterpillarN0Fn,
    exportState: [
      "nextRoute",
      "prevRoute",
      "amountOfPath",
      "width",
      "height",
      "radius",
      "fill",
      "stroke",
      "opacity",
      "spacerY",
      "intialRotation",
      "perpetualRatio",
      "mouseMoveRatio",
      "disableOffcanvas"
    ],
    state: {
      nextRoute: () => ({
        value: "",
        type: String
      }),
      prevRoute: () => ({
        value: "",
        type: String
      }),
      amountOfPath: 17,
      width: 30,
      height: 30,
      radius: 0,
      fill: "",
      stroke: "#fff",
      opacity: 0.05,
      spacerY: (condition) => condition ? 300 : -400,
      intialRotation: 33,
      perpetualRatio: 6,
      mouseMoveRatio: 10,
      disableOffcanvas: () => ({
        value: detectFirefox() || detectSafari() ? true : false,
        type: Boolean
      })
    }
  });

  // src/js/pages/canvas/caterpillarN0/index.js
  useComponent([CaterpillarN0]);
  var caterpillarN0 = () => {
    return renderHtml`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
    </div>`;
  };

  // src/js/component/pages/canvas/caterpillarN1/animation/animation.js
  var caterpillarN1Animation = ({
    canvas,
    numItems,
    width,
    height,
    fill,
    opacity,
    radius,
    rotationDuration,
    rotationEach,
    centerEach,
    disableOffcanvas
  }) => {
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });
    let isActive = true;
    let ctx = canvas.getContext(context, { alpha: false });
    let squareData = [];
    let rotationTween = {};
    let centerTween = {};
    let rectTimeline = {};
    let { top, left } = offset(canvas);
    const { activeRoute } = mainStore.get();
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    const useRadius = false;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    squareData = [...new Array(numItems).keys()].map((_item, i) => {
      const relativeIndex = i >= numItems / 2 ? numItems / 2 + (numItems / 2 - i) : i;
      const opacityVal = fill.includes(i) ? 1 : relativeIndex * opacity;
      return {
        width: relativeIndex * width,
        height: relativeIndex * height,
        x: 0,
        y: 0,
        hasFill: fill.includes(i),
        opacity: opacityVal,
        radius,
        rotate: 0,
        relativeIndex
      };
    });
    rotationTween = tween.createTween({
      data: { rotate: 0 },
      stagger: { each: rotationEach, from: "center" },
      ease: "easeLinear",
      relative: true
    });
    [...squareData].forEach((item) => {
      rotationTween.subscribeCache(item, ({ rotate }) => {
        item.rotate = rotate;
      });
    });
    centerTween = tween.createSpring({
      data: { x: 0, y: 0 },
      stagger: { each: centerEach, from: "end" }
    });
    [...squareData].forEach((item) => {
      centerTween.subscribeCache(item, ({ x, y }) => {
        item.x = x;
        item.y = y;
      });
    });
    const draw = () => {
      if (!ctx) return;
      if (useOffscreen) {
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;
      }
      const context2 = useOffscreen ? offScreenCtx : ctx;
      context2.fillStyle = canvasBackground;
      context2.fillRect(0, 0, canvas.width, canvas.height);
      squareData.forEach(
        ({ width: width2, height: height2, x, y, opacity: opacity2, rotate, hasFill }, i) => {
          const unitInverse = squareData.length - i;
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const scale = 1;
          const rotation = Math.PI / 180 * rotate;
          const xx = Math.cos(rotation) * scale;
          const xy = Math.sin(rotation) * scale;
          context2.setTransform(
            xx,
            xy,
            -xy,
            xx,
            centerX + x + unitInverse * x / 20,
            centerY + y + unitInverse * y / 20
          );
          if (useRadius) {
            context2.beginPath();
            context2.roundRect(
              Number.parseInt(-width2 / 2),
              Number.parseInt(-height2 / 2),
              width2,
              height2,
              [200, 0]
            );
          } else {
            context2.beginPath();
            context2.rect(
              Number.parseInt(-width2 / 2),
              Number.parseInt(-height2 / 2),
              width2,
              height2
            );
          }
          if (hasFill) {
            context2.fillStyle = `rgba(255, 255, 255, 1)`;
          } else {
            context2.fillStyle = `rgba(26, 27, 38, ${opacity2})`;
            context2.strokeStyle = `rgba(255, 255, 255, ${opacity2})`;
            context2.stroke();
          }
          context2.fill();
          context2.setTransform(1, 0, 0, 1, 0, 0);
        }
      );
      copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };
    rectTimeline = timeline.createAsyncTimeline({
      repeat: -1,
      yoyo: false
    });
    rectTimeline.goTo(
      rotationTween,
      { rotate: 360 },
      { duration: rotationDuration }
    );
    rectTimeline.play();
    const loop = () => {
      draw();
      if (!isActive) return;
      mobCore.useNextFrame(() => loop());
    };
    mobCore.useFrame(() => loop());
    const unsubscribeResize = mobCore.useResize(() => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      top = offset(canvas).top;
      left = offset(canvas).left;
      draw();
    });
    const move = ({ x, y }) => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const xCenter = x - canvas.width / 2 - left;
      const yCenter = y - canvas.height / 2 - top;
      centerTween.goTo({
        x: clamp(
          xCenter,
          -winWidth / 2 + 400 + left,
          winWidth / 2 - 400 - left
        ),
        y: clamp(
          yCenter,
          -winHeight / 2 + 200 + top,
          winHeight / 2 - 200 - top
        )
      });
    };
    const unsubscribeMouseMove = mobCore.useMouseMove(({ client }) => {
      const { x, y } = client;
      move({ x, y });
    });
    const unsubscribeTouchMove = mobCore.useTouchMove(({ client }) => {
      const { x, y } = client;
      move({ x, y });
    });
    const unWatchPause = navigationStore.watch("navigationIsOpen", (val2) => {
      if (val2) {
        isActive = false;
        rectTimeline?.pause();
        return;
      }
      setTimeout(() => {
        isActive = true;
        const { activeRoute: currentRoute } = mainStore.get();
        if (currentRoute.route !== activeRoute.route) return;
        rectTimeline?.resume();
        mobCore.useFrame(() => loop());
      }, 500);
    });
    return () => {
      rotationTween.destroy();
      centerTween.destroy();
      rectTimeline.destroy();
      unsubscribeResize();
      unsubscribeMouseMove();
      unsubscribeTouchMove();
      unWatchPause();
      rotationTween = null;
      centerTween = null;
      rectTimeline = null;
      ctx = null;
      offscreen = null;
      offScreenCtx = null;
      squareData = [];
      isActive = false;
    };
  };

  // src/js/component/pages/canvas/caterpillarN1/caterpillarN1.js
  var CaterpillarN1Fn = ({
    onMount,
    html,
    getState,
    getRef,
    setRef
  }) => {
    document.body.style.background = "#000000";
    const setQuickNavState = setStateByName("quick_nav");
    const setMainTitleState = setStateByName("animation_title");
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(() => {
      if (motionCore.mq("max", "desktop")) {
        document.body.style.background = "";
        return;
      }
      const { wrap, canvas } = getRef();
      setQuickNavState("active", true);
      setQuickNavState("prevRoute", "#caterpillarN0");
      setQuickNavState("nextRoute", "#caterpillarN2");
      setQuickNavState("color", "white");
      setMainTitleState("align", "left");
      setMainTitleState("color", "white");
      setMainTitleState("title", "Caterpillar N1");
      const { caterpillarN1: caterpillarN12 } = getLegendData();
      const { source } = caterpillarN12;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "component",
          source: source.component
        },
        {
          label: "animation",
          source: source.animation
        }
      ]);
      setCodeButtonState("color", "white");
      const destroyAnimation = caterpillarN1Animation({
        canvas,
        ...getState()
      });
      mobCore.useFrame(() => {
        wrap.classList.add("active");
      });
      return () => {
        destroyAnimation();
        setQuickNavState("active", false);
        setQuickNavState("prevRoute", "");
        setQuickNavState("nextRoute", "");
        setMainTitleState("align", "");
        setMainTitleState("title", "");
        setCodeButtonState("drawers", []);
        document.body.style.background = "";
      };
    });
    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped c-canvas__wrap--border"
                    ${setRef("wrap")}
                >
                    <canvas ${setRef("canvas")}></canvas>
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/pages/canvas/caterpillarN1/definition.js
  var CaterpillarN1 = createComponent({
    name: "caterpillar-n1",
    component: CaterpillarN1Fn,
    exportState: [
      "numItems",
      "width",
      "height",
      "fill",
      "opacity",
      "radius",
      "rotationEach",
      "centerEach",
      "rotationDuration",
      "disableOffcanvas"
    ],
    state: {
      numItems: 20,
      width: 40,
      height: 40,
      fill: [14],
      opacity: 0.05,
      radius: 0,
      rotationEach: 15,
      centerEach: 3,
      rotationDuration: 5e3,
      disableOffcanvas: () => ({
        value: detectFirefox() || detectSafari() ? true : false,
        type: Boolean
      })
    }
  });

  // src/js/pages/canvas/caterpillarN1/index.js
  useComponent([CaterpillarN1]);
  var caterpillarN1 = () => {
    return renderHtml`<div class="l-padding">
        <caterpillar-n1></caterpillar-n1>
    </div>`;
  };

  // src/js/component/pages/canvas/caterpillarN2/animation/animation.js
  var logAddMethods = ({ value, direction: direction2, isForced }) => {
    if (isForced) return;
    console.log(`current: ${value}, direction: ${direction2}`);
  };
  var caterpillarN2Animation = ({
    canvas,
    numItems,
    width,
    height,
    radius,
    fill,
    opacity,
    xAmplitude,
    yAmplitude,
    duration: duration2,
    friction,
    rotationDefault,
    disableOffcanvas
  }) => {
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });
    let isActive = true;
    let ctx = canvas.getContext(context, { alpha: false });
    let squareData = [];
    let userRotation = rotationDefault;
    const { activeRoute } = mainStore.get();
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    const useRadius = false;
    squareData = [...new Array(numItems).keys()].map((_item, i) => {
      const relativeIndex = i >= numItems / 2 ? numItems / 2 + (numItems / 2 - i) : i;
      const itemWidth = width + width / 3 * relativeIndex;
      const itemHeight = height + height / 3 * relativeIndex;
      const opacityVal = fill.includes(i) ? 1 : (numItems - i) * opacity;
      return {
        width: itemWidth,
        height: itemHeight,
        x: 0,
        y: 0,
        hasFill: fill.includes(i),
        opacity: opacityVal,
        radius,
        rotate: 0
      };
    });
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const infiniteTween = tween.createSequencer({
      stagger: { each: 6 },
      data: { x: duration2 / 4, rotate: 0 },
      duration: duration2
    }).goTo(
      { x: duration2 + duration2 / 4 },
      { start: 0, end: duration2, ease: "easeLinear" }
    ).goTo(
      { rotate: () => -userRotation },
      { start: 0, end: 5, ease: "easeInOutBack" }
    ).goTo({ rotate: 0 }, { start: 5, end: duration2, ease: "easeInOutBack" }).label("mylabel", 2).add(({ isForced, direction: direction2 }) => {
      logAddMethods({ isForced, direction: direction2, value: 1 });
    }, 1).add(({ isForced, direction: direction2 }) => {
      logAddMethods({ isForced, direction: direction2, value: 5 });
    }, 5).add(({ isForced, direction: direction2 }) => {
      logAddMethods({ isForced, direction: direction2, value: 9 });
    }, 9);
    squareData.forEach((item) => {
      infiniteTween.subscribeCache(item, ({ x, rotate }) => {
        const val2 = x / friction;
        const factor = 2 / (3 - Math.cos(2 * val2));
        const xr = factor * Math.cos(val2) * xAmplitude;
        const yr = factor * Math.sin(2 * val2) / 2 * yAmplitude;
        item.x = xr;
        item.y = yr;
        item.rotate = rotate;
      });
    });
    const syncTimeline = timeline.createSyncTimeline({
      repeat: -1,
      yoyo: false,
      duration: 4e3
    }).add(infiniteTween);
    syncTimeline.onLoopEnd(({ loop: loop2, direction: direction2 }) => {
      console.log(`loop end: ${loop2} , ${direction2}`);
    });
    const draw = () => {
      if (!ctx) return;
      if (useOffscreen) {
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;
      }
      const context2 = useOffscreen ? offScreenCtx : ctx;
      context2.fillStyle = canvasBackground;
      context2.fillRect(0, 0, canvas.width, canvas.height);
      squareData.forEach(
        ({ width: width2, height: height2, x, y, radius: radius2, rotate, hasFill, opacity: opacity2 }) => {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const scale = 1;
          const rotation = Math.PI / 180 * rotate;
          const xx = Math.cos(rotation) * scale;
          const xy = Math.sin(rotation) * scale;
          context2.setTransform(xx, xy, -xy, xx, centerX + x, centerY + y);
          if (useRadius) {
            context2.beginPath();
            context2.roundRect(
              Number.parseInt(-width2 / 2),
              Number.parseInt(-height2 / 2),
              width2,
              height2,
              [150, 0]
            );
          } else {
            context2.beginPath();
            context2.rect(
              Number.parseInt(-width2 / 2),
              Number.parseInt(-height2 / 2),
              width2,
              height2,
              radius2
            );
          }
          if (hasFill) {
            context2.fillStyle = `rgba(255, 255, 255, 1)`;
          } else {
            context2.fillStyle = `rgba(26, 27, 38, ${opacity2})`;
            context2.strokeStyle = `rgba(255, 255, 255, ${opacity2})`;
            context2.stroke();
          }
          context2.fill();
          context2.setTransform(1, 0, 0, 1, 0, 0);
        }
      );
      copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };
    const loop = () => {
      draw();
      if (!isActive) return;
      mobCore.useNextFrame(() => loop());
    };
    mobCore.useFrame(() => loop());
    syncTimeline.play();
    const unsubscribeResize = mobCore.useResize(() => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      draw();
    });
    const unWatchPause = navigationStore.watch("navigationIsOpen", (val2) => {
      if (val2) {
        isActive = false;
        syncTimeline?.pause();
        return;
      }
      setTimeout(() => {
        isActive = true;
        const { activeRoute: currentRoute } = mainStore.get();
        if (currentRoute.route !== activeRoute.route) return;
        syncTimeline?.resume();
        mobCore.useFrame(() => loop());
      }, 500);
    });
    return {
      destroy: () => {
        isActive = false;
        unsubscribeResize();
        unWatchPause();
        infiniteTween.destroy();
        syncTimeline.destroy();
        ctx = null;
        offscreen = null;
        offScreenCtx = null;
        squareData = [];
      },
      play: () => {
        syncTimeline.stop();
        syncTimeline.play();
      },
      playReverse: () => {
        syncTimeline.stop();
        syncTimeline.playReverse();
      },
      playUseCurrent: () => syncTimeline.play({ useCurrent: true }),
      playReverseUseCurrent: () => syncTimeline.playReverse({ useCurrent: true }),
      playFromLabel: () => {
        syncTimeline.stop();
        syncTimeline.playFrom("mylabel");
      },
      plaFromLabelReverse: () => {
        syncTimeline.stop();
        syncTimeline.playFromReverse("mylabel");
      },
      stop: () => syncTimeline.stop(),
      pause: () => syncTimeline.pause(),
      resume: () => syncTimeline.resume(),
      reverse: () => syncTimeline.reverse(),
      setRotation: (value) => userRotation = value
    };
  };

  // src/js/component/pages/canvas/caterpillarN2/caterpillarN2.js
  function getControls({ buttons: buttons4 }) {
    return Object.entries(buttons4).map(([className, value]) => {
      const { label } = value;
      return renderHtml` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${className}"
                >
                    ${label}
                </button>
            </li>`;
    }).join("");
  }
  var CaterpillarN2Fn = ({
    onMount,
    html,
    getState,
    setRef,
    getRef
  }) => {
    const { buttons: buttons4, rotationDefault } = getState();
    document.body.style.background = "#000000";
    const setQuickNavState = setStateByName("quick_nav");
    const setMainTitleState = setStateByName("animation_title");
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(({ element }) => {
      if (motionCore.mq("max", "desktop")) {
        document.body.style.background = "";
        return;
      }
      const { wrap, canvas, rangeValue, rotationButton } = getRef();
      setQuickNavState("active", true);
      setQuickNavState("prevRoute", "#caterpillarN1");
      setQuickNavState(
        "nextRoute",
        "#animatedPatternN0?version=0&activeId=0"
      );
      setQuickNavState("color", "black");
      setMainTitleState("align", "left");
      setMainTitleState("color", "white");
      setMainTitleState("title", "Caterpillar N2");
      const { caterpillarN2: caterpillarN22 } = getLegendData();
      const { source } = caterpillarN22;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "component",
          source: source.component
        },
        {
          label: "animation",
          source: source.animation
        }
      ]);
      setCodeButtonState("color", "white");
      const animationMethods = caterpillarN2Animation({
        canvas,
        ...getState()
      });
      const { destroy, setRotation } = animationMethods;
      Object.entries(buttons4).forEach(([className, value]) => {
        const { method } = value;
        const btn = element.querySelector(`.${className}`);
        btn?.addEventListener("click", () => animationMethods?.[method]());
      });
      rotationButton.addEventListener("change", () => {
        const value = rotationButton.value;
        setRotation(value);
        rangeValue.textContent = value;
      });
      mobCore.useFrame(() => {
        wrap.classList.add("active");
      });
      return () => {
        setQuickNavState("active", false);
        setQuickNavState("prevRoute", "");
        setQuickNavState("nextRoute", "");
        setMainTitleState("align", "");
        setMainTitleState("title", "");
        setCodeButtonState("drawers", []);
        document.body.style.background = "";
        destroy();
      };
    });
    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped"
                    ${setRef("wrap")}
                >
                    <ul class="c-canvas__controls">
                        ${getControls({ buttons: buttons4 })}
                        <li class="c-canvas__controls__item">
                            <label class="c-canvas__controls__label">
                                change rotation:
                                <span
                                    class="js-range-value"
                                    ${setRef("rangeValue")}
                                    >${rotationDefault}</span
                                >
                            </label>
                            <div class="c-canvas__controls__range">
                                <input
                                    type="range"
                                    min="0"
                                    max="720"
                                    value="${rotationDefault}"
                                    step="1"
                                    ${setRef("rotationButton")}
                                />
                            </div>
                        </li>
                    </ul>
                    <canvas ${setRef("canvas")}></canvas>
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/pages/canvas/caterpillarN2/definition.js
  var duration = 10;
  var buttons = {
    "js-CN2-play": {
      label: "play",
      method: "play"
    },
    "js-CN2-playReverse": {
      label: "play reverse",
      method: "playReverse"
    },
    "js-CN2-play-current": {
      label: "go forward if is backward",
      method: "playUseCurrent"
    },
    "js-CN2-playReverse-current": {
      label: "go backward if is forward",
      method: "playReverseUseCurrent"
    },
    "js-CN2-play-label": {
      label: "play from label",
      method: "playFromLabel"
    },
    "js-CN2-playReverse-label": {
      label: "play from label reverse",
      method: "plaFromLabelReverse"
    },
    "js-CN2-reverse": {
      label: "reverse",
      method: "reverse"
    },
    "js-CN2-stop": {
      label: "stop",
      method: "stop"
    },
    "js-CN2-pause": {
      label: "pause",
      method: "pause"
    },
    "js-CN2-resume": {
      label: "resume",
      method: "resume"
    }
  };
  var CaterpillarN2 = createComponent({
    name: "caterpillar-n2",
    component: CaterpillarN2Fn,
    exportState: [
      "numItems",
      "width",
      "height",
      "radius",
      "fill",
      "opacity",
      "xAmplitude",
      "yAmplitude",
      "duration",
      "rotationDefault",
      "friction",
      "disableOffcanvas"
    ],
    state: {
      numItems: 20,
      width: 80,
      height: 80,
      radius: 0,
      fill: [2],
      opacity: 0.02,
      xAmplitude: 500,
      yAmplitude: 400,
      duration: 10,
      rotationDefault: 360,
      friction: duration / 2 / Math.PI,
      disableOffcanvas: () => ({
        value: detectFirefox() || detectSafari() ? true : false,
        type: Boolean
      }),
      buttons: () => ({
        value: buttons,
        type: "Any"
      })
    }
  });

  // src/js/pages/canvas/caterpillarN2/index.js
  useComponent([CaterpillarN2]);
  var caterpillarN2 = () => {
    return renderHtml`<div class="l-padding">
        <caterpillar-n2></caterpillar-n2>
    </div>`;
  };

  // src/js/pages/canvas/overview/index.js
  useComponent([DocContainer, DocsTitleSmall, ScrollTo, DocTitle, HtmlContent]);
  var canvas_overview = async () => {
    const { data: data2 } = await loadJsonContent({
      source: "./data/canvas/overview.json"
    });
    return renderHtml` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
      data: data2.data,
      useMaxWidth: true
    })}
        ></html-content>
        <doc-title-small slot="section-title-small">Canvas </doc-title-small>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Canvas</doc-title>
    </doc-container>`;
  };

  // src/js/component/pages/scroller/ScrollerN0/animation/animation.js
  var scrollerN0Animation = ({
    canvas,
    canvasScroller,
    numberOfRow,
    numberOfColumn,
    cellWidth,
    cellHeight,
    gutter,
    fill,
    stagger,
    reorder,
    disableOffcanvas
  }) => {
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });
    let isActive = true;
    let gridData = [];
    let data2 = [];
    let masterSequencer = tween.createMasterSequencer();
    let ctx = canvas.getContext(context, { alpha: false });
    const { activeRoute } = mainStore.get();
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    let wichContext = useOffscreen ? offScreenCtx : ctx;
    const useRadius = roundRectIsSupported(wichContext);
    wichContext = null;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gridData = createGrid({
      canvas,
      numberOfRow,
      numberOfColumn,
      cellWidth,
      cellHeight,
      gutter
    }).items;
    data2 = reorder ? gridData.map((item, i) => {
      return {
        ...item,
        scale: 0,
        rotate: 0,
        hasFill: fill.includes(i)
      };
    }).sort((value) => value.hasFill ? -1 : 1) : gridData.map((item, i) => {
      return {
        ...item,
        scale: 0,
        rotate: 0,
        hasFill: fill.includes(i)
      };
    });
    let staggers = tween.createStaggers({
      items: data2,
      stagger
    });
    let sequencersInstances = staggers.map(({ item, start, end }) => {
      const scale = item.hasFill ? 1.1 : 1;
      const sequencer = tween.createSequencer({ data: { scale: 0 } }).goTo({ scale }, { start, end, ease: "easeInOutQuad" });
      const unsubscribe3 = sequencer.subscribe(({ scale: scale2 }) => {
        item.scale = scale2;
      });
      masterSequencer.add(sequencer);
      return { sequencer, unsubscribe: unsubscribe3 };
    });
    const draw = () => {
      if (!ctx) return;
      if (useOffscreen) {
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;
      }
      const context2 = useOffscreen ? offScreenCtx : ctx;
      context2.fillStyle = canvasBackground;
      context2.fillRect(0, 0, canvas.width, canvas.height);
      data2.forEach(
        ({
          x,
          y,
          centerX,
          centerY,
          width,
          height,
          rotate,
          scale,
          hasFill,
          offsetXCenter,
          offsetYCenter
        }) => {
          const rotation = Math.PI / 180 * rotate;
          const xx = Math.cos(rotation) * scale;
          const xy = Math.sin(rotation) * scale;
          context2.setTransform(
            xx,
            xy,
            -xy,
            xx,
            Math.round(centerX + offsetXCenter),
            Math.round(centerY + offsetYCenter)
          );
          roundRectCustom(
            context2,
            Math.round(-centerX + x),
            Math.round(-centerY + y),
            width,
            height,
            5
          );
          if (useRadius) {
            context2.beginPath();
            context2.roundRect(
              Math.round(-centerX + x),
              Math.round(-centerY + y),
              width,
              height,
              5
            );
          } else {
            context2.beginPath();
            context2.rect(
              Math.round(-centerX + x),
              Math.round(-centerY + y),
              width,
              height
            );
          }
          if (hasFill) {
            context2.fillStyle = "#fff";
            context2.fill();
          } else {
            context2.fillStyle = "#000";
            context2.fill();
            context2.strokeStyle = "#333";
            context2.stroke();
          }
          context2.setTransform(1, 0, 0, 1, 0, 0);
        }
      );
      copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };
    let scrollerInstance = scroller.createScrollTrigger({
      trigger: canvasScroller,
      propierties: "tween",
      tween: masterSequencer,
      dynamicStart: {
        position: "bottom",
        value: () => window.innerHeight
      },
      dynamicEnd: {
        position: "bottom",
        value: () => outerHeight(canvasScroller)
      },
      fromTo: true,
      ease: true,
      easeType: "lerp"
    });
    scrollerInstance.init();
    const loop = () => {
      draw();
      if (!isActive) return;
      mobCore.useNextFrame(() => loop());
    };
    mobCore.useFrame(({ time: time2 }) => {
      loop({ time: time2 });
    });
    const unsubscribeResize = mobCore.useResize(() => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      data2.forEach((item) => {
        const { width, height, gutter: gutter2, numberOfColumn: numberOfColumn2 } = item;
        item.offsetXCenter = getOffsetXCenter({
          canvasWidth: canvas.width,
          width,
          gutter: gutter2,
          numberOfColumn: numberOfColumn2
        });
        item.offsetYCenter = getOffsetYCenter({
          canvasHeight: canvas.height,
          height,
          gutter: gutter2,
          numberOfRow
        });
      });
      mobCore.useFrame(() => draw());
    });
    const unWatchPause = navigationStore.watch("navigationIsOpen", (val2) => {
      if (val2) {
        isActive = false;
        return;
      }
      setTimeout(async () => {
        isActive = true;
        const { activeRoute: currentRoute } = mainStore.get();
        if (currentRoute.route !== activeRoute.route) return;
        mobCore.useFrame(() => loop());
      }, 500);
    });
    return () => {
      unsubscribeResize();
      unWatchPause();
      sequencersInstances.forEach(({ sequencer, unsubscribe: unsubscribe3 }) => {
        sequencer.destroy();
        unsubscribe3();
      });
      sequencersInstances = [];
      masterSequencer.destroy();
      masterSequencer = null;
      staggers = [];
      scrollerInstance.destroy();
      scrollerInstance = null;
      ctx = null;
      offscreen = null;
      offScreenCtx = null;
      gridData = [];
      data2 = [];
      isActive = false;
    };
  };

  // src/js/component/pages/scroller/ScrollerN0/scrollerN0.js
  var ScrollerN0Fn = ({ onMount, html, getState, setRef, getRef }) => {
    const { prevRoute, nextRoute, title } = getState();
    document.body.style.background = "#000000";
    const setScrollDownState = setStateByName("scroll_down_label");
    const setQuickNavState = setStateByName("quick_nav");
    const setMainTitleState = setStateByName("animation_title");
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(() => {
      if (motionCore.mq("max", "desktop")) {
        document.body.style.background = "";
        return;
      }
      setScrollDownState("active", true);
      setQuickNavState("active", true);
      setQuickNavState("prevRoute", prevRoute);
      setQuickNavState("nextRoute", nextRoute);
      setMainTitleState("align", "left");
      setMainTitleState("color", "white");
      setMainTitleState("title", title);
      const { scrollerN0: scrollerN02 } = getLegendData();
      const { source } = scrollerN02;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "component",
          source: source.component
        },
        {
          label: "animation",
          source: source.animation
        }
      ]);
      setCodeButtonState("color", "white");
      const { wrap, canvas, canvasScroller } = getRef();
      window.scrollTo(0, 0);
      const destroyAnimation = scrollerN0Animation({
        canvas,
        canvasScroller,
        ...getState()
      });
      mobCore.useFrame(() => {
        wrap.classList.add("active");
      });
      return () => {
        destroyAnimation();
        setScrollDownState("active", false);
        setQuickNavState("active", false);
        setQuickNavState("prevRoute", "");
        setQuickNavState("nextRoute", "");
        setMainTitleState("align", "");
        setMainTitleState("title", "");
        setCodeButtonState("drawers", []);
        document.body.style.background = "";
      };
    });
    return html`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped"
                    ${setRef("wrap")}
                >
                    <canvas ${setRef("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${setRef("canvasScroller")}></div>
        </div>
    `;
  };

  // src/js/component/pages/scroller/ScrollerN0/definition.js
  var ScrollerN0 = createComponent({
    name: "scroller-n0",
    component: ScrollerN0Fn,
    exportState: [
      "title",
      "nextRoute",
      "prevRoute",
      "numberOfRow",
      "numberOfColumn",
      "cellWidth",
      "cellHeight",
      "gutter",
      "fill",
      "stagger",
      "reorder",
      "disableOffcanvas"
    ],
    state: {
      title: () => ({
        value: "",
        type: String
      }),
      nextRoute: () => ({
        value: "",
        type: String
      }),
      prevRoute: () => ({
        value: "",
        type: String
      }),
      numberOfRow: () => ({
        value: 10,
        type: Number
      }),
      numberOfColumn: () => ({
        value: 10,
        type: Number
      }),
      cellWidth: () => ({
        value: 65,
        type: Number
      }),
      cellHeight: () => ({
        value: 65,
        type: Number
      }),
      gutter: () => ({
        value: 1,
        type: Number
      }),
      fill: () => ({
        value: [
          36,
          37,
          38,
          39,
          40,
          47,
          51,
          58,
          62,
          69,
          73,
          80,
          81,
          82,
          83,
          84
        ],
        type: Array
      }),
      stagger: () => ({
        value: {
          type: "equal",
          each: 6,
          from: "random"
        },
        type: "Any"
      }),
      reorder: () => ({
        value: true,
        type: Boolean
      }),
      disableOffcanvas: () => ({
        value: detectFirefox() || detectSafari() ? true : false,
        type: Boolean
      })
    }
  });

  // src/js/pages/canvas/scroller/scrollerParams.js
  var scrollerParams = [
    {
      title: "Scroller N.0 v0",
      animation: {},
      nav: {
        prevRoute: "#animatedPatternN1",
        nextRoute: "#scrollerN0?version=1&activeId=1"
      }
    },
    {
      title: "Scroller N.0 v1",
      animation: {
        stagger: {
          type: "end",
          each: 1,
          from: { x: 0, y: 0 },
          grid: { col: 11, row: 10, direction: "radial" }
        },
        reorder: false
      },
      nav: {
        prevRoute: "#scrollerN0?version=0&activeId=0",
        nextRoute: "#scrollerN0?version=2&activeId=2"
      }
    },
    {
      title: "Scroller N.0 v2",
      animation: {
        stagger: {
          type: "equal",
          each: 7,
          from: "center",
          grid: { col: 11, row: 10, direction: "col" }
        },
        reorder: false
      },
      nav: {
        prevRoute: "#scrollerN0?version=1&activeId=1",
        nextRoute: "#scrollerN0?version=3&activeId=3"
      }
    },
    {
      title: "Scroller N.0 v3",
      animation: {
        stagger: {
          type: "equal",
          each: 3,
          from: "end",
          grid: { col: 11, row: 10, direction: "row" }
        },
        reorder: false
      },
      nav: {
        prevRoute: "#scrollerN0?version=2&activeId=2",
        nextRoute: "#scrollerN0?version=4&activeId=4"
      }
    },
    {
      title: "Scroller N.0 v4",
      animation: {
        stagger: {
          type: "equal",
          each: 2,
          from: "end"
        },
        reorder: false
      },
      nav: {
        prevRoute: "#scrollerN0?version=3&activeId=3",
        nextRoute: "#scrollerN1"
      }
    }
  ];

  // src/js/pages/canvas/scroller/index.js
  useComponent([ScrollerN0]);
  var scrollerN0 = ({ params }) => {
    const { version } = params;
    const props = scrollerParams[Math.max(0, Math.min(Number(version), scrollerParams.length - 1))];
    return renderHtml`<div>
        <scroller-n0
            ${staticProps({
      ...props.animation,
      prevRoute: props.nav.prevRoute,
      nextRoute: props.nav.nextRoute,
      title: props.title
    })}
        ></scroller-n0>
    </div>`;
  };

  // src/js/component/pages/scroller/ScrollerN1/animation/animation.js
  function getWithRounded2({ width, relativeIndex, amountOfPath }) {
    return Math.sqrt(
      Math.pow(width * relativeIndex, 2) - Math.pow(
        width * relativeIndex / amountOfPath * relativeIndex,
        2
      )
    ) * 2;
  }
  function getHeightRounded2({ height, relativeIndex, amountOfPath }) {
    return Math.sqrt(
      Math.pow(height * relativeIndex, 2) - Math.pow(
        height * relativeIndex / amountOfPath * relativeIndex,
        2
      )
    ) * 2;
  }
  var scrollerN1Animation = ({
    canvas,
    canvasScroller,
    amountOfPath,
    width,
    height,
    radius,
    opacity,
    intialRotation,
    endRotation,
    disableOffcanvas
  }) => {
    const { useOffscreen, context } = getCanvasContext({ disableOffcanvas });
    let isActive = true;
    let ctx = canvas.getContext(context, { alpha: false });
    let stemData = [];
    const { activeRoute } = mainStore.get();
    let { offscreen, offScreenCtx } = getOffsetCanvas({ useOffscreen, canvas });
    const useRadius = false;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    stemData = [...new Array(amountOfPath).keys()].map((_item, i) => {
      const relativeIndex = i >= amountOfPath / 2 ? amountOfPath / 2 + (amountOfPath / 2 - i) : i;
      return {
        width: Math.floor(
          getWithRounded2({ width, relativeIndex, amountOfPath })
        ),
        height: Math.floor(
          getHeightRounded2({ height, relativeIndex, amountOfPath })
        ),
        opacity: relativeIndex * opacity,
        rotate: 0,
        relativeIndex,
        index: i
      };
    });
    let scrollerTween = tween.createScrollerTween({
      from: { rotate: 0 },
      to: { rotate: endRotation },
      stagger: { each: 5, from: "center" }
    });
    [...stemData].forEach((item) => {
      scrollerTween.subscribeCache(item, ({ rotate }) => {
        item.rotate = rotate;
      });
    });
    const draw = () => {
      if (!ctx) return;
      if (useOffscreen) {
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;
      }
      const context2 = useOffscreen ? offScreenCtx : ctx;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      context2.fillStyle = canvasBackground;
      context2.fillRect(0, 0, canvas.width, canvas.height);
      stemData.forEach(({ width: width2, height: height2, opacity: opacity2, rotate, index }) => {
        const unitInverse = stemData.length / 2 - index;
        const scale = 1;
        const rotation = Math.PI / 180 * (rotate - intialRotation);
        const xx = Math.cos(rotation) * scale;
        const xy = Math.sin(rotation) * scale;
        context2.setTransform(
          xx,
          xy,
          -xy,
          xx,
          centerX,
          centerY + unitInverse * 19
        );
        if (useRadius) {
          context2.beginPath();
          context2.roundRect(
            -width2 / 2,
            -height2 / 2 + unitInverse * 19,
            width2,
            height2,
            150
          );
        } else {
          context2.beginPath();
          context2.rect(
            Number.parseInt(-width2 / 2),
            Number.parseInt(-height2 / 2),
            width2,
            height2,
            radius
          );
        }
        context2.strokeStyle = `rgba(255, 255, 255, ${opacity2})`;
        context2.fillStyle = `rgba(26, 27, 38, ${opacity2})`;
        context2.stroke();
        context2.fill();
        context2.setTransform(1, 0, 0, 1, 0, 0);
      });
      copyCanvasBitmap({ useOffscreen, offscreen, ctx });
    };
    let scrollerInstance = scroller.createScrollTrigger({
      trigger: canvasScroller,
      propierties: "tween",
      tween: scrollerTween,
      dynamicStart: {
        position: "bottom",
        value: () => window.innerHeight
      },
      dynamicEnd: {
        position: "bottom",
        value: () => outerHeight(canvasScroller)
      },
      ease: true,
      easeType: "spring"
    });
    scrollerInstance.init();
    const loop = ({ time: time2 = 0 }) => {
      draw({ time: time2 });
      if (!isActive) return;
      mobCore.useNextFrame(({ time: time3 }) => loop({ time: time3 }));
    };
    mobCore.useFrame(({ time: time2 }) => {
      loop({ time: time2 });
    });
    const unsubscribeResize = mobCore.useResize(() => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      mobCore.useFrame(() => {
        draw();
      });
    });
    const unWatchPause = navigationStore.watch("navigationIsOpen", (val2) => {
      if (val2) {
        isActive = false;
        return;
      }
      setTimeout(() => {
        isActive = true;
        const { activeRoute: currentRoute } = mainStore.get();
        if (currentRoute.route !== activeRoute.route) return;
        mobCore.useFrame(({ time: time2 }) => loop({ time: time2 }));
      }, 500);
    });
    return () => {
      scrollerTween.destroy();
      unsubscribeResize();
      unWatchPause();
      scrollerTween.destroy();
      scrollerTween = null;
      scrollerInstance.destroy();
      scrollerInstance = null;
      ctx = null;
      offscreen = null;
      offScreenCtx = null;
      scrollerTween = null;
      stemData = [];
      isActive = false;
    };
  };

  // src/js/component/pages/scroller/ScrollerN1/scrollerN1.js
  var ScrollerN1Fn = ({ onMount, html, getState, setRef, getRef }) => {
    document.body.style.background = "#000000";
    const setScrollDownState = setStateByName("scroll_down_label");
    const setQuickNavState = setStateByName("quick_nav");
    const setMainTitleState = setStateByName("animation_title");
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(() => {
      if (motionCore.mq("max", "desktop")) {
        document.body.style.background = "";
        return;
      }
      setScrollDownState("active", true);
      setQuickNavState("active", true);
      setQuickNavState("nextRoute", "");
      setQuickNavState("prevRoute", "#scrollerN0?version=4&activeId=4");
      setMainTitleState("align", "left");
      setMainTitleState("color", "white");
      setMainTitleState("title", "Scroller N1");
      const { scrollerN1: scrollerN12 } = getLegendData();
      const { source } = scrollerN12;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "component",
          source: source.component
        },
        {
          label: "animation",
          source: source.animation
        }
      ]);
      setCodeButtonState("color", "white");
      const { wrap, canvas, canvasScroller } = getRef();
      const destroyAnimation = scrollerN1Animation({
        canvas,
        canvasScroller,
        ...getState()
      });
      mobCore.useFrame(() => {
        wrap.classList.add("active");
      });
      return () => {
        destroyAnimation();
        setScrollDownState("active", false);
        setQuickNavState("active", false);
        setQuickNavState("prevRoute", "");
        setQuickNavState("nextRoute", "");
        setMainTitleState("align", "");
        setMainTitleState("title", "");
        setCodeButtonState("drawers", []);
        document.body.style.background = "";
      };
    });
    return html`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped"
                    ${setRef("wrap")}
                >
                    <canvas ${setRef("canvas")}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${setRef("canvasScroller")}></div>
        </div>
    `;
  };

  // src/js/component/pages/scroller/ScrollerN1/definition.js
  var ScrollerN1 = createComponent({
    name: "scroller-n1",
    component: ScrollerN1Fn,
    exportState: [
      "amountOfPath",
      "width",
      "height",
      "radius",
      "opacity",
      "intialRotation",
      "endRotation",
      "disableOffcanvas"
    ],
    state: {
      amountOfPath: 17,
      width: 15,
      height: 40,
      radius: 0,
      opacity: 0.05,
      intialRotation: 33,
      endRotation: 720,
      disableOffcanvas: () => ({
        value: detectFirefox() || detectSafari() ? true : false,
        type: Boolean
      })
    }
  });

  // src/js/pages/canvas/scrollerN1/index.js
  useComponent([ScrollerN1]);
  var scrollerN1 = () => {
    return renderHtml`<div class="l-padding">
        <scroller-n1></scroller-n1>
    </div>`;
  };

  // src/js/component/pages/dynamicList/button/dynamicListButton.js
  var DynamicListButtonFn = ({ html, getState, onMount, watchSync }) => {
    const { label } = getState();
    onMount(({ element }) => {
      watchSync("active", (value) => {
        element.classList.toggle("active", value);
      });
      return () => {
      };
    });
    return html`
        <button type="button" class="c-dynamic-list-button">${label}</button>
    `;
  };

  // src/js/component/pages/dynamicList/button/definition.js
  var DynamicListButton = createComponent({
    name: "dynamic-list-button",
    component: DynamicListButtonFn,
    exportState: ["active", "label"],
    state: {
      label: () => ({
        value: "",
        type: String
      }),
      active: () => ({
        value: false,
        type: Boolean
      })
    }
  });

  // src/js/component/pages/dynamicList/card/innerCard/dynamicListCardInner.js
  var DynamicListCardInnerFn = ({ html, bindText }) => {
    return html`<span class="dynamic-list-card-inner">
        <span>${bindText`${"key"}`}</span>
    </span>`;
  };

  // src/js/component/pages/dynamicList/card/innerCard/definition.js
  var DynamicListCardInner = createComponent({
    name: "dynamic-list-card-inner",
    component: DynamicListCardInnerFn,
    exportState: ["key"],
    state: {
      key: () => ({
        value: "",
        type: String
      })
    }
  });

  // src/js/component/pages/dynamicList/data/index.js
  var startData = [
    {
      key: "a",
      label: "A"
    },
    {
      key: "b",
      label: "B"
    },
    {
      key: "c",
      label: "C"
    },
    {
      key: "d",
      label: "D"
    }
  ];
  var state1 = [
    {
      key: "f",
      label: "F"
    },
    {
      key: "b",
      label: "B"
    },
    {
      key: "e",
      label: "E"
    },
    {
      key: "c",
      label: "C"
    },
    {
      key: "a",
      label: "A"
    },
    {
      key: "g",
      label: "G"
    },
    {
      key: "h",
      label: "H"
    },
    {
      key: "d",
      label: "D"
    },
    {
      key: "b",
      label: "B"
    }
  ];
  var state2 = [
    {
      key: "m",
      label: "M"
    },
    {
      key: "q",
      label: "Q"
    },
    {
      key: "z",
      label: "Z"
    },
    {
      key: "i",
      label: "I"
    },
    {
      key: "b",
      label: "B"
    },
    {
      key: "e",
      label: "E"
    },
    {
      key: "n",
      label: "N"
    },
    {
      key: "a",
      label: "A"
    },
    {
      key: "g",
      label: "G"
    },
    {
      key: "h",
      label: "H"
    },
    {
      key: "l",
      label: "L"
    },
    {
      key: "j",
      label: "J"
    },
    {
      key: "d",
      label: "D"
    }
  ];
  var state3 = [
    {
      key: "h",
      label: "H"
    },
    {
      key: "f",
      label: "F"
    },
    {
      key: "a",
      label: "A"
    },
    {
      key: "d",
      label: "D"
    }
  ];
  var innerData = [
    [{ key: 4 }],
    [
      { key: 20 },
      { key: 10 },
      { key: 10 },
      { key: 6 },
      { key: 10 },
      { key: 10 },
      { key: 30 }
    ],
    [
      { key: 3 },
      { key: 20 },
      { key: 5 },
      { key: 20 },
      { key: 5 },
      { key: 5 },
      { key: 5 },
      { key: 5 },
      { key: 60 },
      { key: 5 },
      { key: 5 },
      { key: 5 },
      { key: 5 },
      { key: 5 },
      { key: 5 },
      { key: 5 },
      { key: 5 },
      { key: 10 },
      { key: 5 }
    ]
  ];

  // src/js/component/pages/dynamicList/dynamicList.js
  var buttons2 = [
    {
      buttonLabel: "sample1",
      data: state1
    },
    {
      buttonLabel: "salmple2",
      data: state2
    },
    {
      buttonLabel: "sample3",
      data: state3
    },
    {
      buttonLabel: "Initial",
      data: startData
    }
  ];
  var repeaters = [
    {
      label: "repeater with key",
      key: "key",
      clean: false
    },
    {
      label: "repeater without key",
      key: "",
      clean: false
    },
    {
      label: "repeater clear",
      key: "",
      clean: true
    }
  ];
  function getButton({ setState, staticProps: staticProps2, delegateEvents, bindProps }) {
    return buttons2.map((column, index) => {
      const { data: data2, buttonLabel } = column;
      return renderHtml`
                <dynamic-list-button
                    class="c-dynamic-list__top__button"
                    ${staticProps2({ label: buttonLabel })}
                    ${delegateEvents({
        click: () => {
          setState("data", data2);
          setState("activeSample", index);
        }
      })}
                    ${bindProps({
        bind: ["activeSample"],
        props: ({ activeSample }) => {
          return {
            active: index === activeSample
          };
        }
      })}
                ></dynamic-list-button>
            `;
    }).join("");
  }
  function getRepeaters({ bindProps, staticProps: staticProps2 }) {
    return repeaters.map((item, index) => {
      const { key, clean: clean2, label } = item;
      return renderHtml`
                <dynamic-list-repeater
                    ${staticProps2({ listId: index, key, clean: clean2, label })}
                    ${bindProps({
        bind: ["data", "counter"],
        props: ({ data: data2, counter }) => {
          return { data: data2, counter };
        }
      })}
                ></dynamic-list-repeater>
            `;
    }).join("");
  }
  var DynamicListFn = ({
    setState,
    updateState,
    html,
    onMount,
    staticProps: staticProps2,
    bindProps,
    delegateEvents,
    invalidate,
    bindText
  }) => {
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(() => {
      const { repeater } = getLegendData();
      const { source } = repeater;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "main",
          source: source.mainComponent
        },
        {
          label: "repeater",
          source: source.repeaters
        },
        {
          label: "buttons",
          source: source.buttons
        },
        {
          label: "cards",
          source: source.cards
        },
        {
          label: "data",
          source: source.data
        }
      ]);
      setCodeButtonState("color", "black");
      return () => {
        setCodeButtonState("drawers", []);
      };
    });
    return html`
        <div class="c-dynamic-list">
            <div class="c-dynamic-list__header">
                <div class="c-dynamic-list__top">
                    ${getButton({
      setState,
      delegateEvents,
      staticProps: staticProps2,
      bindProps
    })}
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${staticProps2({ label: "+ counter ( max: 10 )" })}
                        ${delegateEvents({
      click: async () => {
        updateState("counter", (prev2) => {
          return prev2 + 1;
        });
      }
    })}
                    ></dynamic-list-button>
                    <dynamic-list-button
                        class="c-dynamic-list__top__button"
                        ${staticProps2({ label: "- counter: ( min 0 )" })}
                        ${delegateEvents({
      click: async () => {
        updateState("counter", (prev2) => {
          if (prev2 > 0) return prev2 -= 1;
          return prev2;
        });
      }
    })}
                    ></dynamic-list-button>
                </div>
            </div>

            <!-- Invalidate -->
            <div class="c-dynamic-list__invalidate">
                <h4 class="c-dynamic-list__invalidate__title">
                    Invalidate component on counter mutation:
                </h4>
                <div class="c-dynamic-list__invalidate__wrap">
                    ${invalidate({
      bind: "counter",
      render: ({ html: html2 }) => {
        return html2`<div class="validate-test-wrapper">
                                <dynamic-list-card-inner
                                    ${bindProps({
          props: ({ counter }) => {
            return {
              key: `${counter}`
            };
          }
        })}
                                ></dynamic-list-card-inner>
                            </div>`;
      }
    })}
                </div>
            </div>

            <div class="c-dynamic-list__counter">
                <h4>List counter</h4>
                <span>${bindText`${"counter"}`}</span>
            </div>

            <!-- Repeaters -->
            <div class="c-dynamic-list__container">
                <div class="c-dynamic-list__grid">
                    ${getRepeaters({ bindProps, staticProps: staticProps2 })}
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/pages/dynamicList/counter/dynamicListCounter.js
  var DynamicListCounterFn = ({ html, getState, bindText }) => {
    const { parentListId } = getState();
    return html`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${parentListId}</p>
        <span>${bindText`${"counter"}`}</span>
    </div>`;
  };

  // src/js/component/pages/dynamicList/counter/definition.js
  var DynamicCounter = createComponent({
    name: "dynamic-list-counter",
    component: DynamicListCounterFn,
    exportState: ["counter", "parentListId"],
    state: {
      parentListId: () => ({
        value: -1,
        type: Number
      }),
      counter: () => ({
        value: 0,
        type: Number
      })
    }
  });

  // src/js/component/pages/dynamicList/empty/dynamicListEmpty.js
  var DynamicListEmptyFn = ({ html }) => {
    return html`<div class="c-dynamic-list-empty">
        <p>empty comp</p>
        <mobjs-slot name="empty-slot"></mobjs-slot>
    </div>`;
  };

  // src/js/component/pages/dynamicList/empty/definition.js
  var DynamicListEmpty = createComponent({
    name: "dynamic-list-empty",
    component: DynamicListEmptyFn
  });

  // src/js/component/pages/dynamicList/card/dynamicListCard.js
  function createArray(numberOfItem) {
    return [...new Array(numberOfItem).keys()].map((i) => i + 1);
  }
  var getInvalidateRender = ({ staticProps: staticProps2, delegateEvents, getState }) => {
    const { counter } = getState();
    return renderHtml`
        ${createArray(counter).map((item) => {
      return renderHtml`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${staticProps2({
        key: `${item}`
      })}
                            ${delegateEvents({
        click: () => {
          console.log(
            "invalidate inside reepater click"
          );
        }
      })}
                        >
                        </dynamic-list-card-inner>
                    </div>
                `;
    }).join("")}
    `;
  };
  var showCard = async ({ element }) => {
    await tick();
    element.classList.add("active");
  };
  var DynamicListCardFn = ({
    getState,
    html,
    onMount,
    key,
    staticProps: staticProps2,
    bindProps,
    id,
    setState,
    updateState,
    delegateEvents,
    invalidate,
    repeat,
    bindText
  }) => {
    const { isFull, parentListId } = getState();
    let repeaterIndex = 0;
    let elementRef;
    onMount(({ element }) => {
      elementRef = element;
      showCard({ element });
      return () => {
      };
    });
    const isFullClass = isFull ? "is-full" : "";
    return html`
        <div class="c-dynamic-card ${isFullClass}">
            <div class="c-dynamic-card__container">
                <p class="c-dynamic-card__title">card content</p>
                <dynamic-list-button
                    class="c-dynamic-card__button"
                    ${delegateEvents({
      click: () => {
        if (!elementRef) return;
        updateState("isSelected", (val2) => !val2);
        elementRef.classList.toggle("is-selected");
      }
    })}
                    ${bindProps({
      bind: ["isSelected"],
      props: ({ isSelected }) => {
        return {
          active: isSelected
        };
      }
    })}
                >
                    Select
                </dynamic-list-button>
                <div class="id">id: ${id}</div>
                <div class="parentId">list index: ${parentListId}</div>
                <div class="index">${bindText`index: ${"index"}`}</div>
                <div class="label">${bindText`label: ${"label"}`}</div>
                <div class="counter">${bindText`counter: ${"counter"}`}</div>
                <div class="key">key: ${key.length > 0 ? key : "no-key"}</div>
                <mobjs-slot name="card-label-slot"></mobjs-slot>
                <dynamic-list-empty>
                    <dynamic-list-counter
                        slot="empty-slot"
                        ${staticProps2({
      parentListId
    })}
                        ${bindProps({
      bind: ["counter"],
      /** @return {Partial<DynamicCounter>} */
      props: ({ counter }) => {
        return { counter };
      }
    })}
                    />
                </dynamic-list-empty>

                <!-- Inner repeater -->
                <div class="c-dynamic-card__repeater-container">
                    <p><strong>Inner repeater:</strong></p>
                    <dynamic-list-button
                        class="c-dynamic-card__button"
                        ${delegateEvents({
      click: () => {
        repeaterIndex = repeaterIndex < innerData.length - 1 ? repeaterIndex + 1 : 0;
        setState("innerData", innerData[repeaterIndex]);
      }
    })}
                    >
                        Update:
                    </dynamic-list-button>

                    <!-- repeater by key -->
                    <div class="c-dynamic-card__repeater">
                        ${repeat({
      bind: "innerData",
      key: "key",
      render: ({ sync, html: html2 }) => {
        return html2`<dynamic-list-card-inner
                                    ${bindProps({
          /** @return {Partial<DynamicListCardInner>} */
          props: ({ innerData: innerData2 }, index) => {
            return {
              key: `${innerData2[index].key}`
            };
          }
        })}
                                    ${sync()}
                                ></dynamic-list-card-inner>`;
      }
    })}
                    </div>

                    <!-- repeater no key -->
                    <div class="c-dynamic-card__repeater">
                        ${repeat({
      bind: "innerData",
      render: ({ sync, html: html2 }) => {
        return html2`<dynamic-list-card-inner
                                    ${bindProps({
          /** @return {Partial<DynamicListCardInner>} */
          props: ({ innerData: innerData2 }, index) => {
            return {
              key: `${innerData2[index].key}`
            };
          }
        })}
                                    ${sync()}
                                ></dynamic-list-card-inner>`;
      }
    })}
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
                        ${invalidate({
      bind: "counter",
      render: () => {
        return getInvalidateRender({
          getState,
          delegateEvents,
          staticProps: staticProps2
        });
      }
    })}
                    </div>
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/pages/dynamicList/card/definition.js
  var DynamicListCard = createComponent({
    name: "dynamic-list-card",
    component: DynamicListCardFn,
    exportState: ["isFull", "label", "index", "counter", "parentListId"],
    state: {
      parentListId: () => ({
        value: -1,
        type: Number
      }),
      isFull: () => ({
        value: false,
        type: Boolean
      }),
      label: () => ({
        value: "-",
        type: String
      }),
      index: () => ({
        value: -1,
        type: Number
      }),
      counter: () => ({
        value: 1,
        type: Number
      }),
      innerData: () => ({
        value: innerData[0],
        type: Array
      }),
      isSelected: () => ({
        value: false,
        type: Boolean
      })
    },
    child: [
      DynamicCounter,
      DynamicListEmpty,
      DynamicListCardInner,
      DynamicListButton
    ]
  });

  // src/js/component/pages/dynamicList/slottedLabel/dynamicListSlottedLabel.js
  var DynamicListSlottedLabelFn = ({ html, bindText }) => {
    return html`<div class="c-dynamic-list-slotted-label">
        <p class="content">${bindText`slotted: ${"label"}`}</p>
    </div>`;
  };

  // src/js/component/pages/dynamicList/slottedLabel/definition.js
  var DynamicListSlottedLabel = createComponent({
    name: "dynamic-slotted-label",
    component: DynamicListSlottedLabelFn,
    exportState: ["label"],
    state: {
      label: () => ({
        value: void 0,
        type: "Any"
      })
    }
  });

  // src/js/component/pages/dynamicList/repeaters/dynamicListRepeater.js
  function getRepeaterCard2({
    sync,
    staticProps: staticProps2,
    bindProps,
    listId,
    delegateEvents,
    getState
  }) {
    return renderHtml`
        <div class="c-dynamic-list-repeater__item">
            <dynamic-list-card
                ${staticProps2({
      parentListId: listId
    })}
                ${bindProps({
      bind: ["counter"],
      /** @returns {Partial<import('../card/type').DynamicListCard>} */
      props: ({ counter, data: data2 }, index) => {
        return {
          counter,
          label: data2[index].label,
          index
        };
      }
    })}
                ${delegateEvents({
      click: (_e, index) => {
        const { data: data2 } = getState();
        const current = data2[index].label;
        console.log(current, index);
      }
    })}
                ${sync()}
            >
                <dynamic-slotted-label
                    slot="card-label-slot"
                    ${bindProps({
      bind: ["counter"],
      /** @returns {Partial<import('../slottedLabel/type').DynamicListSlottedLabel>} */
      props: ({ data: data2, counter }, index) => {
        return {
          label: `label: ${data2[index].label} <br/> counter: ${counter}`
        };
      }
    })}
                    ${sync()}
                >
                </dynamic-slotted-label>
            </dynamic-list-card>
        </div>
    `;
  }
  function updateNewElement(id) {
    return `<strong>Current cards id:</strong> ${id.join(",").replaceAll(",", " | ")}`;
  }
  function afterUpdateList({ element, className, childrenId }) {
    const newElement = element.querySelector(className);
    if (!newElement) return;
    newElement.textContent = "";
    newElement.insertAdjacentHTML("afterbegin", updateNewElement(childrenId));
  }
  var DynamicListRepeaterFn = ({
    getState,
    html,
    staticProps: staticProps2,
    bindProps,
    delegateEvents,
    repeat
  }) => {
    const { listId, key, clean: clean2, label } = getState();
    const keyParsed = key.length > 0 ? key : void 0;
    return html`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${label}</h4>
            <p class="c-dynamic-list-repeater__new js-list"></p>
            <div class="c-dynamic-list-repeater__list">
                ${repeat({
      bind: "data",
      clean: clean2,
      key: keyParsed,
      afterUpdate: ({ childrenId, element }) => {
        afterUpdateList({
          className: `.js-list`,
          childrenId,
          element
        });
      },
      render: ({ sync }) => {
        return getRepeaterCard2({
          sync,
          staticProps: staticProps2,
          getState,
          bindProps,
          delegateEvents,
          listId
        });
      }
    })}
            </div>
        </div>
    `;
  };

  // src/js/component/pages/dynamicList/repeaters/definition.js
  var DynamicListRepeater = createComponent({
    name: "dynamic-list-repeater",
    component: DynamicListRepeaterFn,
    exportState: [
      "label",
      "clean",
      "data",
      "listId",
      "key",
      "listId",
      "counter"
    ],
    state: {
      data: () => ({
        value: [],
        type: Array
      }),
      key: () => ({
        value: "",
        type: String
      }),
      clean: () => ({
        value: false,
        type: Boolean
      }),
      listId: () => ({
        value: -1,
        type: Number
      }),
      counter: () => ({
        value: -1,
        type: Number
      }),
      label: () => ({
        value: "",
        type: String
      })
    },
    child: [DynamicListCard, DynamicListSlottedLabel]
  });

  // src/js/component/pages/dynamicList/definition.js
  var DynamicList = createComponent({
    name: "dynamic-list",
    component: DynamicListFn,
    state: {
      counter: () => ({
        value: 1,
        type: Number,
        validate: (val2) => val2 <= 10 && val2 >= 0,
        strict: true
      }),
      data: () => ({
        value: startData,
        type: Array
      }),
      activeSample: () => ({
        value: 3,
        type: Number
      })
    },
    child: [DynamicListButton, DynamicListRepeater, DynamicListCardInner]
  });

  // src/js/pages/dynamicList/index.js
  useComponent([DynamicList]);
  var dynamic_list = () => {
    return renderHtml` <dynamic-list> </dynamic-list> `;
  };

  // src/js/component/lib/animation/simpleIntro.js
  var simpleIntroAnimation = ({ refs }) => {
    let introTween = tween.createTween({
      data: { opacity: 0, scale: 0.5 },
      duration: 2e3,
      ease: "easeOutQuart",
      stagger: { each: 8, from: "end" }
    });
    let loopTween = tween.createTween({
      data: { scale: 1 },
      duration: 6e3,
      ease: "easeInOutQuad",
      stagger: { each: 12, from: "end" }
    });
    refs.forEach((item) => {
      introTween.subscribeCache(item, ({ scale, opacity }) => {
        item.style.scale = `${scale}`;
        item.style.opacity = opacity;
      });
      loopTween.subscribe(({ scale }) => {
        item.style.scale = `${scale}`;
      });
    });
    let introTl = timeline.createAsyncTimeline({ repeat: 1 }).goTo(introTween, {
      opacity: 1,
      scale: 1
    });
    let loopTimeline = timeline.createAsyncTimeline({ repeat: -1, yoyo: true }).goTo(loopTween, {
      scale: 1.1
    });
    return {
      playIntro: () => introTl?.play(),
      playSvg: () => {
        loopTimeline?.play();
      },
      destroy: () => {
        introTween.destroy();
        introTween = null;
        introTl.destroy();
        introTl = null;
        loopTween.destroy();
        loopTween = null;
        loopTimeline.destroy();
        loopTimeline = null;
      }
    };
  };

  // src/js/component/pages/homepage/animation/text.js
  var homeTextAnimation = ({ refs }) => {
    let textTween = tween.createTween({
      data: { y: 100 },
      duration: 500,
      ease: "easeOutCubic",
      stagger: { each: 10 }
    });
    refs.forEach((item) => {
      textTween.subscribe(({ y }) => {
        item.style.translate = `0px ${y}%`;
      });
    });
    return {
      playText: () => textTween.goTo({ y: 0 }),
      destroyText: () => {
        textTween.destroy();
        textTween = null;
      }
    };
  };

  // src/js/component/pages/homepage/home.js
  var playAnimation = async ({ playIntro, playText, playSvg }) => {
    playText();
    await playIntro();
    playSvg();
  };
  var HomeComponentFn = ({
    html,
    onMount,
    getState,
    setRef,
    getRefs
  }) => {
    const { svg } = getState();
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(({ element }) => {
      const { textStagger } = getRefs();
      const svg_group = element.querySelectorAll('[ref="svg_group"]');
      const { destroy, playIntro, playSvg } = simpleIntroAnimation({
        refs: svg_group
      });
      const { playText, destroyText } = homeTextAnimation({
        refs: textStagger
      });
      playAnimation({ playIntro, playText, playSvg });
      const { home: home2 } = getLegendData();
      const { source } = home2;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "component",
          source: source.component
        },
        {
          label: "Logo animation",
          source: source.logoAnimation
        },
        {
          label: "text animation",
          source: source.textAnimation
        }
      ]);
      setCodeButtonState("color", "black");
      return () => {
        destroy();
        destroyText();
        setCodeButtonState("drawers", []);
      };
    });
    return html`<div>
        <div class="l-index__content">
            <a class="l-index__item" href="./#mobCore-overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ${setRef("textStagger")}>
                        <span>Mob</span>Core
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ${setRef("textStagger")}>
                        store & window events
                    </h2>
                </div>
            </a>
            <a class="l-index__item" href="./#mobJs-overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ${setRef("textStagger")}>
                        <span>Mob</span>Js
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ${setRef("textStagger")}>
                        js component library
                    </h2>
                </div>
            </a>
            <a class="l-index__item" href="./#mobMotion-overview">
                <div class="l-index__inner-content">
                    <h1 class="l-index__stagger" ${setRef("textStagger")}>
                        <span>Mob</span>Motion
                    </h1>
                </div>
                <div class="l-index__inner-content">
                    <h2 class="l-index__stagger" ${setRef("textStagger")}>
                        js animation library
                    </h2>
                </div>
            </a>
        </div>

        <div class="l-index__logo">${svg}</div>
    </div>`;
  };

  // src/js/component/pages/homepage/definition.js
  var HomeComponent = createComponent({
    name: "home-component",
    component: HomeComponentFn,
    exportState: ["svg"],
    state: {
      svg: () => ({
        value: "",
        type: String
      })
    }
  });

  // src/js/pages/home/index.js
  useComponent([HomeComponent]);
  var home = async () => {
    const { data: svg } = await loadTextContent({
      source: "./asset/svg/ms.svg"
    });
    return renderHtml`<div class="l-index">
        <home-component ${staticProps({ svg })}></home-component>
    </div>`;
  };

  // src/js/component/pages/matrioska/matrioska.js
  var buttons3 = [
    {
      state: "level1",
      maxItem: 10,
      ref: "level1_counter",
      label_plus: "level1 +",
      label_minus: "level1 -"
    },
    {
      state: "level2",
      maxItem: 10,
      ref: "level2_counter",
      label_plus: "level2 +",
      label_minus: "level2 -"
    },
    {
      state: "level3",
      maxItem: 6,
      ref: "level3_counter",
      label_plus: "level3 +",
      label_minus: "level3 -"
    }
  ];
  function getRandomInt2(max2) {
    return Math.floor(Math.random() * max2);
  }
  var getButtons2 = ({ delegateEvents, updateState, invalidate, getState }) => {
    return renderHtml`
        ${buttons3.map((button) => {
      return renderHtml` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
        click: () => {
          updateState(
            /** @type {'level1'|'level2'|'level3'} */
            button.state,
            (val2) => {
              return val2.slice(0, -1);
            }
          );
        }
      })}
                        >${button.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
        click: () => {
          updateState(
            /** @type {'level1'|'level2'|'level3'} */
            button.state,
            (val2) => {
              return [
                ...val2,
                {
                  key: getRandomInt2(1e3),
                  value: mobCore.getUnivoqueId()
                }
              ];
            }
          );
        }
      })}
                        >${button.label_plus}</dynamic-list-button
                    >
                    <div class="matrioska__head__counter">
                        ${invalidate({
        bind: (
          /** @type {'level1'|'level2'|'level3'} */
          button.state
        ),
        render: ({ html }) => {
          const data2 = getState()?.[button.state];
          return html`
                                    Number of items: ${data2.length} ( max
                                    ${button.maxItem} )
                                `;
        }
      })}
                    </div>
                </div>`;
    }).join("")}
        <div class="matrioska__head__cta-counter">
            <dynamic-list-button
                class="matrioska__button"
                ${delegateEvents({
      click: () => {
        updateState("counter", (val2) => val2 + 1);
      }
    })}
                >Increment counter</dynamic-list-button
            >
        </div>
    `;
  };
  var getSecondLevel = ({ repeat, staticProps: staticProps2, bindProps, delegateEvents }) => {
    return renderHtml`
        <div class="matrioska__level matrioska__level--2">
            ${repeat({
      bind: "level2",
      render: ({ html, sync }) => {
        return html`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--2"
                        >
                            <matrioska-item
                                class="matrioska-item--2"
                                ${staticProps2({
          level: "level 2"
        })}
                                ${bindProps({
          bind: ["counter"],
          props: ({ level2, counter }, index) => {
            return {
              key: `${level2[index]?.key}`,
              value: `${level2[index]?.value}`,
              counter
            };
          }
        })}
                                ${sync()}
                            >
                                ${getThirdLevel({
          repeat,
          staticProps: staticProps2,
          delegateEvents,
          bindProps
        })}
                            </matrioska-item>
                        </div>
                    `;
      }
    })}
        </div>
    `;
  };
  var getThirdLevel = ({ repeat, staticProps: staticProps2, bindProps, delegateEvents }) => {
    return renderHtml`
        <div class="matrioska__level matrioska__level--3">
            ${repeat({
      bind: "level3",
      render: ({ html, sync }) => {
        const name = mobCore.getUnivoqueId();
        const name2 = mobCore.getUnivoqueId();
        return html`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--3"
                        >
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${name}"
                                ${staticProps2({
          level: "level 3"
        })}
                                ${bindProps({
          bind: ["counter"],
          props: ({ level3, counter }, index) => {
            return {
              key: `${level3[index]?.key}`,
              value: `${level3[index]?.value}`,
              counter
            };
          }
        })}
                                ${delegateEvents({
          click: () => {
            const updateActiveState = updateStateByName(name);
            updateActiveState(
              "active",
              (val2) => !val2
            );
          }
        })}
                                ${sync()}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${name2}"
                                ${staticProps2({
          level: "level 3"
        })}
                                ${bindProps({
          bind: ["counter"],
          props: ({ level3, counter }, index) => {
            return {
              key: `${level3[index]?.key}`,
              value: `${level3[index]?.value}`,
              counter
            };
          }
        })}
                                ${delegateEvents({
          click: () => {
            const updateActiveState = updateStateByName(name2);
            updateActiveState(
              "active",
              (val2) => !val2
            );
          }
        })}
                                ${sync()}
                            >
                            </matrioska-item>
                        </div>
                    `;
      }
    })}
        </div>
    `;
  };
  var MatrioskaFn = ({
    html,
    onMount,
    delegateEvents,
    updateState,
    repeat,
    staticProps: staticProps2,
    bindProps,
    invalidate,
    getState
  }) => {
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(() => {
      const { matrioska } = getLegendData();
      const { source } = matrioska;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "main",
          source: source.mainComponent
        },
        {
          label: "cards",
          source: source.cards
        }
      ]);
      setCodeButtonState("color", "black");
      return () => {
        setCodeButtonState("drawers", []);
      };
    });
    return html`<div class="matrioska">
        <div class="matrioska__head">
            ${getButtons2({
      delegateEvents,
      updateState,
      invalidate,
      getState
    })}
        </div>
        <h4 class="matrioska__head__title">
            Nested repater like matrioska in same component.
            <span> First/Second/third level repeater without key. </span>
            <span> Third level use shuffle order. </span>
        </h4>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${repeat({
      bind: "level1",
      render: ({ html: html2, sync }) => {
        return html2`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--1"
                            >
                                <matrioska-item
                                    class="matrioska-item--1"
                                    ${staticProps2({ level: "level 1" })}
                                    ${bindProps({
          bind: ["counter"],
          /** @returns{Partial<MatrioskaItem>} */
          props: ({ level1, counter }, index) => {
            return {
              key: `${level1[index]?.key}`,
              value: `${level1[index]?.value}`,
              counter
            };
          }
        })}
                                    ${sync()}
                                >
                                    ${getSecondLevel({
          repeat,
          staticProps: staticProps2,
          bindProps,
          delegateEvents
        })}
                                </matrioska-item>
                            </div>
                        `;
      }
    })}
            </div>
        </div>
    </div>`;
  };

  // src/js/component/pages/matrioska/matrioskaItem/matrioskaItem.js
  var MatrioskaItemFn = ({
    html,
    onMount,
    getState,
    watch,
    bindText,
    id
  }) => {
    const { level } = getState();
    onMount(({ element }) => {
      watch("active", (val2) => {
        element.classList.toggle("active", val2);
      });
      return () => {
      };
    });
    return html`<div class="matrioska-item">
        <div class="matrioska-item__info">
            <h4 class="matrioska-item__level">${level}:</h4>
            <h6 class="matrioska-item__key">
                ${bindText`key: <span>${"key"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                ${bindText`Value: <span>${"value"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                ${bindText`counter: <span>${"counter"}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                Component id: <span>${id}</span>
            </h6>
        </div>
        <div class="matrioska-item__child">
            <mobjs-slot></mobjs-slot>
        </div>
    </div>`;
  };

  // src/js/component/pages/matrioska/matrioskaItem/definition.js
  var MatrioskaItem = createComponent({
    name: "matrioska-item",
    component: MatrioskaItemFn,
    exportState: ["level", "key", "value", "active", "counter"],
    state: {
      level: () => ({
        value: "",
        type: String
      }),
      key: () => ({
        value: "",
        strict: true,
        type: String
      }),
      value: () => ({
        value: "",
        type: String
      }),
      active: () => ({
        value: false,
        type: Boolean
      }),
      counter: () => ({
        value: -1,
        type: Number
      })
    },
    child: []
  });

  // src/js/component/pages/matrioska/definition.js
  var shuffle2 = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  var Matrioska = createComponent({
    name: "page-matrioska",
    component: MatrioskaFn,
    exportState: [],
    state: {
      level1: () => ({
        value: [{ key: 1, value: mobCore.getUnivoqueId() }],
        type: Array,
        validate: (val2) => val2.length <= 10,
        strict: true
      }),
      level2: () => ({
        value: [
          { key: 1, value: mobCore.getUnivoqueId() },
          { key: 2, value: mobCore.getUnivoqueId() }
        ],
        type: Array,
        validate: (val2) => val2.length <= 10,
        strict: true
      }),
      level3: () => ({
        value: [
          { key: 1, value: mobCore.getUnivoqueId() },
          { key: 2, value: mobCore.getUnivoqueId() }
        ],
        type: Array,
        transform: (val2, oldVal) => {
          return val2 > oldVal ? shuffle2(val2) : val2;
        },
        validate: (val2) => val2.length <= 6,
        strict: true
      }),
      counter: () => ({
        value: 0,
        type: Number
      })
    },
    child: [DynamicListButton, MatrioskaItem]
  });

  // src/js/pages/matrioska/index.js
  useComponent([Matrioska]);
  var matrioska_page = () => {
    return renderHtml` <page-matrioska> </page-matrioska> `;
  };

  // src/js/component/common/shapes/footerShapeV1.js
  var FooterShapeV1Fn = ({ html, onMount, getState }) => {
    const { svg, position: position2 } = getState();
    const positionClass = `shape-v1--${position2}`;
    onMount(({ element }) => {
      mobCore.useFrame(() => {
        element.classList.add("active");
      });
      return () => {
      };
    });
    return html` <div class="shape-v1 ${positionClass}">${svg}</div> `;
  };

  // src/js/component/common/shapes/definition.js
  var FooterShapeV1 = createComponent({
    name: "footer-shape-v1",
    component: FooterShapeV1Fn,
    exportState: ["position", "svg"],
    state: {
      position: () => ({
        value: "left",
        type: String
      }),
      svg: () => ({
        value: "",
        type: String
      })
    }
  });

  // src/js/component/pages/horizontalScroller/animation/animation.js
  var sideWidth = 0;
  var createPins = ({ indicators, setState }) => {
    return [...indicators].map((button, i) => {
      return scroller.createScrollTrigger({
        item: button,
        pin: true,
        animateAtStart: false,
        animatePin: true,
        dynamicStart: {
          position: "right",
          value: () => {
            return window.innerWidth + sideWidth - outerWidth(button) * (i + 1);
          }
        },
        dynamicEnd: {
          position: "right",
          value: () => {
            const relativeIndex = indicators.length - (i - 2);
            return window.innerWidth / 10 * 9 * relativeIndex;
          }
        },
        onEnter: () => {
          setState("currentId", -1);
          setState("currentIdFromScroll", i);
        },
        onLeaveBack: () => {
          setState("currentIdFromScroll", i - 1);
        }
      });
    });
  };
  var refreshPins = ({ pins }) => {
    pins.forEach((pin) => pin.refresh());
  };
  var createParallax = ({ titles }) => {
    return [...titles].map((title) => {
      return scroller.createParallax({
        item: title,
        propierties: "x",
        reverse: true,
        range: 9
      });
    });
  };
  var showNav = ({ nav }) => {
    nav.classList.add("active");
    const indicators = document.querySelectorAll(".js-indicator");
    [...indicators].forEach((indicator) => {
      indicator.classList.add("active");
    });
  };
  var hideNav = ({ nav }) => {
    nav.classList.remove("active");
    const indicators = document.querySelectorAll(".js-indicator");
    [...indicators].forEach((indicator) => {
      indicator.classList.remove("active");
    });
  };
  var horizontalScrollerAnimation = ({
    indicators,
    titles,
    nav,
    animatePin,
    setState,
    rootRef
  }) => {
    let pins = createPins({ indicators, setState });
    let titlesParallax = createParallax({ titles });
    const side = document.querySelector(".l-navcontainer__side");
    sideWidth = outerWidth(side) / 2;
    const unsubscribeResize = mobCore.useResize(() => {
      sideWidth = outerWidth(side) / 2;
    });
    let horizontalCustom = new HorizontalScroller({
      root: rootRef,
      container: ".js-container",
      row: ".js-row",
      column: ".js-column",
      trigger: ".js-trigger",
      shadowClass: ".shadowClass",
      useWillChange: true,
      useDrag: true,
      useSticky: !animatePin,
      animateAtStart: false,
      ease: true,
      addCss: true,
      columnHeight: 70,
      columnWidth: 100,
      columnAlign: "center",
      pin: animatePin,
      animatePin,
      breakpoint: "tablet",
      children: [...pins, ...titlesParallax],
      onEnter: () => {
        showNav({ nav, indicators });
      },
      onEnterBack: () => {
        refreshPins({ pins });
        showNav({ nav, indicators });
      },
      onLeave: () => {
        hideNav({ nav, indicators });
      },
      onLeaveBack: () => {
        hideNav({ nav, indicators });
      }
    });
    horizontalCustom.init();
    return {
      destroy: () => {
        pins.forEach((pin) => {
          pin?.destroy();
        });
        pins = [];
        titlesParallax.forEach((item) => {
          item?.destroy();
        });
        titlesParallax = [];
        horizontalCustom.destroy();
        horizontalCustom = null;
        unsubscribeResize();
      },
      refresh: () => horizontalCustom.refresh()
    };
  };

  // src/js/component/pages/horizontalScroller/horizontalScroller.js
  var getColumns = ({ numOfCol, pinIsVisible, staticProps: staticProps2 }) => {
    const pinClass = pinIsVisible ? "" : "hidden";
    return [...new Array(numOfCol).keys()].map((_col, i) => {
      return renderHtml`
                <horizontal-scroller-section
                    ${staticProps2({
        id: i,
        pinClass
      })}
                ></horizontal-scroller-section>
            `;
    }).join("");
  };
  var getNav = ({
    numOfCol,
    setState,
    bindProps,
    staticProps: staticProps2,
    delegateEvents
  }) => {
    return [...new Array(numOfCol).keys()].map((_col, i) => {
      return renderHtml`
                <horizontal-scroller-button
                    ${staticProps2({
        id: i
      })}
                    ${delegateEvents({
        click: () => setState("currentId", i)
      })}
                    ${bindProps({
        bind: ["currentId", "currentIdFromScroll"],
        props: ({ currentId, currentIdFromScroll }) => {
          return {
            active: currentId === i || currentIdFromScroll === i
          };
        }
      })}
                ></horizontal-scroller-button>
            `;
    }).join("");
  };
  var HorizontalScrollerFn = ({
    onMount,
    html,
    getState,
    setState,
    watch,
    staticProps: staticProps2,
    bindProps,
    delegateEvents,
    setRef,
    getRef
  }) => {
    const { animatePin, svgLeft, svgRight, prevRoute, nextRoute } = getState();
    const setQuickNavState = setStateByName("quick_nav");
    const setMainTitleState = setStateByName("animation_title");
    const setCodeButtonState = setStateByName("global-code-button");
    onMount(({ element }) => {
      if (motionCore.mq("max", "desktop")) return;
      const indicators = element.querySelectorAll(".js-indicator");
      const nav = element.querySelector(".js-nav");
      const titles = element.querySelectorAll(".js-title h1");
      const { destroy } = horizontalScrollerAnimation({
        rootRef: getRef().js_root,
        indicators,
        titles,
        nav,
        ...getState(),
        setState
      });
      setQuickNavState("active", true);
      setQuickNavState("prevRoute", prevRoute);
      setQuickNavState("nextRoute", nextRoute);
      setQuickNavState("color", "white");
      setMainTitleState("align", "right");
      setMainTitleState("color", "white");
      setMainTitleState(
        "title",
        animatePin ? "HorizontalScroller: smooth pin" : "HorizontalScroller: classic pin"
      );
      const { horizontalScroller: horizontalScroller2 } = getLegendData();
      const { source } = horizontalScroller2;
      setCodeButtonState("drawers", [
        {
          label: "description",
          source: source.description
        },
        {
          label: "definition",
          source: source.definition
        },
        {
          label: "scroller",
          source: source.scroller
        },
        {
          label: "section",
          source: source.section
        },
        {
          label: "buttons",
          source: source.buttons
        },
        {
          label: "animation",
          source: source.animation
        }
      ]);
      setCodeButtonState("color", "white");
      window.scrollTo(0, 0);
      watch("currentId", (id) => {
        if (id === -1) return;
        const shadowCenter = element.querySelector(
          `.shadowClass--section-${id} .shadowClass--in-center`
        );
        const { top } = offset(shadowCenter);
        const height = outerHeight(shadowCenter);
        const scrollValue = (
          /**
           * Need previous and current value difference > 0 so add 1px.
           *                              active: currentId || currentIdFromScroll
           * ( onLeaveBack issue )
           */
          // @ts-ignore
          Number.parseInt(id) === 0 ? window.innerHeight + 1 : top + height - window.innerHeight
        );
        bodyScroll.to(scrollValue, { duration: 2e3 });
      });
      return () => {
        destroy();
        setQuickNavState("active", false);
        setQuickNavState("prevRoute", "");
        setQuickNavState("nextRoute", "");
        setQuickNavState("color", "black");
        setMainTitleState("align", "");
        setMainTitleState("title", "");
        setCodeButtonState("drawers", []);
      };
    });
    if (motionCore.mq("max", "desktop"))
      return html`<div><only-desktop></only-desktop></div>`;
    return html`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${setRef("js_nav")}>
            ${getNav({
      numOfCol: 10,
      setState,
      bindProps,
      staticProps: staticProps2,
      delegateEvents
    })}
        </ul>
        <div class="l-h-scroller__root js-root" ${setRef("js_root")}>
            <div
                class="l-h-scroller__container js-container"
                ${setRef("js_container")}
            >
                <div class="l-h-scroller__row js-row" ${setRef("js_root")}>
                    ${getColumns({
      numOfCol: 10,
      pinIsVisible: !animatePin,
      staticProps: staticProps2
    })}
                    <section
                        class="l-h-scroller__fakeColumn js-column"
                        ${setRef("js_column")}
                    ></section>
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${setRef("js_trigger")}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>

        <footer-shape-v1
            ${staticProps2({ position: "left", svg: svgLeft })}
        ></footer-shape-v1>
        <footer-shape-v1
            ${staticProps2({ position: "right", svg: svgRight })}
        ></footer-shape-v1>
    </div>`;
  };

  // src/js/component/pages/horizontalScroller/horizontalScrollerButton/horizontalScrollerButton.js
  var HorizontalScrollerButtonFn = ({
    getState,
    watch,
    html,
    onMount,
    setRef,
    getRef
  }) => {
    const { id } = getState();
    onMount(() => {
      const { button } = getRef();
      watch("active", (active) => {
        button.classList.toggle("active", active);
      });
      return () => {
      };
    });
    return html`
        <li>
            <button
                type="button"
                data-id="${id}"
                class="l-h-scroller__nav__btn"
                ${setRef("button")}
            >
                ${id}
            </button>
        </li>
    `;
  };

  // src/js/component/pages/horizontalScroller/horizontalScrollerButton/definition.js
  var HorizontalScrollerButton = createComponent({
    name: "horizontal-scroller-button",
    component: HorizontalScrollerButtonFn,
    exportState: ["id", "active"],
    state: {
      id: () => ({
        value: -1,
        type: Number
      }),
      active: () => ({
        value: false,
        type: Boolean
      })
    }
  });

  // src/js/component/pages/horizontalScroller/horizontalScrollerSection/horizontalScrollerSection.js
  var HorizontalScrollerSectionFn = ({ html, getState }) => {
    const { id, pinClass } = getState();
    return html`
        <section
            class="l-h-scroller__column js-column"
            data-shadow="section-${id}"
        >
            <div class="l-h-scroller__wrap">
                <span class="l-h-scroller__indicator js-indicator ${pinClass}">
                    <span></span>
                </span>
                <div class="l-h-scroller__title js-title">
                    <h1>${id}</h1>
                </div>
            </div>
        </section>
    `;
  };

  // src/js/component/pages/horizontalScroller/horizontalScrollerSection/definition.js
  var HorizontalScrollerSection = createComponent({
    name: "horizontal-scroller-section",
    component: HorizontalScrollerSectionFn,
    exportState: ["id", "pinClass"],
    state: {
      id: () => ({
        id: -1,
        type: Number
      }),
      pinClass: () => ({
        id: "",
        type: String
      })
    }
  });

  // src/js/component/pages/horizontalScroller/definition.js
  var HorizontalScroller2 = createComponent({
    name: "horizontal-scroller",
    component: HorizontalScrollerFn,
    exportState: [
      "nextRoute",
      "prevRoute",
      "currentId",
      "currentIdFromScroll",
      "animatePin",
      "svgLeft",
      "svgRight"
    ],
    state: {
      nextRoute: () => ({
        value: "",
        type: String
      }),
      prevRoute: () => ({
        value: "",
        type: String
      }),
      svgLeft: () => ({
        value: 0,
        type: ""
      }),
      svgRight: () => ({
        value: 0,
        type: ""
      }),
      currentId: () => ({
        value: 0,
        type: Number
      }),
      currentIdFromScroll: () => ({
        value: 0,
        type: Number
      }),
      animatePin: () => ({
        value: false,
        type: Boolean
      })
    },
    child: [HorizontalScrollerButton, HorizontalScrollerSection, FooterShapeV1]
  });

  // src/js/pages/plugin/horizontalScroller/horizontalScrollerParams.js
  var horizontalScrollerParams = [
    {
      title: "horizontalScroller with fixed pin",
      animatePin: false,
      nav: {
        prevRoute: "",
        nextRoute: "#horizontalScroller?version=1&activeId=1"
      }
    },
    {
      title: "horizontalScroller with animated pin",
      animatePin: true,
      nav: {
        prevRoute: "#horizontalScroller?version=0&activeId=0",
        nextRoute: ""
      }
    }
  ];

  // src/js/pages/plugin/horizontalScroller/index.js
  useComponent([HorizontalScroller2]);
  var horizontalScroller = async ({ params }) => {
    const { version } = params;
    const props = horizontalScrollerParams[Math.max(
      0,
      Math.min(Number(version), horizontalScrollerParams.length - 1)
    )];
    const { data: data_left } = await loadTextContent({
      source: "./asset/svg/footer_shape_left.svg"
    });
    const { data: data_right } = await loadTextContent({
      source: "./asset/svg/footer_shape_right.svg"
    });
    return renderHtml`<div>
        <horizontal-scroller
            ${staticProps({
      animatePin: props.animatePin,
      svgLeft: data_left,
      svgRight: data_right,
      prevRoute: props.nav.prevRoute,
      nextRoute: props.nav.nextRoute
    })}
        ></horizontal-scroller>
    </div>`;
  };

  // src/js/component/pages/svg/child/animation/animation.js
  var childAnimations = ({ groups, trails }) => {
    const RAD2DEG = 180 / Math.PI;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let lastY = 0;
    let lastX = 0;
    let lastRotation = 0;
    let loopToAdd = 0;
    let trailCanMove = false;
    let tranilRotateElement = trails.map((item) => {
      return item.querySelector("svg");
    });
    let mouseTween = tween.createSpring({
      data: { x: 0, y: 0 },
      stagger: { each: 3, from: "start" }
    });
    trails.forEach((item) => {
      mouseTween.subscribe(({ x, y }) => {
        item.style.translate = `${x}px ${y}px`;
      });
    });
    let mouseTweenRotate = tween.createSpring({
      data: { rotation: 0 },
      stagger: { each: 8, from: "start" }
    });
    tranilRotateElement.forEach((item) => {
      mouseTweenRotate.subscribeCache(item, ({ rotation }) => {
        item.style.rotate = `${rotation}deg`;
      });
    });
    let trailIntro = tween.createTween({
      data: { opacity: 0, scale: 1.4 }
    });
    trails.forEach((item) => {
      trailIntro.subscribe(({ scale, opacity }) => {
        item.style.scale = `${scale}`;
        item.style.opacity = opacity;
      });
    });
    const unsubScribeResize = mobCore.useResize(() => {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;
    });
    const unsubscribeMouseMove = mobCore.useMouseMove(({ client }) => {
      if (!trailCanMove) return;
      const { x, y } = client;
      const yDiff = y - lastY;
      const xDiff = x - lastX;
      if (Math.abs(xDiff) > 10 || Math.abs(yDiff) > 10) {
        lastY = y;
        lastX = x;
        const rotationBase = Math.atan2(yDiff, xDiff) * RAD2DEG;
        const rotationParsed = rotationBase + 180;
        const difference = Math.abs(lastRotation - rotationParsed);
        if (difference > 180 && lastRotation < rotationParsed)
          loopToAdd -= difference;
        if (difference > 180 && lastRotation > rotationParsed)
          loopToAdd += difference;
        const rotationDef = rotationParsed + loopToAdd + 90;
        mouseTweenRotate.goTo({ rotation: rotationDef });
        lastRotation = rotationParsed;
      }
      mouseTween.goTo({ x: x - windowWidth / 2, y: y - windowHeight / 2 });
    });
    let introTween = tween.createTween({
      data: { opacity: 0, scale: 0.95 },
      duration: 2e3,
      ease: "easeOutQuart",
      stagger: { waitComplete: true, each: 5, from: "center" }
    });
    groups.forEach((item) => {
      introTween.subscribeCache(item, ({ scale, opacity }) => {
        item.style.scale = `${scale}`;
        item.style.opacity = opacity;
      });
    });
    let introTl = timeline.createAsyncTimeline({ repeat: 1 }).createGroup().goTo(introTween, {
      opacity: 1,
      scale: 1
    }).goTo(trailIntro, {
      scale: 1,
      opacity: 1
    }).closeGroup();
    return {
      playIntro: async () => {
        return introTl.play().then(() => {
          const timeOutValue = detectSafari() ? 500 : 0;
          setTimeout(() => {
            trailCanMove = true;
          }, timeOutValue);
        });
      },
      destroy: () => {
        introTween.destroy();
        introTween = null;
        introTl.destroy();
        introTl = null;
        mouseTween.destroy();
        mouseTween = null;
        mouseTweenRotate.destroy();
        mouseTweenRotate = null;
        trailIntro.destroy();
        trailIntro = null;
        unsubScribeResize();
        unsubscribeMouseMove();
        windowWidth = null;
        windowHeight = null;
        lastY = null;
        lastX = null;
        lastRotation = null;
        loopToAdd = null;
        tranilRotateElement = null;
      }
    };
  };

  // src/js/component/pages/svg/child/child.js
  var numberOfStar = 10;
  var playAnimation2 = async ({ playIntro }) => {
    await playIntro();
  };
  var getTrail = ({ star, setRef }) => {
    return [...new Array(numberOfStar).keys()].map((_item, index) => {
      return renderHtml`
                <div
                    class="child-trail child-trail--${index}"
                    ${setRef(`trail${index}`)}
                >
                    ${star}
                </div>
            `;
    }).join("");
  };
  var SvgChildFn = ({ onMount, html, getState, getRef, setRef }) => {
    const isDesktop = motionCore.mq("min", "desktop");
    const { svg, star } = isDesktop ? getState() : { svg: "", star: "" };
    const setQuickNavState = setStateByName("quick_nav");
    const setMainTitleState = setStateByName("animation_title");
    onMount(({ element }) => {
      if (!isDesktop) return;
      setQuickNavState("active", true);
      setQuickNavState("nextRoute", "#mv1");
      setQuickNavState("color", "black");
      setMainTitleState("align", "left");
      setMainTitleState("color", "black");
      setMainTitleState("title", "Child");
      const stagger = element.querySelectorAll('[ref="stagger"]');
      const {
        trail0,
        trail1,
        trail2,
        trail3,
        trail4,
        trail5,
        trail6,
        trail7,
        trail8,
        trail9
      } = getRef();
      const childMethods = childAnimations({
        groups: stagger,
        trails: [
          trail0,
          trail1,
          trail2,
          trail3,
          trail4,
          trail5,
          trail6,
          trail7,
          trail8,
          trail9
        ]
      });
      const { playIntro, destroy } = childMethods;
      playAnimation2({ playIntro });
      return () => {
        setQuickNavState("active", false);
        setQuickNavState("prevRoute", "");
        setQuickNavState("nextRoute", "");
        setMainTitleState("align", "");
        setMainTitleState("title", "");
        destroy();
      };
    });
    return html`<div class="svg-child-container">
        <div class="svg-child">${svg}</div>
        ${getTrail({ star, setRef })}
    </div>`;
  };

  // src/js/component/pages/svg/child/definition.js
  var svgChild = createComponent({
    name: "svg-child",
    component: SvgChildFn,
    exportState: ["svg", "star"],
    state: {
      star: () => ({
        value: "",
        type: String
      }),
      svg: () => ({
        value: "",
        type: String
      })
    }
  });

  // src/js/pages/svg/child/index.js
  useComponent([svgChild]);
  var child = async () => {
    const { data: svg } = await loadTextContent({
      source: "./asset/svg/child.svg"
    });
    const { data: star } = await loadTextContent({
      source: "./asset/svg/star.svg"
    });
    return renderHtml`<div>
        <svg-child ${staticProps({ svg, star })}></svg-child>
    </div>`;
  };

  // src/js/component/pages/svg/mv1/animation/index.js
  var mv1Animation = ({ logoRefs, around }) => {
    const logoRefsByKey = logoRefs.map((item) => {
      const [key, value] = Object.entries(item)[0];
      return { key, item: value };
    });
    let logoIntroTween = tween.createTween({
      data: { opacity: 0, scale: 0.5, x: -10 },
      duration: 2e3,
      ease: "easeOutQuart",
      stagger: { each: 8, from: "end" }
    });
    let logoTween = tween.createTween({
      data: { scale: 1, x: 0 },
      duration: 4e3,
      ease: "easeInOutQuad",
      stagger: { each: 40, from: "end" }
    });
    let aroundIntroTween = tween.createTween({
      data: { scale: 0.5, opacity: 0 },
      duration: 1e3,
      ease: "easeInOutQuad",
      stagger: { each: 4 }
    });
    let aroundTween = tween.createTween({
      data: { scale: 1 },
      duration: 4e3,
      ease: "easeInOutQuad",
      stagger: { each: 20 }
    });
    logoRefsByKey.forEach(({ key, item }) => {
      logoTween.subscribe(({ scale, x }) => {
        item.style.scale = `${scale}`;
        if (key !== "M_right" && key !== "M_left") return;
        const xVal = key === "M_right" ? -x : x;
        item.style.translate = `${xVal}px 0px`;
      });
    });
    logoRefsByKey.forEach(({ key, item }) => {
      logoIntroTween.subscribe(({ scale, x, opacity }) => {
        item.style.scale = `${scale}`;
        item.style.opacity = opacity;
        if (key !== "M_right" && key !== "M_left") return;
        const xVal = key === "M_right" ? -x : x;
        item.style.translate = `${xVal}px 0px`;
      });
    });
    around.forEach((item) => {
      aroundIntroTween.subscribe(({ scale, opacity }) => {
        item.style.scale = `${scale}`;
        item.style.opacity = opacity;
      });
    });
    around.forEach((item) => {
      aroundTween.subscribe(({ scale }) => {
        item.style.scale = `${scale}`;
      });
    });
    let introTl = timeline.createAsyncTimeline({ repeat: 1 }).createGroup({ waitComplete: true }).goTo(logoIntroTween, {
      opacity: 1,
      scale: 1,
      x: 0
    }).goTo(aroundIntroTween, {
      opacity: 1,
      scale: 1
    }).closeGroup();
    let tl = timeline.createAsyncTimeline({ repeat: -1, yoyo: true }).createGroup({ waitComplete: false }).goTo(logoTween, {
      scale: 0.95,
      x: 0.5
    }).goTo(aroundTween, {
      scale: 0.95
    }).closeGroup().createGroup({ waitComplete: false }).goTo(logoTween, {
      scale: 1.05,
      x: -0.5
    }).goTo(aroundTween, {
      scale: 1.05
    }).closeGroup();
    return {
      playIntro: async () => {
        return introTl.play();
      },
      playSvg: () => tl.play(),
      destroySvg: () => {
        tl.stop();
        logoTween.destroy();
        tl.destroy();
        introTl.destroy();
        aroundIntroTween.destroy();
        logoTween = null;
        logoIntroTween = null;
        aroundTween = null;
        aroundIntroTween = null;
        tl = null;
        introTl = null;
      }
    };
  };

  // src/js/component/pages/svg/mv1/mv1.js
  var playAnimation3 = async ({ playIntro, playSvg }) => {
    await playIntro();
    playSvg();
  };
  var Mv1Component = ({ html, onMount, getState }) => {
    const isDesktop = motionCore.mq("min", "desktop");
    const { logo, sideShape } = isDesktop ? getState() : { logo: "", sideShape: "" };
    const setQuickNavState = setStateByName("quick_nav");
    const setMainTitleState = setStateByName("animation_title");
    onMount(({ element }) => {
      if (!isDesktop) return;
      setQuickNavState("active", true);
      setQuickNavState("prevRoute", "#child");
      setQuickNavState("color", "black");
      setMainTitleState("align", "left");
      setMainTitleState("color", "white");
      setMainTitleState("title", "Mv1");
      const block1 = element.querySelector('[ref="block1"]');
      const block2 = element.querySelector('[ref="block2"]');
      const block3 = element.querySelector('[ref="block3"]');
      const block4 = element.querySelector('[ref="block4"]');
      const block5 = element.querySelector('[ref="block5"]');
      const block6 = element.querySelector('[ref="block6"]');
      const block7 = element.querySelector('[ref="block7"]');
      const block8 = element.querySelector('[ref="block8"]');
      const M_left = element.querySelector('[ref="M_left"]');
      const M_right = element.querySelector('[ref="M_right"]');
      const around = element.querySelectorAll('[ref="around"]');
      const { playIntro, playSvg, destroySvg } = mv1Animation({
        logoRefs: [
          { block1 },
          { block2 },
          { block3 },
          { block4 },
          { block5 },
          { block6 },
          { block7 },
          { block8 },
          { M_left },
          { M_right }
        ],
        around
      });
      playAnimation3({ playIntro, playSvg });
      return () => {
        setQuickNavState("active", false);
        setQuickNavState("prevRoute", "");
        setQuickNavState("nextRoute", "");
        setMainTitleState("align", "");
        setMainTitleState("title", "");
        destroySvg();
      };
    });
    return html`<div class="mv1">
        <div class="mv1__top-left">${sideShape}</div>
        <div class="mv1__logo">${logo}</div>
        <div class="mv1__top-right">${sideShape}</div>
    </div>`;
  };

  // src/js/component/pages/svg/mv1/definition.js
  var Mv1Def = createComponent({
    name: "mv1-component",
    component: Mv1Component,
    exportState: ["logo", "sideShape"],
    state: {
      logo: () => ({
        value: "",
        type: String
      }),
      sideShape: () => ({
        value: "",
        type: String
      })
    },
    scoped: true
  });

  // src/js/pages/svg/mv1/index.js
  useComponent([Mv1Def]);
  var mv1 = async () => {
    const { data: logo } = await loadTextContent({
      source: "./asset/svg/logo-color.svg"
    });
    const { data: sideShape } = await loadTextContent({
      source: "./asset/svg/piece-arrow.svg"
    });
    return renderHtml`<div>
        <mv1-component ${staticProps({ logo, sideShape })}></mv1-component>
    </div>`;
  };

  // src/js/pages/index.js
  var PAGE_TEMPLATE_DOCS_MOBJS = "templateMobJsComponent";
  var mobJsComponentBreadCrumbs = [
    {
      url: "./#mobJs-overview",
      title: "mobJs"
    },
    {
      url: "./#mobJs-component",
      title: "component"
    }
  ];
  var routes = [
    {
      name: "pageNotFound",
      layout: pageNotFound2,
      props: {}
    },
    {
      name: "about",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/about.json",
        title: "About",
        section: "",
        breadCrumbs: ""
      }
    },
    {
      name: "animatedPatternN0",
      layout: animatedPatternN0,
      props: {}
    },
    {
      name: "animatedPatternN1",
      layout: animatedPatternN1,
      props: {}
    },
    {
      name: "caterpillarN0",
      layout: caterpillarN0,
      props: {}
    },
    {
      name: "caterpillarN1",
      layout: caterpillarN1,
      props: {}
    },
    {
      name: "caterpillarN2",
      layout: caterpillarN2,
      props: {}
    },
    {
      name: "canvas-overview",
      layout: canvas_overview,
      props: {}
    },
    {
      name: "scrollerN0",
      layout: scrollerN0,
      props: {}
    },
    {
      name: "scrollerN1",
      layout: scrollerN1,
      props: {}
    },
    {
      name: "dynamic-list",
      layout: dynamic_list,
      props: {}
    },
    {
      name: "matrioska",
      layout: matrioska_page,
      props: {}
    },
    {
      name: "home",
      layout: home,
      props: {}
    },
    {
      name: "mobCore-overview",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobCore/overview.json",
        title: "mobCore",
        section: "",
        breadCrumbs: ""
      }
    },
    {
      name: "mobCore-defaults",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobCore/defaults.json",
        title: "Defaults",
        section: "mobCore",
        breadCrumbs: "./#mobCore-overview"
      }
    },
    {
      name: "mobCore-events",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobCore/events.json",
        title: "Events",
        section: "mobCore",
        breadCrumbs: "./#mobCore-overview"
      }
    },
    {
      name: "mobCore-store",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobCore/store.json",
        title: "Store",
        section: "mobCore",
        breadCrumbs: "./#mobCore-overview"
      }
    },
    {
      name: "mobJs-overview",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/overview.json",
        title: "mobJs",
        section: "",
        breadCrumbs: ""
      }
    },
    {
      name: "mobJs-initialization",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/initialization.json",
        title: "initialization",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-component",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/component.json",
        title: "component",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-web-component",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/webComponent.json",
        title: "webComponent",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-routing",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/routing.json",
        title: "routing",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-setStateByName",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/setStateByName.json",
        title: "setStateByName",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-updateStateByName",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/updateStateByName.json",
        title: "updateStateByName",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-debug-component",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/realWorld/debug-component.json",
        title: "Debug component",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-benchmark-invalidate",
      layout: benchMark,
      props: {
        rootComponent: "benchmark-invalidate"
      }
    },
    {
      name: "mobJs-benchmark-repeat-no-key",
      layout: benchMark,
      props: {
        rootComponent: "benchmark-repeat-no-key"
      }
    },
    {
      name: "mobJs-benchmark-repeat-key",
      layout: benchMark,
      props: {
        rootComponent: "benchmark-repeat-key"
      }
    },
    {
      name: "mobJs-useMethodByName",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/useMethodByName.json",
        title: "useMethodByName",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-tick",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/tick.json",
        title: "tick",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-utils",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/utils.json",
        title: "utils",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-debug",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobJs/debug.json",
        title: "debug",
        section: "mobJs",
        breadCrumbs: "./#mobJs-overview"
      }
    },
    {
      name: "mobJs-html",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/html.json",
        title: "html",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-onMount",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/onMount.json",
        title: "onMount",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-getState",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/getState.json",
        title: "getState",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-setState",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/setState.json",
        title: "setState",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-updateState",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/updateState.json",
        title: "updateState",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-watch",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/watch.json",
        title: "watch",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-watchSync",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/watchSync.json",
        title: "watchSync",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-staticProps",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/staticProps.json",
        title: "staticProps",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-bindProps",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/bindProps.json",
        title: "bindProps",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-bindEvents",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/bindEvents.json",
        title: "bindEvents",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-delegateEvents",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/delegateEvents.json",
        title: "delegateEvents",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-bindtext",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/bindText.json",
        title: "bindtext",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-bind-class-style",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/bindClassStyle.json",
        title: "bindClass/Style",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-methods",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/methods.json",
        title: "methods",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-refs",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/refs.json",
        title: "refs",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-runtime",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/runtime.json",
        title: "runtime",
        section: "mobJs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-repeat",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/repeat.json",
        title: "repeat",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-invalidate",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/invalidate.json",
        title: "repeat",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-invalidate-vs-repeater",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/invalidate-vs-repeater.json",
        title: "repeat",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-unBind",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/unBind.json",
        title: "unBind",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-emit",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/emit.json",
        title: "emit",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-emitAsync",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/emitAsync.json",
        title: "emitAsync",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-computed",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/computed.json",
        title: "computed",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-renderComponent",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/renderDom.json",
        title: "renderDom",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-removeDom",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/removeDom.json",
        title: "removeDom",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-remove",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/remove.json",
        title: "remove",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-getChildren",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/getChildren.json",
        title: "getChildren",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-freezeProp",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/freezeProp.json",
        title: "freezeProp",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-unFreezeProp",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/unFreezeProp.json",
        title: "unFreezeProp",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-getParentId",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/getParentId.json",
        title: "getParentId",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-watchParent",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/watchParent.json",
        title: "watchParent",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-instanceName",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/instanceName.json",
        title: "instanceName",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-class-list",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/classList.json",
        title: "classList",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobJs-slot",
      templateName: PAGE_TEMPLATE_DOCS_MOBJS,
      layout: layoutSidebarLinks,
      props: {
        source: "./data/mobJs/slot.json",
        title: "slot",
        section: "mobjs",
        breadCrumbs: mobJsComponentBreadCrumbs
      }
    },
    {
      name: "mobMotion-stagger",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobMotion/stagger.json",
        title: "Stagger",
        section: "mobMotion",
        breadCrumbs: "./#mobMotion-overview"
      }
    },
    {
      name: "mobMotion-defaults",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobMotion/defaults.json",
        title: "Defaults",
        section: "mobMotion",
        breadCrumbs: "./#mobMotion-overview"
      }
    },
    {
      name: "mobMotion-overview",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobMotion/overview.json",
        title: "mobMotion",
        section: "",
        breadCrumbs: ""
      }
    },
    {
      name: "mobMotion-parallax",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobMotion/parallax.json",
        title: "Parallax",
        section: "mobMotion",
        breadCrumbs: "./#mobMotion-overview"
      }
    },
    {
      name: "mobMotion-sequencer",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobMotion/sequencer.json",
        title: "Sequencer",
        section: "mobMotion",
        breadCrumbs: "./#mobMotion-overview"
      }
    },
    {
      name: "mobMotion-scrolltrigger",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobMotion/scrollTrigger.json",
        title: "ScrollTrigger",
        section: "mobMotion",
        breadCrumbs: "./#mobMotion-overview"
      }
    },
    {
      name: "mobMotion-sync-timeline",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobMotion/syncTimeline.json",
        title: "Sync timeline",
        section: "mobMotion",
        breadCrumbs: "./#mobMotion-overview"
      }
    },
    {
      name: "mobMotion-create-stagger",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobMotion/createStagger.json",
        title: "CreateStagger",
        section: "mobMotion",
        breadCrumbs: "./#mobMotion-overview"
      }
    },
    {
      name: "mobMotion-async-timeline",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobMotion/asyncTimeline.json",
        title: "Async timeline",
        section: "mobMotion",
        breadCrumbs: "./#mobMotion-overview"
      }
    },
    {
      name: "mobMotion-tween-spring-lerp",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/mobMotion/tweenSpringLerp.json",
        title: "Tween Spring Lerp",
        section: "mobMotion",
        breadCrumbs: "./#mobMotion-overview"
      }
    },
    {
      name: "horizontalScroller",
      templateName: "generic",
      layout: horizontalScroller,
      props: {}
    },
    {
      name: "plugin-overview",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/plugin/overview.json",
        title: "Plugin",
        section: "",
        breadCrumbs: ""
      }
    },
    {
      name: "child",
      layout: child,
      props: {}
    },
    {
      name: "mv1",
      layout: mv1,
      props: {}
    },
    {
      name: "svg-overview",
      layout: layoutSidebarAnchor,
      props: {
        source: "./data/svg/overview.json",
        title: "Svg",
        section: "",
        breadCrumbs: ""
      }
    }
  ];

  // src/js/component/lib/animation/verticalScroller.js
  var verticalScroller = ({ screen, scroller: scroller2, scrollbar }) => {
    let instance;
    return {
      init: () => {
        if (instance) return;
        instance = new SmoothScroller({
          screen,
          scroller: scroller2,
          direction: "vertical",
          drag: true,
          scopedEvent: false,
          breakpoint: "desktop",
          onTick: ({ percent }) => {
            scrollbar.value = percent;
          }
        });
        instance.init();
      },
      destroy: () => {
        instance?.destroy();
        instance = null;
      },
      refresh: () => {
        instance?.refresh();
      },
      updateScroller: () => {
        if (!instance) return;
        const scrollerHeight = outerHeight(scroller2);
        const screenHeight = outerHeight(screen);
        const scrollBarHeight = outerWidth(scrollbar);
        const thumbWidth = screenHeight / scrollerHeight * scrollBarHeight;
        scrollbar.style.setProperty("--thumb-width", `${thumbWidth}px`);
        instance?.refresh();
      },
      move: (val2) => {
        if (!instance) return;
        instance.move(val2);
      },
      goToTop: () => {
        instance?.set(0);
      }
    };
  };

  // src/js/component/common/linksMobJs/data.js
  var mobJsComponentParams = [
    {
      label: "Fundamental params",
      url: "",
      isLabel: true
    },
    {
      label: "html",
      url: "mobJs-html",
      isLabel: false
    },
    {
      label: "onMount",
      url: "mobJs-onMount",
      isLabel: false
    },
    {
      label: "getState",
      url: "mobJs-getState",
      isLabel: false
    },
    {
      label: "setState",
      url: "mobJs-setState",
      isLabel: false
    },
    {
      label: "updateState",
      url: "mobJs-updateState",
      isLabel: false
    },
    {
      label: "computed",
      url: "mobJs-computed",
      isLabel: false
    },
    {
      label: "watch",
      url: "mobJs-watch",
      isLabel: false
    },
    {
      label: "watchSync",
      url: "mobJs-watchSync",
      isLabel: false
    },
    {
      label: "staticProps",
      url: "mobJs-staticProps",
      isLabel: false
    },
    {
      label: "bindProps",
      url: "mobJs-bindProps",
      isLabel: false
    },
    {
      label: "bindEvents",
      url: "mobJs-bindEvents",
      isLabel: false
    },
    {
      label: "delegateEvents",
      url: "mobJs-delegateEvents",
      isLabel: false
    },
    {
      label: "bindText",
      url: "mobJs-bindtext",
      isLabel: false
    },
    {
      label: "bindClass/Style",
      url: "mobJs-bind-class-style",
      isLabel: false
    },
    {
      label: "methods",
      url: "mobJs-methods",
      isLabel: false
    },
    {
      label: "refs",
      url: "mobJs-refs",
      isLabel: false
    },
    {
      label: "Render Blocks",
      url: "",
      isLabel: true
    },
    {
      label: "renderComponent",
      url: "mobJs-runtime",
      isLabel: false
    },
    {
      label: "invalidate",
      url: "mobJs-invalidate",
      isLabel: false
    },
    {
      label: "repeat ( array.map )",
      url: "mobJs-repeat",
      isLabel: false
    },
    {
      label: "invalidate vs repeater",
      url: "mobJs-invalidate-vs-repeater",
      isLabel: false
    },
    {
      label: "Static params",
      url: "",
      isLabel: true
    },
    {
      label: "InstanceName",
      url: "mobJs-instanceName",
      isLabel: false
    },
    {
      label: "ClassList",
      url: "mobJs-class-list",
      isLabel: false
    },
    {
      label: "Slot",
      url: "mobJs-slot",
      isLabel: false
    },
    {
      label: "Utils params",
      url: "",
      isLabel: true
    },
    {
      label: "unBind",
      url: "mobJs-unBind",
      isLabel: false
    },
    {
      label: "emit",
      url: "mobJs-emit",
      isLabel: false
    },
    {
      label: "emitAsync",
      url: "mobJs-emitAsync",
      isLabel: false
    },
    {
      label: "removeDOM",
      url: "mobJs-removeDom",
      isLabel: false
    },
    {
      label: "remove",
      url: "mobJs-remove",
      isLabel: false
    },
    {
      label: "getChildren",
      url: "mobJs-getChildren",
      isLabel: false
    },
    {
      label: "freezeProp",
      url: "mobJs-freezeProp",
      isLabel: false
    },
    {
      label: "unFreezeProp",
      url: "mobJs-unFreezeProp",
      isLabel: false
    },
    {
      label: "getParentId",
      url: "mobJs-getParentId"
    },
    {
      label: "watchParent",
      url: "mobJs-watchParent"
    }
  ];

  // src/js/component/common/linksMobJs/linksMobJs.js
  var templateData = {
    [PAGE_TEMPLATE_DOCS_MOBJS]: mobJsComponentParams
  };
  var getItems3 = ({ staticProps: staticProps2, getState, bindProps }) => {
    const { data: data2 } = getState();
    return data2.map((item) => {
      const { label, url, isLabel } = item;
      return isLabel ? renderHtml`<h3 class="c-params-mobjs__label">${label}</h3>` : renderHtml`<li>
                      <links-mobjs-button
                          ${staticProps2({
        label,
        url
      })}
                          ${bindProps({
        bind: ["activeSection"],
        props: ({ activeSection }) => {
          return {
            active: activeSection === url
          };
        }
      })}
                      ></links-mobjs-button>
                  </li>`;
    }).join("");
  };
  var LinksMobJsFn = ({
    html,
    staticProps: staticProps2,
    setRef,
    getRef,
    onMount,
    setState,
    bindProps,
    invalidate,
    getState
  }) => {
    onMount(() => {
      const { screenEl, scrollerEl, scrollbar } = getRef();
      let init7 = () => {
      };
      let destroy = () => {
      };
      let move = () => {
      };
      let updateScroller = () => {
      };
      let isActive = false;
      scrollbar.addEventListener("input", () => {
        move?.(scrollbar.value);
      });
      navigationStore.watch("navigationIsOpen", (value) => {
        const {
          activeRoute: { templateName }
        } = mainStore.get();
        if (!(templateName in templateData)) return;
        screenEl.classList.toggle("active", !value);
      });
      const unsubscribeRoute = mainStore.watch(
        "afterRouteChange",
        async (data2) => {
          const { templateName, route } = data2;
          const currentData = templateData?.[templateName] ?? [];
          setState("data", currentData);
          await tick();
          setState("activeSection", route);
          if (currentData.length > 0) {
            screenEl.classList.add("active");
            if (isActive) return;
            ({ init: init7, destroy, move, updateScroller } = verticalScroller(
              {
                screen: screenEl,
                scroller: scrollerEl,
                scrollbar
              }
            ));
            isActive = true;
            init7();
            updateScroller();
            move(0);
          }
          if (currentData.length === 0) {
            screenEl.classList.remove("active");
            destroy?.();
            isActive = false;
          }
        }
      );
      return () => {
        destroy?.();
        unsubscribeRoute();
        init7 = () => {
        };
        destroy = () => {
        };
        move = () => {
        };
        updateScroller = () => {
        };
      };
    });
    return html`<div class="c-params-mobjs" ${setRef("screenEl")}>
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${setRef("scrollbar")}
            class="c-params-mobjs__scrollbar"
        />
        <ul ${setRef("scrollerEl")}>
            ${invalidate({
      bind: ["data"],
      persistent: true,
      render: () => {
        return getItems3({
          staticProps: staticProps2,
          bindProps,
          getState
        });
      }
    })}
        </ul>
    </div>`;
  };

  // src/js/component/common/linksMobJs/linksMobJsButton.js
  var LinksMobJsButtonFn = ({ html, getState, onMount, watchSync }) => {
    const { label, url } = getState();
    onMount(({ element }) => {
      watchSync("active", (value) => {
        element.classList.toggle("current", value);
      });
      return () => {
      };
    });
    return html` <a href="./#${url}"><span>${label}</span></a>`;
  };

  // src/js/component/common/linksMobJs/definition.js
  var LinksMobJsButton = createComponent({
    name: "links-mobjs-button",
    component: LinksMobJsButtonFn,
    exportState: ["label", "url", "active"],
    state: {
      label: () => ({
        value: "",
        type: String
      }),
      url: () => ({
        value: "",
        type: String
      }),
      active: () => ({
        value: false,
        type: Boolean
      })
    }
  });
  var LinksMobJs = createComponent({
    name: "links-mobjs",
    component: LinksMobJsFn,
    child: [LinksMobJsButton],
    exportState: ["active"],
    state: {
      data: () => ({
        value: [],
        type: Array
      }),
      activeSection: () => ({
        value: "",
        type: String
      })
    }
  });

  // src/js/component/common/onlyDesktop/onlyDesktop.js
  var getContent = ({ getState }) => {
    const { active } = getState();
    return active ? `` : renderHtml`
              <div class="only-desktop">
                  <h3>This site is available only on desktop</h3>
              </div>
          `;
  };
  var OnlyDesktopFn = ({
    html,
    onMount,
    setState,
    getState,
    invalidate
  }) => {
    onMount(() => {
      mobCore.useResize(() => {
        setState(
          "active",
          /** @type {boolean} */
          motionCore.mq("min", "desktop")
        );
      });
      return () => {
      };
    });
    return html`
        <div class="only-desktop-container">
            ${invalidate({
      bind: "active",
      persistent: true,
      render: () => {
        return getContent({ getState });
      }
    })}
        </div>
    `;
  };

  // src/js/component/common/onlyDesktop/definition.js
  var OnlyDesktop = createComponent({
    name: "only-desktop",
    component: OnlyDesktopFn,
    state: {
      active: () => ({
        value: motionCore.mq("min", "desktop"),
        type: Boolean
      })
    }
  });

  // src/js/component/common/debug/debugOverlay/constant.js
  var RESET_FILTER_DEBUG = "reset";
  var DEBUG_USE_TREE = "tree";
  var DEBUG_USE_FILTER_COMPONENT = "filter_component";

  // src/js/component/common/debug/debugOverlay/Store/DebugActiveComponent.js
  var debugActiveComponentStore = mobCore.createStore({
    currentId: () => ({
      values: "",
      type: String
    })
  });

  // src/js/component/common/debug/debugOverlay/DebugComponent/debugComponent.js
  var getClassList = (value) => {
    if (!value) return "";
    return [...value].reduce(
      (previous, current) => `${previous}.${current}`,
      ""
    );
  };
  var getObjectKeys = (methods) => {
    return Object.keys(methods).reduce((previous, current) => {
      return `${previous} ${current},`;
    }, "");
  };
  var getChild = (child2) => {
    return Object.entries(child2).map(([key, value]) => {
      return renderHtml`<div>
                <strong>${key}:</strong>
                ${value.map((item) => renderHtml`${item}, `).join(".")}
            </div>`;
    }).join("");
  };
  var getFreezeProp = (props) => {
    if (!props) return "";
    return props.map((prop) => `${prop}, `).join("");
  };
  var getStateProps = (states) => {
    return Object.entries(states).map(([key, value]) => {
      return renderHtml`<div>
                <strong>${key}:</strong>
                ${JSON.stringify(value)}
            </div>`;
    }).join("");
  };
  var getContent2 = ({ getState }) => {
    const { id } = getState();
    if (id === RESET_FILTER_DEBUG) return "";
    const item = componentMap.get(id);
    if (!item) return `component not found`;
    return renderHtml`<div>
        <!-- Basic props -->
        <div><strong>id</strong>: ${id}</div>
        <div><strong>parent id</strong>: ${item.parentId}</div>
        <div>
            <strong>component root</strong>:
            ${item.element.tagName}${getClassList(item.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${item.componentName}</div>
        <div><strong>instance name:</strong>: ${item.instanceName}</div>
        <div><strong>methods:</strong>: ${getObjectKeys(item.methods)}</div>
        <div><strong>refs:</strong>: ${getObjectKeys(item.refs)}</div>
        <div><strong>persistent:</strong>: ${item.persistent}</div>

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${getChild(item?.child ?? {})}</div>

        <!-- Repeater -->
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${item.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${item.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${item?.repeaterInnerWrap?.tagName}${getClassList(
      item?.repeaterInnerWrap?.classList
    )}
        </div>
        <div><strong>repeat key</strong>: ${item.key}</div>
        <div>
            <strong>repeat current state</strong>:
            ${JSON.stringify(item.currentRepeaterState?.current)}
        </div>
        <div>
            <strong>repeat current index</strong>:
            ${JSON.stringify(item.currentRepeaterState?.index)}
        </div>

        <!-- State -->
        <h3 class="c-debug-component__section-title">State:</h3>
        <div>
            <strong>Freezed prop:</strong>
            ${getFreezeProp(item?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${getStateProps(item.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${getStateProps(item.state.getValidation())}
        </div>
    </div>`;
  };
  var initScroller = ({ getRef }) => {
    const { screen, scroller: scroller2, scrollbar } = getRef();
    const methods = verticalScroller({
      screen,
      scroller: scroller2,
      scrollbar
    });
    const init7 = methods.init;
    const destroy = methods.destroy;
    const refresh = methods.refresh;
    const move = methods.move;
    const updateScroller = methods.updateScroller;
    init7();
    updateScroller();
    move(0);
    return {
      destroy,
      move,
      refresh,
      updateScroller
    };
  };
  var DebugComponentFn = ({
    html,
    onMount,
    addMethod,
    setState,
    updateState,
    getState,
    invalidate,
    setRef,
    getRef,
    watch,
    delegateEvents
  }) => {
    addMethod("updateId", (id) => {
      setState("id", id);
      debugActiveComponentStore.set("currentId", id);
    });
    addMethod("refreshId", () => {
      updateState("id", (id) => id);
    });
    let move;
    onMount(() => {
      const {
        destroy,
        updateScroller,
        move: moveUpdated,
        refresh
      } = initScroller({
        getRef
      });
      move = moveUpdated;
      watch("id", async () => {
        await tick();
        refresh();
        updateScroller();
        move(0);
      });
      return () => {
        destroy?.();
      };
    });
    return html`<div class="c-debug-component" ${setRef("screen")}>
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${setRef("scrollbar")}
            class="c-debug-component__scrollbar"
            ${delegateEvents({
      input: (event) => {
        move?.(event.target.value);
      }
    })}
        />
        <div class="c-debug-component__container" ${setRef("scroller")}>
            ${invalidate({
      bind: "id",
      render: () => {
        return getContent2({ getState });
      }
    })}
        </div>
    </div>`;
  };

  // src/js/component/common/debug/debugOverlay/DebugComponent/definition.js
  var DebugComponent = createComponent({
    name: "debug-component",
    component: DebugComponentFn,
    state: {
      id: () => ({
        value: RESET_FILTER_DEBUG,
        type: String,
        skipEqual: false
      })
    }
  });

  // src/js/component/common/debug/debugOverlay/DebugFilter/DebugFilterHead/debugFilterHead.js
  var lastSearch = "";
  var DebugFilterHeadFn = ({
    html,
    onMount,
    setRef,
    getRef,
    delegateEvents
  }) => {
    onMount(() => {
      (async () => {
        await tick();
        useMethodByName("debug_filter_list")?.refreshList({
          testString: lastSearch
        });
      })();
      return () => {
      };
    });
    return html`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value="${lastSearch}"
            ${setRef("input")}
            ${delegateEvents({
      keypress: (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          const testString = event.target.value;
          lastSearch = testString;
          useMethodByName("debug_filter_list")?.refreshList({
            testString
          });
        }
      }
    })}
        />
        <button
            class="c-debug-filter-head__button"
            type="button"
            ${delegateEvents({
      click: () => {
        const { input } = getRef();
        const testString = input.value;
        lastSearch = testString;
        useMethodByName("debug_filter_list")?.refreshList({
          testString
        });
      }
    })}
        >
            find
        </button>
    </div>`;
  };

  // src/js/component/common/debug/debugOverlay/DebugFilter/DebugFilterHead/definition.js
  var DebugFilterHead = createComponent({
    name: "debug-filter-head",
    component: DebugFilterHeadFn
  });

  // src/js/component/common/debug/debugOverlay/DebugFilter/DebugFilterList/debugFilterList.js
  var initScroller2 = async ({ getRef }) => {
    await tick();
    const { screen, scroller: scroller2, scrollbar } = getRef();
    const methods = verticalScroller({
      screen,
      scroller: scroller2,
      scrollbar
    });
    const init7 = methods.init;
    const destroy = methods.destroy;
    const refresh = methods.refresh;
    const move = methods.move;
    const updateScroller = methods.updateScroller;
    init7();
    updateScroller();
    move(0);
    return {
      destroy,
      move,
      refresh,
      updateScroller
    };
  };
  var FAKE_REPLACMENT = "{{fake}}";
  var getDataFiltered = ({ testString }) => {
    const stringParsed = testString.split(" ").filter((block) => block !== "") ?? "";
    return ([...componentMap.values()].filter(({ componentName }) => {
      return stringParsed.every((piece) => componentName.includes(piece));
    }) ?? []).map(({ id, componentName, instanceName }) => ({
      id,
      tag: (() => {
        const stringParseWithPlaceholder = stringParsed.reduce(
          (previous, current, index) => {
            return previous.replace(
              current,
              `${FAKE_REPLACMENT}--${index}`
            );
          },
          componentName
        );
        return stringParsed.reduce((previous, current, index) => {
          return previous.replace(
            `${FAKE_REPLACMENT}--${index}`,
            `<span class="match-string">${current}</span>`
          );
        }, stringParseWithPlaceholder);
      })(),
      name: instanceName
    }));
  };
  var DebugFilterListFn = ({
    html,
    onMount,
    setRef,
    getRef,
    addMethod,
    repeat,
    setState,
    staticProps: staticProps2,
    bindProps,
    delegateEvents,
    getState,
    watch
  }) => {
    let destroy = () => {
    };
    let move = () => {
    };
    let refresh = () => {
    };
    let updateScroller = () => {
    };
    addMethod("refreshList", async ({ testString }) => {
      setState("isLoading", true);
      await tick();
      mobCore.useFrame(() => {
        mobCore.useNextTick(async () => {
          setState("data", getDataFiltered({ testString }));
          await tick();
          refresh?.();
          updateScroller?.();
          setState("isLoading", false);
        });
      });
    });
    onMount(() => {
      const { loadingRef, noresultRef } = getRef();
      (async () => {
        ({ destroy, move, refresh, updateScroller } = await initScroller2({
          getRef
        }));
      })();
      watch("isLoading", (isLoading) => {
        const { data: data2 } = getState();
        const hasOccurrence = data2.length > 0;
        loadingRef.classList.toggle("visible", isLoading);
        noresultRef.classList.toggle(
          "visible",
          !hasOccurrence && !isLoading
        );
      });
      return () => {
        destroy?.();
        destroy = () => {
        };
        refresh = () => {
        };
        updateScroller = () => {
        };
        move = () => {
        };
      };
    });
    return html`
        <div class="c-debug-filter-list">
            <div class="c-debug-filter-list__list" ${setRef("screen")}>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${setRef("scrollbar")}
                    class="c-debug-filter-list__scrollbar"
                    ${delegateEvents({
      input: (event) => {
        move?.(event.target.value);
      }
    })}
                />
                <span
                    ${setRef("loadingRef")}
                    class="c-debug-filter-list__status"
                    >Generate list</span
                >
                <span
                    ${setRef("noresultRef")}
                    class="c-debug-filter-list__status"
                    >no result</span
                >
                <div
                    class="c-debug-filter-list__scroller"
                    ${setRef("scroller")}
                >
                    ${repeat({
      bind: "data",
      key: "id",
      render: ({ html: html2, sync, currentValue }) => {
        return html2`
                                <debug-filter-list-item
                                    ${staticProps2({
          id: currentValue?.id,
          name: currentValue?.name
        })}
                                    ${bindProps({
          /** @returns{Partial<import('./DebugFilterLitItem/type').DebugFilterListItem>} */
          props: ({ data: data2 }, index) => {
            return {
              tag: data2[index].tag
            };
          }
        })}
                                    ${sync()}
                                ></debug-filter-list-item>
                            `;
      }
    })}
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/common/debug/debugOverlay/DebugFilter/DebugFilterList/DebugFilterLitItem/debugFilterListItem.js
  var setActiveItems = ({ id, value, getRef }) => {
    const { selected } = getRef();
    selected.classList.toggle("active", value === id);
  };
  var DebugFilterListItemFn = ({
    html,
    getState,
    delegateEvents,
    bindText,
    onMount,
    setRef,
    getRef
  }) => {
    const { id, name } = getState();
    onMount(() => {
      const { currentId } = debugActiveComponentStore.get();
      setActiveItems({ id, value: currentId, getRef });
      const unsubscribeActiveItem = debugActiveComponentStore.watch(
        "currentId",
        (value) => {
          setActiveItems({ id, value, getRef });
        }
      );
      return () => {
        unsubscribeActiveItem();
      };
    });
    return html`
        <div class="c-debug-filter-list-item">
            <span class="c-debug-filter-list-item__id">${id}</span> |
            <span class="c-debug-filter-list-item__tag"
                >${bindText`${"tag"}`}</span
            >
            |
            <span class="c-debug-filter-list-item__name">${name}</span>
            <button
                type="button"
                class="c-debug-filter-list-item__expand"
                ${delegateEvents({
      click: () => {
        useMethodByName("debug_component")?.updateId(id);
      }
    })}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${setRef("selected")}
            ></span>
        </div>
    `;
  };

  // src/js/component/common/debug/debugOverlay/DebugFilter/DebugFilterList/DebugFilterLitItem/definition.js
  var DebugFilterListItem = createComponent({
    name: "debug-filter-list-item",
    component: DebugFilterListItemFn,
    exportState: ["id", "tag", "name"],
    state: {
      id: () => ({
        value: "",
        type: String
      }),
      tag: () => ({
        value: "",
        type: String
      }),
      name: () => ({
        value: "",
        type: String
      })
    }
  });

  // src/js/component/common/debug/debugOverlay/DebugFilter/DebugFilterList/definition.js
  var DebugFilterList = createComponent({
    name: "debug-filter-list",
    component: DebugFilterListFn,
    exportState: ["active"],
    state: {
      data: () => ({
        value: [],
        type: Array
      }),
      isLoading: () => ({
        value: false,
        type: Boolean
      })
    },
    child: [DebugFilterListItem]
  });

  // src/js/component/common/debug/debugOverlay/Debughead/debugHead.js
  var DebugHeadFn = ({
    html,
    onMount,
    getState,
    watch,
    invalidate,
    setState
  }) => {
    onMount(() => {
      watch("active", async () => {
        setState("shouldUpdate", true);
      });
      const unsubscrineRoute = mainStore.watch(
        "afterRouteChange",
        async () => {
          setState("shouldUpdate", true);
        }
      );
      return () => {
        unsubscrineRoute();
      };
    });
    return html`<div class="c-debug-head">
        <div class="c-debug-head__general">
            ${invalidate({
      bind: "shouldUpdate",
      render: ({ html: html2 }) => {
        const { active } = getState();
        if (!active) return "";
        return html2`
                        <div>
                            <strong> Debug activated: </strong>
                            ${getDebugMode()}
                        </div>
                        <div class="c-debug-head__total">
                            <strong>Number of component</strong>:
                            ${componentMap.size} ( excluded generated debug )
                        </div>
                        <div class="c-debug-head__repeater">
                            <strong>Active repeater: </strong>:
                            ${getNumberOfActiveRepeater()}
                        </div>
                        <div class="c-debug-head__invalidate">
                            <strong>Active invalidate: </strong>:
                            ${getNumberOfActiveInvalidate()}
                        </div>
                        <div class="c-debug-head__invalidate">
                            <strong>Active bindText: </strong>:
                            ${getBindTextParentSize()}
                        </div>
                    `;
      }
    })}
        </div>
        <div class="c-debug-head__search">
            <div>
                <debug-search></debug-search>
            </div>
        </div>
    </div>`;
  };

  // src/js/component/common/debug/debugOverlay/Debughead/DebugSearch/debugSearch.js
  var DebugSearchFn = ({ html, setRef, getRef, delegateEvents }) => {
    return html`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${setRef("id_input")}
                ${delegateEvents({
      keypress: (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          const id = event.target.value;
          useMethodByName("debug_component")?.updateId(
            id ?? ""
          );
        }
      }
    })}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${delegateEvents({
      click: () => {
        const { id_input } = getRef();
        const id = id_input.value;
        useMethodByName("debug_component")?.updateId(id ?? "");
      }
    })}
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
                ${setRef("instance_input")}
                ${delegateEvents({
      keypress: (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          const instanceName = event.target.value;
          const id = getIdByInstanceName(instanceName);
          useMethodByName("debug_component")?.updateId(
            id ?? ""
          );
        }
      }
    })}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${delegateEvents({
      click: () => {
        const { instance_input } = getRef();
        const instanceName = instance_input.value;
        const id = getIdByInstanceName(instanceName);
        useMethodByName("debug_component")?.updateId(id ?? "");
      }
    })}
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
                    ${delegateEvents({
      click: () => {
        const { instance_input, id_input } = getRef();
        instance_input.value = "";
        id_input.value = "";
        useMethodByName("debug_component")?.updateId(
          RESET_FILTER_DEBUG
        );
      }
    })}
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
                    ${delegateEvents({
      click: () => {
        useMethodByName("debug_component")?.refreshId();
      }
    })}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;
  };

  // src/js/component/common/debug/debugOverlay/Debughead/DebugSearch/definition.js
  var DebugSearch = createComponent({
    name: "debug-search",
    component: DebugSearchFn
  });

  // src/js/component/common/debug/debugOverlay/Debughead/definition.js
  var DebugHead = createComponent({
    name: "debug-head",
    component: DebugHeadFn,
    exportState: ["active"],
    state: {
      active: () => ({
        value: false,
        type: Boolean
      }),
      shouldUpdate: () => ({
        value: true,
        type: Boolean,
        skipEqual: false
      })
    },
    child: [DebugSearch]
  });

  // src/js/component/common/debug/debugOverlay/debugOverlay.js
  var DebugOverlayFn = ({
    html,
    delegateEvents,
    addMethod,
    onMount,
    updateState,
    watchSync,
    setState,
    bindProps,
    invalidate,
    getState,
    setRef,
    getRef
  }) => {
    addMethod("toggle", () => {
      updateState("active", (value) => !value);
    });
    onMount(({ element }) => {
      const { toggle_tree, toggle_filter } = getRef();
      watchSync("active", (value) => {
        element.classList.toggle("active", value);
      });
      watchSync("listType", (value) => {
        const isTree = value === DEBUG_USE_TREE;
        toggle_tree.classList.toggle("active", isTree);
        toggle_filter.classList.toggle("active", !isTree);
      });
      return () => {
      };
    });
    return html`<div class="c-debug-overlay">
        <button
            class="c-debug-overlay__background"
            type="button"
            ${delegateEvents({
      click: () => {
        setState("active", false);
      }
    })}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${delegateEvents({
      click: () => {
        setState("active", false);
      }
    })}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${delegateEvents({
      click: () => {
        consoleLogDebug();
      }
    })}
            >
                console log
            </button>

            <div class="c-debug-overlay__head">
                <debug-head
                    ${bindProps({
      bind: ["active"],
      /** @returns{Partial<import('./Debughead/type').DebugHead>} */
      props: ({ active }) => {
        return {
          active
        };
      }
    })}
                ></debug-head>
            </div>
            <div class="c-debug-overlay__list">
                <div class="c-debug-overlay__list__header">
                    <div>
                        ${invalidate({
      bind: ["listType", "active"],
      persistent: true,
      render: ({ html: html2 }) => {
        const { listType, active } = getState();
        if (listType === DEBUG_USE_TREE && active)
          return html2`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`;
        if (listType === DEBUG_USE_FILTER_COMPONENT && active)
          return html2`<debug-filter-head></debug-filter-head>`;
        return "";
      }
    })}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${setRef("toggle_tree")}
                            ${delegateEvents({
      click: () => {
        setState("listType", DEBUG_USE_TREE);
      }
    })}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${setRef("toggle_filter")}
                            ${delegateEvents({
      click: () => {
        setState(
          "listType",
          DEBUG_USE_FILTER_COMPONENT
        );
      }
    })}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${invalidate({
      bind: ["listType", "active"],
      persistent: true,
      render: ({ html: html2 }) => {
        const { listType, active } = getState();
        if (listType === DEBUG_USE_TREE && active)
          return html2`
                                    <debug-tree name="debug_tree"></debug-tree>
                                `;
        if (listType === DEBUG_USE_FILTER_COMPONENT && active)
          return html2`
                                    <debug-filter-list
                                        name="debug_filter_list"
                                    ></debug-filter-list>
                                `;
        return "";
      }
    })}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="debug_component"></debug-component>
            </div>
        </div>
    </div>`;
  };

  // src/js/component/common/debug/debugOverlay/DebugTree/recursiveTree.js
  var generateTreeComponents = ({ data: data2, staticProps: staticProps2 }) => {
    return data2.map(({ id, componentName, instanceName, children }) => {
      return renderHtml`<debug-tree-item
                ${staticProps2({
        id,
        componentName,
        instanceName,
        children
      })}
            ></debug-tree-item>`;
    }).join("");
  };

  // src/js/component/common/debug/debugOverlay/DebugTree/debugTree.js
  var initScroller3 = async ({ getRef }) => {
    await tick();
    const { screen, scroller: scroller2, scrollbar } = getRef();
    const methods = verticalScroller({
      screen,
      scroller: scroller2,
      scrollbar
    });
    const destroy = methods.destroy;
    const refresh = methods.refresh;
    const move = methods.move;
    const updateScroller = methods.updateScroller;
    methods.init();
    updateScroller();
    move(0);
    return {
      destroy,
      refresh,
      move,
      updateScroller
    };
  };
  var DebugTreeFn = ({
    html,
    onMount,
    setState,
    getState,
    invalidate,
    staticProps: staticProps2,
    setRef,
    getRef,
    addMethod,
    delegateEvents,
    watch
  }) => {
    let destroy = () => {
    };
    let refresh = () => {
    };
    let updateScroller = () => {
    };
    let move = () => {
    };
    onMount(() => {
      const { loadingRef } = getRef();
      addMethod("refresh", () => {
        refresh?.();
        updateScroller?.();
      });
      const unsubscrineRoute = mainStore.watch(
        "afterRouteChange",
        async () => {
          setState("isLoading", true);
          await tick();
          mobCore.useFrame(() => {
            mobCore.useNextTick(async () => {
              destroy?.();
              setState("data", getTree());
              ({ destroy, move, refresh, updateScroller } = await initScroller3({ getRef }));
              setState("isLoading", false);
            });
          });
        }
      );
      watch("isLoading", (isLoading) => {
        loadingRef.classList.toggle("visible", isLoading);
      });
      (async () => {
        setState("isLoading", true);
        await tick();
        mobCore.useFrame(() => {
          mobCore.useNextTick(async () => {
            destroy?.();
            setState("data", getTree());
            ({ destroy, move, refresh, updateScroller } = await initScroller3({ getRef }));
            setState("isLoading", false);
          });
        });
      })();
      return () => {
        unsubscrineRoute();
        destroy?.();
        destroy = () => {
        };
        refresh = () => {
        };
        updateScroller = () => {
        };
        move = () => {
        };
      };
    });
    return html`
        <div class="c-debug-tree">
            <div class="c-debug-tree__list" ${setRef("screen")}>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${setRef("scrollbar")}
                    class="c-debug-tree__scrollbar"
                    ${delegateEvents({
      input: (event) => {
        move?.(event.target.value);
      }
    })}
                />
                <span ${setRef("loadingRef")} class="c-debug-tree__status"
                    >Generate tree</span
                >
                <div class="c-debug-tree__scroller" ${setRef("scroller")}>
                    ${invalidate({
      bind: "data",
      render: () => {
        const { data: data2 } = getState();
        return generateTreeComponents({
          data: data2,
          staticProps: staticProps2
        });
      }
    })}
                </div>
            </div>
        </div>
    `;
  };

  // src/js/component/common/debug/debugOverlay/DebugTree/DebugTreeItem/debugTreeItem.js
  var getCounter = (value) => {
    return value > 0 ? `( ${value} ) ` : "";
  };
  var activeItemChildren = ({ id, value }) => {
    const component = componentMap.get(id);
    const children = component?.child;
    if (!children) return false;
    const flatChildren = Object.values(children).flat();
    const hasOccurrence = flatChildren.includes(value);
    if (hasOccurrence) return true;
    return flatChildren.some((id2) => activeItemChildren({ id: id2, value }));
  };
  var setActiveItems2 = ({ id, value, getRef }) => {
    const { selected, head } = getRef();
    selected.classList.toggle("active", value === id);
    const hasActiveChildren = activeItemChildren({ id, value });
    head.classList.toggle("has-children-selected", hasActiveChildren);
  };
  var DebugTreeItemFn = ({
    html,
    onMount,
    getState,
    staticProps: staticProps2,
    getRef,
    setRef,
    delegateEvents,
    updateState,
    watch
  }) => {
    const { id, componentName, instanceName, children } = getState();
    const hasChildrenClass = children.length > 0 ? "has-children" : "";
    onMount(() => {
      const { content, head } = getRef();
      const { currentId } = debugActiveComponentStore.get();
      setActiveItems2({ id, value: currentId, getRef });
      const unsubscribeSlide = slide.subscribe(content);
      slide.reset(content);
      watch("isOpen", async (isOpen) => {
        head.classList.toggle("open", isOpen);
        const action2 = isOpen ? "down" : "up";
        await slide[action2](content);
        useMethodByName("debug_tree")?.refresh();
      });
      const unsubscribeActiveItem = debugActiveComponentStore.watch(
        "currentId",
        (value) => {
          setActiveItems2({ id, value, getRef });
        }
      );
      return () => {
        unsubscribeSlide();
        unsubscribeActiveItem();
      };
    });
    return html`<div class="c-debug-tree-item">
        <div
            class="c-debug-tree-item__head ${hasChildrenClass}"
            ${setRef("head")}
            ${delegateEvents({
      click: () => {
        updateState("isOpen", (value) => !value);
      }
    })}
        >
            <span class="c-debug-tree-item__id">${id}</span> |
            <span class="c-debug-tree-item__component">${componentName}</span> |
            <span class="c-debug-tree-item__instance">${instanceName}</span>
            <span>${getCounter(children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${delegateEvents({
      click: () => {
        useMethodByName("debug_component")?.updateId(id);
      }
    })}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${setRef("selected")}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${setRef("content")}>
            ${generateTreeComponents({ data: children, staticProps: staticProps2 })}
        </div>
    </div>`;
  };

  // src/js/component/common/debug/debugOverlay/DebugTree/DebugTreeItem/definition.js
  var DebugTreeItem = createComponent({
    name: "debug-tree-item",
    component: DebugTreeItemFn,
    exportState: ["id", "componentName", "instanceName", "children"],
    state: {
      id: () => ({
        value: "",
        type: String
      }),
      componentName: () => ({
        value: "",
        type: String
      }),
      instanceName: () => ({
        value: "",
        type: String
      }),
      children: () => ({
        value: [],
        type: Array
      }),
      isOpen: () => ({
        value: false,
        type: Boolean
      })
    }
  });

  // src/js/component/common/debug/debugOverlay/DebugTree/definition.js
  var DebugTree = createComponent({
    name: "debug-tree",
    component: DebugTreeFn,
    exportState: ["active"],
    state: {
      data: () => ({
        value: [],
        type: Array
      }),
      isLoading: () => ({
        value: false,
        type: Boolean
      })
    },
    child: [DebugTreeItem]
  });

  // src/js/component/common/debug/debugOverlay/definition.js
  var DebugOverlay = createComponent({
    name: "debug-overlay",
    component: DebugOverlayFn,
    state: {
      active: () => ({
        value: false,
        type: Boolean
      }),
      listType: () => ({
        value: DEBUG_USE_TREE,
        type: String
      })
    },
    child: [
      DebugTree,
      DebugComponent,
      DebugHead,
      DebugFilterHead,
      DebugFilterList
    ]
  });

  // src/js/wrapper/index.js
  useComponent([
    CodeOverlay,
    Header,
    NavigationContainer,
    Footer,
    QuickNav,
    RouteLoader,
    AnimationTitle,
    MLogo1,
    ScrollDownLabel,
    CodeButton,
    ScrollToTop,
    LinksMobJs,
    OnlyDesktop,
    DebugOverlay
  ]);
  var wrapper = async () => {
    const { data: svg } = await loadTextContent({
      source: "./asset/svg/logo.svg"
    });
    return renderHtml`
        <!-- <div class="test-grid"> -->
        <!--     <div class="test-grid__grid"> -->
        <!--         <span></span><span></span><span></span><span></span><span></span -->
        <!--         ><span></span><span></span><span></span><span></span -->
        <!--         ><span></span><span></span><span></span> -->
        <!--     </div> -->
        <!--     <div class="test-grid__cont"><span>test</span></div> -->
        <!-- </div> -->

        <only-desktop></only-desktop>
        <debug-overlay name="debugOverlay"></debug-overlay>
        <code-overlay name="codeOverlay"></code-overlay>
        <mob-header></mob-header>
        <mob-navigation-container
            name="navigation-container"
        ></mob-navigation-container>
        <main class="main">
            <div class="container">
                <div class="inner-wrap">
                    <div id="content"></div>
                </div>
            </div>
        </main>
        <mob-footer> </mob-footer>
        <quick-nav name="quick_nav"></quick-nav>
        <route-loader></route-loader>
        <animation-title name="animation_title"></animation-title>
        <m-logo-1 name="m1_logo" ${staticProps({ svg })}></m-logo-1>
        <scroll-down-label name="scroll_down_label"></scroll-down-label>
        <code-button name="global-code-button"></code-button>
        <scroll-to-top name="scroll-to-top"></scroll-to-top>
        <links-mobjs></links-mobjs>
    `;
  };

  // src/js/utils/scrollbarWith.js
  var setValue = () => {
    const value = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      "--scrollbar-with",
      `${value}px`
    );
  };
  var getScrollbarWith = () => {
    setValue();
    mobCore.useResize(() => {
      setValue();
    });
  };

  // src/js/pageTransition/index.js
  var scrollY = 0;
  mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, () => {
    scrollY = window.scrollY;
  });
  var beforePageTransition2 = async ({ oldNode }) => {
    oldNode.classList.remove("current-route");
    oldNode.classList.add("fake-content");
    oldNode.style.position = "fixed";
    oldNode.style.zIndex = 10;
    oldNode.style.top = "var(--header-height)";
    oldNode.style.left = "0";
    oldNode.style.width = "100vw";
    oldNode.style.transform = `translate(calc(var(--header-height) / 2), -${scrollY}px)`;
    oldNode.style.minHeight = "calc(100vh - var(--header-height) - var(--footer-height))";
  };
  var pageTransition2 = async ({
    oldNode,
    newNode,
    oldRoute,
    newRoute
  }) => {
    if (motionCore.mq("max", "desktop") || oldRoute === newRoute) return;
    newNode.style.opacity = 0;
    const oldNodeTween = tween.createTween({
      data: { opacity: 1 },
      duration: 300
    });
    const newNodeTween = tween.createTween({
      data: { opacity: 0 },
      duration: 500
    });
    oldNodeTween.subscribe(({ opacity }) => {
      oldNode.style.opacity = opacity;
    });
    newNodeTween.subscribe(({ opacity }) => {
      newNode.style.opacity = opacity;
    });
    let tl = timeline.createAsyncTimeline({ repeat: 1 }).createGroup({ waitComplete: true }).goTo(oldNodeTween, { opacity: 0 }).goTo(newNodeTween, { opacity: 1 }).closeGroup();
    await tl.play();
    tl.destroy();
    tl = null;
    newNode.style.removeProperty("opacity");
    newNode.classList.add("current-route");
  };

  // src/js/main.js
  mobCore.useLoad(() => {
    setBrowserClass();
    motionCore.setDefault({
      deferredNextTick: true,
      usePassive: false
    });
    motionCore.printDefault();
    const init7 = async () => {
      const jsMainLoader = document.body.querySelector(".js-main-loader");
      const jsMainLoaderBackground = document.body.querySelector(
        ".js-main-loader-background"
      );
      let loaderTween = tween.createTween({
        data: { opacity: 1, scale: 1 },
        duration: 1e3
      });
      if (jsMainLoader && jsMainLoaderBackground) {
        [jsMainLoader, jsMainLoaderBackground].forEach((item) => {
          loaderTween?.subscribe(({ opacity, scale }) => {
            item.style.opacity = opacity;
            item.style.transform = `scale(${scale})`;
          });
        });
      }
      await loadData();
      setDefaultComponent({
        scoped: false,
        maxParseIteration: 1e4,
        debug: false
      });
      inizializeApp({
        rootId: "#root",
        contentId: "#content",
        wrapper,
        routes,
        index: "home",
        pageNotFound: "pageNotFound",
        beforePageTransition: beforePageTransition2,
        pageTransition: pageTransition2,
        afterInit: async () => {
          await loaderTween.goTo({ opacity: 0, scale: 0.9 });
          jsMainLoader?.remove();
          jsMainLoaderBackground?.remove();
          loaderTween = null;
          getScrollbarWith();
        },
        restoreScroll: true
      });
    };
    init7();
  });
})();
//# sourceMappingURL=main.js.map
