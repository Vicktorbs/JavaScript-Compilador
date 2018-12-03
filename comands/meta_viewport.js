function meta(token) {
    let expression = {
        tag_name: 'viewport',
        arguments: {}
    }
    var argument = token.shift();
    
    expression.arguments = {
        type: 'instruction',
        value: argument.value,
        structure: ''
    }

    if (argument.value == '.uno') {
        expression.arguments.structure = '1.0';  
        return expression;
    } else if (argument.value == '.dos') {
        expression.arguments.structure = '2.0';
        return expression;
    } else if (argument.value == '.3/2') {
        expression.arguments.structure = '1.5';
        return expression;
    } else {
        throw 'Instruccion desconocida para meta_viewport';
    }
}

exports.meta = meta;