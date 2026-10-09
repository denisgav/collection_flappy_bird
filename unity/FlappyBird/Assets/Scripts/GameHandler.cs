using TMPro;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameHandler : MonoBehaviour, MyInputActions.IPlayerActions
{
    public Player player;
    public PipeSpawner pipeSpawner;
    public Ground ground;

    public GameObject scoreCanvas;
    public TextMeshProUGUI scoreText;

    public GameObject messagePanel;

    public TextMeshProUGUI gameOverScoreText;
    public TextMeshProUGUI gameOverHighScoreText;

    public GameObject gameOverCanvas;

    public Button restartButton;

    private bool isStarted = false;
    private bool isGameOver = false;

    private int score = 0;
    private int highScore = 0;

    private void Start()
    {
        Debug.Log("GameHandler:Start");
        player.CollideWithObstacle += OnPlayerCollideWithObstacle;
        pipeSpawner.IncreaseScore += OnPipeIncreaseScore;
        score = 0;
    }

    private MyInputActions m_Actions;                         // Source code representation of asset.
    private MyInputActions.PlayerActions m_PlayerActions;     // Source code representation of action map.

    void Awake()
    {
        m_Actions = new MyInputActions();                     // Create asset object.
        m_PlayerActions = m_Actions.Player;                   // Extract action map object.
        m_PlayerActions.AddCallbacks(this);                   // Register callback interface IPlayerActions.

        restartButton.onClick.AddListener(OnRestartClicked);
        
        UpdateUI();
    }

    void OnDestroy()
    {
        m_Actions.Dispose();                              // Destroy asset object.
        restartButton.onClick.RemoveListener(OnRestartClicked);
    }

    private void OnRestartClicked()
    {
        SceneManager.LoadScene(
            SceneManager.GetActiveScene().buildIndex);
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
        if(isGameOver)
        {
            return;
        }
        
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
        isGameOver = false;
        isStarted = true;
        player.OnStart();
        pipeSpawner.OnStart();
        ground.OnStart();
        UpdateUI();
    }

    public void OnRestart()
    {
        isGameOver = false;
        isStarted = false;
        score = 0;
        scoreText.text = score.ToString();
        UpdateUI();
    }

    public void OnGameOver()
    {
        isGameOver = true;
        isStarted = false;

        if(score > highScore)
        {
            highScore = score;
        }

        gameOverScoreText.text = "SCORE: " + score.ToString();
        gameOverHighScoreText.text = "BEST: " + highScore.ToString();

        player.OnGameOver();
        pipeSpawner.OnGameOver();
        ground.OnGameOver();
        UpdateUI();
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
        score ++;
        scoreText.text = score.ToString();
    }

    private void UpdateUI()
    {
        if((isStarted == false) && (isGameOver == false))
        {
            messagePanel.SetActive(true);
            scoreCanvas.SetActive(false);
            gameOverCanvas.SetActive(false);
        }
        else
        {
            if(isGameOver)
            {
                messagePanel.SetActive(false);
                scoreCanvas.SetActive(false);
                gameOverCanvas.SetActive(true);
            }
            else
            {
                messagePanel.SetActive(false);
                scoreCanvas.SetActive(true);
                gameOverCanvas.SetActive(false);
            }
        }
        
    }
}
