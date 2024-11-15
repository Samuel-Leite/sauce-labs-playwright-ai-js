class LoginPage {
    constructor(page) {
        this.page = page;
        this.txtUsername = page.getByPlaceholder('Username');
        this.txtPassword = page.getByPlaceholder('Password');
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async doLogin(user, password) {
        await this.page.goto('https://www.saucedemo.com/');
        await this.txtUsername.fill(user);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
    }

    async errorLogin() {
        await this.errorMessage.isVisible()
    }
}

module.exports = LoginPage;
