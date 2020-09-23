const { createYield } = require("typescript")

describe('My First Test', () => {
    it('Does not do much!', () => {
      expect(true).to.equal(true)
    })
})

describe('Visit the home page', () => {
    it('Visit the home page!', () => {
      cy.visit("http://localhost:4200/home")
    })
})

describe('Login', () => {
  it('Visit the Login page', () => {
      cy.visit('http://localhost:4200/login')
      cy.get('input[id=username]')
          .type('davidecarizzoni')
      cy.get('input[id=password]')
          .type('1234')

      cy.get('button[id=button]')
          .click()

      cy.url('/home')
      cy.url().should('include', '/home')
  })
})