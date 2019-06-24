"use strict";
/// <reference types="Cypress" />

context('Trial Assignment - Test 2: Post a reply', () => {
	beforeEach(() => {
		cy.fixture('login').as('profile')
		cy.fixture('discuss').as('discuss')
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
        //cy.get('form').submit()
            //.type('{enter}')

        cy.get('.username').should('contain', this.profile.login)

    })

	it('3. Open discuss.flarum.org/t/sandbox', () => {
       cy.get('.TagLinkButton.hasIcon').contains('Test Posting').click()
    })

	it('4. Open a discussion with a certain title (should be configurable)', function(){
        cy.get('.DiscussionListItem-title')
            .should('contain',this.discuss.title)
            .first().click()

    })

	it('5. Reply)', function(){
        cy.get('.ReplyPlaceholder').should('contain','Write a Reply...')
            .click()
        cy.get('.FormControl.Composer-flexible')
            .type(this.discuss.description)
        cy.get('.Button.Button--primary.hasIcon').contains('Post Reply')
            .click()
    })

    it('6. Refresh page)', () => {
         cy.reload()
    })

   	it('7. Verify the reply is displayed', function(){
        cy.get('.Post-body').contains(this.discuss.description)
    })

})
