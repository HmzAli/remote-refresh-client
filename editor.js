import io from 'socket.io-client'

const config = {
    liveReloadServer: 'http://localhost:3000'
}

class LiveReloadClient {
    constructor(lrServer) {
        this.socket = new io(lrServer)
        let site = this.getSite()
        if (!!site) {
            this.socket.emit('editor:register', site)
        } else {
            this.setUp()
        }
    }

    getSite() {
        return localStorage.getItem('lrSite')
    }

    setUp() {
        const newSite = prompt('Enter the url of the site to live reload, e.g. http://mywebsite.com')
        if (!newSite) {
            return
        }

        if (localStorage.getItem('lrSite') === newSite) {
            return alert('Site already configured for live reloading')
        }

        localStorage.setItem('lrSite', newSite)
        this.socket.emit('editor:register', newSite)
    }

    reload() {
        this.socket.emit('editor:reload')
    }

    refreshCSS() {
        this.socket.emit('editor:refreshCSS')
    }
}

export default new LiveReloadClient(config.liveReloadServer);
