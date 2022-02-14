/* jslint browser: true*/
/*global $*/

// https://github.com/jasonmoo/t.js
(function () {
  function c(a) { this.t = a } function l(a, b) { for (var e = b.split("."); e.length;) { if (!(e[0] in a)) return !1; a = a[e.shift()] } return a } function d(a, b) {
    return a.replace(h, function (e, a, i, f, c, h, k, m) { var f = l(b, f), j = "", g; if (!f) return "!" == i ? d(c, b) : k ? d(m, b) : ""; if (!i) return d(h, b); if ("@" == i) { e = b._key; a = b._val; for (g in f) f.hasOwnProperty(g) && (b._key = g, b._val = f[g], j += d(c, b)); b._key = e; b._val = a; return j } }).replace(k, function (a, c, d) {
      return (a = l(b, d)) || 0 === a ? "%" == c ? (new Option(a)).innerHTML.replace(/"/g, "&quot;") :
        a : ""
    })
  } var h = /\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g, k = /\{\{([=%])(.+?)\}\}/g; c.prototype.render = function (a) { return d(this.t, a) }; window.t = c
})();
// end of 't';

Number.prototype.to_$ = function () {
  return "$" + parseFloat(this).toFixed(3);
};
String.prototype.strip$ = function () {
  return this.split("$")[1];
};

var app = {

  deposit: 500.000,
  basicInfo: {
    "event": "",
    "date": "",
    "guests": 0,
    "name": "",
    "email": "",
    "phone": "",
  },
  itemTemplate: '<li class="_grid shopping-cart--list-item">  <div class="card mb-3" >    <div class="row g-0">      <div class="col-9">        <div class="card-body">          <h6 class="card-title product-name">{{=name}}</h6> <div class="price product-single-price">${{=price}}</div>          <p class="card-text product-desc printable">{{=desc}}</p>        </div>      </div>      <div class="col-3 _column product-modifiers" data-product-price="{{=price}}">  <div class=col">    <button class="_btn _column product-subtract non-printable">&minus;</button>    <label class="printable">Cantidad</label>    <div class="_column product-qty">0</div>    <button class="_btn _column product-plus non-printable">&plus;</button>  </div>  <div class="row">    <div class="col-3">      <button class="_btn product-remove"><i class="bi bi-x"></i></button>    </div>    <div class="col-3">    <button class="_btn product-edit"><i class="bi bi-pencil"></i></button>      </div>    <div class="col-6">      <div class="price product-total-price">$0.00</div>    </div>  </div></div></div><div class="row printable"><div class="col text-center">  <img src="{{=img}}" class="img-fluid" alt="..."></div></div></div>',
  products: [
    {
      "id": "1",
      "name": "Alquiler de Hacienda",
      "price": "100.000",
      "img": "https://haciendasanrafael.co/images/hacienda/Pgina251.jpg",
      "desc": "Hermosa casona con mas de 400 años de Historia, refleja la arquitectura colonial de la época, dentro de la casa encontrarán un salón para 100 personas"
    },
    {
      "id": "2",
      "name": "Menú",
      "price": "89.000",
      "img": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "desc": "Entrada: Ensalada o crema. Fuerte: Carne de res o cerdo. Pechuga de pollo. Arroz o vegetales. Acompañamiento (papa) o ensalada. Postre: A escoger. Bebida: Gaseosa"
    },
    {
      "id": "3",
      "name": "Menaje",
      "price": "220.000",
      "img": "https://haciendasanrafael.co/images/hacienda/S_R_1872.jpg",
      "desc": "Vajilla cuadrada, Cubiertos, Cristalería, Bandejas, jarras, hieleras, samovares, pala y sierra para ponqué."
    },
    {
      "id": "4",
      "name": "Mobiliario",
      "price": "45.000",
      "img": "https://haciendasanrafael.co/images/hacienda/S_R_155.jpg",
      "desc": "Mesas redondas o rectangulares para invitados - 10 puestos c/u. Mesa redonda ponqué. Sillas Rimax sin brazos"
    },
    {
      "id": "5",
      "name": "Decoración",
      "img": "https://haciendasanrafael.co/images/jardin/pPgina001_33.jpg",
      "price": "10.000",
      "desc": "Centros de mesa en flores y rosas o cilindros de cristal decorados. Arreglo de mesa de ponqué y copas principales decoradas. Decoración de cofre, pala y sierra (ponqué)"
    },
    {
      "id": "6",
      "name": "Música",
      "img": "https://images.pexels.com/photos/1564668/pexels-photo-1564668.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "price": "60.000",
      "desc": "2 Cabinas de sonido, 1 Micrófono inalámbrico, 4 Luces audio-ritmicas y laser, 1 Camara de humo."
    }
  ],

  //TODO: COnstruir
  editItem: function(id){
    var item = app.products.find(x => x.id == 3);
    if (item) {
      item.name = "Cambio de prueba";
    }
    app.renderCatalog();
  },


  removeProduct: function () {
    "use strict";

    var item = $(this).closest(".shopping-cart--list-item");

    item.addClass("closing");
    window.setTimeout(function () {
      item.remove();
      app.updateTotals();
    }, 500);
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
    subtotalCtr.html(subtotalPrice.to_$());

    app.updateTotals();
  },

  updateTotals: function () {
    "use strict";

    var products = $(".shopping-cart--list-item"),
      subtotal = 0,
      deposit = 0;

    for (var i = 0; i < products.length; i += 1) {
      subtotal += parseFloat($(products[i]).find(".product-total-price").html().strip$());
    }

    //deposit = (subtotal > 0 && subtotal < (100 / 1.06)) ? app.deposit : 0;
    deposit = app.deposit;

    $(".subtotalCtr").html(subtotal.to_$());
    $(".taxesCtr").html((subtotal * 0.19).to_$());
    $(".totalCtr").html((subtotal * 1.19 + deposit).to_$());
    $(".depositCtr").html(deposit.to_$());
  },

  attachEvents: function () {
    "use strict";

    $("#checkout-btn").on("click", app.PrintPDF);
    $("#btnBasicData").on("click", app.BasicData);
    $("#btnAddItem").on("click", app.AddItem);



    $("#PR").on("click", app.editItem);
    

    // Datos de prueba
    // $("#quotationEvent").val("Primera Comunión");
    // $("#quotationDate").val("2022-02-07T17:11");
    // $("#quotationGuests").val("123");
    // $("#quotationName").val("Nombre del COtizante");
    // $("#quotationEmail").val("correo@mail.com");
    // $("#quotationPhone").val("3123456789");

    // $("#itemName").val("Cantante");
    // $("#itemPrice").val("123456");
    // $("#itemDesc").val("Artista principal invitado");
    // $("#itemImage").val("https://t3.ftcdn.net/jpg/02/57/02/12/240_F_257021210_xTw6p544wLP8UNgjkbHsj9n2t6QQM0g9.jpg");
  
  },
  attachQuotationEvents: function(){
    "use strict";

    $(".product-remove").on("click", app.removeProduct);
    $(".product-plus").on("click", app.addProduct);
    $(".product-subtract").on("click", app.subtractProduct);

    $(".product-edit").on("click", app.openEditItem);
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
  renderBasicInfo: function(){
    "use strict";
    var basicInfo = app.basicInfo,
        template2 = new t($("#temp").html()),
        tempC = [];
        
    tempC = template2.render(basicInfo);
    $("#te").html(tempC);
    //event.preventDefault();
  },
  renderCatalog: function () {
    "use strict";

    var products = app.products,
      content = [],
      // template = new t($("#shopping-cart--list-item-template").html()),
      template = new t(app.itemTemplate);
     
    for (var i = 0; i < products.length; i += 1) {
      content[i] = template.render(products[i]);
    }

    $("#shopping-cart--list").html(content.join(""));

    
  },

  PrintPDF: function () {
    window.print();
  },

  BasicData: function () {
    //if(form_validate("formBasicData")){
    app.basicInfo.event = $("#quotationEvent").val();
    app.basicInfo.date = $("#quotationDate").val();
    app.basicInfo.guests = $("#quotationGuests").val();
    app.basicInfo.name = $("#quotationName").val();
    app.basicInfo.email = $("#quotationEmail").val();
    app.basicInfo.phone = $("#quotationPhone").val();

    $("#quotationTextEvent").text(app.basicInfo.event);
    $("#quotationTextDate").text(app.basicInfo.date);
    $("#quotationTextGuests").text(app.basicInfo.guests);
    $("#quotationTextName").text(app.basicInfo.name);
    $("#quotationTextEmail").text(app.basicInfo.email);
    $("#quotationTextPhone").text(app.basicInfo.phone);

    $("#newQuotation").modal('hide');
    $("#te").removeClass("d-none");
    $("#textInfo").addClass("d-none");
    event.preventDefault();

    //}
    //else{
    //  alert("NO VALIDO");
    //}

  },
  AddItem: function() {
    
    $("#shopping-cart--list").html("");

    app.products.push({
      'name': $("#itemName").val(),
      'img': $("#itemImage").val(),
      'price': $("#itemPrice").val(),
      'desc': $("#itemDesc").val()
    });

    app.renderCatalog();
    app.attachQuotationEvents();
    $("#newItem").modal('hide');
    event.preventDefault();

  },

  openEditItem: function(){
    

    var item = app.products.find(x => x.id == 3);
    if (item) {

      $("#newItemtitle").text("Editar Ítem");
      $("#itemName").val(item.name);
      $("#itemImage").val(item.img);
      $("#itemPrice").val(item.price);
      $("#itemDesc").val(item.desc);
    }

    $("#newItem").modal('show');


    



  }


};

app.renderBasicInfo();
app.renderCatalog();
app.attachEvents();
app.attachQuotationEvents();

function form_validate(attr_id) {
  var result = true;
  $('#' + attr_id).validator('validate');
  $('#' + attr_id + ' .form-group').each(function () {
    if ($(this).hasClass('has-error')) {
      result = false;
      return false;
    }
  });
  return result;
}


// Self-executing function
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();