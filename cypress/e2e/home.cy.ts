describe('Home Screen', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="password-input"]').type('haslo');
    cy.get('[data-testid="login-button"]').click();
  });

  it('should search for movies', () => {
    // Intercept OMDb API
    cy.intercept('GET', '**/www.omdbapi.com/*', {
      statusCode: 200,
      body: {
        Search: [
          {
            Title: 'Cypress Movie',
            Year: '2024',
            imdbID: 'tt9999999',
            Type: 'movie',
            Poster: 'N/A',
          },
        ],
        totalResults: '1',
        Response: 'True',
      },
    }).as('searchMovies');

    // Type search query
    cy.get('input[placeholder="Search for movies..."]').type('Cypress');

    // Wait for debounce and API call
    cy.wait('@searchMovies');

    // Verify movie card is displayed (using first() to handle potential duplicates in React Strict Mode)
    cy.get('[data-testid="movie-card-tt9999999"]').first().should('be.visible');
    cy.contains('Cypress Movie').should('be.visible');
  });
});
