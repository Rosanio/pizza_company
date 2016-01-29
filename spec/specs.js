describe('Pizza', function() {
  it('will create a new pizza object constructor with properties for size and toppings', function() {
    var testPizza = new Pizza('small',['pepperoni']);
    expect(testPizza.size).to.equal('small');
  })
})
