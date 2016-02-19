
$(document).ready(function() {

    loadData();

    $('#post-zoo-data').on('click', clickPostAnimalData);

});


function clickPostAnimalData() {
    event.preventDefault();
    var values = {};

    //update to randomNumber function in place of field.
    $.each($('#post-zoo-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
        //values[field.name] = field.value;
        values.animal_number = randomNumber(1, 100);
    });

    //console.log(values);
    $('#post-zoo-form').find('input[type=text]').val('');

    $.ajax({
        type: 'POST',
        url: '/animal',
        data: values,
        success: function(data) {
            console.log('From Server: ', data);
            console.log(data);
        }
    });
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
};



function loadData() {
    $.ajax({
        type: 'GET',
        url: '/result',
        success: function (data) {
            console.log(data);
            appendToDom();
        }
    })
}
//
//function appendToDom() {
//    loadData;
//    output = '<div>';
//    output += '<p>' + values.animal_type + '</p>';
//    output += '<form id="post-animal-form"><label for="' + person.first_name + '-animal">' + person.first_name + '\'s Spirit Animal: </label>';
//    output += '<input type="text" id="' + person.first_name + '" name="animal_name" />';
//
//    output += '<label for="' + person.first_name + '-color">Spirit Animal Color: </label>';
//    output += '<input type="text" id="' + person.first_name + '" name="animal_color" />';
//    output += '<button class="post-animal-data" data-id="' + person.id + '">Submit</button></form>';
//
//    output += '</div>';
//    $(id).append(output);
//}