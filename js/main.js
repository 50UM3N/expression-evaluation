function p(a) {
    if (a === "^")
        return 3;
    else if (a === "*" || a === "/")
        return 2;
    else if (a === "+" || a === "-")
        return 1;
    else
        return 0;
}

function operand(a) {
    if (a === "^" || a === "*" || a === "/" || a === "+" || a === "-" || a == "(" || a == ")")
        return 0;
    else
        return 1;
}

function eval() {
    var inf = "(" + document.getElementById('inputbox1').value + ")";
    inf = inf.replace(/\s/g, "");
    var infix = [];
    var array = [];
    var output = [];
    infix = inf.split("");
    for (let i = 0, j = 0; i < infix.length; i++) {
        if (operand(infix[i])) {
            let c = infix[i];
            while (operand(infix[i + 1])) {
                i += 1;
                c = c + infix[i];
            }
            array[j] = Number(c);
            j++;
        } else {
            array[j] = infix[i];
            j++;
        }

    }
    var stack = ["("];
    var i = 1;
    while (i < array.length) {
        var item = array[i];
        var key = stack.pop();
        if (operand(item)) {
            stack.push(key);
            output.push(item);
        } else {
            if (item == ")") {
                while (key != "(") {
                    output.push(key);
                    key = stack.pop();
                }

            } else if (item == "(") {
                stack.push(key);
                stack.push(item);
            } else if (p(key) >= p(item)) {
                while (p(key) >= p(item)) {
                    output.push(key);
                    key = stack.pop();
                }
                stack.push(key);
                stack.push(item);
            } else if (p(key) < p(item)) {
                stack.push(key);
                stack.push(item);
            }
        }
        i += 1;
    }
    if (stack.length == 0) {
        evaluate(output);
    } else {
        console.log("Worng expression");
    }

    function operation(x, y, z) {
        if (z == "+") {
            return x + y;
        } else if (z == "-") {
            return x - y;
        } else if (z == "*") {
            return x * y;
        } else if (z == "/") {
            return x / y;
        } else if (z == "^") {
            return x ** y;
        }
    }

    function evaluate(a) {
        var stack = [];
        var i = 0;
        while (i < a.length) {
            if (operand(a[i])) {
                stack.push(a[i]);
            } else {
                x = stack.pop();
                y = stack.pop();
                let temp = operation(y, x, a[i]);
                stack.push(temp);
            }
            i += 1;
        }
        let m = stack.pop();
        if (Number.isNaN(m) || typeof m == "undefined") {
            document.getElementById('inputbox2').value = document.getElementById('inputbox1').value;
        } else {
            document.getElementById('inputbox2').value = document.getElementById('inputbox1').value + " = " + m;
        }
    }
}