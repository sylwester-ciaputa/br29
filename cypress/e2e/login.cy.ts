describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login successfully with correct credentials', () => {
    // Check if we are on login screen
    cy.get('[data-testid="username-input"]').should('exist');

    // Fill credentials
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="password-input"]').type('haslo');

    // Click login
    cy.get('[data-testid="login-button"]').click();

    // Assert we are on Home screen (check for search input)
    // React Native Web renders TextInput as input or textarea
    cy.get('input[placeholder="Search for movies..."]').should('be.visible');
  });

  it('should show error with incorrect credentials', () => {
    // Check if we are on login screen
    cy.get('[data-testid="username-input"]').should('exist');

    // Fill wrong credentials
    cy.get('[data-testid="username-input"]').type('wronguser');
    cy.get('[data-testid="password-input"]').type('wrongpass');

    // Click login
    cy.get('[data-testid="login-button"]').click();

    // Assert we are STILL on login screen
    cy.get('[data-testid="username-input"]').should('exist');
  });

  it('should show validation errors when fields are empty', () => {
    // Click login without typing anything
    cy.get('[data-testid="login-button"]').click();

    // Assert validation messages
    cy.contains('Username is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });
});
