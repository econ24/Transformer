var babel = require("babel-core"),
    Transform = require("stream").Transform;

function Transformer(options) {
	if (!(this instanceof Transformer)) return new Transformer(options);
	Transform.call(this, options);
	this.data = "";
}
Transformer.prototype = Object.create(Transform.prototype);
Transformer.prototype.constructor = Transformer;

Transformer.prototype._transform = function(chunk, encoding, callback) {
	this.data += chunk;
	callback();
}
Transformer.prototype._flush = function(callback) {
    var error = null;
    try {
        var transformed = babel.transform(this.data, { ast: false }).code;
    	this.push(transformed);
    }
    catch(e) {
        console.error("<Transformer> There was a kersplosion... :(");
        console.error(e.toString());
        error = e;
    }
    finally {
        callback(error);
    }
}

module.exports = Transformer;
