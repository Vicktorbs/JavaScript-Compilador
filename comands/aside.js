function aside(token) {
    let expression = {
        tag_name: 'aside',
        arguments: {}
    }
    var argument = token.shift();
    
    
    expression.arguments = {
        type: 'instruction',
        value: argument.value,
        structure: ''
    }

    let path = argument.value.split('.');
    path.shift();
    path = path[0].split('--');

    if (path[0] == 'cre') {
        if (path[1].indexOf('*') > 0) {
            let new_ele = path[1].split('*');
            let tag_cont = '';   
            for (let i = 0; i < new_ele[1]; i++) {
                tag_cont = 
                tag_cont + `
        <div></div>
    `;            
            }
            expression.arguments.structure = 
            `<aside>${ tag_cont }</aside>`;
            
            return expression;
        } else {
            expression.arguments.structure = '<aside></aside>';
            return expression;
        }        
    } else {
        throw 'Instruccion desconocida para crear etiqueta aside';
    }
}

exports.aside = aside;