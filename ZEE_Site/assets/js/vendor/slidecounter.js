$("#qnt").html("1/3");

$('#demo').on('slide.bs.carousel', function (evento) {
    // do something...
    
    var index = evento.to;
    if (index == 0) {
        $("#qnt").html("1/3");
    }
    if (index == 1) {
        $("#qnt").html("2/3");
    }
    if (index == 2) {
        $("#qnt").html("3/3");
    }
})
$('.carousel').carousel({
interval: 5000
})