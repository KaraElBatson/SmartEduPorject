const express = require('express');
const courseController = require('../controllers/courseController');
const {models} = require('mongoose');
const {route} = require('./pageRoute');
const roleMiddleware =require('../middleware/roleMiddleware');

const router =express.Router();

router.route('/').get(courseController.getAllCourses);
router.route('/').post(roleMiddleware(["student", "teacher"]),courseController.createCourse);
router.route('/:slug').get(courseController.getCourse);


module.exports= router;