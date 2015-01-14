// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

var rt;
var nfc;
var lastData, lastID;

/////////////////////////////////////
// Plugin class
// *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
//          vvvvvvvv
cr.plugins_.nfc = function (runtime) {
    this.runtime = runtime;
};

(function () {
    /////////////////////////////////////
    // *** CHANGE THE PLUGIN ID HERE *** - must match the "id" property in edittime.js
    //                            vvvvvvvv
    var pluginProto = cr.plugins_.nfc.prototype;

    /////////////////////////////////////
    // Object type class
    pluginProto.Type = function (plugin) {
        this.plugin = plugin;
        this.runtime = plugin.runtime;
    };

    var typeProto = pluginProto.Type.prototype;

    // called on startup for each object type
    typeProto.onCreate = function () { };

    /////////////////////////////////////
    // Instance class
    pluginProto.Instance = function (type) {
        this.type = type;
        this.runtime = type.runtime;

        // any other properties you need, e.g...
        // this.myValue = 0;
    };

    var instanceProto = pluginProto.Instance.prototype;

    // called whenever an instance is created
    instanceProto.onCreate = function () {
        // note the object is sealed after this call; ensure any properties you'll ever need are set on the object
        // e.g...
        // this.myValue = 0;
        var self = this;
        rt = this.runtime;
    };

    // called whenever an instance is destroyed
    // note the runtime may keep the object after this call for recycling; be sure
    // to release/recycle/reset any references to other objects in this function.
    instanceProto.onDestroy = function () { };

    // called when saving the full state of the game
    instanceProto.saveToJSON = function () {
        // return a Javascript object containing information about your object's state
        // note you MUST use double-quote syntax (e.g. "property": value) to prevent
        // Closure Compiler renaming and breaking the save format
        return {
            // e.g.
            //"myValue": this.myValue
        };
    };

    // called when loading the full state of the game
    instanceProto.loadFromJSON = function (o) {
        // load from the state previously saved by saveToJSON
        // 'o' provides the same object that you saved, e.g.
        // this.myValue = o["myValue"];
        // note you MUST use double-quote syntax (e.g. o["property"]) to prevent
        // Closure Compiler renaming and breaking the save format
    };

    // only called if a layout object - draw to a canvas 2D context
    instanceProto.draw = function (ctx) { };

    // only called if a layout object in WebGL mode - draw to the WebGL context
    // 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
    // directory or just copy what other plugins do.
    instanceProto.drawGL = function (glw) { };

    // The comments around these functions ensure they are removed when exporting, since the
    // debugger code is no longer relevant after publishing.
    /**BEGIN-PREVIEWONLY**/
    instanceProto.getDebuggerValues = function (propsections) {
        // Append to propsections any debugger sections you want to appear.
        // Each section is an object with two members: "title" and "properties".
        // "properties" is an array of individual debugger properties to display
        // with their name and value, and some other optional settings.
        propsections.push({
            //"title": "My debugger section",
            //"properties": [
            // Each property entry can use the following values:
            // "name" (required): name of the property (must be unique within this section)
            // "value" (required): a boolean, number or string for the value
            // "html" (optional, default false): set to true to interpret the name and value
            //									 as HTML strings rather than simple plain text
            // "readonly" (optional, default false): set to true to disable editing the property

            // Example:
            // {"name": "My property", "value": this.myValue}
            //]
        });
    };

    instanceProto.onDebugValueEdited = function (header, name, value) {
        // Called when a non-readonly property has been edited in the debugger. Usually you only
        // will need 'name' (the property name) and 'value', but you can also use 'header' (the
        // header title for the section) to distinguish properties with the same name.
        //if (name === "My property")
        //this.myProperty = value;
    };
    /**END-PREVIEWONLY**/

    //////////////////////////////////////
    // Conditions
    function Cnds() { };

    // the example condition
    Cnds.prototype.onAnyTagDiscovered = function () {
        return true;
    };

    Cnds.prototype.onWaitForTag = function () {
        return true;
    };

    Cnds.prototype.onErrorWaitingTag = function () {
        return true;
    };

    Cnds.prototype.onWriteSuccess = function () {
        return true;
    };

    Cnds.prototype.onWriteFail = function () {
        return true;
    };

    Cnds.prototype.onShareSuccess = function () {
        return true;
    };

    Cnds.prototype.onShareFail = function () {
        return true;
    };

    Cnds.prototype.onEraseSuccess = function () {
        return true;
    };

    Cnds.prototype.onEraseFail = function () {
        return true;
    };

    Cnds.prototype.onReadSuccess = function () {
        return true;
    };

    Cnds.prototype.onReadFail = function () {
        return true;
    };

    Cnds.prototype.onErrorListenerRemoved = function () {
        return true;
    };

    Cnds.prototype.onListenerRemoved = function () {
        return true;
    };

    Cnds.prototype.onNFCAvailable = function () {
        return true;
    };

    Cnds.prototype.onNFCNotAvailable = function () {
        return true;
    };



    // ... other conditions here ...

    pluginProto.cnds = new Cnds();

    //////////////////////////////////////
    // Actions
    function Acts() { };


    Acts.prototype.checkNFC = function () {
        var self = this;

        /*nfc.enabled(function () {
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onNFCAvailable, self);
        }, function (err) {
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onNFCNotAvailable, self);
            //TODO: Put err in an expression
        });
        */

        return true;
    };

    Acts.prototype.removeListener = function () {
        var self = this;

        nfc.removeNdefListener(function (nfcEvent) {
        }, function () {
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onListenerRemoved, self);
        }, function (err) {
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onErrorListenerRemoved, self);
        });

    };

    Acts.prototype.share = function (text) {
        var self = this;

        var message = [
            ndef.textRecord(text)
        ];

        nfc.addNdefListener(function (nfcEvent) {
            nfc.share(function () {
                self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onShareSuccess, self);
            }, function (err) {
                self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onShareFail, self);
            });
        }, function () {
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onWaitForTag, self);
        }, function (err) {
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onErrorWaitingTag, self);
        });

    };

    Acts.prototype.erase = function () {
        var self = this;

        nfc.addNdefListener(function (nfcEvent) {
            nfc.erase(function () {
                self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onEraseSuccess, self);
            }, function (err) {
                self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onEraseFail, self);
            });
        }, function () {
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onWaitForTag, self);
        }, function (err) {
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onErrorWaitingTag, self);
        });

    };

    Acts.prototype.read = function () {
        var self = this;

        nfc.addNdefListener(function (nfcEvent) {
            //trigger
            lastData = JSON.stringify(nfcEvent.tag)
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onReadSuccess, self);
        }, function () {
            //win
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onWaitForTag, self);
        }, function (err) {
            //fail
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onErrorWaitingTag, self);
        });

    };

    Acts.prototype.write = function (text) {
        var self = this;

        nfc.addNdefListener(function (nfcEvent) {

            var message = [
                ndef.textRecord(text)
            ];

            nfc.write(message, function () {
                self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onWriteSuccess, self);
            }, function (err) {
                self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onWriteFail, self);
            });
        }, function () {
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onWaitForTag, self);
        }, function (err) {
            self.runtime.trigger(cr.plugins_.nfc.prototype.cnds.onErrorWaitingTag, self);
        });

    };

    pluginProto.acts = new Acts();

    //////////////////////////////////////
    // Expressions
    function Exps() { };

    Exps.prototype.getLastData = function (ret) // 'ret' must always be the first parameter - always return the expression's result through it!
    {
        //ret.set_int(1337); // return our value
        // ret.set_float(0.5);			// for returning floats
        // ret.set_string("Hello");		// for ef_return_string
        ret.set_any(lastData);			// for ef_return_any, accepts either a number or string
    };


    pluginProto.exps = new Exps();

}());