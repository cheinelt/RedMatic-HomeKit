const Accessory = require('./lib/accessory');

module.exports = class HmipBsm2 extends Accessory {
    init(config) {
        this.addService('Lightbulb', config.name)
            .get('On', config.deviceAddress + ':4.STATE')
            .set('On', config.deviceAddress + ':4.STATE');
        this.addService('Lightbulb', config.name)
            .get('On', config.deviceAddress + ':8.STATE')
            .set('On', config.deviceAddress + ':8.STATE');
    }
};
