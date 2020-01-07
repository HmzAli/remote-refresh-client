import io from 'socket.io-client'

const config = {
    liveReloadServer: 'http://localhost:9000'
}

class LiveReloadEditor {
    constructor(lrServer) {
        this.socket = new io(lrServer)
    }

    setup() {
        const newSite = confirm('Enter the url of the site to live reload, e.g. http://mywebsite.com')
        if (!newSite) {
            return
        }

        if (localStorage.get('lrSite') === newSite) {
            return alert('Site already configured for live reloading')
        }

        localStorage.setItem('lrSite', newSite)
        this.socket.emit('editor:register', newSite)
    }

    reloadSite() {
        this.socket.emit('editor:reloadSite')
    }

    refreshSiteCSS() {
        this.socket.emit('editor:refreshCSS')
    }
}

export default new LiveReloadEditor(config.liveReloadServer);
