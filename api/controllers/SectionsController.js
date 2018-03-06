/**
 * SectionsController
 *
 * @description :: Server-side logic for managing Sections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	sections:function(req, res){
		Sections.find({}).populate('course').populate('professor').exec(function(err, sections){
			if(err){
				res.send(500,{error: 'Database Error'});
			}
			res.view('section_list', {sections:sections});
		});
	},

	add:function(req, res){
		res.view('section_add');
	},

	create:function(req, res){
		var number = req.body.number;
		var course = req.body.course;
		var professor = req.body.professor;

		Sections.create({number:number, course:course, professor:professor}).exec(function(err){
			if(err){
				res.send(500, {error: 'Database Error'});
			}

			res.redirect('/sections/sections');
		});

	},
	delete:function(req, res){
		Sections.destroy({id:req.params.id}).exec(function(err){
			if (err) {
				res.send(500, {error: 'Database Error'});
			}
			
			res.redirect('sections/sections');
		});

		return false;
	},
	edit: function(req, res){
		Sections.findOne({id:req.params.id}).populate('course').populate('professor').exec(function(err, section){
			if (err) {
				res.send(500, {error: 'Database Error'});
			}
			res.view('section_edit', {section:section});	
		});
	},
	update:function(req, res){
		var number = req.body.number;
		var course = req.body.course;
		var professor = req.body.professor;

		Sections.update({id: req.params.id},{number:number, course:course, professor:professor}).exec(function(err){
			if(err){
				res.send(500, {error: 'Database Error'});
			}

			res.redirect('sections/sections');
		});

		return false;
	}
	
};
