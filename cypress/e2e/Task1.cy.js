let data;

beforeEach(() => {
    cy.visit('/signup');
    cy.fixture('userdata.json').then((userdatas) => {
        data = userdatas;
    })
})

describe('Signup page', () => {
    it('should open the signup page', () => {
        cy.get('[data-test="signup-title"]').should('contain', 'Sign Up')
    })
    it('should display form field errors and the sign up button should be disabled', () => {
        // Enters data into the first name field, then deletes it to verify if the empty field error comes up
        cy.get('[data-test="signup-first-name"]').type('First').find('input').clear().blur()
        cy.get('#firstName-helper-text').should('be.visible').and('contain', 'First Name is required');

        cy.get('[data-test="signup-last-name"]').type('Third').find('input').clear().blur()
        cy.get("#lastName-helper-text").should('be.visible').and('contain', 'Last Name is required')

        cy.get('[data-test="signup-username"]').type('User').find('input').clear().blur()
        cy.get('#username-helper-text').should('be.visible').and('contain', 'Username is required')

        cy.get('[data-test="signup-password"]').type('password').find('input').clear().blur()
        cy.get('#password-helper-text').should('be.visible').and('contain', 'Enter your password')

        cy.get('[data-test="signup-password"]').type('pas').find('input').blur()
        cy.get('#password-helper-text').should('be.visible').and('contain', 'Password must contain at least 4 characters')

        cy.get('[data-test="signup-confirmPassword"]').type('DIFFERENT PASSWORD').find('input').blur()
        cy.get('#confirmPassword-helper-text')
            .should('be.visible')
            .and('contain', 'Password does not match')

        cy.get('[data-test="signup-submit"]').should("be.disabled")
    })

    it('Fills out the fields and creates an account', () => {
        cy.get('[data-test="signup-first-name"]').type(data.userData.firstName)

        cy.get('[data-test="signup-last-name"]').type(data.userData.lastName)

        cy.get('[data-test="signup-username"]').type(Cypress.env('username'))

        cy.get('[data-test="signup-password"]').type(Cypress.env('password'))

        cy.get('[data-test="signup-confirmPassword"]').type(Cypress.env('password'))

        cy.intercept('POST', 'http://localhost:3001/users').as('createAccount');

        cy.get('[data-test="signup-submit"]').should("be.enabled").click()

        cy.wait('@createAccount').then(intercept => {
            expect(intercept.response.statusCode).to.equal(201);
        })
    })
})