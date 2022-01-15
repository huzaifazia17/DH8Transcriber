module.exports.convert = function(pars, chaps) {
    var htmlContent = `<!DOCTYPE html> 
    <html lang="en">
    <head>
        <title>DH8 Transcriber</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <style>
            * {
                font-family: 'Roboto', sans-serif;
                color: black;
            }
            h1 {
                font-size: 24pt;
                border-bottom: black 1px solid;
                margin-top: 2px;
            }
            h2 { 
                font-size: 18pt;
            }
            h3 { 
                font-size: 14pt;
            }
            p { 
                font-size: 12pt;
            }
            section {
                padding: 0 2em;
            }
            body { 
                padding: 1em;
            }
        </style>
    </head>`;
    htmlContent += '<body>';
    htmlContent += `<h1>Table of Contents</h1>\r\n<ul>\r\n`;

    let chapNum = 1;
    chaps.forEach(chap => {
        htmlContent += `<li><a href="#c${chapNum}">${chap.gist}</a></li>\r\n`;
        ++chapNum;
    });

    htmlContent += `</ul>\r\n`;

    htmlContent += `<h1>Chapters</h1>\r\n`;
    chapNum = 1;
    let parNum = 0;
    chaps.forEach(chap => {
        htmlContent += `<h2 id="c${chapNum}">${chap.headline}</h2>\r\n`;
        htmlContent += '<section>'
        htmlContent += `<h3>Summary</h3>\r\n`;
        htmlContent += `<p>${chap.summary}</p>\r\n`;
        htmlContent += `<h3>Content</h3>\r\n`;
        for ( ; parNum < pars.length; ++parNum) {
            if (pars[parNum].start > chap.end && chapNum !== chaps.length) break;
            else htmlContent += `<p>${pars[parNum].text}</p>`;
        }
        htmlContent += '</section>'
        ++chapNum;
    });

    htmlContent += '</body></html>';
    
    console.log(htmlContent);

    var wnd = window.open("about:blank", "", "_blank");
    wnd.document.write(htmlContent);
}