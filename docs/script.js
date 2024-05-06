class Resource:
    def __init__(self, name, initial_amount=0):
        self.name = name
        self.amount = initial_amount

class Loop:
    def __init__(self, name, output_resource, input_resources=None):
        self.name = name
        self.output_resource = output_resource
        self.input_resources = input_resources if input_resources else []

class Player:
    def __init__(self):
        self.resources = {}
        self.loops = []

    def add_resource(self, resource):
        self.resources[resource.name] = resource

    def add_loop(self, loop):
        self.loops.append(loop)

    def produce(self):
        for loop in self.loops:
            input_met = True
            for resource in loop.input_resources:
                if self.resources.get(resource.name, 0) < resource.amount:
                    input_met = False
                    break
            if input_met:
                for resource in loop.input_resources:
                    self.resources[resource.name] -= resource.amount
                self.resources[loop.output_resource.name] += 1

# Example usage:
player = Player()
player.add_resource(Resource("Wood"))
player.add_resource(Resource("Stone"))
player.add_loop(Loop("Woodcutter", Resource("Wood"), [Resource("Stone", 5)]))
player.produce()
