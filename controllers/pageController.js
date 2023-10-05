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

exports.getAboutPage = (req,res)=>{
  res.status(200).render ('about',{
      page_name: "about"
  });
}