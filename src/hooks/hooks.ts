import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  BeforeStep, //
  AfterStep,
  Status, //
} from "@cucumber/cucumber";

import { Browser, BrowserContext, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { PageManager } from "../Page-objects/pageManager";

//setDefaultTimeout(60 * 1000 * 2);  --> 2 dakika

let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
  //browseri bir kez oluşturup tüm senaryoları bu browser üzerinden çalıştırır ,tüm testlerden önce 1 kez çalışır
  browser = await chromium.launch({ headless: false }); // headless: false  tarayıcıyı açar , slowMo: 500 500ms bekleme süresi ekler
});

AfterAll(async () => {
  await browser.close(); // Browser kapatılır , tüm testler bittikten sonra çalışır
});

/*
Bu kod parçası, her test senaryosu öncesi ve sonrası için bazı işlemler gerçekleştirir.
Bu işlemler genellikle "hook" olarak adlandırılır ve testlerin 
düzgün bir şekilde çalışabilmesi için genellikle gerekli olan bazı kurulum ve temizleme işlemlerini gerçekleştirir.
Before fonksiyonu, her testten önce çalışır. 
Bu fonksiyon, yeni bir tarayıcı bağlamı oluşturur ve bu bağlamda yeni bir sayfa açar. 
Ardından, bu sayfayı pageFixture.page özelliğine atar. Bu, aynı sayfanın tüm testlerde kullanılabilmesini sağlar.

*/

/*
//her adımdan sonra çalışır , her adımda ekran görüntüsü alır ve rapora ekler
AfterStep(async  ({ pickle, pickleStep }) => {    

  const date = new Date();
  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1 //js de aylar 0 dan başladığı için +1 ekledik
  }-${date.getDate()}`;

  const sanitize = (text: string): string => text.replace(/[<>:"/\\|?*]/g, ""); 
  const stepText = sanitize(pickleStep.text);

  const img = await pageFixture.page.screenshot({
    path: `./test-results/screenshots/${pickle.name}/${stepText}-${dateString}.png`,
  });
  this.attach(img, "image/png");

  await pageFixture.page.waitForTimeout(500); 
});


burda arrow function kullanıldığı için this kullanılamaz , bu yüzden normal fonksiyon kullanıldı
sebebi ise arrow functionlar kendi this'lerini oluştururlar ve bu this global this'i göstermez

JavaScript ve TypeScript'te, this anahtar kelimesinin değeri, fonksiyonun nasıl çağrıldığına bağlıdır. Arrow fonksiyonlar (() => {}), this değerini içerdikleri kapsamdan (lexical scope) alırken, normal fonksiyonlar (function() {}) this değerini çağrıldıkları bağlama (dynamic scope) göre belirler.

Bu durumda, AfterStep fonksiyonu bir World nesnesinin yöntemi olarak çağrılır ve this değerinin World nesnesini temsil etmesi beklenir. Ancak, bir arrow fonksiyonu this değerini içerdikleri kapsamdan alır, bu nedenle this değeri undefined olabilir.

*/

//her adımdan sonra çalışır , her adımda ekran görüntüsü alır ve rapora ekler
// AfterStep(async function ({ pickle, pickleStep }) {
//   //pickleStep parametresi ile o anki adımın ismine ulaşabiliriz
//   //pickle parametresi ile o anki senaryo ismine ulaşabiliriz
//   const date = new Date();
//   const dateString = `${date.getFullYear()}-${
//     date.getMonth() + 1 //js de aylar 0 dan başladığı için +1 ekledik
//   }-${date.getDate()}`;

//   // Adım metnini geçerli bir dosya adı oluşturmak için temizledik
//   const sanitize = (text: string): string => text.replace(/[<>:"/\\|?*]/g, ""); //bunu yapmazsak pickleStep.text hataya neden olur
//   const stepText = sanitize(pickleStep.text);

//   const img = await pageFixture.page.screenshot({
//     path: `./test-results/screenshots/${pickle.name}/${stepText}-${dateString}.png`,
//   });
//   this.attach(img, "image/png");

//   await pageFixture.page.waitForTimeout(500); //her adımdan sonra 1 saniye bekle
// });

Before(async () => {
  //her testten önce çalışır
  context = await browser.newContext();
  const page = await context.newPage(); //burası sayesinde pageFixture de oluşturulan page tüm testlerde kullanılacak
  pageFixture.page = page;

  pageFixture.pm = new PageManager(page);
});

/*
const sanitize = (text: string)
Burada, text parametresinin türü string olarak belirtilmiştir. Bu, sanitize fonksiyonuna string türünde bir argüman verileceğini garanti eder.

(text: string): string =>
Burada, sanitize fonksiyonunun dönüş türü string olarak belirtilmiştir. Bu, sanitize fonksiyonunun her zaman string türünde bir değer döndüreceğini garanti eder.

Bu iki tür tanımı, sanitize fonksiyonunun hem aldığı argümanın hem de döndürdüğü değerin string türünde olacağını belirtir
*/

/*
pickle ve pickleStep arasındaki fark, Cucumber test çerçevesinin içerisinde kullanılan terimlerle ilgilidir.

pickle bir senaryoyu temsil eder. Cucumber'da, bir senaryo bir dizi adımdan oluşur ve her adım bir işlevi temsil eder. pickle nesnesi, senaryonun adı, açıklaması, etiketleri ve adımları gibi bilgileri içerir.

Öte yandan, pickleStep bir adımı temsil eder. Bir senaryo bir dizi adımdan oluşur ve pickleStep bu adımlardan birini temsil eder. pickleStep nesnesi, adımın metni, argümanları ve diğer bilgileri içerir.

*/

/*
After fonksiyonu, her testten sonra çalışır.
Bu fonksiyon, pageFixture.page özelliğindeki sayfayı kapatır. 
Bu, her testin kendi bağımsız sayfasıyla çalışmasını sağlar.
Her testten önce yeni bir sayfa açılır ve her testten sonra bu sayfa kapatılır.
Bu, testler arasında durumun korunmasını önler ve her testin bağımsız bir şekilde çalışmasını sağlar.
*/
After(async () => {
  //await pageFixture.page.waitForTimeout(1000); // Testi kapatmadan önce 1 saniye bekle
  await pageFixture.page.close(); // her testten sonra sayfayı , sekmeyi kapatır
});

//eğer ekran görünütüsünü fail olan adımlarda almak istiyorsak
//AfterStep fonksiyonunu aşağıdaki gibi düzenleyebiliriz
//AfterStep fonksiyonu, her adımdan sonra çalışır ve adımın durumunu kontrol eder.
//Eğer adım başarısızsa, ekran görüntüsü alır ve rapora ekler.
//Eğer adım başarılıysa, ekran görüntüsü almayı atlar.
// örnek :    if (pickleStep.result.status === "failed") {
//   const img = await pageFixture.page.screenshot(); // Ekran görüntüsü al
//   this.attach(img, "image/png"); // Ekran görüntüsünü rapora ekle
// }

//her testen sonra çalışır eğer fail olursa ekran görüntüsü alır
After(async function ({ pickle, result }) {
  console.log(`${pickle.name} - ${result?.status}`); //consola her testin durumunu , ismini yazdırdık

  //testin durumunu result ile alabiliyoruz

  if (result?.status == Status.FAILED) {
    //eğer test fail olduysa

    //   //pickle parametresi ile o anki senaryo ismine ulaşabiliriz
    const date = new Date();
    const dateString = `${date.getFullYear()}-${
      date.getMonth() + 1 //js de aylar 0 dan başladığı için +1 ekledik
    }-${date.getDate()}`;

    const img = await pageFixture.page.screenshot({
      path: `./test-results/fail-screenshots/${pickle.name}-${dateString}.png`,
    });
    this.attach(img, "image/png");

    // await pageFixture.page.waitForTimeout(500);
  }

  // await pageFixture.page.waitForTimeout(500); // Testi kapatmadan önce 50 saniye bekle
  await pageFixture.page.close(); // her testten sonra sayfayı , sekmeyi kapatır
});

/*
  //await pageFixture.page.waitForLoadState("networkidle"); 
*/

//     ==  ile === farkı ?  ==  sadece değerleri karşılaştırırken === hem değerleri hem de türleri karşılaştırır
