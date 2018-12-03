const fs      = require('fs');
const html    = require('./comands/html');
const lang    = require('./comands/lang');
const codif   = require('./comands/codif');
const meta    = require('./comands/meta_viewport');
const title   = require('./comands/title');
const ico     = require('./comands/ico');
const link    = require('./comands/link');
const header  = require('./comands/header');
const nav     = require('./comands/nav');
const article = require('./comands/article');
const aside   = require('./comands/aside');
const footer  = require('./comands/footer');

// Leer documento: Direccion, codificacion, funcion para recibir los datos o un error
fs.readFile('text.txt', 'utf-8',(err,data)=>{
    // Error
    if (err) {
        throw err;
    } else {
        // data alamacena el contenido del documento
        // console.log(data);
        // Llamando a la funcion lexer, para separar el tipo de isntruccion y su valor. lexer devuelve un arreglo de objetos con la informacion del documento
        data = lexer(data);
        // Objeto recibido del codumento ya trabajado
        // console.log(data);
        // completo
        // console.log(parser(data).body[0].arguments[0].value);
        let objDocument = parser(data);
        // console.log(objDocument.docOut);
        // console.log('titulo: ' + objDocument.title);

        let DCSPath = `./results/${ objDocument.title }.html`
        fs.appendFile(DCSPath, objDocument.docOut, (err) => {
            if (err) {
                throw err
            }
            console.log('Archivo creado...\nTodo correcto!!');
            
        });
    }
});

/// Funcion lexer para seprar la informacion del documento
function lexer(data) {
    // Separa lainformacion por espacios en blanco y saltos de linea
    return data.split(/\s+/)
            .filter(t => { return t.length > 0 })
            .map(t => {
                return t.indexOf(".")
                        ? {type: 'element', value: t}
                        : {type: 'instruction', value: t}
            });
}

// AST (Abstract Syntax Tree)
function parser(tokens) {
    var AST = {
        type: "tag",
        body: []
    }
    // Obteniendo JSON para tokenizar
    while (tokens.length > 0) {
        // Almacenado el primer token en una variable y eliminando al mismo del arreglo de objetos
        let current_token = tokens.shift();
        // console.log("token " + current_token.value);
        

        // Se analiza la sintaxis de la instruccion
        if (current_token.type === 'element') {
            switch (current_token.value) {
                case 'html':
                    AST.body.push(html.html(tokens));
                    // console.log(AST.body[0].arguments.value);
                    break;
                case 'lang':
                    AST.body.push(lang.lang(tokens));
                    // console.log(AST.body[1].tag_name);
                    break;
                case 'codif':
                    AST.body.push(codif.codif(tokens));
                    // console.log(AST.body[2].arguments.value);
                    break;
                case 'meta_viewport':
                    AST.body.push(meta.meta(tokens));
                    // console.log(AST.body[3].arguments.structure);
                    break;
                case 'title':
                    AST.body.push(title.title(tokens));
                    // console.log(AST.body[4].arguments.structure);
                    break;
                case 'ico':
                    AST.body.push(ico.ico(tokens));
                    // console.log(AST.body[5].arguments.structure);
                    break;
                case 'link':
                    AST.body.push(link.link(tokens));
                    // console.log(AST.body[6].arguments.structure);
                    break;
                case 'header':
                    AST.body.push(header.header(tokens));
                    // console.log(AST.body[8].arguments.structure);
                    break;
                case 'nav':
                    AST.body.push(nav.nav(tokens));
                    // console.log(AST.body[9].arguments.structure);
                    break;
                case 'article':
                    AST.body.push(article.article(tokens));
                    // console.log(AST.body[10].arguments.structure);
                    break;
                case 'aside':
                    AST.body.push(aside.aside(tokens));
                    // console.log(AST.body[11].arguments.structure);
                    break;
                case 'footer':
                    AST.body.push(footer.footer(tokens));
                    // console.log(AST.body[12].arguments.structure);
                    break;
                default:
                    
                    break;
            }
        }

    }
    // console.log('Return: ' + AST.body[0].arguments[0].value);

    // return AST;
    return transformerHtml(AST);
}

function transformerHtml(ast) {
    // ${ tag_template.section }
    let tag_template = {
        header: '',
        nav: '',
        article: ``,
        aside: '',
        footer: ''
    };
    // Creacion de template basico
    let firstInstruction = ast.body[0].arguments.value;
    let languaje = '';
    let codif = '';
    let meta_viewport = '';
    let title = '';
    let img_path = '';
    let css_path = '';
    let js_path = '';
    
    while (ast.body.length > 0) {
        let element = ast.body.shift();
        // console.log('Uso elemento ' + element.tag_name);
        
        if (element.tag_name == 'lang') {
            languaje = element.arguments.structure;
        } else if (element.tag_name == 'codif') {
            codif = element.arguments.structure;
        } else if (element.tag_name == 'title') {
            title = element.arguments.structure;
        } else if (element.tag_name == 'viewport') {
            meta_viewport = element.arguments.structure;
        } else if (element.tag_name == 'ico') {
            img_path = element.arguments.structure;
        } else if (element.tag_name == 'link') {
            css_path = element.arguments.structure;
        } else if (element.tag_name == 'script') {
            js_path = element.arguments.structure;
        } else if (element.tag_name == 'header') {
            tag_template.header = element.arguments.structure;
        } else if (element.tag_name == 'nav') {
            tag_template.nav = element.arguments.structure;
        } else if (element.tag_name == 'article') {
            tag_template.article = element.arguments.structure;
        } else if (element.tag_name == 'aside') {
            tag_template.aside = element.arguments.structure;
        } else if (element.tag_name == 'footer') {
            tag_template.footer = element.arguments.structure;
        }
        
    }
    if (firstInstruction == '.create') {
        let docOut = 
        `
<!DOCTYPE html>
<html lang="${ languaje }">
<head>
    <meta charset="${ codif }">
    <meta name="viewport" content="width=device-width, initial-scale=${ meta_viewport }">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${ title }</title>
    <link rel="icon" type="image/png" href="${ img_path }">
    <link rel="stylesheet" href="${ css_path }">
    <script src="${ js_path }"></script>
</head>
<body>

    ${ tag_template.header }

    ${ tag_template.nav }
    
    ${ tag_template.article }

    ${ tag_template.aside }

    ${ tag_template.footer }
    
</body>
</html>
        `;

        return {docOut, title};

    } else {
        return 'Inicio de instrucciones incorrecto';
    }
}