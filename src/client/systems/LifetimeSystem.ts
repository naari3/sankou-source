import { System } from "ecsy";
import { Velocity, Position, SpriteState, Lifetime } from "../components";

class LifetimeSystem extends System {
  execute(delta: number, time: number): void {
    this.queries.lifetimes.results.forEach((entity) => {
      let lifetime = entity.getMutableComponent(Lifetime);
      if (lifetime) lifetime.time += 1;
    });
  }
}

LifetimeSystem.queries = {
  lifetimes: {
    components: [Lifetime],
  },
};

export { LifetimeSystem };
