import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import {
  Browser,
  BrowserContext,
  Page,
  chromium,
  expect,
} from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

// Then(`Customer registration basligini gorurum`, async function () {
//   const heading = pageFixture.page.getByRole("heading", {
//     name: "Customer registration",
//   });
//   const isVisible = await heading.isVisible();

//   expect(isVisible).toBe(true);
// });

Then(`Customer registration basligini gorurum`, async function () {
  await expect(
    pageFixture.page.getByRole("heading", { name: "Customer registration" })
  ).toBeVisible();
});

// Then(`Customer registration basligini gorurum`, async function () {
//   await expect(
//     pageFixture.page.getByRole("heading", { name: "Customer registration" })
//   ).toHaveText("Customer registration");
// });
