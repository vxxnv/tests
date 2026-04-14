describe('Testing nalog.gov.ru', () => {

    beforeEach(() => {
      cy.visit('https://www.nalog.gov.ru'); 
    });
  
    it('Verify the availability of the main page', () => {
      cy.contains('Федеральная налоговая служба').should('be.visible');
    });
  
    it('Verify search functionality', () => {
      cy.get('#query').type('налоговый вычет{enter}'); 
      cy.url().should('include', '/rn77/search');
      cy.get('.search-results').should('be.visible');
      cy.get('.search-results__item').should('have.length.greaterThan', 0);
    });
  
    it('Verify "Уплата налогов"', () => {
      cy.contains('Уплата налогов и пошлин').click(); 
      cy.url().should('include', '/плата/');
      cy.contains('Уплата налогов физических лиц').should('be.visible'); 
    });
  
    it('Verify responsiveness (check on a small screen)', () => {
      cy.viewport('iphone-6');
      cy.get('.header__burger').should('be.visible');
    });
  
    it('Verify "Личный кабинет налогоплательщика для физических лиц"', () => {
      cy.contains('Личный кабинет налогоплательщика для физических лиц').should('be.visible');
      cy.get('a[href*="lkfl.nalog.ru"]').should('exist');
    });
  
    it('Verify "Новости" ', () => {
      cy.contains('Новости').should('be.visible'); 
      cy.get('.news-feed__item').should('have.length.greaterThan', 0);
  
      cy.get('.news-feed__item a').first().then(($link) => {
        const href = $link.prop('href');
        cy.request(href).then((response) => {
          expect(response.status).to.eq(200); 
        });
      });
    });
  
    it('Verify"Сервисы и госуслуги" ', () => {
      cy.contains('Сервисы и госуслуги').should('be.visible');
      cy.get('.service-list__item').should('have.length.greaterThan', 0);
    });
  
    it('Verify', () => {
      cy.contains('Информация о ставках и льготах по имущественным налогам').should('be.visible'); 
    });
  
    it('Verify "Контакты" page', () => {
      cy.contains('Контакты').click(); 
      cy.url().should('include', '/cnt/');
      cy.contains('Контакты инспекций').should('be.visible'); 
    });
  
    it('Verify "Подать обращение в ФНС России"', () => { 
      cy.visit('/');
      cy.contains('Подать обращение в ФНС России').should('be.visible');
    
    });
  
    it('Verify the display of the FTS logo', () => { 
      cy.get('.header__logo img').should('be.visible').and('have.attr', 'alt', 'Логотип ФНС России');
    });
  });