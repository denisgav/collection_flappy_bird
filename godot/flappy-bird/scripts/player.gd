extends RigidBody2D
class_name Player

@onready var animation_player: AnimationPlayer = $AnimationPlayer

@onready var flap_sound: AudioStreamPlayer = $FlapSound
@onready var hit_sound: AudioStreamPlayer = $HitSound
@onready var score_sound: AudioStreamPlayer = $ScoreSound

signal game_started

# Boolean variable. Set it to true after game started
var started := false

var is_alive := true

const MAX_ANGLE_FALL_DOWN := 90.0
const MAX_ANGLE_GO_UP := -30.0
const ANGULAR_VELOCITY := 5.0

const FLAP_FORCE := 340.0

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta: float) -> void:
	pass

func _physics_process(_delta: float) -> void:
	if Input.is_action_just_pressed("flap") && is_alive:
		if started == false:
			start_game()
		flap()
	bird_rotation()

func bird_rotation() -> void:
	# Fall down
	if linear_velocity.y > 0:
		if rotation_degrees <= MAX_ANGLE_FALL_DOWN:
			angular_velocity = ANGULAR_VELOCITY
		else:
			rotation_degrees = MAX_ANGLE_FALL_DOWN
			angular_velocity = 0
	# Go up
	if linear_velocity.y < 0:
		if rotation_degrees <= MAX_ANGLE_GO_UP:
			rotation_degrees = MAX_ANGLE_GO_UP
			angular_velocity = 0
		else:
			angular_velocity = -ANGULAR_VELOCITY

func start_game() -> void:
	started = true
	gravity_scale = 1.0
	game_started.emit()
	
func flap() -> void:
	linear_velocity.y = -FLAP_FORCE
	angular_velocity = -ANGULAR_VELOCITY
	animation_player.play("flap_blue")
	flap_sound.play()

func score() -> void:
	score_sound.play()

func die() -> void:
	if is_alive:
		is_alive = false
		hit_sound.play()
