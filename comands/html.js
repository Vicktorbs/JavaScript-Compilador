function html(token) {
    let expression = {
        tag_name: 'html',
        arguments: {}
    }
    // Leyendo el tipo de instruccion
    var argument = token.shift();     
    
    if (argument.value == '.create') {
        expression.arguments = {
            type: 'instruction',
            value: argument.value,
        };
        // Insertando instruccion al objeto de etiqueta
        // console.log(expression);
        return expression;
    } else {
        throw 'Instruccion desconocida para html';
    }
}

exports.html = html;