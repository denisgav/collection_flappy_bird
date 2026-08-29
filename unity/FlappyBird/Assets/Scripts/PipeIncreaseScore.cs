using UnityEngine;
using System;
public class PipeIncreaseScore : MonoBehaviour
{
    public event EventHandler IncreaseScore;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        Debug.Log("PipeIncreaseScore:Triggered by: " + collision.gameObject.name);
        IncreaseScore?.Invoke(this, EventArgs.Empty);
    }
}
