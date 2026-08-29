extends CanvasLayer
class_name HUD

@onready var score_label: Label = $ScoreLabel
@onready var start_message: TextureRect = $StartMessage
@onready var game_over_screen: GameOverScreen = $GameOverScreen

signal game_retry

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	start_message.visible = true
	game_over_screen.visible = false

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta: float) -> void:
	pass

func set_score(score:int) -> void:
	score_label.text = str(score)
	
func hide_start_message() -> void:
	var tween: Tween = get_tree().create_tween()
	tween.tween_property(start_message, "modulate:a", 0.0, 0.5)
	
func show_game_over_screen(score:int, high_score:int) -> void:
	game_over_screen.init_screen(score, high_score)
	
	game_over_screen.modulate.a = 0.0
	game_over_screen.visible = true
	
	var tween: Tween = get_tree().create_tween()
	tween.tween_property(game_over_screen, "modulate:a", 1.0, 0.5)
	

func start() -> void:
	hide_start_message()
	
func stop() -> void:
	pass

func _on_game_over_screen_game_retry() -> void:
	game_retry.emit()
