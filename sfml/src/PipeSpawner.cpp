#include <algorithm>

#include "PipeSpawner.h"

#include "settings.h"

PipeSpawner :: PipeSpawner()
{
    if (!m_pipeTextureBottom.loadFromFile(RESOURCE_PIPE_GREEN_PATH))
    {
        throw std::runtime_error("Failed to load pipe texture");
    }

    m_rng.seed(std::random_device{}());
}

bool shouldKeepPipe(const std::unique_ptr<Pipe>& pipe){
    return pipe->outOfWindow() == false;
}

void PipeSpawner :: update()
{
    if (m_started)
    {
        if (m_pipeTimer <= 0)
        {
            spawnPipePair();
            m_pipeTimer = PIPE_SPAWNER_TIMEOUT;
        }

        --m_pipeTimer;
    }

    if (m_started)
    {
        for (auto& pipe : m_pipes)
        {
            pipe->update();
        }

        m_pipes.erase(
            std::remove_if(
                m_pipes.begin(),
                m_pipes.end(),
                shouldKeepPipe
            ),
            m_pipes.end()
        );
    }

    // std::remove_if Defined in <algorithm>, std::remove_if rearranges elements in a range but does not actually alter the size of the container. 
    // What it does: It scans a given range and shifts all elements that do not match a specific condition (predicate) to the front 
    // of the container.What it leaves behind: The elements at the end of the container are left in a "valid but unspecified" state.
    // Return Value: It returns an iterator pointing to the first element of the "junk" data that should be deleted.

    // std::vector::erase This is a member function of the std::vector class template. 
    // It is the component that actually modifies the vector's size. 
    // What it does: It physically destroys the elements within a specified iterator range and updates the vector's internal size tracking.
    // Memory impact: It calls the destructors of the removed elements but does not reduce the capacity (allocated memory) of the vector.
    // Return Value: It returns an iterator pointing to the element that now follows the last removed element.
   
}

void PipeSpawner :: draw(sf::RenderWindow& window)
{
    for (auto& pipe : m_pipes)
    {
        pipe->draw(window);
    }
}

void PipeSpawner :: onStart()
{
    m_started = true;
}

void PipeSpawner :: onGameOver()
{
    m_started = false;
}

void PipeSpawner :: spawnPipePair()
{
    std::uniform_int_distribution<int> dist(
        PIPE_SPAWNER_POSY_RAND_RANGE_MIN,
        PIPE_SPAWNER_POSY_RAND_RANGE_MAX);

    float yTop =
        static_cast<float>(dist(m_rng));

    float yBottom =
        yTop +
        PIPE_SPAWNER_POSY_GAP +
        RESOURCE_PIPE_HEIGHT;

    std::unique_ptr<Pipe> top =
        std::make_unique<Pipe>(
            PIPE_SPAWNER_POS_X,
            yTop,
            m_pipeTextureBottom,
            true);

    std::unique_ptr<Pipe> bottom =
        std::make_unique<Pipe>(
            PIPE_SPAWNER_POS_X,
            yBottom,
            m_pipeTextureBottom,
            false);

    bottom->scoreListener = scoreListener;

    m_pipes.push_back(std::move(top));
    m_pipes.push_back(std::move(bottom));
}

bool PipeSpawner :: pipeCollideWithRect(const sf::FloatRect & rect)  const
{
    bool collisionPipes = false;

    for (auto& pipe : m_pipes)
    {
        if (rect.intersects(pipe->getBounds()))
        {
            collisionPipes = true;
            break;
        }
    }

    return collisionPipes;
}