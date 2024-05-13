beforeEach(() => {
    cy.login('/signin')
})
describe('GraphQL API test', () => {
    it('Create API test for url http://localhost:3001/graphql (graphql network call made when loading /bankaccounts and validate the response by checking available bank account information, and compare them with data from task 4.', () => {

        cy.request({
            method: 'POST',
            url: 'http://localhost:3001/graphql',
            body: {
                operationName: 'listBankAccount',
                query: `
            query listBankAccount {
                listBankAccount {
                    id
                    bankName
                    accountNumber
                    routingNumber
              }
            }
          `,
            },
        })
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('data');
                console.log(response.body);
                expect(response.body).to.exist;
                expect(response.body.data.listBankAccount[1].bankName).to.contain('Bankina')
                expect(response.body.data.listBankAccount[1].accountNumber).to.contain('BETWEEN9N12')
                expect(response.body.data.listBankAccount[1].routingNumber).to.contain('NINE99999')
            })
    })
})
