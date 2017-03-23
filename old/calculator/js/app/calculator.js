define(['jquery', './util', ], function($, util) {

    var calculator = {
        resolveExpression: function(_oper, _first, _second) {
            var answer;

            switch (_oper) {
                case '*':
                    answer = calculator.multiply(_first, _second);
                    break;
                case '/':
                    answer = calculator.divide(_first, _second);
                    break;
                case '%':
                    answer = calculator.modulo(_first, _second);
                    break;
                case '+':
                    answer = calculator.add(_first, _second);
                    break;
                case '-':
                    answer = calculator.subtract(_first, _second);
                    break;
            }
            return answer;
        },

        multiply: function(_first, _second) {
            try {
                var result = parseFloat(_first * _second);

                return result;
            } catch (OverflowException) {
                return util.outOfRange();
            }
        },
        divide: function(_first, _second) {
            if (_second == 0) {
                return util.divideByZero();
            }
            try {
                var result = parseFloat(_first / _second);
                return result;
            } catch (OverflowException) {
                return util.outOfRange();
            }
        },
        modulo: function(_first, _second) {
            if (_second == 0) {
                return util.divideByZero();
            }
            try {
                var result = parseFloat(_first % _second);
                return result;
            } catch (OverflowException) {
                return util.outOfRange();
            }
        },
        add: function(_first, _second) {
            try {
                var result = parseFloat(_first + _second);


                return result;
            } catch (OverflowException) {
                return util.outOfRange();
            }
        },
        subtract: function(_first, _second) {
            try {
                var result = parseFloat(_first - _second);
                return result;
            } catch (OverflowException) {
                return util.outOfRange();
            }
        }
    }

    return calculator;
});