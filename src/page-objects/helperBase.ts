import { Page } from "@playwright/test";

//buraya genelde reusable fonksiyonları koyarız
export class HelperBase {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async waitForSecond(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000);
  }
}
