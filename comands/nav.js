function nav(token) {
    let expression = {
        tag_name: 'nav',
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
            <li></li>
    `;            
            }
            expression.arguments.structure = 
            `<nav>
        <ul>
            ${ tag_cont }
        </ul>
    </nav>`;
            return expression;
        } else {
            expression.arguments.structure = 
            `<nav>
        <ul>
        </ul>
    </nav>`;
            return expression;
        }        
    } else {
        throw 'Instruccion desconocida para crear etiqueta header';
    }
}

exports.nav = nav;