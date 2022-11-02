// try playing with this ALERT - 
// $(document).ready(function() {alert("[hello earthlings]"); })

// JS files comment with two backslash lines 
$(document).ready(function() {$("#ufo").draggable(); })

$(document).ready(function() {$("#cat").draggable(); })

$(document).ready(function() {$("#grapes").draggable(); })

$(document).ready(function() {$("#diamond").draggable(); })

$(document).ready(function() {$("#bananas").draggable(); })

$(document).ready(function() {$("#harry").draggable(); })

$(document).ready(function() {$("#diamond").hover(function(){$("#harry").show();});})

$(document).ready(function() {$("#bananas").click(function(){$("#grapes").toggle();});})

$(document).ready(function() {$("#cat").hover(function(){ $(this).hide();})})

$(document).ready(function(){$("#harry").hover(function(){ $("#earthling").css("color", "blue");})})

$(document).ready(function(){$("#harry").hover(function(){ $("#earthling").append("we come in peach 🍑 ");})})


