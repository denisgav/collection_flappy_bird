Commands to install rust:
    sudo apt update && sudo apt install build-essential gcc make -y
    sudo apt update && sudo apt install -y pkg-config libudev-dev
    sudo apt update && sudo apt install -y libasound2-dev
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

Cargo commands:
    cargo --version
    cargo new FlappyBird
    cd FlappyBird
    cargo build
    cargo run
    ./target/debug/FlappyBird