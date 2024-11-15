class HomePage {
    constructor(page) {
        this.textTitle = page.getByText('Swag Labs');
    }

    async loginSuccess() {
        await this.textTitle.isVisible()
    }
}

module.exports = HomePage;
