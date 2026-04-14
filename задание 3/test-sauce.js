describe('Sauce Demo Tests', () => {

    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.login('standard_user', 'secret_sauce'); 
    });
  
    afterEach(() => {
      cy.clearLocalStorage(); 
    });
  
    it('Successful Authorization', () => {
      cy.get('.product_sort_container').should('be.visible'); 
      cy.url().should('include', '/inventory.html'); 
    });
  
  
    it('Price Sorting (Ascending)', () => {
      cy.get('.product_sort_container').select('Price (low to high)');
  
      cy.get('.inventory_item').each(($el, index, $list) => {
        if (index > 0) {
          const currentPrice = parseFloat($el.find('.inventory_item_price').text().replace('$', ''));
          const previousPrice = parseFloat($($list[index - 1]).find('.inventory_item_price').text().replace('$', ''));
          expect(currentPrice).to.be.greaterThanOrEqual(previousPrice); 
        }
      });
    });
  
  
    it('Price Sorting (Descending)', () => {
      cy.get('.product_sort_container').select('Price (high to low)');
      cy.get('.inventory_item').each(($el, index, $list) => {
        if (index > 0) {
          const currentPrice = parseFloat($el.find('.inventory_item_price').text().replace('$', ''));
          const previousPrice = parseFloat($($list[index - 1]).find('.inventory_item_price').text().replace('$', ''));
          expect(currentPrice).to.be.lessThanOrEqual(previousPrice); 
        }
      });
    });
  
  
    it('Adding Two Items to Cart and Completing Order', () => {
      cy.addToCart(0);
      cy.addToCart(1);
  
      cy.get('.shopping_cart_link').click();
      cy.get('.cart_item').should('have.length', 2);
      cy.checkout();
      cy.contains('Your order has been submitted').should('be.visible');
  
      
      cy.get('#first-name').type('Test');
      cy.get('#last-name').type('User');
      cy.get('#postal-code').type('12345');
  
      cy.get('.checkout_button').should('not.be.disabled').click();
  
    });
  
  
  
    
    function login(username, password) {
      cy.get('#user-name').type(username);
      cy.get('#password').type(password);
      cy.get('#login-button').click();
    }
  
    function addToCart(itemIndex) {
      cy.get('.inventory_item').eq(itemIndex).find('button').click();
    }
  
    function checkout() {
      cy.get('.checkout_button').click();
      cy.get('#first-name').type('Test');
      cy.get('#last-name').type('User');
      cy.get('#postal-code').type('12345');
      cy.get('.checkout_button').click(); 
    }
  });