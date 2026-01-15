describe('Favorites Flow', () => {
  beforeEach(() => {
    // Seed localStorage with one favorite movie to test removal isolation
    const mockState = {
      state: {
        favorites: [
          {
            imdbID: 'tt9999999',
            Title: 'Seeded Movie',
            Year: '2024',
            Type: 'movie',
            Poster: 'N/A',
          },
        ],
      },
      version: 0,
    };

    // Visit page and inject storage
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('movie-storage', JSON.stringify(mockState));
      },
    });

    // Login (required as auth is not persisted)
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="password-input"]').type('haslo');
    cy.get('[data-testid="login-button"]').click();
  });

  it('should display and remove favorites', () => {
    // Wait for app to settle
    cy.wait(1000);

    // Navigate to Favorites tab
    cy.contains('Favorites').should('exist').first().click({ force: true });

    // Verify seeded movie is displayed
    cy.get('[data-testid="favorites-list"]').should('be.visible');
    cy.contains('Seeded Movie').should('be.visible');

    // Ensure the remove button is present
    cy.get('[data-testid="movie-card-tt9999999"]')
      .first()
      .contains('❤️')
      .should('be.visible');

    // Add delay before action as requested
    cy.wait(1000);

    // Remove from favorites
    // Click on the heart icon text with force: true to ensure it hits
    cy.get('[data-testid="movie-card-tt9999999"]')
      .first()
      .contains('❤️')
      .click({ force: true });

    // Verify movie is removed
    cy.contains('No favorite movies yet.', { timeout: 10000 }).should(
      'be.visible'
    );
    cy.get('[data-testid="movie-card-tt9999999"]').should('not.exist');
  });
});
