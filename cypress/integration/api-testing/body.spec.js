describe('Testing body', function () {

    it('test response body & status code',
        function () {
            cy.request('employees/1')
                .its('body')
                .its('first_name')
                .should('be.equal', 'Cristiano')
    });

    it.only('test response body & status code',
        function () {
            cy.request('employees/1')
                .then( response => {
                    expect(response.status).to.be.equal(200)
                    expect(response.headers['content-type']).to.be.equal('application/json; charset=utf-8')
                    expect(response.body.first_name).to.be.equal('Cristiano')
                    expect(response.body.last_name).to.be.equal('Ronaldo')
                })
    });
});