const express = require ('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const methodOverride =require ('method-override')
const dotnev = require('dotenv').config()

const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require ('./routes/courseRoute');

const app = express();
mongoose.set('strictQuery', false);
//Connect DB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('DB çalıştı');
    })
    .catch((err) => {
      console.error('DB Connection Error:', err);
    });



//template engine
app.set("view engine","ejs");

// global degisken olusturuldu
// kullanici giri yapmis ise gerekli goruntunun yapilmasi saglandi
global.userIn = null;

//middlewares
app.use(express.static("public"));
app.use(express.json()); // JSON verilerini işlemek için
app.use(express.urlencoded({ extended: true })); // URL-encoded verileri işlemek için

// session middleware
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://KaraElBatson:KaraElBatson@cluster0.oemvjyr.mongodb.net/?retryWrites=true&w=majority' })

  })
);
app.use(flash());
app.use((req,res,next)=>{
  res.locals.flashMessages = req.flash();
  next();
})
app.use(
  methodOverride('_method',{
  methods: ['POST','GET'],
})
);



//routes
// istegine karsilik pageroute fonksiyonuna gidilmesi saglandi
// bu fonksiyon da express uzerinden olusturulan pageroute pagecontrollerdaki fonksiyonlari calistirir
// her sayfaya geciste userin tanimlamasi saglandi
// bu sayede kullanici var ise belirli tasarim yok ise belirli tasarim saglanacaktir
app.use('*', (req, res, next) => {
  userIn = req.session.userID;
  next();
});
app.use('/',pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port =3000;
app.listen(port, ()=>{
  console.log(`App started on port ${port}`)
});