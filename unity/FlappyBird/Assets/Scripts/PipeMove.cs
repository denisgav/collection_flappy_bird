using UnityEngine;

public class PipeMove : MonoBehaviour
{
    private const float MOVE_SPEED = 1.5f;

    private bool isActive = true;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
         isActive = true;
    }

    // Update is called once per frame
    void Update()
    {
        if(isActive)
        {
            transform.position += Vector3.left * MOVE_SPEED * Time.deltaTime;
        }
    }

    public void OnGameOver()
    {
        isActive = false;
    }
}
