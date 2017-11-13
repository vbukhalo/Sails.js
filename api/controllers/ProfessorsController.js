/**
 * ProfessorsController
 *
 * @description :: Server-side logic for managing Professors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	professors:function(req, res){
		Professors.find({}).exec(function(err, professors){
			if(err){
				res.send(500,{error: 'Database Error'});
			}
			res.view('professor_list', {professors:professors});
		});
	},

	add:function(req, res){
		res.view('professor_add');
	},

	create:function(req, res){
		var title = req.body.title;
		var body = req.body.body;

		Professors.create({title:title, body:body}).exec(function(err){
			if(err){
				res.send(500, {error: 'Database Error'});
			}

			res.redirect('/professors/professors');
		});
	},
	delete:function(req, res){
		Professors.destroy({id:req.params.id}).exec(function(err){
			if (err) {
				res.send(500, {error: 'Database Error'});
			}
			
			res.redirect('professors/professors');
		});

		return false;
	},
	edit: function(req, res){
		Professors.findOne({id:req.params.id}).exec(function(err, professor){
			if (err) {
				res.send(500, {error: 'Database Error'});
			}
			res.view('professor_edit', {professor:professor});	
		});
	},
	update:function(req, res){
		var title = req.body.title;
		var body = req.body.body;

		Professors.update({id: req.params.id},{title:title, body:body}).exec(function(err){
			if(err){
				res.send(500, {error: 'Database Error'});
			}

			res.redirect('professors/professors');
		});

		return false;
	}
};

