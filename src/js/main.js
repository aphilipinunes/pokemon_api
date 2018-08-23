




$(document).ready(function () {



    $.getJSON("https://pokeapi.co/api/v2/pokemon/", function (result) {



        $.each(result.results, function (i, resultFinal) {

            var img = i + 1;

            $(".main").append("<a href='#' class='pokemon'><img src=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + img + ".png><p>" + resultFinal['name'] + "<p/></a>");

        });


    });


});

//scroll
//https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20"