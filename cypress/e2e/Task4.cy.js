beforeEach(() => {
    cy.login('/signin')
})

describe('Should navigate to the Bank Accounts page, validate the Add bank account form and confirm the account is created successfully', () => {
    it('Opens the bank account page', () => {
        cy.visit('/bankaccounts')
        cy.get('[data-test="bankaccount-delete"]').should('be.visible')
    })
    it('Opens the Add bank account form', () => {
        cy.visit('/bankaccounts')
        cy.get('[data-test="bankaccount-new"]').should('be.visible').click()

        cy.url().should('include', 'bankaccounts/new')
    })
    it('Verifies the form fields exist, data can be entered, correct responses show up and form can be submitted', () => {
        cy.visit('/bankaccounts/new')
        cy.get('[data-test="bankaccount-bankName-input"]').type('Test')
        cy.get('#bankaccount-bankName-input-helper-text').should('be.visible').and('contain', 'Must contain at least 5 characters');
        cy.get('[data-test="bankaccount-submit"]').should("be.disabled")

        cy.get('[data-test="bankaccount-bankName-input"]').find('input').clear().type('Bankina')

        cy.get('[data-test="bankaccount-routingNumber-input"]').type('Test')
        cy.get('#bankaccount-routingNumber-input-helper-text').should('be.visible').and('contain', 'Must contain a valid routing number')
        cy.get('[data-test="bankaccount-routingNumber-input"]').find('input').clear().blur()
        cy.get('#bankaccount-routingNumber-input-helper-text').should('be.visible').and('contain', 'Enter a valid bank routing number')
        cy.get('[data-test="bankaccount-routingNumber-input"]').find('input').type('NINE99999')

        cy.get('[data-test="bankaccount-accountNumber-input"]').type('ATLEAST')
        cy.get('#bankaccount-accountNumber-input-helper-text').should('be.visible').and('contain', 'Must contain at least 9 digits')

        cy.get('[data-test="bankaccount-accountNumber-input"]').type('ATLEAST9999999')
        cy.get('#bankaccount-accountNumber-input-helper-text').should('be.visible').and('contain', 'Must contain no more than 12 digits')
        cy.get('[data-test="bankaccount-accountNumber-input"]').find('input').clear().blur()
        cy.get('#bankaccount-accountNumber-input-helper-text').should('be.visible').and('contain', 'Enter a valid bank account number')

        cy.get('[data-test="bankaccount-accountNumber-input"]').type('BETWEEN9N12')

        cy.get('[data-test="bankaccount-submit"]').should("be.enabled").click()
    })

    it('Validates that the account has been created successfully', () => {
        cy.visit('/bankaccounts')
        cy.get('[data-test="bankaccount-delete"]').should('be.visible')
        cy.get('[data-test="bankaccount-list"]').should('contain', 'Bankina')
    })




})