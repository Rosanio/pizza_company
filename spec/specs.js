describe('Pizza', function() {
  it('will create a new pizza object constructor with properties for size and toppings', function() {
    var testPizza = new Pizza('small',['pepperoni']);
    expect(testPizza.toppings).to.eql(['pepperoni']);
  });
  it('will return a price based on size and toppings chosen', function() {
    var testPizza = new Pizza('medium',['pineapple','bacon']);
    expect(testPizza.calculatePrice()).to.equal(14.04);
  });
})
