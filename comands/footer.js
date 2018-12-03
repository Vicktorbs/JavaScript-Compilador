function footer(token) {
    let expression = {
        tag_name: 'footer',
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
        if (path[1].indexOf(',') > 0) {
            let division = path[1].split(',');
            let tag_cont = ''; 

            division.forEach(element => {
                tag_cont += forGenerao(element);
            });

            expression.arguments.structure = 
            `<footer>
        ${ tag_cont }
    </footer>`;
            return expression;
        } else {
            expression.arguments.structure = 
            `<footer>
    </footer>`;
            return expression;
        }        
    } else {
        throw 'Instruccion desconocida para crear etiqueta footer';
    }
}

function forGenerao(content) {
    let first_ele = '';
    let second = '';

    content = content.split('>');
    if (content[1].indexOf('*') > 0) {
        let new_ele = content[1].split('*');
        let tag_cont = '';   
        for (let i = 0; i < new_ele[1]; i++) {
            tag_cont = 
            tag_cont + `
                <${ new_ele[0] }></${ new_ele[0] }>
`;            
        }
        second = tag_cont
    } else {
        second = `<${ content[1] }></${ content[1] }>`
    }        
    
    first_ele = `
            <${ content[0] }>
                ${ second }
            </${ content[0] }>`

    return first_ele;

}

exports.footer = footer;