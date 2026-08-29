extends Control
class_name GameOverScreen

@onready var score_label: Label = $Panel/ScoreLabel
@onready var high_score_label: Label = $Panel/HighScoreLabel

signal game_retry

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta: float) -> void:
	pass

func init_screen(score:int, high_score:int) -> void:
	score_label.text = "SCORE: " + str(score)
	high_score_label.text = "BEST: " + str(high_score)

func _on_retry_button_pressed() -> void:
	game_retry.emit()
