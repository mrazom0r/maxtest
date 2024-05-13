beforeEach(() => {
    cy.login('/signin')
})
describe('Create a new Transaction for an arbitrary user, validate the payment amount part of the form, and complete the Transaction.', () => {
    it('navigates to the transactions page and selects the user', () => {
        cy.get('[data-test="nav-top-new-transaction"]').click()
        cy.get('[data-test="user-list-item-_XblMqbuoP"]').click()
        cy.get('[data-test="transaction-create-description-input"]').click()
        cy.get('#transaction-create-amount-input-helper-text').should('be.visible').and('contain', 'Please enter a valid amount')
    })
    it('validates the payment field of the form and submits it', () => {
        cy.get('[data-test="nav-top-new-transaction"]').click()
        cy.get('[data-test="user-list-item-_XblMqbuoP"]').click()
        cy.get('[data-test="transaction-create-amount-input"]').as('textInput')
        cy.get('@textInput').invoke('val').as('initialValue')
        cy.get('@textInput').type('Absolutely random stuff!')
        cy.get('@textInput').invoke('val').as('newValue')

        cy.get('@initialValue').then(initialValue => {
            cy.get('@newValue').then(newValue => {
                expect(newValue).to.eq(initialValue)
            })
        })
        cy.get('[data-test="transaction-create-amount-input"]').find('input').type('500')
        cy.get('[data-test="transaction-create-description-input"]').type('On a side note...')
        cy.get('[data-test="transaction-create-submit-request"]').click()
        cy.get('[data-test="new-transaction-return-to-transactions"]').should('be.visible')
    })
})
