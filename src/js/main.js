$(window).scroll(function () {
    //scroll para mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     
        window.onscroll = function () {
            var scrollHeight, totalHeight;
            scrollHeight = document.body.scrollHeight;
            totalHeight = window.scrollY + window.innerHeight;

            if (totalHeight >= scrollHeight) {
                carregaImagens(scroll);
            }
        }

        //$(window).bind('scroll', function () {
        //    if ($(window).scrollTop() >= $('.poke_content').offset().top + $('.posts').outerHeight() - window.innerHeight) {
        //        alert('end reached');
        //    }
        //});
      
    } else {

        //scroll para desktop
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {

            carregaImagens(scroll);
        }

    }

});



$(document).ready(function () {

    carregaImagens();


   
   


});

function openModal(click, event) {
    $('.loading').fadeIn('fast');
    event.preventDefault();

    $('#modal .weight span').append('');
    $('#modal .height span').append('');
    $('#modal .xp span').append('');
    $('#modal .type span').append('');
    $('#modal .stats span').append('');
    $('#modal .habilities span').append('');
    $('#modal .selNameAbility').remove();

    var url = $(click).find('input[type=hidden]').val();

    $.getJSON(url, function (result) {
        $('#modal h2').text(result['name'])

        var peso = result['weight'];

        var pesoEditado = peso.toString().substr(0, peso.toString().length - 1);

        $('#modal .weight span').html(pesoEditado + ' kg');
        $('#modal .height span').html(result['height'] + ' cm');
        $('#modal .xp span').html(result['base_experience']);


        $.each(result['types'], function (index, resultFinal) {

            var isLastElement = index === result['types'].length - 1;

            if (isLastElement) {

                $('#modal .type span').html(resultFinal['type']['name']);
            } else {
                //last element
                $('#modal .type span').html(resultFinal['type']['name'] + ', ');

            }

        })


        $.each(result['stats'], function (index, resultFinal) {

            var isLastElement = index === result['stats'].length - 1;


            if (isLastElement) {

                $('#modal .stats span').html(resultFinal['stat']['name']);


            } else {
                $('#modal .stats span').html(resultFinal['stat']['name'] + ', ');

            }


        })


        $.each(result['abilities'], function (index, resultFinal) {

            $('#modal .habilities').after("<div class='selNameAbility'>" + resultFinal['ability']['name'] + '</div>');



        })



        $('#modal img').attr('alt', result['name'])

        $('#modal img.front').attr('src', result['sprites']['front_default'])

        $('#modal img.back').attr('src', result['sprites']['back_default'])

        $('#modal').modal({
            fadeDuration: 300
        });
        $('.loading').fadeOut('fast');
    });


}

function carregaImagens(qtd) {

    var divsPokemon = $('.pokemon').length;

    if (divsPokemon <= 120) {

        if (qtd != null) {
            //lockScroll();
            var divsPokemonLimit = '20';
            var divsPokemonoffset = divsPokemon + 20;



            if (divsPokemon >= 120) {
                var scroll = '?limit=' + 10 + '&offset=' + 140;
            }
            else {
                var scroll = '?limit=' + divsPokemonLimit + '&offset=' + divsPokemonoffset;
            }


            $('.loading').addClass('bottom');
            $('.loading').fadeIn('fast');

        } else {
            $('.loading').fadeIn('fast');
            var scroll = '';
        }



        $.getJSON("https://pokeapi.co/api/v2/pokemon/" + scroll, function (result) {

            

            $.each(result.results, function (i, resultFinal) {


                var edicaoUm = resultFinal['url']
                var edicaoDois = edicaoUm.replace("https://pokeapi.co/api/v2/pokemon/", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/");
                var edicaoTres = edicaoDois.slice(0, -1)

                $(".poke_content").append("<a class='pokemon " + resultFinal['name'] + "' title='Pokemon " + resultFinal['name'] + "' href='#' onclick='openModal($(this), event)'><span class='border'><span class='pokebola'></span>" +
                    "<input type='hidden' value='" + resultFinal['url'] + "'>" +
                "<img class='lazy' data-src='" + edicaoTres + ".png' class='" + resultFinal['name'] + "' alt='" + resultFinal['name'] + "'><p>" + resultFinal['name'] + "<p/></span></a>");


            })

            $('.loading').hide();
            $('.loading').removeClass('bottom');


        }).done(function () {

            $(function () {
                $('.lazy').lazy({
                    effect: "fadeIn",
                    effectTime: 1000,
                    threshold: 0
                });
            });

            //para desktop grandes
            if ($(window).width() >= 1500) {

                if ($('.poke_content').height() <= $(window).height() - 193) {

                    carregaImagens(scroll);
                   
                }
            }

            //unlockScroll();

        });


    }


}



function lockScroll() {
    $html = $('html');
    $body = $('body');
    var initWidth = $body.outerWidth();
    var initHeight = $body.outerHeight();

    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    $html.data('scroll-position', scrollPosition);
    $html.data('previous-overflow', $html.css('overflow'));
    $html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    var marginR = $body.outerWidth() - initWidth;
    var marginB = $body.outerHeight() - initHeight;
    $body.css({ 'margin-right': marginR, 'margin-bottom': marginB });
}

function unlockScroll() {
    $html = $('html');
    $body = $('body');
    $html.css('overflow', $html.data('previous-overflow'));
    var scrollPosition = $html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    $body.css({ 'margin-right': 0, 'margin-bottom': 0 });
}

//scroll
//https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20"