function codif(token) {
    let expression = {
        tag_name: 'codif',
        arguments: {}
    }
    var argument = token.shift();
    
    expression.arguments = {
        type: 'instruction',
        value: argument.value,
        structure: ''
    }

    if (argument.value == '.8') {
        expression.arguments.structure = 'utf-8';
        return expression;
    } else if (argument.value == '.16') {
        expression.arguments.structure = 'utf-16';
        return expression;
    } else if (argument.value == '.32') {
        expression.arguments.structure = 'utf-32';
        return expression;
    } else {
        throw 'Instruccion desconocida para codif';
    }
}

exports.codif = codif;