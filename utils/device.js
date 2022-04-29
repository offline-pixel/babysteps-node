const device = {
    detect: function(req) {
        return new Promise((resolve, reject) => {
            try {
                const _ip = req.socket.remoteAddress
                let _ua = req.headers['user-agent'],
                _device = {};
                if (/mobile/i.test(_ua)) {
                    _device.Mobile = true;
                }
                if (/like Mac OS X/.test(_ua)) {
                    _device.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(_ua)[2].replace(/_/g, '.');
                    _device.iPhone = /iPhone/.test(_ua);
                    _device.iPad = /iPad/.test(_ua);
                }
                if (/Android/.test(_ua)) {
                    _device.Android = /Android ([0-9\.]+)[\);]/.exec(_ua)[1];
                }
                if (/webOS\//.test(_ua)){
                    _device.webOS = /webOS\/([0-9\.]+)[\);]/.exec(_ua)[1];
                }
                if (/(Intel|PPC) Mac OS X/.test(_ua)) {
                    _device.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(_ua)[2].replace(/_/g, '.') || true;
                }
                if (/Windows NT/.test(_ua)) {
                    _device.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(_ua)[1];
                }
                resolve({ _device, _ua, _ip })
            } catch {
                reject({})
            }
        })
    }
}

module.exports = device
