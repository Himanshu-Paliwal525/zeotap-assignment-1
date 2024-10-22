# Rule Engine with Abstract Syntax Tree (AST)


## Objective:

Develop a simple 3-tier rule engine application (UI, API, Backend) to determine user eligibility based on attributes like age, department, income, and spend. The system utilizes an Abstract Syntax Tree (AST) to represent conditional rules and allows dynamic creation, combination, and modification of these rules.

### Abstract Syntax Tree:
The AST is used to represent conditional rules in a structured, tree-like format. This enables the easy evaluation of complex rules based on user attributes.

#### Features
- Dynamic Rule Creation: Create eligibility rules based on user data like age, department, salary, etc.
- Rule Combination: Combine multiple rules to form a complex decision-making structure.
- Rule Evaluation: Evaluate user data against predefined or combined rules to check eligibility.

## API Design

### create_rule(rule_string)

#### Description:
 Takes a string representing a rule and returns a Node object corresponding to the AST.

#### Input:
 rule_string - A string representing the condition (e.g., "age > 30 && department == 'Sales'")

#### Output:
 A Node object representing the AST.

### combine_rules(rules)

#### Description:
 Takes a list of rule strings and combines them into a single AST.

#### Input:
 rules - A list of rule strings (e.g., ["age > 30", "salary > 50000"])

#### Output:
 Root node of the combined AST.

### evaluate_rule(json_data)
#### Description:
 Takes a JSON object representing the AST and evaluates it against user data.

#### Input:
json_data - The AST in JSON format.
data - A dictionary containing user attributes (e.g., { "age": 35, "department": "Sales", "salary": 60000, "experience": 3 })

#### Output:
 Returns True if the user meets the criteria defined by the rules, otherwise returns False.

## Technologies Used

