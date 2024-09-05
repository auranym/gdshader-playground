extends Control

var _update_ref: JavaScriptObject
var _shader: Shader


func _ready() -> void:
	if OS.has_feature("web"):
		_update_ref = JavaScriptBridge.create_callback(_update)
		var window = JavaScriptBridge.get_interface("window")
		window.updateApp = _update_ref
		_shader = Shader.new()
		$SubViewportContainer.material.shader = _shader
	else:
		print("Platform is not web.")


func _update(_args):
	if OS.has_feature("web"):
		var window = JavaScriptBridge.get_interface("window")
		window.listenForConsole()
		_shader.code = window.shaderCode
		window.stopListeningForConsole()
	else:
		print("Platform is not web.")
