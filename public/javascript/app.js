$(document).ready(function() {
    $('#list-name').click(function(){
        $(this).replaceWith(`<form action=/users/ >`)
    })
})