beforeEach(() => {
    cy.login('/signin')
})
describe('After submitting a transaction, navigate to the /personal page to verify if the transaction is present', () => {
    it('Open the personal transactions page, checks for existing transactions', () => {

        cy.visit('/personal')
        cy.get('[data-test="transaction-list"]').should('contain', 'Government Man')
        cy.get('[data-test="transaction-list"]').should('contain', 'requested')
        cy.get('[data-test="transaction-list"]').should('contain', 'Darrel Ortiz')
        cy.get('[data-test="transaction-list"]').should('contain', '500')
    })
})
