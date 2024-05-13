beforeEach(() => {
    cy.login('/signin')
})
describe('Make multiple transactions, and validate the Amount filter on the /personal page', () => {
    it('Create multiple transactions and verify they are coming up on the personal page', () => {
        cy.visit('/personal')
        //Creating a few transactions, ugly but it works
        cy.get('[data-test="nav-top-new-transaction"]').click()
        cy.get('[data-test="user-list-item-_XblMqbuoP"]').click()
        cy.get('[data-test="transaction-create-amount-input"]').find('input').type('400')
        cy.get('[data-test="transaction-create-description-input"]').type('On a side note...')
        cy.get('[data-test="transaction-create-submit-request"]').should('be.visible')
        cy.get('[data-test="transaction-create-submit-request"]').click()
        cy.get('[data-test="new-transaction-create-another-transaction"]').click()
        cy.get('[data-test="user-list-item-_XblMqbuoP"]').click()
        cy.get('[data-test="transaction-create-amount-input"]').find('input').type('200')
        cy.get('[data-test="transaction-create-description-input"]').type('On a side note...')
        cy.get('[data-test="transaction-create-submit-request"]').should('be.visible')
        cy.get('[data-test="transaction-create-submit-request"]').click()
        cy.get('[data-test="new-transaction-create-another-transaction"]').click()
        cy.get('[data-test="user-list-item-_XblMqbuoP"]').click()
        cy.get('[data-test="transaction-create-amount-input"]').find('input').type('800')
        cy.get('[data-test="transaction-create-description-input"]').type('On a side note...')
        cy.get('[data-test="transaction-create-submit-request"]').should('be.visible')
        cy.get('[data-test="transaction-create-submit-request"]').click()
        //Return to transactions now
        cy.visit('/personal')
        //Was attempting to get the transaction amount filter to work by passing a network request, no bueno
        cy.request('GET', 'http://localhost:3001/transactions/public')
    })
})