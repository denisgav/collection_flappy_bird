using System;
using UnityEngine;

public class Player : MonoBehaviour
{
    private Animator anim;
    private Rigidbody2D rigidBody;

    private const float FLAP_VELOCITY = 4.0f;
    private const float ROTATION_SPEED = 10.0f;

    public event EventHandler CollideWithObstacle;

    private bool isAlive = true;
    public bool IsAlive
    {
        get { return isAlive; }
        set { isAlive = value; }
    }

    private void Start()
    {
        Debug.Log("Player:Start");

        isAlive = true;

        // Get the Animator component attached to this GameObject
        anim = GetComponent<Animator>();

        // Get the Rigidbody2D component attached to this GameObject
        rigidBody = GetComponent<Rigidbody2D>();
        rigidBody.simulated = false;
    }

    private void FixedUpdate()
    {
        transform.rotation = Quaternion.Euler(0, 0, rigidBody.linearVelocity.y*ROTATION_SPEED);
    }

    public void OnStart()
    {
        Debug.Log("Player:OnStart");
        // Enable gravity
        rigidBody.simulated = true;
        // Trigger the transition
        anim.SetTrigger("Start"); 
    }

    public void OnGameOver()
    {
        Debug.Log("Player:OnGameOver");
        isAlive = false;
        // Trigger the transition
        //anim.SetTrigger("GameOver");
    }

    public void OnFlap()
    {
        if(isAlive){
            Debug.Log("Player:OnFlap");
            rigidBody.linearVelocity = Vector2.up * FLAP_VELOCITY;
        }
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if(isAlive)
        {
            Debug.Log("Player:Physically collided with: " + collision.gameObject.name);
            if(collision.gameObject.name == "Ground" || collision.gameObject.name == "UpperPipe" || collision.gameObject.name == "LowerPipe")
            {
                CollideWithObstacle?.Invoke(this, EventArgs.Empty);
            }
        }
    }
}
