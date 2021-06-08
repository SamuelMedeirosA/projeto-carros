$(function(){

    let currentValue = 0;
    let isDrag = false;


    $('.pointer-barra').mousedown(function(){
        //console.log('clique detectado!');
        isDrag = true;
    })

    $(document).mouseup(function(){
        enableTextSelector();
        isDrag = false;
    })

    $('.barra-preco').mousemove(function(e){
        //console.log('Mouse arrastado!')
        if(isDrag){
            disableTextSelector();
            let elBase = $(this);
            let mouseX = e.pageX - elBase.offset().left;
            let preco_maximo = 70000;
            let preco_atual = 0;
            if(mouseX < 0)
                mouseX = 0;
                if(mouseX > elBase.width())
                    mouseX = elBase.width();

                currentValue= (mouseX / elBase.width()) * 100;
                //console.log(percent);
                $('.pointer-barra').css('left',(mouseX-13)+'px')
                $('.barra-preco-fill').css('width', currentValue+'%');


                //TO DO: FORMATAR PREÇO.
                preco_atual = (currentValue / 100) * preco_maximo;
                preco_atual = formatarPreco(preco_atual);
                $('.preco_pesquisa').html('R$'+preco_atual);
        }    
    
        })

        function formatarPreco(preco_atual){
            preco_atual = preco_atual.toFixed(2);
            preco_array = preco_atual.split('.');
            
            let novo_preco = formatarTotal(preco_array);

            return novo_preco;
        }

        function formatarTotal(preco_array){
             if(preco_array[0] < 1000){
                return preco_array[0]+','+preco_array[1];
            }else if(preco_array[0] < 10000){
                return preco_array[0][0]+'.'+preco_array[0].substr(1,preco_array[0].length)+
                ','+preco_array[1];
            }else{
                return preco_array[0][0]+preco_array[0][1]+'.'+preco_array[0].substr(2,preco_array[0].length)+
                ','+preco_array[1];
            }
        }



        function disableTextSelector(){
            $('body').css("user-select", 'none');
            $('body').css("-moz-user-select", 'none');
            $('body').css("-ms-user-select", 'none');
            $('body').css("-o-user-select", 'none');
            $('body').css("-webkit-user-select", 'none');
        }
        
        function enableTextSelector(){
            $('body').css("user-select", 'auto');
            $('body').css("-moz-user-select", 'auto');
            $('body').css("-ms-user-select", 'auto');
            $('body').css("-o-user-select", 'auto');
            $('body').css("-webkit-user-select", 'auto');
        }

        /*******menu responsivo*******/

        $('.mobile-menu').click(function(){
            $(this).find('ul').slideToggle(800);
        })
        

        /******depoimentos******/


        let amountDepoimento = $(".depoimento-single p").length;
        let curIndex = 0;

        iniciarDepoimento();
        navegarDepoimento();

        function iniciarDepoimento(){
            $('.depoimento-single p').hide();
            $('.depoimento-single p').eq(0).show();
        }


        function navegarDepoimento(){
            $('[next]').click(function(){
               // alert('next');
               curIndex++;
               if(curIndex >= amountDepoimento)
                   curIndex = 0;
                   $('.depoimento-single p').hide();
                   $('.depoimento-single p').eq(curIndex).show();

        })

        $('[prev]').click(function(){
            // alert('next');
            curIndex--;
            if(curIndex < 0)
                curIndex = amountDepoimento-1;
                $('.depoimento-single p').hide();
                $('.depoimento-single p').eq(curIndex).show();

     })
            
     }
            
})