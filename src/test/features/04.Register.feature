Feature: Register tesleri

  @register
  Scenario: Register sayfasına gidebilmeliyim
    Given Web sitesine giderim
    When Sign in linkine tiklarim
    And Register your account linkine tiklarim
    Then Customer registration basligini gorurum
