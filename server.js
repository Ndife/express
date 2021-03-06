const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
const port = process.env.PORT ||3000;

app.use((req, res,next)=>{
    let now = new Date().toString();
    let log = (`${now}: ${req.method} ${req.path}`); 
    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err){
            console.log('unable to append file');
        }
    });
    next();
});

app.use((req,res,next)=>{
res.render('maintenance.hbs');
});

// when you want to use html page
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.get('/',(req,res)=>{
    res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage: 'Welcome to my....',
    });
});

app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Unable to handle request"
    })
})

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});