function lang(token) {
    let expression = {
        tag_name: 'lang',
        arguments: {}
    }
    var argument = token.shift();
    
    expression.arguments = {
        type: 'instruction',
        value: argument.value,
        structure: ''
    }

    if (argument.value == '.español') {
        expression.arguments.structure = 'es';
        return expression;
    } else if (argument.value == '.ingles') {
        expression.arguments.structure = 'en';
        return expression;
    } else {
        throw 'Instruccion desconocida para lang';
    }
}

exports.lang = lang;