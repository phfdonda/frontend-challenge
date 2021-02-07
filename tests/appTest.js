module.exports = {
  'FrontEnd Challenge Testing': (browser)=>{

    browser
      .url("http://localhost:3000/")
      .assert.title("Front-end Challenge - by Pedro Donda")
      .assert.containsText("h2", "Explique o que você precisa")
      .assert.attributeContains(".warning", "hidden", "")
      .assert.not.visible('.warning')
      .assert.containsText("label", "Qual será o serviço?")
      .assert.elementPresent('select')

  }
}