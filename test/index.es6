require("./sass/style.scss");

require ("jquery");

require('../build/anchor_points.js');


$(document).ready(function () {


    $('.anchor-nav').on('shown.nav.ap', function(){
        $(this).addClass('active');
    })

    $('.anchor-nav').on('hidden.nav.ap', function(){
        $(this).removeClass('active');
    })
    
    $('.features-list').anchorPoints({
        navSelector: '.anchor-nav',
        sectionSelector: '.feature-item'
    });

    
});