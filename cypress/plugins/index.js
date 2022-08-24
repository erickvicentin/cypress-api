/// <reference types="cypress" />
// ***********************************************************
const mysql = require('mysql')
// This example plugins/index.js can be used to load plugins
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
function queryTestDB(query, config) {
    const connection = mysql.createConnection(config.env.db)
    connection.connect()

    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if(error){
                reject(error)
            } else {
                connection.end()
                return resolve(results)
            }
        })
    })
}
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    on('task', {
        queryDB: (query) => {
            return queryTestDB(query, config)
        }
    })
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
