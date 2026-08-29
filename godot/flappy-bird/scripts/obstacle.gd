extends CharacterBody2D
class_name Obstacle

const OBSTACLE_VELOCITY := -215

signal player_hit_obstacle
signal player_scored

var obstacle_velocity = OBSTACLE_VELOCITY

func _physics_process(_delta: float) -> void:
	velocity.x = obstacle_velocity
	move_and_slide()
	
	if global_position.x < -100:
		queue_free()

func _on_pipe_body_entered(_body:Node2D) -> void:
	if _body is Player:
		player_hit_obstacle.emit()

func _on_score_area_body_exited(_body: Node2D) -> void:
	if _body is Player:
		player_scored.emit()
		
func stop() -> void:
	obstacle_velocity = 0.0
	
