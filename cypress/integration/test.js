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