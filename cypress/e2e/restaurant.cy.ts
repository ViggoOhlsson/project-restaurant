describe("restaurant testing", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
  });

  //////////
  ///BOOK///
  ////////

  it("goes to book route", () => {
    cy.visit("http://localhost:3000");
    cy.get(".home__container__button").click();
  });

  it("makes a reservation", () => {
    cy.visit("http://localhost:3000/book");
    cy.get(".react-calendar__tile--active").click();
    cy.get(".selected").click();
    cy.get(".navigator").click();
    cy.get(".book-name").type("filippa");
    cy.get(".book-email").type("filippabellage@live.se");
    cy.get(".book-phone").type("0707752170");
    cy.get(".navigator").eq(1).click();
    cy.get(".submit-button").click();
  });

  ///////////////
  /////ADMIN/////
  ///////////////

  it("searches bookings", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get(".admin__bookings__early").should("exist");
  });

  // //ADMIN EDIT TESTS

  it("should go to edit", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get(".admin__bookings__icon").first().click();
  });

  it("should edit name", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get(".admin__bookings__icon").first().click();
    cy.get(".form__userName input").clear().type("filippo bellango");
    cy.get(".form__update").click();
    cy.visit("http://localhost:3000/admin");
    cy.get(".admin__bookings__early p")
      .first()
      .should("contain", "filippo bellango");
  });

  it("should not submit new edits", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get(".admin__bookings__icon").first().click();
    cy.get(".form__userName input").clear();
    cy.get(".form__update").click();
    cy.get(".div__error").should("exist");
  });

  ///ADMIN ADD TESTS

  it("should add new reservation", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get(".fa-calendar-plus").click();
    cy.get('input[name="date"]').invoke("val");
    cy.get(".form__guests").type("5");
    cy.get(".form__user .form__userName").type("Sebastian");
    cy.get(".form__user .form__email").type("sebastian@mail.se");
    cy.get(".form__user .form__phone").type("0701234567");
    cy.get(".form__update").click();
    cy.get(".overview__user span").first().should("contain", "Sebastian");
  });

  it("should not submit new booking", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get(".fa-calendar-plus").click();
    cy.get(".form__update").click();
    cy.get(".div__error").first().should("exist");
  });

  it("should not add new reservation because fully booked", () => {
    cy.visit("http://localhost:3000/admin");
    cy.get(".fa-calendar-plus").click();
    cy.get('input[name="date"]').invoke("val");
    cy.get(".form__guests").type("100");
    cy.get(".form__user .form__userName").type("Maja");
    cy.get(".form__user .form__email").type("maja@mail.se");
    cy.get(".form__user .form__phone").type("0701234568");
    cy.get(".form__update").click();
    cy.get(".form__error").first().should("exist");
  });
});
