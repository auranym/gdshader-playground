extends Control

@onready var _label: Label = $SubViewportContainer/SubViewport/Label
var _update_ref = JavaScriptBridge.create_callback(_update)


func _ready() -> void:
	var window = JavaScriptBridge.get_interface("window")
	window.updateApp = _update_ref


func _update(_args):
	var window = JavaScriptBridge.get_interface("window")
	_label.text = window.shaderCode
