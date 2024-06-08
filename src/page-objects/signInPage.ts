import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

//biz locatelerimizi bir yerde biriktirmedik burada , metodların içinde tanımladık
//illa burda method kullanmak zorunda değiliz , aslında cucumber kullanıldığında locateleri bir yerde biriktirmek daha mantıklı olabilir

export class SignInPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  // /**
  //  *
  //  * @param username Kayıtlı bir email adresi girilmeli
  //  * @param password Kayıtlı kullanıcı şifresi girilmeli
  //  * @param optionText Sayfada tıklanmak istenen butonun ismi girilmeli
  //  */
  // async performLogin(username: string, password: string, optionText: string) {
  //   await this.page.getByPlaceholder("Your email").fill(username);
  //   await this.page.getByPlaceholder("Your password").fill(password);
  //   await this.waitForSecond(3);
  //   await this.page.getByRole("button", { name: optionText }).click();
  // }

  async enterEmail(email: string) {
    await this.page.getByPlaceholder("Your email").fill(email);
  }

  async enterPassword(password: string) {
    await this.page.getByPlaceholder("Your password").fill(password);
  }

  async clickLoginButton() {
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async clickRegisterLink() {
    await this.page
      .getByRole("link", { name: "Register your account" })
      .click();
  }

  async verifyPageHeader() {
    await expect(this.page.getByRole("heading")).toHaveText("Login");
  }
}

//admin@practicesoftwaretesting.com
//welcome01
