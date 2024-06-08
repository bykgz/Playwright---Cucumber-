import { Page } from "@playwright/test";
import { SignInPage } from "./signInPage";
import { RegistrationPage } from "./registrationPage";

export class PageManager {
  private readonly page: Page;
  private readonly signInPage: SignInPage;
  private readonly registrationPage: RegistrationPage;

  constructor(page: Page) {
    this.page = page;
    this.signInPage = new SignInPage(this.page);
    this.registrationPage = new RegistrationPage(this.page);
  }

  onSignInPage() {
    return this.signInPage;
  }

  onRegistrationPage() {
    return this.registrationPage;
  }
}
