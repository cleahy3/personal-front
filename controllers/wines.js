var Wine = require('../models/wine');
function winesIndex (req,res){
	Wine.find({},
		function(err, wines){
			if(err) console.log(err);
			res.status(200).json(wines);
		});
	
}
function winesCreate(req,res){
	console.log(req.body.wine);
	var wine = req.body.wine;
	Wine.create(wine, function(err, result){
		if(err) console.log(err);
		res.status(20).redirect('/api/wines');
	})
}
function winesShow(req,res){
	var id = req.params.id;
	Wine.findById(id, function(err,wine){
		if(err) console.log(err);
		res.status(200).json(wine);
	});
};

function winesUpdate(req,res){
	var id = req.params.id;
	Wine.findByIdAndUpdate(id, {
		$set: req.body.wine},
		{new:true},
		function(err, wine){
			if(err) console.log(err);
			res.status(202).json(wine);
	});	
}
function winesDelete(req,res){
	var id = req.params.id;
	Wine.findByIdAndRemove(id,function(err,wine){
		if(err)console.log(err);
		res.status(202).json(wine);
	})
}

module.exports={
	create:winesCreate,
	index:winesIndex,
	show:winesShow,
	update:winesUpdate,
	delete: winesDelete
};