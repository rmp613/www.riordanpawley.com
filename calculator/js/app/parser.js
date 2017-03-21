define(['jquery', './calculator', './util'], function($, calc, util) {
    var parser = {
        parseInput: function(_input) {
            var input = _input;
            var numbers = [];
            var operators = [];
            calc.resolveExpression('+', 0, 1);
            // If last char is an operator return and log 
            if (util.isOperator(input[input.length - 1]))
                return util.invalid();
            //fill number and operator lists and check for invalid input errors
            numbers = parser.getNumbers(input);
            if (numbers.length <= 0)
                return util.invalid();
            console.log("numbers: " + numbers);
            operators = parser.getOperators(input);
            if (operators.length != numbers.length - 1)
                return util.invalid();

            console.log("operators: " + operators);
            //Resolve expressions starting with priority expressions
            return parser.resolveExpressions(numbers, operators, true);
        },
        // Returns int?. This method resolves priority expressions and then 
        // recursively calls itself to resolve leftover expressions
        resolveExpressions: function(
            _numbers, _operators, _priorityOnly
        ) {
            var end = _operators.length;
            for (var i = 0; i < end; i++) {
                var o = _operators[i];
                // decide on which operator type to check for based on _priorityOnly
                var operator = _priorityOnly ? util.isPriorityOperator(o) : util.isSimpleOperator(o);

                // if o is an operator then get the numbers on either side, calculate the result
                // and replace the expression in the numbers and operators lists
                if (operator) {
                    var newNumber = calc.resolveExpression(o, _numbers[i], _numbers[i + 1]);
                    if (!parseFloat(newNumber)) { //if newNumber is actually not a number it must be an error message and therefore return that
                        return newNumber;
                    } else {
                        _numbers[i] = newNumber;
                        _numbers.splice(i + 1, 1);
                        _operators.splice(i, 1);;
                        i--;
                        end--;
                    }
                }
            }
            console.log(_numbers);
            //recursively call this method if _priorityOnly is true otherwise return result
            if (_priorityOnly) {
                return parser.resolveExpressions(_numbers, _operators, false);
            } else {
                return _numbers[0];
            }
        },
        // Returns a List<Char> filled with the operators contained within _input
        getOperators: function(_input) {
            var operators = [];
            // Iterate through _input and fill operators list
            // i starts at one to avoid adding a possible and allowed + or - sign at the start
            for (var i = 1; i < _input.length; i++) {
                var c = _input[i];
                if (util.isOperator(c)) {
                    operators.push(c);
                    i++;
                }
            }
            return operators;
        },
        // Returns a List<int> filled with the numbers contained within _input
        getNumbers: function(_input) {
            var numbers = [];
            var firstNumber = parser.getNumber(_input, 0);
            // Make sure there is a number before there is a non-sign operator
            if (!firstNumber)
                return null;

            numbers.push(firstNumber);
            //iterate through _input to fill the numbers list
            for (var i = 1; i < _input.length; i++) {
                console.log(_input[i]);
                if (util.isOperator(_input[i])) {
                    i++;
                    var number = parser.getNumber(_input, i);

                    numbers.push(number);
                } else if (util.isDecimalPoint(_input[i])) // Best place to check for decimal point
                    return "Cannot handle decimals";
            }
            return numbers;
        },
        // Returns a int? from a List<Char> by taking the Chars between operators
        getNumber: function(_input, _index) {
            var s = "";
            var number = 0;
            var sign = 1;
            //checks for a second operator which doesnt belong
            if (util.isPriorityOperator(_input[_index]))
                return null;

            // Checks for an + or - which changes the sign of the result number
            if (util.isSimpleOperator(_input[_index])) {
                sign = _input[_index] == '-' ? -1 : 1;
                _index++;
            }

            // Loops through _input and adds each digit of the number to a string
            while (!util.isOperator(_input[_index])) {
                s += _input[_index];
                if (_index < _input.length - 1)
                    _index++;
                else if (_index == _input.length - 1) break;
            }
            number = parseFloat(s);

            return number * sign;
        }



    }


    return parser;
});