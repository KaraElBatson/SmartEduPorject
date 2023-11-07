const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
      type:String,
      required: true
  },
  // kullanici rolu eklendi enum icerisinden secilir varsayilan olarak student secilidir
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  },
   // kullanicinin kayitli oldugu kurslar icin liste olusturuldu
   courses: [
    {
      // eleman olarak obje ve referans olarak kursu aldi
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

UserSchema.pre('save', function (next){
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;