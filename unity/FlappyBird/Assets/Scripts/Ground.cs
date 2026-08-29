using UnityEngine;

public class Ground : MonoBehaviour
{
    private bool isActive = false;
    public bool IsActive
    {
        get { return isActive; }
        set { isActive = value; }
    }

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OnStart()
    {
        isActive = true;
    }

    public void OnGameOver()
    {
        isActive = false;
    }
}
