using System;
using System.Collections.Generic;
using UnityEngine;

public class PipeSpawner : MonoBehaviour
{
    private const float SPAWN_TIME = 3.0f;
    private const float PIPE_RAND_MIN_Y = 0.0f;
    private const float PIPE_RAND_MAX_Y = 3.0f;
    [SerializeField] private GameObject _pipe;

    [SerializeField] private Transform _parentTransform;

    private List<GameObject> activePipes = new List<GameObject>();
    public event EventHandler IncreaseScore;
    
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

    private float timer = 0.0f;
    // Update is called once per frame
    void Update()
    {
        if(isActive == false)
        {
            return;
        }

        timer += Time.deltaTime;
        if(timer >= SPAWN_TIME)
        {
            SpawnPipe();
            DestroyPipeOutOfBounds();
            timer = 0.0f;
        }
    }

    void SpawnPipe()
    {
        Vector3 spawnPosition = new Vector3(10, UnityEngine.Random.Range(PIPE_RAND_MIN_Y, PIPE_RAND_MAX_Y), 0);
        GameObject pipe = Instantiate(_pipe, spawnPosition, Quaternion.identity, _parentTransform);
       
        activePipes.Add(pipe);
        
        PipeIncreaseScore pipeIncreaseScore = pipe.GetComponent<PipeIncreaseScore>();
        pipeIncreaseScore.IncreaseScore += OnPipeIncreaseScore;
    }

    void DestroyPipeOutOfBounds()
    {
        for(int i = activePipes.Count - 1; i >= 0; i--)
        {
            if(activePipes[i] == null)
            {
                activePipes.RemoveAt(i);
            }
            else 
            {
                if(activePipes[i].transform.position.x < -20)
                {
                    PipeIncreaseScore pipeIncreaseScore = activePipes[i].GetComponent<PipeIncreaseScore>();
                    pipeIncreaseScore.IncreaseScore -= OnPipeIncreaseScore;

                    Destroy(activePipes[i]);
                    activePipes.RemoveAt(i);
                }
            }
        }
    }

    void OnPipeIncreaseScore(object sender, EventArgs e)
    {
        Debug.Log("PipeSpawner:OnPipeIncreaseScore");
        IncreaseScore?.Invoke(this, EventArgs.Empty);
    }

    public void OnStart()
    {
        SpawnPipe();
        isActive = true;
    }

    public void OnGameOver()
    {
        isActive = false;
        foreach(GameObject pipe in activePipes)
        {
            PipeMove pipeMove = pipe.GetComponent<PipeMove>();
            if(pipeMove != null)
            {
                pipeMove.OnGameOver();
            }
        }
    }

}
