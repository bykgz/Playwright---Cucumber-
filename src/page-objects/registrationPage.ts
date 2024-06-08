import { expect, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class RegistrationPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async verifyPageHeader() {
    await expect(
      this.page.getByRole("heading", { name: "My account" })
    ).toBeVisible();
  }

  async enterFirstName(firstName: string) {
    await this.page.getByLabel("First name").fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.page.getByLabel("Last name").fill(lastName);
  }

  async enterDateOfBird(dateOfBird: string) {
    await this.page.getByLabel("Date of Birth").fill(dateOfBird);
  }

  async enterAddress(address: string) {
    await this.page.getByPlaceholder("Your Address *").fill(address);
  }

  async enterPostcode(postcode: string) {
    await this.page.getByLabel("Postcode", {}).fill(postcode);
  }

  async enterCity(city: string) {
    await this.page.getByLabel("City").fill(city);
  }

  async enterState(state: string) {
    await this.page.getByLabel("State").fill(state);
  }

  async selectCountry(country: string) {
    await this.page.getByLabel("country").selectOption(country);
  }

  async enterPhone(phone: string) {
    await this.page.getByLabel("Phone").fill(phone);
  }

  async emailAddress(email: string) {
    await this.page.getByLabel("Email address").fill(email);
  }

  async enterPassword(password: string) {
    await this.page.getByLabel("Password").fill(password);
  }

  async clickRegisterButton() {
    await this.page.getByRole("button", { name: "Register" }).click();
  }
}
