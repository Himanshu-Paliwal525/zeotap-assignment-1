// main.js
const { Create_rule } = require("./create_rule.js");
const { Combine_rules } = require("./combine_rules.js");
const { evaluate } = require("./evaluate_rule.js");

const rule1 =
    "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)";
const rule2 =
    "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)";

const rule1AST = Create_rule(rule1);
const rule2AST = Create_rule(rule2);

const rules = [rule1, rule2];

const combinedAST = Combine_rules(rules, "AND");
const userData = { age: 35, department: "Sales", salary: 60000, experience: 3 };

const isEligible = evaluate(combinedAST, userData);

console.log("Is the user eligible?", isEligible);
