function ico(token) {
    let expression = {
        tag_name: 'ico',
        arguments: {}
    }
    var argument = token.shift();
    
    expression.arguments = {
        type: 'instruction',
        value: argument.value,
        structure: ''
    }

    // argument = argument.split('->');
    let path = argument.value.split('->');
    path.shift();

    if (path.length > 0) {
        expression.arguments.structure = './' + path.join('/');
        return expression;
    } else {
        throw 'Instruccion desconocida para encontrar archivo ico';
    }
}

exports.ico = ico;