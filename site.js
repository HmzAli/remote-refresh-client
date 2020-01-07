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

class RemoteRefreshClient {
    constructor (lrServer) {
        this.socket = new io(lrServer)
        this.webpage = new LivePage()
        this.addEventListeners();
    }

    addEventListeners() {
        this.socket.on('connected', () => this.socket.emit('site:register', siteURL))
        this.socket.on('reload', () => this.webpage.reload())
        this.socket.on('refreshCSS', () => this.webpage.refreshCSS())
    }
}

new RemoteRefreshClient('http://localhost:8080')