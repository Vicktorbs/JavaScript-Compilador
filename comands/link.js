function link(token) {
    let expression = {
        tag_name: '',
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
    let type = path.shift();
    
    if (type == '.css') {
        expression.tag_name = 'link';
    } else if (type == '.js') {
        expression.tag_name = 'script';
    }

    if (path.length > 0) {
        expression.arguments.structure = './' + path.join('/');
        return expression;
    } else {
        throw 'Instruccion desconocida para encontrar archivo';
    }
}

exports.link = link;