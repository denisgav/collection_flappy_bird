extends Node2D
class_name Game

@onready var hud: HUD = $HUD
@onready var player: Player = $Player
@onready var obstacle_spawner: ObstacleSpawner = $ObstacleSpawner
@onready var ground: Ground = $Ground

var score := 0
var high_score := 0

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	hud.set_score(score)

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta: float) -> void:
	pass

func _on_player_game_started() -> void:
	start()

func _on_obstacle_spawner_player_hit_obstacle() -> void:
	die()

func _on_ground_player_death_zone_entered() -> void:
	die()
	
func _on_hud_game_retry() -> void:
	get_tree().reload_current_scene()

func start() -> void:
	obstacle_spawner.start()
	ground.start()
	hud.start()
	score = 0

func die() -> void:
	player.die()
	obstacle_spawner.stop()
	get_tree().call_group("obstacles", "stop")
	ground.stop()
	if score > high_score:
		high_score = score
	
	await get_tree().create_timer(0.5).timeout
	hud.show_game_over_screen(score, high_score)

func _on_obstacle_spawner_player_scored() -> void:
	if player.is_alive:
		score += 1
		hud.set_score(score)
		player.score()
