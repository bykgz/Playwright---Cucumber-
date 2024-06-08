@smoke
Feature: Login Testleri

  Scenario: Gecerli verilerle login olabilmeliyim - Case 01
    Given Web sitesine giderim
    When Sign in linkine tiklarim
    And Email adres kutusuna "customer@practicesoftwaretesting.com" yazarim
    And Password kutusuna "welcome01" yazarim
    And Login butonuna tiklarim
    Then My Account sayfasinin acildigini gorurum

  Scenario: Gecerli verilerle login olabilmeliyim - Case 02
    Given Web sitesine giderim
    When Sign in linkine tiklarim
    And Email adres kutusuna "customer2@practicesoftwaretesting.com" yazarim
    And Password kutusuna "welcome01" yazarim
    And Login butonuna tiklarim
    Then My Account sayfasinin acildigini gorurum
