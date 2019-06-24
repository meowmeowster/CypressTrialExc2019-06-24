"use strict";
/// <reference types="Cypress" />
context('Trial Assignment - Test 1: Change user profile', () => {
	beforeEach(() => {
		cy.fixture('login').as('profile')
		cy.fixture('bio').as('bio')
	})

	it('1. Open discuss.flarum.org', () => {
	    cy.clearCookies()
        cy.visit('http://discuss.flarum.org')
	})

	it('2. Login', function(){
	    cy.get('.item-logIn').click()
        cy.get('input[name=identification]')
            .type(this.profile.login).should('have.value', this.profile.login)
        cy.get('input[name=password]')
            .type(this.profile.password).should('have.value', this.profile.password)
        cy.get('.Button.Button--primary.Button--block').click()
        cy.get('.username').should('contain', this.profile.login)
    })

	it('3. Open user profile', () => {
        cy.get('.SessionDropdown').click()
        cy.get('.Dropdown-menu').contains("Profile").click()
    })

    it('4. Change information about yourself', function() {
         cy.get('.UserBio-content').click()
         cy.wait(500)
         cy.get('textarea.FormControl')
            .clear()
            .type(this.bio.description, { delay: 100 })
         cy.get('.UserCard-identity').click()
         cy.wait(500)
         cy.get('.item-bio').contains(this.bio.description)
    })

	it('5. Logout', () => {
        cy.get('.SessionDropdown').click()
        cy.get('.Dropdown-menu').contains("Log Out").click()
    })

	it('6. Login again', function(){
	    cy.get('.item-logIn').click()
        cy.get('input[name=identification]')
            .type(this.profile.login).should('have.value', this.profile.login)
        cy.get('input[name=password]')
            .type(this.profile.password).should('have.value', this.profile.password)
        cy.get('.Button.Button--primary.Button--block').click()
        cy.get('.username').should('contain', this.profile.login)
    })

   	it('7. Open user profile', () => {
        cy.get('.SessionDropdown').click()
        cy.get('.Dropdown-menu').contains("Profile").click()
    })

    it('8. Verify new information is displayed', function(){
        cy.get('.item-bio').contains(this.bio.description)
    })

})
