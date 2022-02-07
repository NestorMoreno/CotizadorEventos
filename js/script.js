/* jslint browser: true*/
/*global $*/

// https://github.com/jasonmoo/t.js
(function(){function c(a){this.t=a}function l(a,b){for(var e=b.split(".");e.length;){if(!(e[0]in a))return!1;a=a[e.shift()]}return a}function d(a,b){return a.replace(h,function(e,a,i,f,c,h,k,m){var f=l(b,f),j="",g;if(!f)return"!"==i?d(c,b):k?d(m,b):"";if(!i)return d(h,b);if("@"==i){e=b._key;a=b._val;for(g in f)f.hasOwnProperty(g)&&(b._key=g,b._val=f[g],j+=d(c,b));b._key=e;b._val=a;return j}}).replace(k,function(a,c,d){return(a=l(b,d))||0===a?"%"==c?(new Option(a)).innerHTML.replace(/"/g,"&quot;"):
a:""})}var h=/\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g,k=/\{\{([=%])(.+?)\}\}/g;c.prototype.render=function(a){return d(this.t,a)};window.t=c})();
// end of 't';

Number.prototype.to_$ = function () {
  return "$" + parseFloat( this ).toFixed(3);
};
String.prototype.strip$ = function () {
  return this.split("$")[1];
};

var app = {

  deposit : 500.000,
  basicInfo :  {
      "Event" : "asdsaasdsadasdasd",
      "Date" : "",
      "Guests" : 0,
      "Name" : "",
      "Email" : "",
      "Phone" : "",
    },
  products : [
    {
      "name" : "Alquiler de Casa",
      "price" : "100.000",
      "img" : "https://t4.ftcdn.net/jpg/00/97/00/07/240_F_97000769_R4zepLTgmf8G22W7G2o8JA1HeiVK2CkK.jpg",
      "desc" : "Hermosa casona con mas de 400 años de Historia, refleja la arquitectura colonial de la época, dentro de la casa encontrarán un salón para 100 personas"
    },
      {
        "name" : "Menú",
        "price" : "89.000",
        "img" : "https://t4.ftcdn.net/jpg/01/87/99/71/240_F_187997134_yr07aV026KPieOeD95Im6dhckgmRG0B5.jpg",
        "desc" : "Entrada: Ensalada o crema. Fuerte: Carne de res o cerdo. Pechuga de pollo. Arroz o vegetales. Acompañamiento (papa) o ensalada. Postre: A escoger. Bebida: Gaseosa"
      },
      {
        "name" : "Personal de Servicio",
        "price" : "100.000",
        "img" : "https://t3.ftcdn.net/jpg/01/34/09/10/240_F_134091032_mxaqnMcorgFwbp0S21RjoNwnRDa6VAA7.jpg",
        "desc" : "1 Coordinador de evento y bioseguridad, 1 Meseros / incluido coordinador, 1 Chef o auxiliar de alimentos, 1 Dj - sujeto a contratación de sonido"
      },
      {
        "name" : "Menaje",
        "price" : "220.000",
        "img" : "https://t4.ftcdn.net/jpg/01/44/04/41/240_F_144044105_UcHmq5PNlrbFs6Zkxu6hlAjXh5KOSEAm.jpg",
        "desc" : "Vajilla cuadrada, Cubiertos, Cristalería, Bandejas, jarras, hieleras, samovares, pala y sierra para ponqué."
      },
      {
        "name" : "Mesas y Sillas",
        "price" : "45.000",
        "img" : "https://t3.ftcdn.net/jpg/01/45/93/92/240_F_145939215_ZTcz3QyeazSSHCiLo8FbrL7POHqPX66w.jpg",
        "desc" : "Mesas redondas o rectangulares para invitados - 10 puestos c/u. Mesa redonda ponqué. Sillas Rimax sin brazos"
      },
      {
        "name" : "Decoración",
        "img" : "https://t3.ftcdn.net/jpg/02/58/81/14/240_F_258811469_1QJwu1ZKTgmo3Tqa1sa27V2uVrXvvK3n.jpg",
        "price" : "10.000",
        "desc" : "Centros de mesa en flores y rosas o cilindros de cristal decorados. Arreglo de mesa de ponqué y copas principales decoradas. Decoración de cofre, pala y sierra (ponqué)"
      },
      {
        "name" : "Sonido",
        "img" : "https://t3.ftcdn.net/jpg/02/57/02/12/240_F_257021210_xTw6p544wLP8UNgjkbHsj9n2t6QQM0g9.jpg",
        "price" : "60.000",
        "desc" : "2 Cabinas de sonido, 1 Micrófono inalámbrico, 4 Luces audio-ritmicas y laser, 1 Camara de humo."
      },
      {
        "name" : "Transporte y Montaje",
        "img" : "https://t3.ftcdn.net/jpg/01/37/76/00/240_F_137760017_1oJKrjCG3IHjgbgCpKpDak39UJthbnFT.jpg",
        "price" : "30.000",
        "desc" : "Transporte de suministros y personal en Bogotá - perímetro urbano"
      }
    ],

  removeProduct: function () {
    "use strict";

    var item = $(this).closest(".shopping-cart--list-item");

    item.addClass("closing");
    window.setTimeout( function () {
      item.remove();
      app.updateTotals();
    }, 500); // Timeout for css animation
  },

  addProduct: function () {
    "use strict";

    var qtyCtr = $(this).prev(".product-qty"),
        quantity = parseInt(qtyCtr.html(), 10) + 1;

    app.updateProductSubtotal(this, quantity);
  },

  subtractProduct: function () {
    "use strict";

    var qtyCtr = $(this).next(".product-qty"),
        num = parseInt(qtyCtr.html(), 10) - 1,
        quantity = num <= 0 ? 0 : num;

    app.updateProductSubtotal(this, quantity);
  },

  updateProductSubtotal: function (context, quantity) {
    "use strict";

    var ctr = $(context).closest(".product-modifiers"),
        productQtyCtr = ctr.find(".product-qty"),
        productPrice = parseFloat(ctr.data("product-price")),
        subtotalCtr = ctr.find(".product-total-price"),
        subtotalPrice = quantity * productPrice;

    productQtyCtr.html(quantity);
    subtotalCtr.html( subtotalPrice.to_$() );

    app.updateTotals();
  },

  updateTotals: function () {
    "use strict";

    var products = $(".shopping-cart--list-item"),
        subtotal = 0,
        deposit  = 0;

    for (var i = 0; i < products.length; i += 1) {
      subtotal += parseFloat( $(products[i]).find(".product-total-price").html().strip$() );
    }
    
    //deposit = (subtotal > 0 && subtotal < (100 / 1.06)) ? app.deposit : 0;
    deposit = app.deposit;

    $(".subtotalCtr").html( subtotal.to_$() );
    $(".taxesCtr").html( (subtotal * 0.19).to_$() );
    $(".totalCtr").html( (subtotal * 1.19 + deposit).to_$() );
    $(".depositCtr").html( deposit.to_$() );
  },

  attachEvents: function () {
    "use strict";

    $(".product-remove").on("click", app.removeProduct);
    $(".product-plus").on("click", app.addProduct);
    $(".product-subtract").on("click", app.subtractProduct);
    $("#checkout-btn").on("click", app.Test);


  },

  setProductImages: function () {
    "use strict";

    var images = $(".product-image"),
        ctr,
        img;

    for (var i = 0; i < images.length; i += 1) {
      ctr = $(images[i]),
      img = ctr.find(".product-image--img");

      ctr.css("background-image", "url(" + img.attr("src") + ")");
      img.remove();
    }
  },

  renderCatalog: function () {
    "use strict";

    var basicInfo = app.basicInfo,

        temp = new t( $("#temp").html() ),
        tempC = [],
        products = app.products,
        content = [],
        
        template = new t( $("#shopping-cart--list-item-template").html() );

    for (var i = 0; i < products.length; i += 1) {
      content[i] = template.render(products[i]);
    }

    $("#shopping-cart--list").html(content.join(""));


    tempC = temp.render(basicInfo);
    $("#te").html(tempC.join(""));



  },

  Test: function () {
    window.print();
  },


  NewQuotation: function(){
    
    // $("#shopping-cart--list").html(content.join(""));
    basicInfo.Event = "";

  }

};

app.renderCatalog();
app.setProductImages();
app.attachEvents();


// Self-executing function
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();