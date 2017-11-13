/**
 * SectionsController
 *
 * @description :: Server-side logic for managing Sections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	sections:function(req, res){
		Sections.find({}).exec(function(err, sections){
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
		var title = req.body.title;
		var body = req.body.body;
		var bodys = req.body.bodys;

		Sections.create({title:title, body:body, bodys:bodys}).exec(function(err){
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
		Sections.findOne({id:req.params.id}).exec(function(err, section){
			if (err) {
				res.send(500, {error: 'Database Error'});
			}
			res.view('section_edit', {section:section});	
		});
	},
	update:function(req, res){
		var title = req.body.title;
		var body = req.body.body;
		var bodys = req.body.bodys;

		Sections.update({id: req.params.id},{title:title, body:body, bodys:bodys}).exec(function(err){
			if(err){
				res.send(500, {error: 'Database Error'});
			}

			res.redirect('sections/sections');
		});

		return false;
	}
};

