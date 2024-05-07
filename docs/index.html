import time
import threading

class Game:
    def __init__(self):
        self.resource = 0
        self.resource_per_second = 1
        self.upgrade_cost = 10
        self.upgrade_multiplier = 2
        self.running = False

    def start(self):
        self.running = True
        threading.Thread(target=self.generate_resources, daemon=True).start()

    def stop(self):
        self.running = False

    def upgrade(self):
        if self.resource >= self.upgrade_cost:
            self.resource -= self.upgrade_cost
            self.upgrade_cost *= self.upgrade_multiplier
            self.resource_per_second *= self.upgrade_multiplier

    def generate_resources(self):
        while self.running:
            self.resource += self.resource_per_second
            time.sleep(1)

# Creating an instance of the game
game = Game()
