"use strict";
/// <reference types="Cypress" />

context('Trial Assignment - Test 1', () => {
	beforeEach( function() {
		cy.fixture('login').as('profile')
		cy.fixture('bio').as('bio')

		cy.clearCookies()

        cy.visit('http://discuss.flarum.org')
	})

	it('Change user profile', function() {

	    LogIn(this.profile.login, this.profile.password)

        OpenProfile()

        ChangeInfo(this.bio.description)

        LogOut()

	    LogIn(this.profile.login, this.profile.password)

        OpenProfile()

        VerifyInfo(this.bio.description)
    })


    function LogIn(log, pass) {
        cy.get('.item-logIn')
            .click() // opening login window

        cy.get('input[name=identification]')
            .type(log)
            .should('have.value', log)

        cy.get('input[name=password]')
            .type(pass)
            .should('have.value', pass)

        cy.get('.Button.Button--primary.Button--block')
            .click()

        cy.get('.username')
            .should('contain', log) // verifying we're logged in
    }

    function OpenProfile() {
        cy.get('.SessionDropdown')
            .click() // opening menu
        cy.get('.Dropdown-menu')
            .contains("Profile")
            .click() // clicking on profile
    }

    function LogOut() {
        cy.get('.SessionDropdown')
            .click() // opening menu
        cy.get('.Dropdown-menu')
            .contains("Log Out")
            .click() // clicking on log out
    }


    function ChangeInfo(descr) {
        cy.get('.UserBio-content')
            .click() // activating form

        cy.wait(500)
        cy.get('textarea.FormControl')
           .clear() // removing previous info
           .type(descr, { delay: 100 })

        cy.get('.UserCard-identity')
            .click() // deactivating form and saving changes
        cy.wait(500)

    }


    function VerifyInfo(descr) {
        cy.get('.item-bio')
            .contains(descr)
    }

})
