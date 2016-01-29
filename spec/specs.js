describe('Pizza', function() {
  it('will create a new pizza object constructor with properties for size and toppings', function() {
    var testPizza = new Pizza('Small',['Pepperoni']);
    expect(testPizza.toppings).to.eql(['Pepperoni']);
  });
  it('will return a price based on size and toppings chosen', function() {
    var testPizza = new Pizza('Medium',['Pineapple','Bacon']);
    expect(testPizza.calculatePrice()).to.equal(14.04);
  });
})
