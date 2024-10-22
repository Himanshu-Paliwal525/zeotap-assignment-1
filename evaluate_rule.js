function evaluate(ast, data) {
    if (!ast.left && !ast.right) {
        return evaluateCondition(ast.value, data);
    }

    if (ast.value === "AND") {
        return evaluate(ast.left, data) && evaluate(ast.right, data); // Both must be true
    } else if (ast.value === "OR") {
        return evaluate(ast.left, data) || evaluate(ast.right, data); // At least one must be true
    }

    return false;
}
function evaluateCondition(condition, data) {
    const [lhs, operator, rhs] = parseCondition(condition);

    const leftValue = data[lhs.trim()];
    const rightValue = convertValue(rhs.trim());

    switch (operator) {
        case ">":
            return leftValue > rightValue;
        case "<":
            return leftValue < rightValue;
        case "=":
            return leftValue === rightValue;
        case "<=":
            return leftValue <= rightValue;
        case ">=":
            return leftValue >= rightValue;
        case "!=":
            return leftValue !== rightValue;
        default:
            throw new Error(`Unsupported operator: ${operator}`);
    }
}
function parseCondition(condition) {
    const regex = /(\w+)\s*([<>=!]+)\s*(.+)/; // Matches lhs operator rhs, allowing no spaces around operators
    const matches = condition.match(regex);
    if (matches) {
        return [matches[1], matches[2], matches[3]];
    }
    throw new Error(`Invalid condition: ${condition}`);
}
function convertValue(value) {
    if (!isNaN(value)) {
        return parseFloat(value); // Convert string to number if possible
    }
    if (value.startsWith("'") && value.endsWith("'")) {
        return value.slice(1, -1);
    }
    return value;
}
module.exports = { evaluate };
