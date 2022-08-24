describe('Testing status', function () {

    it('should send request to api and return a 200 status code',
        function () {
            cy.request('employees').its('status').should('eq', 200)
    });

    it.only('should send request to unexistent page and return 404 status code',
        function () {
            cy.request({url:'employe', failOnStatusCode: false}).its('status').should('eq', 404)
    })
});