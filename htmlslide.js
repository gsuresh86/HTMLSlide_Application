var SlideModel = Backbone.Model.extend({
	defaults : {
		slideNo : 1,
		header : ""
	}		
});

var SlideView = Backbone.View.extend({
	initialize : function(){
		this.template = Handlebars.compile(this.options.slideTemplate.innerHTML);
	},

	render : function(content){
		this.slideContent = $(this.template(this.model.toJSON()));
		this.slideContent.find('section').append(content);
		this.el.append(this.slideContent);
	}
});