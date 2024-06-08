import { Page } from "@playwright/test";
import { PageManager } from "../Page-objects/pageManager";

export const pageFixture = {
  page: undefined as unknown as Page, //==> Bu değişken, bir tarayıcı sayfasını temsil eder.

  pm: undefined as unknown as PageManager,
};

/*
Bu kod parçası page adında bir nesne oluşturur. 
Bu page özelliği, Page tipinde bir değeri temsil eder.

undefined as unknown as Page ifadesi, page özelliğinin başlangıç değerini belirler. 
Bu ifade, page özelliğinin başlangıçta undefined olduğunu, ancak sonradan Page tipinde bir değer alacağını belirtir.

Bu tür bir ifade genellikle, bir değişkenin tipini belirtmek, ancak başlangıçta bir değer atamamak için kullanılır.
Bu, değişkenin daha sonra atanacak bir değeri olduğunu, ancak bu değerin henüz mevcut olmadığını belirtir.

Bu durumda, page özelliği, bir tarayıcı sayfasını temsil eder. 
Ancak, bu sayfa henüz oluşturulmadığı için page özelliği başlangıçta undefined olarak ayarlanır.
Daha sonra, bir tarayıcı sayfası oluşturulduğunda, bu sayfa page özelliğine atanabilir.


//@ts-ignore ifadesi, TypeScript derleyicisinin bir sonraki satırdaki herhangi bir hata mesajını görmezden gelmesini sağlar.
Bu, genellikle TypeScript'in bir hata olduğunu düşündüğü, ancak sizin bilerek ve isteyerek kabul ettiğiniz durumlar için kullanılır.

Bu ifadeyi kullanmanın bazı riskleri vardır. Özellikle, gerçek bir hatayı yanlışlıkla görmezden gelebilirsiniz. 
Bu nedenle, //@ts-ignore ifadesini yalnızca kesinlikle gerekli olduğunda ve potansiyel sonuçlarının farkında olduğunuzda kullanmanız önerilir.

Bu durumda, //@ts-ignore ifadesinin kullanılıp kullanılmaması gerektiği, page: undefined as unknown as Page satırının neden bir TypeScript hatası verdiğine bağlıdır. 
Eğer bu satır, TypeScript'in kabul etmediği bir şeyi yapmaya çalışıyorsa (örneğin, belirli bir tipin değerini başka bir tipe atamaya çalışıyorsa), //@ts-ignore ifadesini kullanabilirsiniz. 
Ancak, bu satırın neden bir hata verdiğini anlamak ve mümkünse hatayı düzeltmek genellikle daha iyidir.
*/

/*
neden pageFixture oluşturuldu?  --> aslında bunu seleniumdaki Driver.class gibi düşünebiliriz
aynı page i tüm page sayfalarında kullanabilmek için,  yoksa her dayfada yeni bir page nesnesi oluşturmak gerekecekti
bu da aradaki bağlantıyı koparacağı için hata alırız , pace nesnesini seleniumdaki driver gibi düşünebiliriz


Playwright testlerinde, genellikle bir sayfa nesnesine ihtiyaç duyulur.
Bu sayfa nesnesi, tarayıcıda bir web sayfasını temsil eder ve bu sayfayı kontrol etmek için kullanılır.
*/
