describe('Probando los headers', function () {
    it('should validate headers & content-type', function () {
        cy.request('employees').its('headers').its('content-type').should('include', 'application/json')
    });
});