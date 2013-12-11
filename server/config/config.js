module.exports = function(app, express){
	app.configure(function() {
		app.use(express.bodyParser());
		app.use('/images', express.static(root_dir + '/public/images'));
		app.use('/css', express.static(root_dir + '/public/css'));
		app.use('/execs', express.static(root_dir + '/public/execs'));
	});
	
	if(!process.env.DATABASE_URL)
	{
		process.env.DATABASE_URL = "postgres://postgres:my_password@localhost:5432/buckles";
	}
};
