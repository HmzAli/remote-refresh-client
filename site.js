class LivePage {
    constructor (document) {
        this.document = document;
        this.stylesheets = this.document.querySelectorAll('link[rel="stylesheet"]')
    }

    get siteURL() {
        return document.location.host
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
        this.webpage = new LivePage(document)
        this.socket = io(lrServer)
        this.socket.on('connect', socket => {
            console.log('connected')
            this.socket.emit('site:register', this.webpage.siteURL)
        })

        this.socket.on('site:reload', () => { 
            console.log('reloading site'); 
            this.webpage.reload()
        })
        this.socket.on('site:refreshCSS', () => this.webpage.refreshCSS())
    }
}

new RemoteRefreshClient('http://localhost:3000')