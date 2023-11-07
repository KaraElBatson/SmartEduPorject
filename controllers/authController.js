const User = require('../models/User');
const Category = require('../models/Category');
const bcrypt = require('bcrypt');
const Course = require('../modals/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'succes',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // user sessions
          req.session.userID = user._id;

          res.status(200).redirect('/users/dashboard');
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
exports.logoutUser = (req, res) => {
  req.session.destroy(()=> {
    res.redirect('/');
  })
}
// dashboard sayfasina gitmek icin fonksiyon
exports.getDashboardPage = async (req, res) => {
   // dashborad sayfasinda ogrencinin kayitli oldugu kurslar ogrenci tablosunda eleman olarak referansı kurs olan veri eklenmisti
  // bu sayede populate ile refereans uzerinden course tablosuna erisilerek islem yapilabilir
  const user = await User.findOne({
    _id: req.session.userID,
  }).populate('courses');

  // kategoriler alindi
  const categories = await Category.find();
    // aktif olan kullanicinin kurslari secildi ve bunların gosterilmesi saglandi
    const courses = await Course.find({
      user: req.session.userID,
    });
  res.render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
  });
};