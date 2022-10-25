"use strict";
exports.__esModule = true;
var diff_1 = require("diff");
var console_1 = require("console");
var _color = function (input, style, color) {
    if (style === void 0) { style = 1; }
    if (color === void 0) { color = 92; }
    return "\u001B[7;".concat(color, ";").concat(style, ";1m").concat(input, "\u001B[0m");
};
var _print = function (diff) {
    (0, console_1.log)(_color("PS：", 0, 100));
    (0, console_1.log)(_color(" Red for additions, Yellow for deletions", 0, 100));
    (0, console_1.log)(_color("------------start-------------", 0, 100));
    var parts = "";
    diff &&
        diff.forEach(function (part) {
            parts += _color(part.value, part.removed ? 9 : 1, part.added ? 91 : part.removed ? 93 : 92);
        });
    (0, console_1.log)(parts);
    (0, console_1.log)(_color("-------------over-------------", 0, 100));
};
function default_1(oldStr, newStr) {
    var diff = (0, diff_1.diffChars)(oldStr, newStr);
    diff.length !== 1 && _print(diff);
    return diff.length === 1;
}
exports["default"] = default_1;
