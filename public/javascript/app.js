$(document).ready(function() {
<<<<<<< HEAD
    $('select').material_select();

    var chip = {
        tag: 'chip content',
    };

    $('.chips').material_chip();

    $('.chips-placeholder').material_chip({
        placeholder: 'Ex. General, Action, Comedy, etc.',
        secondaryPlaceholder: '+Genre',
    });

    $('.chips-autocomplete').material_chip({
        autocompleteOptions: {
            data: {
                'General': null,
                'Action':null,
                'Adventure': null,
                'Animation': null,
                'Comedy': null,
                'Crime': null,
                'Documentary': null,
                'Drama': null,
                'Family': null,
                'Fantasy': null,
                'History': null,
                'Horror': null,
                'Romance': null,
                'Music': null,
                'Mystery': null,
                'Thriller': null,
                'Sci-Fi': null,
                'War': null
            },
            limit: Infinity,
            minLength: 1
        }
    });   
});
=======
  $('select').material_select();
})
>>>>>>> 3e901b5a30be666b8e09db7c4015b94d896fed67
