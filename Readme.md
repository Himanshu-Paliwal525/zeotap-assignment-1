#

## Objective:

Develop a simple 3-tier rule engine application(Simple UI, API and Backend, Data) to determine
user eligibility based on attributes like age, department, income, spend etc.The system can use
Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic
creation,combination, and modification of these rules.

## Api Design:

### create_rule(rule_string):

This function takes a string representing a rule (as shown in the examples) and returns a Node object representing the corresponding AST.

### combine_rules(rules):

This function takes a list of rule strings and combines them into a single AST. It should consider efficiency and minimize redundant checks. You can explore different strategies (e.g., most frequent operator heuristic). The function should return the root node of the combined AST.

### evaluate_rule(JSON data):

This function takes a JSON representing the combined rule's AST and a dictionary data containing attributes (e.g., data = {"age": 35, "department": "Sales", "salary": 60000, "experience": 3}). The function should evaluate the rule against the provided data and return True if the user is of that cohort based on the rule, False otherwise.
