/* sample config */
const config = {
    host: '',
    rrServer: ''
}

class RemoteRefreshClient {
    constructor (config) {
        this.socket = new io(config.rrServer)
        this.webpage = new LivePage();
        this.socket.on('connected', () => his.socket.emit('webpage:register', config.host))
        this.socket.on('reload', () => this.webpage.reload())
        this.socket.on('refreshCSS', () => this.webpage.refreshCSS())
    }
}