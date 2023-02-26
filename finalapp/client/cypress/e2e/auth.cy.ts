describe('authorization page', () => {
  beforeEach(() => {
    cy.visit('/authorize');
  })

  it('should render authorization page', () => {
    cy.get('#authorizationPage').should('exist');
  });

  it('should disable the button if not all fields are filled in', () => {
    cy.get('#singInBtn').should('be.disabled');
    cy.get('input[type=text]').type('username');
    cy.get('#singInBtn').should('be.disabled');
    cy.get('input[type=password]').type('password');
    cy.get('#singInBtn').should('not.be.disabled');
  });

  it('should authorize the user if the data entered is correct', () => {
    cy.get('input[type=text]').type('employee');
    cy.get('input[type=password]').type('private');

    cy.get('#singInBtn').click();

    cy.url().should('include', '/meetups/topics');
    cy.contains('employee Gerlach');
  });
  
  it('should show error notification if the data entered is uncorrect', () => {
    cy.get('input[type=text]').type('invalid user');
    cy.get('input[type=password]').type('invalid password');

    cy.get('#singInBtn').click();

    cy.url().should('include', '/authorize');
    cy.get('#notification').should('exist');
  })
});

export {}; // to prevent lint error 