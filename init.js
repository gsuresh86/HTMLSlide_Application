/**
 * Created with JetBrains WebStorm.
 * User: ivy4457
 * Date: 2/11/12
 * Time: 2:30 PM
 * To change this template use File | Settings | File Templates.
 */
var count = 0;
var noOfSlide;

function handleKeys(e) {
    if (/^(input|textarea)$/i.test(e.target.nodeName) || e.target.isContentEditable) {
        return;
    }
    switch (e.keyCode) {
        case 37:  // left arrow
            prev(); break;
        case 39:  // right arrow
        case 32:  // space
            next(); break;
    }
}

function prev(){
    if(count == 0) return;
    $('#page-switcher-end').show();
    if(count == 1){
        $('#page-switcher-start').hide();
    }

    var currentSlide = count--;
    var slides = $('.slides .slide');

    $(slides[currentSlide]).removeClass("current");
    $(slides[currentSlide]).addClass("future");

    $(slides[currentSlide-1]).removeClass("past");
    $(slides[currentSlide-1]).addClass("current");

    $(slides[currentSlide+1]).removeClass("future");
    $(slides[currentSlide+1]).addClass("far-future");
}

function next(){
    if(count == noOfSlide-1) return;
    $('#page-switcher-start').show();
    if(count == noOfSlide-2){
        $('#page-switcher-end').hide();
    }
    var currentSlide = count++;
    var slides = $('.slides .slide');

    $(slides[currentSlide]).removeClass("current");
    $(slides[currentSlide+1]).find('section ul').hide();
    $(slides[currentSlide]).addClass("past");

    $(slides[currentSlide+1]).removeClass("future");
    $(slides[currentSlide+1]).addClass("current");
    $(slides[currentSlide+1]).find('section ul').show(3000);

    $(slides[currentSlide+2]).removeClass("far-future");
    $(slides[currentSlide+2]).addClass("future");

}

function openClient(){
    var mytitle = "HTML Client";
    var lid = $('#langList').val();
    var lobbyWindow = window.open("https://pgrouter238z.ivycomptech.co.in:8800/demo/?lid=" + lid,"" + mytitle,"toolbar=no,status=no,height=745,width=1035,resizable=no");
}

document.addEventListener('keydown', function(e) { handleKeys(e); }, false);

$(document).ready(function(){
    
    var htmlSlide = new HTMLSlide($('.slides'));

    //Slide 1
    var slide1 = htmlSlide.createSlide({
        slideClass : "current",
        header : "", 
        sectionClass : "middle", 
        slideTemplate : slideTemplate,
        content : '<p class="">HTML Slide Application</p><p style="font-size:35px">Using Backbone & Jquery</p>'
    });

    //Prerequisites
    //Slide 2
    var slide2 = htmlSlide.createSlide({
        slideClass : "future",
        header : "Prerequisites", 
        sectionClass : "", 
        slideTemplate : slideTemplate,
        content : ''
    });

    var pointsArr = ['Underscore', 'Jquery', 'Backbone', 'Handlerbars'];
    htmlSlide.createSlidePoints(pointsArr, slide2);    

    //Thank you
    //Slide 3
    htmlSlide.createSlide({
        slideClass : "future",
        header : "", 
        sectionClass : "last-section", 
        slideTemplate : slideTemplate,
        content : 'Thank You'
    });


    $('#page-switcher-start').on("click", prev);
    $('#page-switcher-end').on("click", next);
    $('.openDemo').on("click", openClient);
    noOfSlide = $('.slides .slide').length;
    

});