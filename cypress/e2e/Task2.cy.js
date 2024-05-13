beforeEach(() => {
    cy.visit('/signin');
})
describe('Login page', () => {
    it('Should display form field errors', () => {
        cy.get('[data-test="signin-username"]').type('Username').find('input').clear().focus().blur()
        cy.get('#username-helper-text').should('be.visible').and('contain', 'Username is required');

        cy.get('[data-test="signin-password"]').type('password').find('input').clear().blur()
        cy.get('[data-test="signin-submit"]').should("be.disabled")

        cy.get('[data-test="signin-username"]').type('Username')
        cy.get('[data-test="signin-password"]').type('pas').and('contain', 'Password must contain at least 4 characters')
    })

    it('Username password mismatch error', () => {
        cy.get('[data-test="signin-username"]').find('input').type(Cypress.env('username'))
        cy.get('[data-test="signin-password"]').type('password')

        cy.intercept('POST', 'http://localhost:3001/login').as('attemptlogin');

        cy.get('[data-test="signin-submit"]').should("be.enabled").click()

        cy.wait('@attemptlogin').then(intercept => {
            expect(intercept.response.statusCode).to.equal(401);
        })

        cy.get('[data-test="signin-error"]').should('contain', 'Username or password is invalid')

    })
    it('Successful login attempt and mandatory onboarding', () => {
        cy.get('[data-test="signin-username"]').find('input').type(Cypress.env('username'))
        cy.get('[data-test="signin-password"]').type(Cypress.env('password'))
        cy.intercept('POST', 'http://localhost:3001/login').as('attemptlogin');
        cy.get('[data-test="signin-submit"]').should("be.enabled").click()

        cy.wait('@attemptlogin').then(intercept => {
            expect(intercept.response.statusCode).to.equal(200);
        })
        cy.get('[data-test="user-onboarding-dialog-title"]').should('exist')
        cy.get('[data-test="user-onboarding-next"]').click()
        cy.get('[data-test="bankaccount-bankName-input"]').type("BankmanFried")
        cy.get('[data-test="bankaccount-routingNumber-input"]').type("123456789")
        cy.get('[data-test="bankaccount-accountNumber-input"]').type("123456789")
        cy.get('[data-test="bankaccount-submit"]').click()
        cy.get('[data-test="user-onboarding-next"]').click()
    })
})