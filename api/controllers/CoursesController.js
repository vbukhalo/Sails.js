/**
 * CoursesController
 *
 * @description :: Server-side logic for managing Courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	courses:function(req, res){
		Courses.find({}).exec(function(err, courses){
			if(err){
				res.send(500,{error: 'Database Error'});
			}
			res.view('course_list', {courses:courses});
		});
	},

	add:function(req, res){
		res.view('course_add');
	},

	create:function(req, res){
		var name = req.body.name;
		var section = req.body.section;

		Courses.create({name:name, section:section}).exec(function(err){
			if(err){
				res.send(500, {error: 'Database Error'});
			}

			res.redirect('/courses/courses');
		});
	},
	delete:function(req, res){
		Courses.destroy({id:req.params.id}).exec(function(err){
			if (err) {
				res.send(500, {error: 'Database Error'});
			}
			
			res.redirect('courses/courses');
		});

		return false;
	},
	edit: function(req, res){
		Courses.findOne({id:req.params.id}).exec(function(err, course){
			if (err) {
				res.send(500, {error: 'Database Error'});
			}
			res.view('course_edit', {course:course});	
		});
	},
	update:function(req, res){
		var name = req.body.name;
		var section = req.body.section;

		Courses.update({id: req.params.id},{name:name, section:section}).exec(function(err){
			if(err){
				res.send(500, {error: 'Database Error'});
			}

			res.redirect('courses/courses');
		});

		return false;
	}
	
};

