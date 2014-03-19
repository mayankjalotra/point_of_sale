/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * author : mayank jalotra
 */

$(document).ready(function() {

    $.ajax("https://app.maaxframe.com/bizuat/product/products/index.json", {
        dataType: 'json',
        success: function(response)
        {
            var jsonRes = response['paginate']['data'];
            var txt = '<div class="span3 myprods" id="product';
            var txt2 = '" style="cursor:pointer; padding-left: 20px"><h4></h4><p></p></div>';
            var newhtm = "";
            $.each(jsonRes, function(i, product)
            {
                if (i == 0)
                {
                    newhtm += '<div class="opaque row-fluid clearfix" style="padding-left: 34px">' + txt + i + txt2;
                }
                else if (i % 4 == 0)
                {
                    newhtm += '<div class="opaque row-fluid clearfix" style="padding-left: 34px">' + txt + i + txt2;
                }
                else if ((i + 1) % 4 == 0)
                {
                    newhtm += txt + i + txt2 + '</div><br>';
                }
                else
                {
                    newhtm += txt + i + txt2;
                }
            });

            $('#apnd-prod').append(newhtm);

            $.each(jsonRes, function(index, productVal)
            {
                var productIndex = $('#product' + index);
                productIndex.find('h4').html(productVal['Product']);
                var pro = "$" + productVal['products.sale_price'];
                productIndex.find('p').html(pro);
            });
        }
    });
    
    
    
    
    
    var shoppingCart = {};
    var qty=1;
    $('div').on('click', '.myprods', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var screen = $(this).closest('#papacart').find('#pos-screen');
        var prodName = $(this).find('h4').text();
        var prodPrice = $(this).find('p').text();
        prodPrice = prodPrice.replace("$","0");
        var productId= $(this).attr('id');
        var prod = {};
        var flag = false;
        var check= false;
        var screenPrice=$('');
        prod['prod_name'] = prodName;
        prod['prod_price'] = prodPrice;
        prod['quantity'] = qty;
        for( i in shoppingCart ){
            if(i==productId){
              flag=true;
            }
        }
        if(flag==true){
            qty=parseInt(shoppingCart[productId]['quantity'])+1; 
            prod['quantity']= qty;
            shoppingCart[productId]=prod;
            console.log(shoppingCart);
            qty=1;
            $.each(shoppingCart, function(z, cartLines) {
                // paintCart(shoppingCart)
                /*var paintCart = function(json){
                    for(x in json){ for(y in json[x]){       
                        }      */
                    
                screenPrice = $('<div class="span12" id="lines'+z+'"><div class="span4"><p class="linesProduct" id="pline'+z+'">' + prodName + '</p></div><div class="span2"><p class="linesQty" id="qline'+z+'">' + prod['quantity'] + '</p></div><div class="span4"><p align="right" class="linesAmount" style="padding-right: 50px" id="priceline'+z+'">' + prodPrice + '</p></div></div>');
                
                var lines="#lines"+z;
                
                $('#cartlines').find(lines).remove();
                
                $('#shoppingEmpty').remove();
                screen.prepend(screenPrice);
                clickingProd(shoppingCart);
                
            });
        }
           
        
        else {
        
        
                
                /*screenPrice = $('<div class="span12" id="lines'+z+'"><div class="span4"><p class="linesProduct" id="pline'+z+'">' + prodName + '</p></div><div class="span2"><p class="linesQty" id="qline'+z+'">' + prod['quantity'] + '</p></div><div class="span4"><p align="right" class="linesAmount" style="padding-right: 50px" id="priceline'+z+'">' + prodPrice + '</p></div></div>');
                
                var lines="#lines"+z;
                
                $('#cartlines').find(lines).remove();
                
                $('#shoppingEmpty').remove();
                screen.prepend(screenPrice);
            });*/
            
            
        
            shoppingCart[productId] = prod;
            console.log(shoppingCart);
           /* $.each(shoppingCart, function(z, cartLines) {
                // paintCart(shoppingCart)
                var paintCart = function(json){
                    for(x in json){
                        
                        for(y in json[x]){
                            console.log(y);
                            screenPrice = $('<br><div class="span12"><div class="span4"><p class="linesProduct">' + y[prod_name] + '</p></div><div class="span2"><p class="linesQty">' + y[prod_price] + '</p></div><div class="span4"><p align="right" id="linesAmount" style="padding-right: 50px">' + y[quantity] + '</p></div></div>');
                        }
                        
                        
                    }
                }
            });*/
            screenPrice = $('<br><div class="span12"><div class="span4"><p class="linesProduct">' + prodName + '</p></div><div class="span2"><p class="linesQty">' + prod['quantity'] + '</p></div><div class="span4"><p align="right" id="linesAmount" style="padding-right: 50px">' + prodPrice + '</p></div></div>');
            $('#shoppingEmpty').remove();
            screen.prepend(screenPrice);
            clickingProd(shoppingCart);
        }
        //}
    
        
    });
        
   var clickingProd= function(jsonobj){
       var productArray=[];
       for (x in jsonobj){
           for (y in jsonobj[x]){
               productArray.push('"'+jsonobj[x][y]+'"');
               console.log("call function: "+jsonobj[x][y]);
           }
       }
        console.log("array : "+productArray);
       $.each(productArray, function(i, details){
           console.log("details "+details[i]);
       });
        }
       
    });     
  









