beforeEach(() => {
    cy.login('/signin')
})

describe('My account page data saving test', () => {
    it('Should open the settings page, enter the data, hit Save, navigate to some other page, come back and verify if the data is still there', () => {

        cy.visit('/user/settings')
        cy.get('[data-test="user-settings-firstName-input"]').clear().type('Government')
        cy.get('[data-test="user-settings-lastName-input"]').clear().type('Man')
        cy.get('[data-test="user-settings-email-input"]').type('black@mesa.org')
        cy.get('[data-test="user-settings-phoneNumber-input"]').type('13371337')

        cy.get('[data-test="user-settings-submit"]').should('be.enabled').click()

        cy.visit('/notifications')

        cy.visit('/user/settings')

        cy.get('[data-test="user-settings-firstName-input"]').should('have.value', 'Government')
        cy.get('[data-test="user-settings-lastName-input"]').should('have.value', 'Man')
        cy.get('[data-test="user-settings-email-input"]').should('have.value', 'black@mesa.org')
        cy.get('[data-test="user-settings-phoneNumber-input"]').should('have.value', '13371337')
    })
})