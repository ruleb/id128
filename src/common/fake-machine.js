const { randomBytes } = require('./random-bytes');

const _mac_address = Symbol('mac-address');

class FakeMachine {
	constructor() {
		this.reset();
	}

	get mac_address() {
		let mac_address = this[_mac_address];

		if (! mac_address) {
			mac_address = this[_mac_address] = randomBytes(6);
			mac_address[0] |= 0b00000001;
		}

		return mac_address;
	}

	reset() {
		this[_mac_address] = null;
	}
}

module.exports = new FakeMachine;
