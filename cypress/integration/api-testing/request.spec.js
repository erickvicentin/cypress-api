describe('Probando requests', function () {
    it('should ', function () {
        cy.request({
            url: 'employees',
            method: 'POST',
            body: {
                first_name: 'Marcos',
                last_name: 'Blazquez',
                email: 'marquinhos@rinocu.com',
                city: 'Santiago de Chile',
                ip_address: '121.0.2.120'
            }
        }).then(response => {
            expect(response.status).to.be.equal(201)
            expect(response.body).to.have.property('id')

            const id = response.body.id
            cy.wrap(id).as('idEmpleado')
        })
    });

    it('modificar usuario creado en la BD', function () {
        cy.request({
            url: `employees/${this.idEmpleado}`,
            method: 'PUT',
            body: {
                first_name: 'Tomas',
                last_name: 'Solis',
                email: 'tomsolis.globant@gmail.com'
            }
        })
            .then(response => {
                expect(response.status).to.be.equal(200)
                expect(response.body).to.have.property('id')
            })
    })

    it('validar usuario creado en la BD', function () {
        cy.request('GET', 'employees')
            .then(response => {
                expect(response.body[response.body.length - 1].first_name).to.eq('Tomas')
            })
    })

    it('validar el borrado del user creado en la BD', function () {
        cy.request({
            url: `employees/${this.idEmpleado}`,
            method: 'DELETE'
        })
            .then(response => {
                expect(response.status).to.be.equal(200)
                expect(response.body).to.be.empty
            })
    })
});