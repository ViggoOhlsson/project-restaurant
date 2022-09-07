describe("restaurant testing", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
  });

  it("goes to book route", () => {
    cy.visit("http://localhost:3000");
    cy.get(".home__container__button").click();
  });

  it("makes a reservation", () => {
    cy.visit("http://localhost:3000/book");
    cy.get(".react-calendar__tile--active").click();
    cy.get(".selected").click();
    cy.get(".next-phase-wrapper").click();
    cy.get(".book-name").type("filippa");
    cy.get(".book-email").type("filippabellage@live.se");
    cy.get(".book-phone").type("0707752170");
    cy.get(".next-phase-wrapper").click();
    cy.get(".submit-button").click();
  });

  it("searches bookings", () => {
    cy.visit("http://localhost:3000/admin");
  });
});
