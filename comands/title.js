function title(token) {
    let expression = {
        tag_name: 'title',
        arguments: {}
    }
    var argument = token.shift();
    
    expression.arguments = {
        type: 'instruction',
        value: argument.value,
        structure: argument.value.substring(1)
    }

    return expression;
}

exports.title = title;