$(document).ready(function($) {
    // переменные для модальных окон
    var overlay = $('#overlay');
    var close = $('.modal_close, #overlay');
    var modal = $('.modal_div'); 
    close.click( function(){
            modal 
             .animate({opacity: 0, top: '45%'}, 200, 
                 function(){
                     $(this).css('display', 'none');
                     overlay.fadeOut(400);
                     $('.error').empty()
                 }
             );
     });

    // Токены
    // 8052148be8e434bfe15d149008bae317c8612113

    // подключение к api
    token = '8052148be8e434bfe15d149008bae317c8612113';

        $.ajax({
            url: 'http://504080.com/api/v1/services/categories',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            data: {},
            success: function(data, status) {
                    // Показ елементов
                    arr = data.data
                    $.each(arr,function(key, value){
                        $(".middle_items").append('<div class="item_service">'+
                                '<div class="pic">'+
                                    '<img src="http:'+value.icon+'" alt="">'+
                                '</div>'+
                                '<h2>'+value.title+'</h2>'+
                            '</div>');
                            
                    });
            },
            error: function (data, status) {

                    text = data.responseJSON
                    // Вывод ошибок
                    overlay.fadeIn(400, 
                        function(){ 
                            $('#modal') 
                                .css('display', 'block') 
                                .animate({opacity: 1, top: '50%'}, 200);
                            $('.error').append('<h2>' + text.error.message + '</h2>'+
                                '<p>' + text.error.description + '</p>'+
                                '<p class="err_p"> Error: '+ data.status +'</p>');
                        });
             },
        });


        $.ajax({
            url: 'http://504080.com/api/v1/directories/enquiry-types',
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            data: {},
            success: function(data, status) {
                    // console.log(data.data)
                    arr = data.data
                    $.each(arr,function(key, value){
                        $(".dropdown ul").append('<li>'+value.name+'</li>');
                        $('.dropdown ul li').click(function(event) {
                            row = $(this).parent().parent().parent()
                            val = $(this).text()
                            $('.select_pole').val(val)
                            $('.dropdown').removeClass('active');
                            if (val == 'Other') {
                                $('.add_pole').attr('name','enquiry_type')
                                $('.select_pole').attr('name','none')
                                $('.add_pole').slideDown('fast');

                            } else {
                                $('.add_pole').attr('name','none')
                                $('.select_pole').attr('name','enquiry_type')
                                $('.select_pole').css({'border-color' : '#87B446'})
                                $('.add_pole').slideUp('fast')
                            }
                        });
                            
                    });

            },
            error: function (data, status) {

                    
             },
        });


        $('.select_pole').click(function(event) {
            $('.dropdown').toggleClass('active');
        });

        mail = $('.pole_f[name="email"]')
        name_p = $('.pole_f[name="user_name"]')
        subject = $('.pole_f[name="subject"]')
        description = $('.pole_f[name="description"]')

        valid_mail = false
        valid_name_p = false
        valid_subject = false
        valid_description = false
        name_p.blur(function(){
            if($(this).val() != '') {
                    $(this).css({'border-color' : '#87B446'});
                } else {
                    $(this).css({'border-color' : '#fb6363'});
                }
            valid_name_p = true
        });
        subject.blur(function(){
            if($(this).val() != '') {
                    $(this).css({'border-color' : '#87B446'});
                } else {
                    $(this).css({'border-color' : '#fb6363'});
                }
            valid_subject = true
        });
        description.blur(function(){
            if($(this).val() != '') {
                    $(this).css({'border-color' : '#87B446'});
                } else {
                    $(this).css({'border-color' : '#fb6363'});
                }
            valid_description = true
        });

        mail.blur(function(){
            if($(this).val() != '') {
                    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                    if(pattern.test($(this).val())){
                        $(this).css({'border-color' : '#87B446'});
                        // $('.sub_btn').attr('disabled', false);
                        valid_mail = true
                    } else {
                        $(this).css({'border-color' : '#fb6363'});
                        // $('.sub_btn').attr('disabled', true);
                    }
                } else {
                    $(this).css({'border-color' : '#fb6363'});
                    // $('.sub_btn').attr('disabled', true);
                }
        });


        // Загрузка фото

        function readURL(input) {

        var fileUpload = input;
 
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.jpeg)$");
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (fileUpload.files) != "undefined") {
                var reader = new FileReader();
                reader.readAsDataURL(fileUpload.files[0]);
                reader.onload = function (e) {
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function () {
                        var height = this.height;
                        var width = this.width;
                        var size = fileUpload.files[0].size
                        if (height < 300 || width < 300) {
                            overlay.fadeIn(400, 
                        function(){ 
                            $('#modal') 
                                .css('display', 'block') 
                                .animate({opacity: 1, top: '50%'}, 200);
                            $('.error').append('<h2>Error</h2>'+
                                '<p>Height and Width must exceed 300px.</p>');

                        });
                            return false;
                        }
                        if (size > 5242880) {
                            overlay.fadeIn(400, 
                        function(){ 
                            $('#modal') 
                                .css('display', 'block') 
                                .animate({opacity: 1, top: '50%'}, 200);
                            $('.error').append('<h2>Error</h2>'+
                                '<p>Image size must not exceed 5 MB.</p>');
                        });
                            return false;
                        }
                        $('.content_add').hide()
                        $('.change').addClass('active')
                        $('.change').attr('src', image.src);
                        return true;
                    };
                }
            } else {
                overlay.fadeIn(400, 
                        function(){ 
                            $('#modal') 
                                .css('display', 'block') 
                                .animate({opacity: 1, top: '50%'}, 200);
                            $('.error').append('<h2>Error</h2>'+
                                '<p>This browser does not support HTML5.</p>');
                        });
                return false;
            }
        } else {
            overlay.fadeIn(400, 
                        function(){ 
                            $('#modal') 
                                .css('display', 'block') 
                                .animate({opacity: 1, top: '50%'}, 200);
                            $('.error').append('<h2>Error</h2>'+
                                '<p>Please select a valid Image file.</p>');
                        });
            return false;
        }

        }







$(".photo").change(function(){
    readURL(this);
});


$('form').submit(function(event) {
    var th = $(this)
    if (valid_mail == true && valid_name_p == true && valid_subject == true && valid_description == true) {
        $.ajax({
                        type: "POST",
                        url: "http://504080.com/api/v1/support",
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Authorization', token);
                        },
                        data: th.serialize(),
                        success: function(data, status) {
                            text = data.data
                            overlay.fadeIn(400, 
                                function(){ 
                            $('#modal') 
                                .css('display', 'block') 
                                .animate({opacity: 1, top: '50%'}, 200);
                            $('.error').append('<h2>' + status + '</h2>'+
                                '<p>' + text.message + '</p>');
                        });
                        setTimeout(function() {
                            th.trigger("reset");
                            $('.pole_f').css('border-color','#c8cdd5')
                        }, 1000);
                    },
                    error: function (data, status) {
                    text = data.responseJSON
                    // Вывод ошибок
                    overlay.fadeIn(400, 
                        function(){ 
                            $('#modal') 
                                .css('display', 'block') 
                                .animate({opacity: 1, top: '50%'}, 200);
                            $('.error').append('<h2>' + text.error.message + '</h2>'+
                                '<p>' + text.error.description + '</p>'+
                                '<p class="err_p"> Error: '+ data.status +'</p>');
                        });
                    
                    },
                });
                    event.preventDefault();
    } else {
        overlay.fadeIn(400, 
                        function(){ 
                            $('#modal') 
                                .css('display', 'block') 
                                .animate({opacity: 1, top: '50%'}, 200);
                            $('.error').append('<h2>Error</h2>'+
                                '<p>Please check input.</p>');
                        });
    }
});

});