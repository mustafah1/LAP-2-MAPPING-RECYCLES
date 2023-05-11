const { renderDOM } = require('./helpers');
let dom;
let document;

describe('index.html', () => {
    beforeEach(async () => {
        domIndex = await renderDOM('./index.html');
        domLogin = await renderDOM('./login.html');
        documentIndex = await domIndex.window.document;
        documentLogin = await domLogin.window.document;
    })

    it('has a search button', () => {
        const btn = documentIndex.querySelector('button');
        expect(btn).toBeTruthy()
    })

    it('has a sign in/up link', () => {
        const signin = documentIndex.querySelector('#sign-in');
        expect(signin).toBeTruthy()
    })
    
    // it('tag with id = "map" is empty when the website loads', () => {
    //     const map = documentIndex.querySelector('#map');
    //     expect(map.innerHTML).toContain("")
    // })
    

    // it('adds input value to the search input field', () => {
    //     const signin = documentIndex.querySelector('sign-in');
    //     //const h = document.querySelector('h1');

    //     const input = documentIndex.querySelector('#search-input');
    //     input.value = 'nurudeen'

    //     const btn = documentIndex.querySelector('button')

    //     // const h1 = documentLogin.querySelector('h1')

    //     btn.click()
    //     expect(input.innerHTML).toContain(input.value)
    // })


   })


describe('register.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./register.html');
        document = await dom.window.document;
    })
    
    it('has an input', () => {
        const input = document.querySelector('input');
        expect(input).toBeTruthy()
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


describe('login.html', () => {
    beforeEach(async () => {
        domIndex = await renderDOM('./index.html');
        domLogin = await renderDOM('./login.html');
        documentIndex = await domIndex.window.document;
        documentLogin = await domLogin.window.document;
    })

    it('has a search button', () => {
        const btn = documentLogin.querySelector('button');
        expect(btn).toBeTruthy()
    })

    it('has a "create an account" link', () => {
        const register = documentIndex.querySelector('a');
        expect(register).toBeTruthy()
    })

    it('can go back to home page', () => {
        const home = documentLogin.querySelector('#HOME');
        home.click()
        
        expect(home).toBeTruthy()
        // expect(global.window.location.href).toContain('/client/index.html')
    })

})
