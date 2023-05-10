const { renderDOM } = require('./helpers');
let dom; let document;
describe('register.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./register.html');
        document = await dom.window.document;
    })
    
    it('has a button', () => {
        const btn = document.querySelector('input');
        expect(btn).toBeTruthy()
    })
    
    // it('h1 is empty when website loads', () => {
    //     const h1 = document.querySelector('h1');
    //     expect(h1.innerHTML).toContain('')
    // })
    
    // it('displays dark mode', () => {
    //     const body = document.querySelector('body');
    //     const darkModeBtn = document.querySelector('#dark-mode');
    //     darkModeBtn.click()
    //     expect(body.className).toBe('dark-mode')
    // })
})
