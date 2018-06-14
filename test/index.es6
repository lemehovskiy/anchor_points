require("./sass/style.scss");

require ("jquery");

require('../build/anchor_points.js');


$(document).ready(function () {
    
    $('.features-list').anchorPoints({
        navSelector: '.anchor-nav',
        sectionSelector: '.feature-item'
    });
    
});