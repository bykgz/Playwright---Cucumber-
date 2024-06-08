Feature: Login tesleri

  Scenario: Gecerli verilerle login olabilmeliyim - Case 05
    Given Web sitesine giderim
    When Sign in linkine tiklarim
    And Email adres kutusuna "<email>" yazarim
    And Password kutusuna "<password>" yazarim
    And Login butonuna tiklarim
    Then My Account sayfasinin acildigini gorurum

    Examples:
      | email                                 | password  |
      | customer@practicesoftwaretesting.com  | welcome01 |
      | customer2@practicesoftwaretesting.com | welcome01 |
