exports.getIndexPage = (req, res) => {
  res.status(200).render('index', {
      page_name: "index"
  });
}

exports.getRegisterPage = (req,res)=>{
  res.status(200).render ('register',{
      page_name: "register"
  });
}

// login page
exports.getLoginPage = (req, res) => {
  res.render('Login', {
    page_name: 'Login',
  });
};

exports.getAboutPage = (req,res)=>{
  res.status(200).render ('about',{
      page_name: "about"
  });
}