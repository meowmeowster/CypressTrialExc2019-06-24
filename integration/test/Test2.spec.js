"use strict";
/// <reference types="Cypress" />

context('Trial Assignment - Test 2', () => {
	beforeEach( function() {
		cy.fixture('login').as('profile')
		cy.fixture('discuss').as('discuss')

		cy.clearCookies()

        cy.visit('http://discuss.flarum.org')
	})

	it('Post a reply', function() {

        LogIn(this.profile.login, this.profile.password)

        OpenSandbox()

        OpenDiscussion(this.discuss.title)

        PostReply(this.discuss.title, this.discuss.description)

        CorrectReload()

        VerifyMessage(this.discuss.description)

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

    function OpenSandbox() {
        cy.get('.TagLinkButton.hasIcon')
            .contains('Test Posting')
            .click()
    }

    function OpenDiscussion(title) {
        cy.get('.DiscussionListItem-title')
            .contains(title)
            .first().click() // it's possible to create some similar topics
                             // so we use first one matching our conditions
    }

    function PostReply(title, descr) {
        cy.get('.SplitDropdown-button.Button.Button--primary.hasIcon') // this button is available every time
            .click()

        cy.get('.FormControl.Composer-flexible')
            .type(descr)

        cy.get('.Button.Button--primary.hasIcon')
            .contains('Post Reply')
            .click()
    }

    function CorrectReload() {
        cy.wait(500)
        cy.reload()
        cy.wait(500)
    }

    function VerifyMessage(descr) {
        cy.get('.Post-body')
            .contains(descr)
    }

})


