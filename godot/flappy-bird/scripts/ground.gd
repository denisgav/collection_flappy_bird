extends StaticBody2D
class_name Ground
@export var animation_player: AnimationPlayer

signal player_death_zone_entered

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta: float) -> void:
	pass
	
func start() -> void:
	animation_player.play("scroll")
	
func stop() -> void:
	animation_player.pause()

func _on_death_zone_body_entered(_body: Node2D) -> void:
	if _body is Player:
		player_death_zone_entered.emit()
