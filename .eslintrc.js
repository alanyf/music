module.exports = {
	root: true,
	env: {
		browser: true,
        node: true,
        es6: true,
	},
	parserOptions: {
        parser: 'babel-eslint',
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
	},
	extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
	],
	// 校验 .vue 文件
	plugins: [
		'vue'
	],
	rules: {
        "accessor-pairs": 2,
        "array-bracket-spacing": [2, "never"],
        "arrow-spacing": [2, { "before": true, "after": true }],
        "brace-style": [1, "stroustrup", {}],
        "comma-dangle": [1, "never"],
        "comma-spacing": [2, {"before": false, "after": true}],
        "comma-style": [2, "last"],
        "constructor-super": 2,
        "computed-property-spacing": [2, "never"],
        "curly": [2, "multi-line"],
        "dot-notation": [2, {"allowKeywords": true, "allowPattern": "^catch$"}],
        "eol-last": 2,
        "eqeqeq": [2, "allow-null"],
        "generator-star-spacing": [2, { "before": true, "after": true }],
        "guard-for-in": 1,
        // "indent":  [2, 4, {"SwitchCase": 1}],
		// 'indent': [1, "error", "tab"],
		// // 配置vue/script脚本缩进规则
        // 'vue/script-indent': ['error', 'tab',
        //     {
        //         'baseIndent': 1
        //     }
		// ],
        'vue/script-indent': ['error', 4,
            {
                'baseIndent': 1
            }
		],
		// // 配置vue/template模版缩进规则
		// "vue/html-indent": ["error", 'tab', {
		// 	"attribute": 1,
		// 	"baseIndent": 1,
		// 	"closeBracket": 0,
		// 	"alignAttributesVertically": true,
		// 	"ignores": []
        // }],
        "vue/html-indent": ["error", 4],
        "quote-props": [2, "as-needed"],
        "max-statements": [1, 50],
        "key-spacing": [2, {"beforeColon": false, "afterColon": true}],
        "keyword-spacing": 2,
        "max-depth": [1, 6],
        "max-len": [1, 200, 4, {
            "ignoreUrls": true,
            "ignoreComments": true,
            "ignorePattern": "\\+ [\\w\\W]+>'"
        }],
        "max-nested-callbacks": [1, 4],
        "max-params": [1, 6],
        "new-cap": [1, {"capIsNewExceptions": ["T", "AddToFavoritesBar"]}],
        "new-parens": 1,
        "no-array-constructor": 2,
        "no-cond-assign": 2,
        "no-console": 0,
        "no-const-assign": 2,
        "no-constant-condition": 1,
        "no-debugger": 2,
        "no-delete-var": 1,
        "no-dupe-args": 2,
        "no-dupe-class-members": 2,
        "no-dupe-keys": 1,
        "no-duplicate-case": 2,
        "no-else-return": 1,
        "no-empty-character-class": 2,
        "no-empty-pattern": 2,
        "no-eval": 2,
        "no-ex-assign": 2,
        "no-extend-native": 2,
        "no-extra-bind": 1,
        "no-extra-boolean-cast": 1,
        "no-extra-parens": [2, "functions"],
        "no-extra-semi": 2,
        "no-fallthrough": 2,
        "no-func-assign": 1,
        "no-implied-eval": 1,
        "no-inner-declarations": 1,
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 1,
        "no-iterator": 2,
        "no-label-var": 1,
        "no-labels": 1,
        "no-lone-blocks": 1,
        "no-loop-func": 1,
        "no-mixed-spaces-and-tabs": 2,
        "no-multi-str": 1,
        "no-multi-spaces": 2,
        "no-multiple-empty-lines": [2, {"max": 1 }],
        "no-native-reassign": 2,
        "no-negated-in-lhs": 2,
        "no-new-object": 2,
        "no-new-require": 2,
        "no-new-symbol": 2,
        "no-new-wrappers": 2,
        "no-obj-calls": 2,
        "no-octal": 1,
        "no-octal-escape": 1,
        "no-proto": 2,
        "no-redeclare": 1,
        "no-self-assign": 2,
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-shadow-restricted-names": 2,
        "no-spaced-func": 2,
        "no-sparse-arrays": 2,
        "no-this-before-super": 2,
        "no-trailing-spaces": 1,
        "no-undef": 2,
        "no-undef-init": 1,
        "no-unexpected-multiline": 2,
        "no-unmodified-loop-condition": 2,
        "no-unneeded-ternary": 2,
        "no-unreachable": 2,
        "no-unsafe-finally": 2,
        "no-unused-vars": [1, {"vars": "local", "args": "none"}],
        "no-use-before-define": [1, "nofunc"],

        "no-useless-call": 2,
        "no-useless-computed-key": 2,
        "no-useless-constructor": 2,
        "no-useless-escape": 0,
        "no-whitespace-before-property": 2,
        "no-with": 1,
        "object-curly-spacing": [2, "never"],
        "one-var": [2, "never"],
        "operator-linebreak": [2, "before"],
        "quotes": [2, "single", {"avoidEscape": true, "allowTemplateLiterals": true}],
        "radix": 2,
        "semi": [1, "always"],
        "semi-spacing": 2,
        "space-before-function-paren": [2, {"anonymous": "always", "named": "never"}],
        "space-before-blocks": [2, "always"],
        "space-in-parens": [2, "never"],
        "space-unary-ops": 1,
        "space-infix-ops": 2,
        "spaced-comment": [2, "always", {"exceptions": ["-", "+", ""]}],
        "use-isnan": 2,
        "valid-typeof": 2,
        "wrap-iife": [2, "any"],

        "valid-jsdoc": [2, {
            "prefer": {
                "arg": "param",
                "argument": "param",
                "returns": "return",
                "fileoverview": "file"
            },
            "requireReturn": false,
            "requireReturnDescription": false,
            "requireParamDescription": true
        }],
        "yield-star-spacing": [2, "both"]
	},
	overrides: [
		{
			"files": ["*.vue"],
			"rules": {
				"indent": "off"
			}
		}
	],
}
