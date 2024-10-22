class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function Create_rule(expression) {
    try {
        if (!expression || typeof expression !== "string") {
            throw new Error("Invalid input: Rule must be a non-empty string.");
        }

        // Step 1: Normalize the input expression
        const normalizedExpression = normalizeExpression(expression);

        // Step 2: Parse the normalized expression and build the AST
        const root = buildTree(normalizedExpression);

        // If the root is invalid, throw an error
        if (!root) {
            throw new Error("Failed to build AST from expression.");
        }

        return root;
    } catch (error) {
        console.error("Error in Create_rule function:", error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

function trimParentheses(expr) {
    while (expr[0] === "(" && expr[expr.length - 1] === ")") {
        let count = 0;
        let isRedundant = true;
        for (let i = 0; i < expr.length; i++) {
            if (expr[i] === "(") count++;
            if (expr[i] === ")") count--;
            if (count === 0 && i < expr.length - 1) {
                isRedundant = false;
                break;
            }
        }
        if (isRedundant) {
            expr = expr.slice(1, -1); // Remove the outer parentheses
        } else {
            break;
        }
    }
    return expr;
}

function findMainOperator(expr) {
    let count = 0;
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === "(") count++;
        if (expr[i] === ")") count--;
        if (
            count === 0 &&
            (expr.slice(i, i + 3) === "AND" || expr.slice(i, i + 2) === "OR")
        ) {
            return { operator: expr.slice(i, i + 3).trim(), index: i };
        }
    }
    return null;
}
function normalizeExpression(expression) {
    // Remove unnecessary parentheses (if needed)
    expression = trimParentheses(expression);

    // Add spaces around comparison operators (>, <, =, >=, <=, !=)
    expression = expression.replace(/([><=!]=?)/g, " $1 "); // Adds spaces around operators

    // Handle reversed conditions like '30 > age' (swap and normalize)
    expression = handleReversedConditions(expression);

    return expression;
}
function handleReversedConditions(expression) {
    const regex = /(\d+)\s*([><]=?)\s*(\w+)/; // Matches reversed conditions
    const matches = expression.match(regex);

    if (matches) {
        const [_, number, operator, variable] = matches;

        // Reverse the operator to match 'age > 30' instead of '30 < age'
        let reversedOperator;
        switch (operator) {
            case ">":
                reversedOperator = "<";
                break;
            case "<":
                reversedOperator = ">";
                break;
            case ">=":
                reversedOperator = "<=";
                break;
            case "<=":
                reversedOperator = ">=";
                break;
            default:
                throw new Error(
                    `Invalid operator in reversed condition: ${operator}`
                );
        }

        // Return the corrected condition in 'variable operator number' format
        return expression.replace(
            regex,
            `${variable.trim()} ${reversedOperator} ${number}`
        );
    }

    return expression; // Return the original expression if no reversed condition is found
}
function buildTree(expr) {
    expr = trimParentheses(expr);

    // Base case: if the expression is empty, return null
    if (!expr || expr.trim() === "") {
        throw new Error(
            "Empty or invalid expression encountered in buildTree."
        );
    }

    // Base case: if there are no 'AND' or 'OR' operators left, it's a leaf node (a condition)
    if (!expr.includes("AND") && !expr.includes("OR")) {
        return new TreeNode(trimParentheses(expr.trim())); // Trim leaf node conditions
    }

    // Find the main operator outside of parentheses (either 'AND' or 'OR')
    let mainOpInfo = findMainOperator(expr);
    if (!mainOpInfo) {
        return new TreeNode(trimParentheses(expr.trim())); // Trim leaf node
    }

    const operator = mainOpInfo.operator;
    const index = mainOpInfo.index;

    // If the operator is missing or there's a problem, throw an error
    if (!operator || index < 0) {
        throw new Error(
            `Failed to identify a valid operator in expression: ${expr}`
        );
    }

    // Split the expression into left and right parts based on the main operator
    const leftExpr = expr.slice(0, index).trim();
    const rightExpr = expr.slice(index + operator.length).trim();

    if (!leftExpr || !rightExpr) {
        throw new Error(
            "Invalid expression structure: missing left or right side."
        );
    }

    // Create a new node with the operator and recursively build the left and right subtrees
    let node = new TreeNode(operator);
    node.left = buildTree(leftExpr);
    node.right = buildTree(rightExpr);

    return node;
}

module.exports = { TreeNode, Create_rule };
