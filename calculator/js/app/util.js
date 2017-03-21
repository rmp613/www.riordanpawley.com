define(function() {
    var INVALID = "Invalid input";
    var OUT_OF_RANGE = "Out of range";
    var DIVID_BY_ZERO = "You cannot divide by zero";
    var util = {
        isDecimalPoint: function(_c) {
            return (_c == '.') ? true : false;
        },
        isOperator: function(_c) {
            return (_c == '+' || _c == '-' || _c == '*' || _c == '/' || _c == '%') ? true : false;
        },
        isSimpleOperator: function(_c) {
            return (_c == '+' || _c == '-') ? true : false;
        },
        isPriorityOperator: function(_c) {
            return (_c == '*' || _c == '/' || _c == '%') ? true : false;
        },
        invalid: function() {
            return INVALID;
        },
        divideByZero: function() {
            return DIVID_BY_ZERO;
        },
        outOfRange: function() {
            return OUT_OF_RANGE;
        },
        remove: function(str, i) {
            if (str.length === 0) return "";
            if (i === 0) return str.slice(1)
            return str.slice(0, i) + str.slice(i + 1);
        }
    }
    return util;
});