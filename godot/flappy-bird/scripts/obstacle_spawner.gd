extends Node2D
class_name ObstacleSpawner

@onready var spawn_timer: Timer = $SpawnTimer

var obstacle_scene: PackedScene = preload("res://scenes/obstacle.tscn")
signal player_hit_obstacle
signal player_scored

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta: float) -> void:
	pass

func _on_spawn_timer_timeout() -> void:
	var obstacle = obstacle_scene.instantiate()
	add_child(obstacle)
	obstacle.position.y = randf_range(-250.0, 0.0)
	obstacle.connect("player_hit_obstacle", _on_player_hit_obstacle)
	obstacle.connect("player_scored", _on_player_scored)

func start() -> void:
	spawn_timer.start()

func stop() -> void:
	spawn_timer.stop()

func _on_player_hit_obstacle() -> void:
	player_hit_obstacle.emit()
	
func _on_player_scored() -> void:
	player_scored.emit()
