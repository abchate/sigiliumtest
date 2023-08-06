const express = require('express');
const acceptLanguage = require('accept-language-parser');
const app = express();
const path = require('path');
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const data = require('./recipe.json');

app.use((req, res, next) => {
    
    const header = req.get('accept-language');
    const languages = acceptLanguage.parse(header);
  
    
    let preferredLanguage = 'en'; 
    if (languages.length > 0) {
      preferredLanguage = languages[0].code;
    }
    req.preferredLanguage = preferredLanguage;
    next();
  });

app.get('/', (req, res) => {

    const preferredLanguage = req.preferredLanguage; 

    res.render('index', { ingredients : data.ingredients, steps : data.steps, timing: data.timing, preferredLanguage})
    
});

app.get('/recipe', (req, res) => {
    res.json(data);
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    import('open').then((module) => {
  
        module.default(`http://localhost:${port}`);
      });
})