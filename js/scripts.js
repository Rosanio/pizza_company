function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.sizePrice;
  this.toppingsPrice = [];
  this.tax;
}

Pizza.prototype.calculatePrice = function() {
  var sizes = ['Small','Medium','Large','Xtra-Large'];
  var meats = ['pepperoni','bacon','sausage','chicken','beef','anchovies'];
  var otherToppings = ['peppers','onions','mushrooms','jalapenos','pineapple','tomatoes','olives'];
  var price = 8;
  for(var i = 0; i < sizes.length; i++) {
    if(this.size === sizes[i]) {
      this.sizePrice = price + (2*i);
      price += (2*i);
    }
  }
  for(var j = 0; j < this.toppings.length; j++) {
    for(var k = 0; k < meats.length; k++) {
      if(this.toppings[j] === meats[k]) {
        this.toppingsPrice.push(2);
        price += 2;
      }
    }
    for(var x = 0; x < otherToppings.length; x++) {
      if(this.toppings[j] === otherToppings[x]) {
        this.toppingsPrice.push(1);
        price += 1;
      }
    }
  }
  this.tax = price*0.08;
  Math.round((100*this.tax)/100);
  price += this.tax;
  return price;
}

$(function() {
  $('form#pizza').submit(function(event) {
    var size = $('select#size').val();
    var toppings = [];
    $.each($('input[name="topping"]:checked'), function() {
      toppings.push($(this).val());
    });
    var newPizza = new Pizza(size, toppings);
    var totalPrice = newPizza.calculatePrice();

    $('.orderSize').text(size);
    for(var i = 0; i < toppings.length; i++) {
      if(i === toppings.length-1) {
        $('.orderToppings').append(toppings[i]);
        $('#toppingsPrice').append('<p>'+toppings[i]+': $'+newPizza.toppingsPrice[i].toString()+'</p>');
      } else {
        $('.orderToppings').append(toppings[i] + ', ');
        $('#toppingsPrice').append('<p>'+toppings[i]+': $'+newPizza.toppingsPrice[i].toString()+'</p>');
      }
    }
    $('.sizePrice').text(newPizza.sizePrice.toString());
    $('.tax').text(newPizza.tax.toString());
    $('.totalPrice').text(totalPrice.toString());
    $('#orderConfirm').show();

    event.preventDefault();
  });
});
