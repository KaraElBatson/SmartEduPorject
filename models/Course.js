const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;


const courseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require:true
    },
    description: {
        type: String,
        require:true
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
    slug: {
        type:String,
        unique: true
      }
});
CourseSchema.pre('validate', function(next){
    this.slug = slugify(this.name, {
      lower:true,
      strict:true
    })
    next();
  })

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;