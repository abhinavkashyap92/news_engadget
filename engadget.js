var EngadgetFeeds = {

	init:function(config){

		this.template=config.template;
		this.container=config.container;
		this.connect();

	},

	connect:function()
	{
		//makes a ajax request to rss.php which fetches the feeds of the website 
		$.ajax({
			url:"rss.php",
			dataType:'xml',
			success:this.useData
					
		}); //end of ajax function

	},

	attachTemplate:function(){

		var template = Handlebars.compile(this.template);	
		this.container.append(template(this.articles));
		this.refresh();
		

	},


	refresh:function(){

		var self = this;
		setTimeout(function(){

			//This makes ajax request again after an interval
			//This is necessary to get the xml file again and again because the contents would have changedd
			//there may be new articles
			self.connect();
			console.log("This has refreshed");

		},180000);

	},

	useData:function(data){
		//This function gets the data requested and ready to be parsed
		//using $.parseXML to parse the XML document to parse the xml document
		console.log(data);
		var self = EngadgetFeeds;

		var items = $(data).find('item');
		
		self.articles = $.map(items.slice(0,5),function(article){

			var $article = $(article)
			return {
				title:$article.find('title').text(),
				description:$article.find('description').text(),
				
			};
			
			
		});

		self.attachTemplate();
		
	},

};


