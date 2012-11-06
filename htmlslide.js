function HTMLSlide(el){
	this.root = el;
	this.createSlide = function(slideData){
		var slideModel = new SlideModel({slideClass : slideData.slideClass, header : slideData.header, sectionClass : slideData.sectionClass});
    	var slideView = new SlideView({model : slideModel, el : this.root,  slideTemplate : slideData.slideTemplate});
    	slideView.render(slideData.content);
    	return slideView;
	}

	this.createSlidePoints = function(points, view){
		var UlElement = $('<ul></ul>');
		var listModel, listView;
		for (var i = 0; i < points.length; i++) {
			listModel = new ListModel({Point_Description : points[i]});
			listView = new ListView({model : listModel});
			UlElement.append(listView.render(points[i]).el);
		};
		view.container.append(UlElement);
	}

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
			this.container = this.slideContent.find('section');
			this.container.append(content);
			this.el.append(this.slideContent);
		}
	});

	var ListModel = Backbone.Model.extend({
		defaults : {
			Point_Description : ""
		}
	});

	var ListView = Backbone.View.extend({
		tagName: 'li',

		initialize : function(){
			this.template = Handlebars.compile('<span class="key">*</span> <span>{{Point_Description}}</span>');
		},

		render : function(content){
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}

	});


	


}	

