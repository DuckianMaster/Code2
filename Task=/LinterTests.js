"use strict";
var linterTest;
(function (linterTest) {
    let KEY;
    (function (KEY) {
        KEY[KEY["POS"] = 1] = "POS";
        KEY[KEY["NEG"] = -1] = "NEG";
    })(KEY || (KEY = {}));
    const info = { text: "G`udetmvhsgBncd1", key: KEY.POS };
    console.log(deCrypt(info.text, info.key));
    function deCrypt(_text, _key) {
        let result = "";
        for (let i = 0; i < _text.length; i++)
            result += String.fromCharCode(_text.charCodeAt(i) + _key);
        return result;
    }
})(linterTest || (linterTest = {}));
