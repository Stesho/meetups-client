const TEST_NAME = 'Test Name';
const TEST_SPEAKER = 'Test Speaker';
const TEST_TEXT = 'Test some text';

const insertDataOnRequiredForm = () => {
  cy.get('input').eq(0).type(TEST_NAME);
  cy.get('input').eq(1).type(TEST_SPEAKER);
  cy.get('textarea').type(TEST_TEXT);
}

const authorizeAsChief = () => {
  cy.visit('/authorize');
  cy.get('input[type=text]').type('chief');
  cy.get('input[type=password]').type('private');
  
  cy.get('#singInBtn').click();
}

const resetdb = async () => {
  await fetch('http://localhost:3000/api/resetdb');
}

describe('meetup creating', () => {
  beforeEach(() => {
    cy.visit('/meetups/create');
  });

  it('should render create meetup page', () => {
    cy.get('#createMeetupPage').should('exist');
  });

  it('should disable the button if not all fields are filled in', () => {
    cy.get('#submitBtn').should('be.disabled');
    cy.get('input').eq(0).type(TEST_NAME);

    cy.get('#submitBtn').should('be.disabled');
    cy.get('input').eq(1).type(TEST_SPEAKER);

    cy.get('#submitBtn').should('be.disabled');
    cy.get('textarea').type(TEST_TEXT);

    cy.get('#submitBtn').should('not.be.disabled');
  });

  it('should save required data after cancel additional form', () => {
    insertDataOnRequiredForm();
    
    cy.get('#submitBtn').click();
    cy.get('#cancelBtn').click();

    cy.get('input').eq(0).should('have.value', TEST_NAME);
    cy.get('input').eq(1).should('have.value', TEST_SPEAKER);
    cy.get('textarea').should('have.value', TEST_TEXT);
  });

  it('should display error message if the input is invalid', () => {
    cy.get('input').eq(0).focus();
    cy.get('input').eq(1).focus();

    cy.contains('Поле не может быть пустым').should('exist');
  });

  it('should display error message if the date is invalid', () => {
    insertDataOnRequiredForm();

    cy.get('#submitBtn').click();

    cy.get('input[type=text]').eq(0).type('ivalid date value');
    cy.get('input[type=text]').eq(1).focus();
    
    cy.contains('Неверный формат даты').should('exist');
  });

  it('should display error message if finish date earlier than start date', () => {
    insertDataOnRequiredForm();

    cy.get('#submitBtn').click();

    cy.get('input[type=text]').eq(0).type('15 Марта 2023 15:00');
    cy.get('input[type=text]').eq(1).type('14 Марта 2023 15:00');
    
    cy.contains('Дата начала не может быть позже даты окончания').should('exist');
  });

  it('should create new meetup with passed data', () => {
    resetdb();
    authorizeAsChief();    

    cy.visit('/meetups/create');

    insertDataOnRequiredForm();

    cy.get('#submitBtn').click();

    cy.get('input[type=text]').eq(0).type('14 Марта 2023 15:00');
    cy.get('input[type=text]').eq(1).type('14 Марта 2023 16:00');
    cy.get('input[type=text]').eq(2).type('City, Street Name');
    cy.get('input[type=file]').selectFile('cypress/fixtures/images/test-img.jpg', {force: true});

    cy.get('#submitBtn').click();

    cy.contains('Test Name').should('exist');
  });
});

export {}; // to prevent lint error