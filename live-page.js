class LivePage {
    constructor (document) {
        this.document = document;
        this.stylesheets = this.document.querySelectorAll('link[rel="stylesheet"]')
    }

    reload() {
        this.document.location.reload()
    }

    refreshCSS() {
        this.stylesheets.forEach(s => s.href = `${s.href}?t=${new Date().getTime()}`)
    }
}
