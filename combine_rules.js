const { TreeNode, Create_rule } = require("./create_rule");

function Combine_rules(ruleStrings, operator) {
    function combineTwoTrees(tree1, tree2, operator) {
        let newRoot = new TreeNode(operator); 
        newRoot.left = tree1; 
        newRoot.right = tree2;
        return newRoot;
    }

    if (ruleStrings.length === 1) {
        return Create_rule(ruleStrings[0]);
    }

    // Start by converting the first rule to an AST
    let combinedAST = Create_rule(ruleStrings[0]);

    // Combine each rule's AST with the previous one using the specified operator
    for (let i = 1; i < ruleStrings.length; i++) {
        let nextAST = Create_rule(ruleStrings[i]); // Convert the next rule to AST
        combinedAST = combineTwoTrees(combinedAST, nextAST, operator); // Combine ASTs
    }

    return combinedAST; 
}

module.exports = { Combine_rules };
