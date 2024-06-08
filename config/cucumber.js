//bu dpsyayı neden oluşturduk?  Çünkü cucumber.js dosyası, Cucumber.js test çerçevesinin yapılandırmasını içerir.
//bir script dosyası oluşturarak, farklı ortamlar için farklı yapılandırmaları tanımlayabiliriz.
//bir scriptle beraber bunu kullanabileceğimiz gibi, npm scriptlerinde de kullanabiliriz.
//örnek :
// "register": "npm test --tags=\"@register\"",    ==> bunları package.json dosyasına ekleyebiliriz
// "smoke": "npm test --tags=\"@smoke\""

/*
npm run register
npm run smoke

yada 

npm test --tags="@register"
npm test --tags="@smoke"   da yazabiliriz


"scripts": {                    =====> package.json dosyasında
    "test": "cucumber-js test  --config=config/cucumber.js",   ---> burası sayesinde cucumber.js dosyasını çalıştırıyoruz 
    "test:failed": "cucumber-js test -p rerun @rerun.txt",
    "register": "npm test --tags=\"@register\"",
    "smoke": "npm test --tags=\"@smoke\""
  },
*/
module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "", //biz environment olarak tagları kendimiz belirleyebiliriz
    //bu tag için bir script yazıp kullanabiliriz
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/test/features"],
    dryRun: false,
    require: ["src/test/steps/**/*.ts", "src/hooks/hooks.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:test-results/rerun.txt",
    ],
    parallel: 2,
  },

  rerun: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    dryRun: false,
    require: ["src/test/steps/**/*.ts", "src/hooks/hooks.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:test-results/rerun.txt",
    ],
  },

  ci: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/test/features"],
    dryRun: false,
    require: ["src/test/steps/**/*.ts", "src/hooks/hooks.ts"],
    requireModule: ["ts-node/register"],
  },
};

/*
Bu kod parçası, JavaScript'te bir ortam değişkenini okuyor. 
process.env nesnesi, Node.js uygulamalarında çalışma zamanındaki ortam değişkenlerine erişim sağlar. 
Bu durumda, npm_config_TAGS adlı bir ortam değişkenini okumaya çalışıyoruz.

Ortam değişkenleri, genellikle bir uygulamanın farklı ortamlarda (örneğin geliştirme, test, üretim vb.) 
farklı davranmasını sağlamak için kullanılır. 
Örneğin, bir uygulamanın veritabanı bağlantı bilgileri veya API anahtarları gibi hassas bilgileri saklamak için 
kullanılabilir. Bu bilgiler, uygulamanın kodunda doğrudan saklanmaz, bunun yerine ortam değişkenlerinde saklanır.
Bu, bu tür hassas bilgilerin yanlışlıkla bir kod deposuna dahil edilmesini önler.

|| "" ifadesi, bir "ya da" mantıksal operatörüdür.
Eğer process.env.npm_config_TAGS değeri undefined, null, NaN, 0, "" (boş string) veya false ise (yani "falsy" bir değerse),
o zaman "" (boş string) değerini kullanır. Bu, npm_config_TAGS ortam değişkeninin değerini tags değişkenine atar.
Eğer npm_config_TAGS tanımlı değilse, tags boş bir string olur.

Bu kod parçası, genellikle bir uygulamanın farklı ortamlarda farklı davranmasını sağlamak için kullanılır. 
Örneğin, belirli bir özelliği etkinleştirmek veya devre dışı bırakmak için 
bir ortam değişkeni kullanılabilir. 
Bu durumda, npm_config_TAGS ortam değişkeni muhtemelen belirli bir özelliği etkinleştirmek 
veya devre dışı bırakmak için kullanılıyor olabilir.




process.env.npm_config_TAGS || "" ifadesi, JavaScript'teki "logical OR" operatörünü kullanır. 
Bu operatör, sol tarafındaki ifadenin "truthy" (yani undefined, null, NaN, 0, "" (boş string) veya false olmayan bir değer) 
olup olmadığını kontrol eder.

Eğer process.env.npm_config_TAGS truthy bir değerse (yani bir değeri varsa), 
bu değer tags değişkenine atanır. 
Eğer process.env.npm_config_TAGS falsy bir değerse (yani değeri yoksa veya undefined, null, NaN, 0, "" (boş string) veya false ise), 
o zaman "" (boş string) değeri tags değişkenine atanır.

Bu, bir tür "if-else" durumudur 
çünkü iki farklı durum için iki farklı sonuç verir: process.env.npm_config_TAGS'in bir değeri varsa veya yoksa.
*/
