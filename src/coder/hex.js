const { InvalidDecodingError, InvalidEncodingError } = require('./error.js');

const BYTE_TO_HEX = Array
	.from({length: 256})
	.map((val, key) => key.toString(16).padStart(2, '0').toUpperCase());

const HEX_TO_BYTE = BYTE_TO_HEX.reduce(
	(mapping, hex, idx) => {
		mapping[hex.toUpperCase()] = idx;
		return mapping;
	},
	Object.create(null)
);

const VALID_ENCODING = new RegExp('^[0-9A-Fa-f]{32}$');

class HexCoder {
	decode(encoding) {
		if (! this.validateEncoding(encoding)) {
			throw new InvalidDecodingError('Requires a 32-character hex string');
		}

		const normalized_encoding = encoding.toUpperCase();
		let bytes = new Uint8Array(16);

		for (
			let dst=0, src=0, len=bytes.length;
			dst < len;
			dst += 1, src += 2
		) {
			bytes[dst] = HEX_TO_BYTE[normalized_encoding.substr(src, 2)];
		}

		return bytes;
	}

	encode(bytes) {
		if (! this.validateBytes(bytes)) {
			throw new InvalidEncodingError('Requires a 16-byte Uint8Array');
		}

		let encoding = '';
		for (let byt of bytes) { encoding += BYTE_TO_HEX[byt] };
		return encoding;
	}

	validateEncoding(encoding) {
		return true
			&& (typeof encoding === 'string' || encoding instanceof String)
			&& VALID_ENCODING.test(encoding);
	}

	validateBytes(bytes) {
		return true
			&& (bytes instanceof Uint8Array)
			&& bytes.length === 16;
	}
}

module.exports = new HexCoder;
