describe('Logout Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="password-input"]').type('haslo');
    cy.get('[data-testid="login-button"]').click();
  });

  it('should logout successfully', () => {
    // Ensure we are on main screen
    cy.get('input[placeholder="Search for movies..."]').should('be.visible');

    // Handle both window.confirm (standard RNW) and custom DOM modal
    let confirmCalled = false;
    cy.on('window:confirm', () => {
      confirmCalled = true;
      return true; // Accept alert
    });

    // Click Logout tab
    cy.contains('Logout').should('exist').first().click({ force: true });

    cy.wait(500).then(() => {
      if (!confirmCalled) {
        // If window.confirm wasn't called, check for DOM modal
        cy.get('body').then(($body) => {
          if ($body.text().includes('Are you sure you want to logout?')) {
            // Find the button in the modal. It will likely be a View/div with text "Logout"
            // We need to differentiate it from the Tab button. The modal button should be on top.
            // We can search for the text "Logout" again, but verify it's not the tab.
            // Or click the last one?
            // Usually modal is last in DOM.
            cy.contains('Logout').last().click({ force: true });
          }
        });
      }
    });

    // Check if we are back on Login Screen
    cy.get('[data-testid="username-input"]', { timeout: 5000 }).should(
      'be.visible'
    );
    cy.get('[data-testid="login-button"]').should('be.visible');
  });
});
