describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mateusz Dziuba',
      username: 'mati',
      password: 'lol123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.get('#login-button').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'mati', password: 'lol123' })
      cy.contains('Mateusz Dziuba logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mati')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mati', password: 'lol123' })
    })

    it('A blog can be created', function () {
      cy.createBlog({ title: 'Szosty gracz', url: 'szostygracz.pl', author: 'Maciej' })
      cy.contains('Szosty gracz Maciej')
    })

    describe('blog operations', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Szosty gracz', url: 'szostygracz.pl', author: 'Maciej' })
      })

      it('A blog can be liked', function () {
        cy.contains('Szosty gracz Maciej')
        cy.contains('view').click()
        cy.contains('likes 0').contains('like').click()
        cy.contains('likes 1')
      })
      it('A blog can be removed by creator', function () {
        cy.contains('Szosty gracz Maciej')
        cy.contains('view').click()
        cy.contains('Mateusz Dziuba')
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Szosty gracz Maciej')
      })

      it('A blog cannot be removed by other user', function () {
        cy.contains('Szosty gracz Maciej')
        cy.contains('view').click()
        cy.contains('Mateusz Dziuba')
        cy.contains('remove')
        cy.contains('logout').click()
        const newUser = {
          name: 'Superuser',
          username: 'root',
          password: 'toor'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', newUser)
        cy.visit('http://localhost:3000')
        cy.contains('view').click()
        cy.should('not.contain', 'remove')
      })
    })
    it('blogs should be ordered according to number of likes', function () {
      cy.createBlog({ title: 'Most likes', url: 'most.com', author: 'Mati' })
      cy.createBlog({ title: '2nd most likes', url: 'most.com', author: 'Mati' })
      cy.createBlog({ title: '3rd most likes', url: 'most.com', author: 'Mati' })
      cy.contains('2nd most likes').contains('view').click()
      cy.contains('2nd most likes').contains('like').click()
      cy.contains('2nd most likes').contains('like').click()
      cy.contains('3rd most likes').contains('view').click()
      cy.contains('3rd most likes').contains('like').click()
      cy.contains('3rd most likes').contains('like').click()
      cy.contains('3rd most likes').contains('like').click()
      cy.contains('Most likes').contains('view').click()
      cy.contains('Most likes').contains('like').click()
      cy.contains('Most likes').contains('like').click()
      cy.contains('Most likes').contains('like').click()
      cy.contains('Most likes').contains('like').click()
      cy.contains('Most likes').contains('like').click()
      cy.contains('Most likes').contains('like').click()
      cy.contains('2nd most likes').contains('like').click()
      cy.contains('2nd most likes').contains('like').click()
      cy.contains('2nd most likes').contains('like').click()
      cy.contains('2nd most likes').contains('like').click()
      cy.get('.blog').eq(0).should('contain', 'Most likes')
      cy.get('.blog').eq(1).should('contain', '2nd most likes')
      cy.get('.blog').eq(2).should('contain', '3rd most likes')
    })
  })
})
