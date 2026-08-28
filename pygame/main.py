#!/usr/bin/env python3

from game import Game

# =========================================================
def main():
    game_inst:Game = Game()
    game_inst.init()
    game_inst.main()

# =========================================================
if __name__ == "__main__":
    main()