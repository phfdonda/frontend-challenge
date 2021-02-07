
describe("Front-end Challenge", () => {


  beforeAll(async () => {
    await page.goto("http://localhost:3000/")
  })

  it('should be titled "Front-end Challenge - by Pedro Donda"', async () => {
    await expect(page.title()).resolves.toMatch(
      "Front-end Challenge - by Pedro Donda"
    )
  })

  it('should click the "Próximo" button and be refused', async()=>{
    await page.waitForSelector('#next')
    const nextBtn = await page.$('button[id="next"]')
    await nextBtn.click()
    const warning = await page.$('.warning', {visible: true})
    const text = await page.evaluate(txt => txt.textContent, warning)
    await expect(text).toMatch('Este campo é requerido')
  })

  it('should contain a select field', async()=>{
    await page.waitForSelector("#next")
    
  })
})
