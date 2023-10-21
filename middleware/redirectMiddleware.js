module.exports = (req, res, next) => {
    if (req.session.userID) {
      return res.redirect('/');
    }
    next();
  };
  // ozel middleware isim verilmeden anonim olarak olusturuldu
// request ile response arasindaki dongude her sey bir middlewaredir
// istenilen durumlardan middleware fonksiyonlari calistirilir
// ornegin giris yapmis bir kullanici giris yapma sayfasina ulasmak isterse dogurdan anasayfaya yonlendirilir