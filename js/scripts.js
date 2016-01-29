function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.sizePrice;
  this.toppingsPrice = [];
  this.tax;
}

Pizza.prototype.calculatePrice = function() {
  var sizes = ['Small','Medium','Large','Xtra-Large'];
  var meats = ['Pepperoni','Bacon','Sausage','Chicken','Beef','Anchovies'];
  var otherToppings = ['Peppers','Onions','Mushrooms','Jalapenos','Pineapple','Tomatoes','Olives'];
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
  console.log(this.tax);
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

    $('#toppingsPrice').empty();
    $('.orderToppings').empty();
    $('.orderSize').text(size);
    for(var i = 0; i < toppings.length; i++) {
      if(i === toppings.length-1) {
        $('.orderToppings').append(toppings[i]);
        $('#toppingsPrice').append('<p>'+toppings[i]+': $'+parseFloat(Math.round(newPizza.toppingsPrice[i]*100)/100).toFixed(2)+'</p>');
      } else {
        $('.orderToppings').append(toppings[i] + ', ');
        $('#toppingsPrice').append('<p>'+toppings[i]+': $'+parseFloat(Math.round(newPizza.toppingsPrice[i]*100)/100).toFixed(2)+'</p>');
      }
    }
    $('.sizePrice').text(parseFloat(Math.round(newPizza.sizePrice*100)/100).toFixed(2));
    $('.tax').text(parseFloat(Math.round(newPizza.tax*100)/100).toFixed(2));
    $('.totalPrice').text(parseFloat(Math.round(totalPrice*100)/100).toFixed(2));
    $('#orderConfirm').show();

    event.preventDefault();
  });
});
