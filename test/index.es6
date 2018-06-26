require("./sass/style.scss");

require ("jquery");

require('../build/anchor_points.js');


$(document).ready(function () {


    let $featurelist = $('.features-list');

    $featurelist.on('visible.section.ap', function(){
        // $('.anchor-nav').addClass('active');
    })

    $featurelist.on('hidden.section.ap', function(){
        // $('.anchor-nav').removeClass('active');
    })

    $featurelist.on('afterChangeAnchor', function(anchorPoints, index){
        if (index == 0) {
            $('.anchor-nav').removeClass('active')
        }
        else {
            $('.anchor-nav').addClass('active')
        }
    })

    $featurelist.anchorPoints({
        navSelector: '.anchor-nav',
        sectionSelector: '.feature-item'
    });

    
});