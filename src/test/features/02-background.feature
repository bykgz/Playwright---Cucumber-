Feature: Login tesleri

  Background:
    Given Web sitesine giderim
    When Sign in linkine tiklarim

  Scenario: Gecerli verilerle login olabilmeliyim - Case 03
    And Email adres kutusuna "customer@practicesoftwaretesting.com" yazarim
    And Password kutusuna "welcome01" yazarim
    And Login butonuna tiklarim
    Then My Account sayfasinin acildigini gorurum

  Scenario: Gecerli verilerle login olabilmeliyim - Case 04
    And Email adres kutusuna "customer2@practicesoftwaretesting.com" yazarim
    And Password kutusuna "welcome01" yazarim
    And Login butonuna tiklarim
    Then My Account sayfasinin acildigini gorurum
