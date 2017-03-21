define(['jquery', './calculator', './parser'], function($, calculator, parser) {
    console.log("here");
    document.getElementById("calculate").onclick = function() {
        calculate();
    }
    document.getElementById("input")
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                document.getElementById("calculate").click();
            }
        });

    function calculate() {
        var input = document.getElementById("input");
        console.log("Calc");
        var inputStr = input.value;
        if (inputStr.length === 0) input.value = util.invalid();
        var answer = parser.parseInput(inputStr);
        input.value = answer;
        return answer;
    }
});