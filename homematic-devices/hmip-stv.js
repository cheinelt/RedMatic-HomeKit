const Accessory = require('./lib/accessory');

module.exports = class HmipStv extends Accessory {
    init(config) {
        this.addService('MotionSensor', config.name)
            .get('MotionDetected', config.deviceAddress + ':1.MOTION')
            .get('StatusLowBattery', config.deviceAddress + ':0.LOWBAT', (value, c) => {
                return value ? c.BATTERY_LEVEL_LOW : c.BATTERY_LEVEL_NORMAL;
            })
            .get('StatusTampered', config.deviceAddress + ':0.SENSOR_ERROR', value => {
                return Boolean(value);
            });

        this.addService('BatteryService', config.name)
            .get('StatusLowBattery', config.deviceAddress + ':0.LOW_BAT', (value, c) => {
                return value ? c.BATTERY_LEVEL_LOW : c.BATTERY_LEVEL_NORMAL;
            })
            .get('BatteryLevel', config.deviceAddress + ':0.OPERATING_VOLTAGE', this.percent)
            .update('ChargingState', 2);
    }
};
