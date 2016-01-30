function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
  this.sizePrice;
  this.toppingsPrice = [];
  this.tax;
  this.tip;
  this.totalPrice;
}

function Order() {
  this.pizzas = [];
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
  price += this.tax;
  if(!isNaN(this.tip)) {
    price += this.tip;
  }
  this.totalPrice = price;
  return price;
}

function createNewPizza() {
  $('#new-pizza').append('<div class="new-pizza">' +
                            '<div class="form-group">' +
                              '<label for="size">Select a Size</label>' +
                              '<select id="size">' +
                                '<option value="Small">Small</option>' +
                                '<option value="Medium">Medium</option>' +
                                '<option value="Large">Large</option>' +
                                '<option value="Xtra-Large">Xtra-Lagre</option>' +
                              '</select>' +
                            '</div>' +
                            '<div class="form-group">' +
                              '<label>Select your Toppings</label>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Pepperoni' name='topping'>Pepperoni" +                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Bacon' name='topping'>Bacon" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Sausage' name='topping'>Sausage" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Chicken' name='topping'>Chicken" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Beef' name='topping'>Beef" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Anchovies' name='topping'>Anchovies" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Peppers' name='topping'>Peppers" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Onions' name='topping'>Onions" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Mushrooms' name='topping'>Mushrooms" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Jalapenos' name='topping'>Jalapenos" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Pineapple' name='topping'>Pineapple" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Tomatoes' name='topping'>Tomatoes" +
                                '</label>' +
                              '</div>' +
                              '<div class="checkbox">' +
                                '<label>' +
                                  "<input type='checkbox' value='Olives' name='topping'>Olives" +
                                '</label>' +
                              '</div>' +
                            '</div>' +
                          '</div>')
}

$(function() {
  var firstPizza = new Pizza('Small', []);
  firstPizza.calculatePrice();
  $('#addPizza').click(function() {
    createNewPizza();
  });
  var currentSizePrice = 8;
  var currentToppingPrice = 0;
  var currentTip = 0;
  var currentPriceDisplay = parseFloat(Math.round((currentSizePrice+currentToppingPrice)*100)/100).toFixed(2);
  $('.currentTotal').text(currentPriceDisplay);

  $('.sizeTarget').change(function() {
    $('input[name="tip"]:checked', '#tip').each(function() {
      $(this).prop('checked', false);
    });
    firstPizza.tip = 0;
    currentTip = 0;
    var size = $('.sizeTarget option:selected').val();
    firstPizza.size = size;
    firstPizza.calculatePrice();
    currentSizePrice = firstPizza.sizePrice;
    console.log(currentToppingPrice);
    currentPriceDisplay = parseFloat(Math.round((currentSizePrice+currentToppingPrice+currentTip)*100)/100).toFixed(2);
    $('.currentTotal').text(currentPriceDisplay);
  });

  $('.toppingTarget').change(function() {
    $('input[name="tip"]:checked', '#tip').each(function() {
      $(this).prop('checked', false);
    });
    firstPizza.tip = 0;
    currentTip = 0;
    var tempToppingPrice = 0;
    firstPizza.toppings = [];
    firstPizza.toppingsPrice = [];
    $('.meat').each(function() {
      if($(this).is(":checked")) {
        firstPizza.toppings.push($(this).val());
      }
    });
    $('.other').each(function() {
      if($(this).is(":checked")) {
        firstPizza.toppings.push($(this).val());
      }
    });
    firstPizza.calculatePrice();
    for(var i = 0; i < firstPizza.toppingsPrice.length; i++) {
      tempToppingPrice += firstPizza.toppingsPrice[i];
    }
    currentToppingPrice = tempToppingPrice;
    currentPriceDisplay = parseFloat(Math.round((currentSizePrice+currentToppingPrice+currentTip)*100)/100).toFixed(2);
    $('.currentTotal').text(currentPriceDisplay);
    console.log(currentToppingPrice);
  });

  $('.tip').change(function() {
    firstPizza.tip = 0;
    firstPizza.calculatePrice();
    var tipVal = parseInt($('input[name="tip"]:checked', '#tip').val());
    firstPizza.tip = firstPizza.totalPrice * (tipVal/100);
    firstPizza.calculatePrice();
    currentTip = firstPizza.tip;
    currentPriceDisplay = parseFloat(Math.round((currentSizePrice+currentToppingPrice+currentTip)*100)/100).toFixed(2);
    $('.currentTotal').text(currentPriceDisplay);
  });

  $('form#pizza').submit(function(event) {
    newOrder = new Order();
    newOrder.pizzas.push(firstPizza);
    $('.new-pizza').each(function() {
      var size = $(this).find('select#size').val();
      var toppings = [];
      $(this).find('input[name="topping"]:checked').each(function() {
        toppings.push($(this).val());
      });
      var newPizza = new Pizza(size, toppings);
      newPizza.calculatePrice();
      newOrder.pizzas.push(newPizza);
    });
    // var size = $('select#size').val();
    // var toppings = [];
    // $.each($('input[name="topping"]:checked'), function() {
    //   toppings.push($(this).val());
    // });
    // var newPizza = new Pizza(size, toppings);
    // var totalPrice = newPizza.calculatePrice();
    $('#toppingsPrice').empty();
    $('.orderToppings').empty();
    if(newOrder.pizzas.length === 1) {
      $('#multiplePizzas').empty();
      $('.orderSize').text(newOrder.pizzas[0].size);
      for(var i = 0; i < newOrder.pizzas[0].toppings.length; i++) {
        if(i === newOrder.pizzas[0].toppings.length-1) {
          $('.orderToppings').append(newOrder.pizzas[0].toppings[i]);
          $('#toppingsPrice').append('<p>'+newOrder.pizzas[0].toppings[i]+': $'+parseFloat(Math.round(newOrder.pizzas[0].toppingsPrice[i]*100)/100).toFixed(2)+'</p>');
        } else {
          $('.orderToppings').append(newOrder.pizzas[0].toppings[i] + ', ');
          $('#toppingsPrice').append('<p>'+newOrder.pizzas[0].toppings[i]+': $'+parseFloat(Math.round(newOrder.pizzas[0].toppingsPrice[i]*100)/100).toFixed(2)+'</p>');
        }
      }
      $('.sizePrice').text(parseFloat(Math.round(newOrder.pizzas[0].sizePrice*100)/100).toFixed(2));
      $('.tax').text(parseFloat(Math.round(newOrder.pizzas[0].tax*100)/100).toFixed(2));
      $('.tipOutput').text(parseFloat(Math.round(newOrder.pizzas[0].tip*100)/100).toFixed(2));
      $('.totalPrice').text(parseFloat(Math.round(newOrder.pizzas[0].totalPrice*100)/100).toFixed(2));
      $('#orderConfirm').show();
      $('#onePizza').show();
    } else {
      $('#onePizza').hide();
      $('#multiplePizzas').empty();
      var orderTotal = 0;
      for(var j = 0; j < newOrder.pizzas.length; j++) {
        $('#multiplePizzas').append('<p><span class="linkSpan">Pizza ' + (j+1) + '</span>: $' + parseFloat(Math.round(newOrder.pizzas[j].totalPrice*100)/100).toFixed(2));
        orderTotal += newOrder.pizzas[j].totalPrice;
        $('#multiplePizzas').append('<div class="pizzaInfo"></div>')
      }
      $('#multiplePizzas').append('<p>Total: $' + parseFloat(Math.round(orderTotal*100)/100).toFixed(2));
      $('#orderConfirm').show();
    }

    event.preventDefault();

    // $('.linkSpan').last().click(function() {
    //   $('.pizzaInfo').append('<p>')
    // });
  });
});
