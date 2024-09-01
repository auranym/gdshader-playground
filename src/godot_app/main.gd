extends Control

@onready var _label: Label = $SubViewportContainer/SubViewport/Label
var _update_callback = JavaScriptBridge.create_callback(_update)


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var window = JavaScriptBridge.get_interface("window")
	window.godotAppUpdate = _update_callback


func _update(args):
	if args and args[0] is String:
		_label.text = args[0]
