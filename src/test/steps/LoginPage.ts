import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"; // Cucumber step tanımlamaları için gerekli importlar , burda and a gereksinim yok
import {
  Browser,
  BrowserContext,
  Page, //==> Playwright objeleri , normalde playwright kullanırken bunlar otomatik olarak import edilirdi ama şimdi biz bunları manuel import etmek zorundayız
  chromium,
  expect,
} from "@playwright/test";

import { pageFixture } from "../../hooks/pageFixture";

//setDefaultTimeout(60000);  --> zaman aşımı süresini 1 dakikaya çıkardık
//setDefaultTimeout(60 * 1000 * 2);  --> 2 dakika

//==> Bu, Playwright testlerinde kullanılan varsayılan zaman aşımı süresini ayarlar.
//Bu süre, bir test adımının tamamlanması için beklenen maksimum süreyi belirler. Varsayılan olarak, bu süre 30 saniyedir.
//Ancak, testlerinizin ihtiyaçlarına bağlı olarak bu süreyi artırabilir veya azaltabilirsiniz.
//Örneğin, bir test adımının daha uzun sürebileceğini düşünüyorsanız, zaman aşımı süresini artırabilirsiniz.
// Bunu yapmak, testlerinizin daha güvenilir ve tutarlı olmasına yardımcı olabilir.

// let browser: Browser;
// let context: BrowserContext; //==> Bu değişkenler, sırasıyla, bir tarayıcı örneğini, bir tarayıcı oturumunu ve bir tarayıcı sayfasını temsil eder.
// let page: Page;
//let page2: Page;

Given(`Web sitesine giderim`, async function () {
  // browser = await chromium.launch({ headless: false }); // Browser açılır --> varsayılan olarak headless modda açılır, yani tarayıcı arayüzü görünmez
  // context = await browser.newContext(); // Browser context açılır
  // page = await context.newPage(); // Yeni bir sayfa açılır  yada sekme açılır
  //page2 = await context.newPage(); // Yeni bir sayfa açılır  --> bir page daha kullanırsak yeni sekme açılır

  // Playwright'da her Page nesnesi, tarayıcıda yeni bir sekme olarak düşünülebilir.
  // context.newPage() çağrıldığında, yeni bir tarayıcı sekmesi oluşturulur ve bu sekme Page nesnesi ile temsil edilir.
  // Bu nedenle, birden fazla Page nesnesi oluşturduğunuzda,
  // aslında birden fazla tarayıcı sekmesi oluşturmuş oluyorsunuz.
  // Her bir Page nesnesi, kendi tarayıcı sekmesini kontrol eder ve bu sekmeler birbirinden bağımsızdır.
  // Bu, birden fazla web sayfasını aynı anda test etmek veya bir web sayfasının farklı bölümlerini
  // aynı anda test etmek için kullanılabilir. Ancak, her bir Page nesnesi ayrı ayrı kontrol edilmeli ve yönetilmelidir.

  //   await page.goto("https://practicesoftwaretesting.com/#/");
  //   //await page2.goto("https://google.com/");  --> bunu yeni sekmede açar
  // });

  await pageFixture.page.goto("https://practicesoftwaretesting.com/#/");
  //await page2.goto("https://google.com/");  --> bunu yeni sekmede açar
});

When(`Sign in linkine tiklarim`, async function () {
  await pageFixture.page.getByRole("link", { name: "Sign in" }).click();
});

When(`Email adres kutusuna {string} yazarim`, async function (email) {
  await pageFixture.pm.onSignInPage().enterEmail(email);
  //await pageFixture.page.getByPlaceholder("Your email").fill(email);
});

When(`Password kutusuna {string} yazarim`, async function (password) {
  await pageFixture.pm.onSignInPage().enterPassword(password);
  // await pageFixture.page.getByPlaceholder("Your password").fill(password);
});

When(`Login butonuna tiklarim`, async function () {
  await pageFixture.pm.onSignInPage().clickLoginButton();
  // await pageFixture.page.getByRole("button", { name: "Login" }).click();
});

Then(`My Account sayfasinin acildigini gorurum`, async function () {
  await pageFixture.pm.onRegistrationPage().verifyPageHeader();
  // await expect(
  //   pageFixture.page.getByRole("heading", { name: "My account" })
  // ).toBeVisible();
});

When("Register your account linkine tiklarim", async function () {
  await pageFixture.page
    .getByRole("link", { name: "Register your account" })
    .click();
});

/*
Evet, bu adımların hepsi genellikle bir Playwright testi için gereklidir. İşte nedenleri:

browser = await chromium.launch({ headless: false }); : Bu adım, bir Chromium tarayıcısını başlatır. 
Tarayıcıyı başlatmadan, bir web sayfasını yükleyemez veya üzerinde işlem yapamazsınız.

context = await browser.newContext(); : Bu adım, yeni bir tarayıcı oturumu oluşturur.
Oturumlar, tarayıcı çerezleri, yerel depolama ve diğer oturumla ilgili bilgileri içerir. 
Farklı oturumlar, birbirinden izole edilmiş olabilir, bu da onları birbirinden bağımsız hale getirir. 
Bu, testlerin birbirini etkilememesi için önemlidir.

page = await context.newPage(); : Bu adım, yeni bir tarayıcı sayfası oluşturur. 
Bir sayfa oluşturmadan, bir web sayfasını yükleyemez veya üzerinde işlem yapamazsınız.

await page.goto("https://practicesoftwaretesting.com/#/"); : 
Bu adım, oluşturulan sayfayı belirli bir URL'ye yönlendirir. 


Bu adımların her biri, bir Playwright testi için önemli bir rol oynar ve genellikle gereklidir. 
Ancak, testin tam gereksinimlerine bağlı olarak, bazı adımların atlanması veya ek adımların eklenmesi gerekebilir.
Örneğin, birden fazla sayfayı aynı anda test etmek istiyorsanız, birden fazla sayfa oluşturmanız gerekebilir.


Örneğin, bir test senaryosunda, iki farklı web sayfasının birbiriyle etkileşimini kontrol etmek isteyebilirsiniz. 
Bu durumda, her bir web sayfası için ayrı bir Page örneği oluşturmanız gerekebilir.

Bu, aşağıdaki gibi bir şey olabilir:

let page1: Page;
let page2: Page;

Given(`Web sitesine giderim`, async () => {
  browser = await chromium.launch({ headless: false }); 
  context = await browser.newContext(); 
  page1 = await context.newPage(); 
  page2 = await context.newPage(); 

  await page1.goto("https://practicesoftwaretesting.com/#/");
  await page2.goto("https://anotherwebsite.com");


  Bu durumda, page1 ve page2 bağımsız olarak kontrol edilebilir ve her biri farklı bir web sayfasını temsil eder. 
  Ancak, bu tür bir senaryo genellikle daha karmaşık testlerde gereklidir ve basit bir web sitesi ziyareti için genellikle bir Page örneği yeterlidir.
});
*/
