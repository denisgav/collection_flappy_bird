using UnityEngine;
using UnityEngine.InputSystem;

public class GameHandler : MonoBehaviour, MyInputActions.IPlayerActions
{
    public Player player;
    public PipeSpawner pipeSpawner;
    public Ground ground;
    private bool isStarted = false;

    private void Start()
    {
        Debug.Log("GameHandler:Start");
        player.CollideWithObstacle += OnPlayerCollideWithObstacle;
        pipeSpawner.IncreaseScore += OnPipeIncreaseScore;
    }

    private MyInputActions m_Actions;                         // Source code representation of asset.
    private MyInputActions.PlayerActions m_PlayerActions;     // Source code representation of action map.

    void Awake()
    {
        m_Actions = new MyInputActions();                     // Create asset object.
        m_PlayerActions = m_Actions.Player;                   // Extract action map object.
        m_PlayerActions.AddCallbacks(this);                   // Register callback interface IPlayerActions.
    }

    void OnDestroy()
    {
        m_Actions.Dispose();                              // Destroy asset object.
    }

    void OnEnable()
    {
        m_PlayerActions.Enable();                                // Enable all actions within map.
    }

    void OnDisable()
    {
        m_PlayerActions.Disable();                               // Disable all actions within map.
    }

    #region Interface implementation of MyActions.IPlayerActions

    // Invoked when "Move" action is either started, performed or canceled.
    public void OnFlap(InputAction.CallbackContext context)
    {
        if(context.started)
        {
            if(isStarted == false)
            {
                isStarted = true;
                OnStart();
            }
            player.OnFlap();
        }
    }

    #endregion

    public void OnStart()
    {
        player.OnStart();
        pipeSpawner.OnStart();
        ground.OnStart();
    }

    public void OnGameOver()
    {
        player.OnGameOver();
        pipeSpawner.OnGameOver();
        ground.OnGameOver();
    }
    private void OnPlayerCollideWithObstacle(object sender, System.EventArgs e)
    {
        Debug.Log("GameHandler:OnPlayerCollideWithObstacle");
        OnGameOver();
    }

    private void OnPipeIncreaseScore(object sender, System.EventArgs e)
    {
        Debug.Log("GameHandler:OnPipeIncreaseScore");
        // Handle score increase here
    }
}
