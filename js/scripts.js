function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.calculatePrice = function() {
  var sizes = ['small','medium','large','xtra-large'];
  var meats = ['pepperoni','bacon','sausage','chicken','beef','anchovies'];
  var otherToppings = ['peppers','onions','mushrooms','jalapenos','pineapple','tomatos','olives'];
  var price = 8;
  for(var i = 0; i < sizes.length; i++) {
    if(this.size === sizes[i]) {
      price += (2*i);
    }
  }
  for(var j = 0; j < this.toppings.length; j++) {
    for(var k = 0; k < meats.length; k++) {
      if(this.toppings[j] === meats[k]) {
        price += 2;
      }
    }
    for(var x = 0; x < otherToppings.length; x++) {
      if(this.toppings[j] === otherToppings[x]) {
        price += 1;
      }
    }
  }
  price += (price*0.08);
  Math.round((100*price)/100);
  console.log(price);
  return price;
}
