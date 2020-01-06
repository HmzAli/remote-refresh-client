class Webpage {
    constructor () {
        this.stylesheets = document.querySelectorAll('link[href="stylesheet"]')
    }

    reload() {
        window.location.reload()
    }

    refreshCSS() {
        this.stylesheets.forEach(s => s.href = `${s.href}?t=${new Date().getTime()}`)
    }
}
