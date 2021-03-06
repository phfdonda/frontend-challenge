module.exports = {
  'FrontEnd Challenge Testing': (browser)=>{

    browser
      .url("http://localhost:3000/")
      .assert.title("Front-end Challenge - by Pedro Donda")
      .assert.containsText("h2", "Explique o que você precisa")
      .assert.attributeContains(".warning", "hidden", "")
      .assert.not.visible(".warning")
      .assert.containsText("label", "Qual será o serviço?")
      .assert.elementPresent("select")

    // Testing if the content of fields.json file was loaded
    browser.expect.elements("option").count.to.equal(9)

    browser
      .waitForElementVisible("#next")
      .assert.elementPresent("button", "Próximo")
      .expect.element("#next")
      .to.have.css("background-color")
      .which.equals("rgb(25, 92, 169)")

    browser.expect
      .element("select")
      .to.have.css("background-color")
      .which.equals("rgb(254, 254, 254)")

    // After button is clicked without selecting a value, warning becomes visible, and select field changes color
    browser
      .click("#next")
      .assert.visible(".warning")
      .assert.containsText(".warning", "Este campo é requerido")
      .expect.element("select")
      .to.have.css("background-color")
      .which.equals("rgb(253, 236, 236)")

    // Testing if once a value is selected, the button can be pressed to move to the next screen
    browser
      .click("select")
      .waitForElementVisible('option',5000)
      .setValue('option',"Escova")
      .click('select')
      .click("#next")
      .expect.element("label").text.to.equal("Para quem será o serviço?")

    // Test if we have two buttons in the next screen
    browser.expect.elements("button").count.to.equal(2)

    // Test if the select element is not required and if the button changes accordingly
    browser
      .assert.containsText('#back',"Voltar")
      .assert.containsText('#next','Pular')
      .expect.element('select').to.not.have.attribute('required')

    // Test if by clicking the #next button we can proceed without problems, even without selecting anything
    browser
      .click("#next")
      .expect.element("label")
      .text.to.equal("O serviço será para quantas pessoas?")

    // Test if the #back button is working. It should return to the last page.
    browser
      .click("#back")
      .expect.element("label")
      .text.to.equal("Para quem será o serviço?")

    // Test if the required attribute is indeed applied to the select field
    browser
      .click("#next")
      .click("#next")
      .assert.containsText("label", "Para quando você precisa deste serviço?")
      .expect.element("select").to.have.attribute("required")

    // Test if it will prevent the user to go on without specifying a value, and if it will show the warning message
    browser
      .click("#next")
      .assert.visible(".warning")
      .assert.containsText(".warning", "Este campo é requerido")
      .expect.element("select")
      .to.have.css("background-color")
      .which.equals("rgb(253, 236, 236)")

    // Test if by selecting value and pressing #next we go to the next screen
    browser
      .click("select")
      .waitForElementVisible("option", 5000)
      .setValue("option", "Hoje ou nos próximos dias")
      .click("select")
      .click("#next")
      .assert.containsText("label", "Informações Adicionais")

    browser.assert
      .elementPresent("textarea")
      .click("#next")
      .assert.containsText("h2", "Estamos quase lá!")
      .assert.containsText(
        "h3",
        "Não perca tempo ligando para vários profissionais. Preencha os dados abaixo e nós encontraremos os melhores pra você!")
      .expect.elements('input').count.to.equal(4)

    browser
      .click("#next")
      .assert.visible(".warning")
      .assert.containsText(".warning", "Este campo é requerido")
      .expect.elements('.warning').count.to.equal(4)

    browser
      .setValue("#user__cep", "66666-666")
      .setValue("#user__name", "João Tinhoso")
      .setValue("#user__email", "promocaobaratinha@sosuaalma.com")
      .setValue("#user__phone", "(66) 6666 e adivinha... 6666")
      .click("#next")
      .expect.element("h2")
      .text.to.equal("Obrigado!" )
  }
}