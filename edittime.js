function GetPluginSettings() {
    return {
        "name": "NFC",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
        "id": "nfc",				// this is used to identify this plugin and is saved to the project; never change it
        "version": "1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
        "description": "Allow you to interact with NFC",
        "author": "Armaldio",
        "help url": "https://www.scirra.com/forum/viewtopic.php?f=153&t=122476&p=885174#p885174",
        "category": "Connection",				// Prefer to re-use existing categories, but you can set anything here
        "type": "object",				// either "world" (appears in layout and is drawn), else "object"
        "rotatable": false,					// only used when "type" is "world".  Enables an angle property on the object.
        "flags": 0						// uncomment lines to enable flags...
        | pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
        //	| pf_texture			// object has a single texture (e.g. tiled background)
        //	| pf_position_aces		// compare/set/get x, y...
        //	| pf_size_aces			// compare/set/get width, height...
        //	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
        //	| pf_appearance_aces	// compare/set/get visible, opacity...
        //	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
        //	| pf_animations			// enables the animations system.  See 'Sprite' for usage
        //	| pf_zorder_aces		// move to top, bottom, layer...
        //  | pf_nosize				// prevent resizing in the editor
        //	| pf_effects			// allow WebGL shader effects to be added
        //  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
        // a single non-tiling image the size of the object) - required for effects to work properly
    };
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name

// example				
//AddNumberParam("Number", "Enter a number to test if positive.");
AddCondition(0, cf_trigger, "On tag discovered", "Tag", "On tag discovered", "When any tag is triggered", "onAnyTagDiscovered");

AddCondition(1, cf_none, "NFC available", "Tag", "NFC available", "If NFC is available on this mobile", "onNFCAvailable");
AddCondition(10, cf_none, "NFC not available", "Tag", "NFC Not  available", "If NFC isNot Not available on this mobile", "onNFCNotAvailable");

AddCondition(2, cf_trigger, "on wait for tag", "Tag", "on wait for tag", "on wait for tag", "onWaitForTag");

AddCondition(3, cf_trigger, "on error waiting for tag", "Tag", "on error waiting for tag", "on error waiting for tag", "onErrorWaitingTag");

AddCondition(4, cf_trigger, "on write fail", "Tag", "on write fail", "on write fail", "onWriteFail");

AddCondition(5, cf_trigger, "on write success", "Tag", "on write success", "on write success", "onWriteSuccess");

AddCondition(6, cf_trigger, "on Share fail", "Tag", "on Share fail", "on Share fail", "onShareFail");

AddCondition(7, cf_trigger, "on Share success", "Tag", "on Share success", "on Share success", "onShareSuccess");

AddCondition(8, cf_trigger, "on Erase fail", "Tag", "on Erase fail", "on Erase fail", "onEraseFail");

AddCondition(9, cf_trigger, "on Erase success", "Tag", "on Erase success", "on Erase success", "onEraseSuccess");

AddCondition(11, cf_trigger, "on Read fail", "Tag", "on Read fail", "on Read fail", "onReadFail");

AddCondition(12, cf_trigger, "on Read success", "Tag", "on Read success", "on Read success", "onReadSuccess");

AddCondition(13, cf_trigger, "on removed trigger successfully", "Tag", "on removed trigger successfully", "on removed trigger successfully", "onListenerRemoved");

AddCondition(14, cf_trigger, "on error removing trigger", "Tag", "on error removing trigger", "on error removing trigger", "onErrorListenerRemoved");

AddCondition(15, cf_trigger, "on discover mime type", "Tag", "on discover mime type", "on discover mime type", "onDiscoveringMimeTag");

AddCondition(16, cf_trigger, "on error discovering mime type", "Tag", "on error discovering mime type", "on error discovering mime type", "onErrorDiscoveringMimeTag");
//TODO:add other conditions

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
//AddStringParam("Message", "Enter a string to alert.");
//AddAction(0, af_none, "Add tag listener", "Listener", "Add tag listener", "Add tag listener", "addTagDiscoveredListener");
//AddAction(1, af_none, "Add NDEF tag listener", "Listener", "Add NDEF tag listener", "Add NDEF tag listener", "addNdefListener");

AddStringParam("Message", "Enter the string to share");
AddAction(0, af_none, "Share data", "Actions", "Wait for tag and share {0}", "Wait for tag and share data via peer to peer", "share");

AddStringParam("Message", "Enter the string to write");
AddAction(1, af_none, "Write data", "Actions", "Wait for tag and write the message {0}", "Write data to tag", "write");

AddAction(2, af_none, "Erase tag", "Actions", "Wait for tag and erase it", "Wait for tag and erase it", "erase");

AddAction(3, af_none, "Read tag", "Actions", "Wait for tag and Read it", "Wait for tag and Read it", "read");

AddAction(4, af_none, "Remove NDEF listener", "Actions", "Removes the previously registered event listener", "Removes the previously registered event listener for NDEF tags added", "removeListener");

AddAction(5, af_none, "Check NFC Availability", "Actions", "Check NFC Availability", "Check NFC Availability", "checkNFC");

AddStringParam("Package", "The app to launch", '"not.yet.specified"');
AddAction(6, af_none, "Launch app", "Actions", "Launch app", "Launch an app corresponding to its package name", "launch");

/*AddStringParam("Mime type", '"text/mymime"');
 AddStringParam("Message", "Enter the string to write");
 AddAction(6, af_none, "Write data with MIME type", "Actions", "Wait for tag and write the message {0} with MIME type", "Write data to tag with MIME type", "writeMime");*/
////////////////////////////////////////Check NFC Availablity
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
AddExpression(0, ef_deprecated | ef_return_any, "Return the last readed datas", "Datas", "getLastData", "Return the last readed datas");
AddExpression(1, ef_return_any, "Return the last readed datas as raw JSON", "Datas", "getRawData", "Return the last readed datas");

AddStringParam("Raw Data", "The raw data from the NFC expression", 'NFC.getRawData');
AddExpression(2, ef_return_any, "Return the decoded payload based on the raw data", "Datas", "getPayload", "Return the payload as a string");

////////////////Return the last readed datas////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
    //new cr.Property(ept_integer, 	"My property",		77,		"An example property.")
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType() {
    return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType() {
    assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function (instance) {
    return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
    assert2(this instanceof arguments.callee, "Constructor called as a function");

    // Save the constructor parameters
    this.instance = instance;
    this.type = type;

    // Set the default property values from the property table
    this.properties = {};

    for (var i = 0; i < property_list.length; i++)
        this.properties[property_list[i].name] = property_list[i].initial_value;

    // Plugin-specific variables
    // this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function () {
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function () {
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function (property_name) {
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function (renderer) {
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function (renderer) {
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function (renderer) {
}