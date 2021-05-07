import { System } from "ecsy";
import { Velocity, Position } from "../components";

class MovableSystem extends System {
  execute(delta: number, time: number): void {
    this.queries.moving.results.forEach((entity) => {
      let velocity = entity.getComponent(Velocity);
      let position = entity.getMutableComponent(Position);
      if (position && velocity) {
        position.x += velocity.x * delta;
        position.y += velocity.y * delta;

        if (position.x > window.innerWidth + 100) position.x = -100;
        if (position.x < -100) position.x = window.innerWidth;
        if (position.y > window.innerHeight + 100) position.y = -100;
        if (position.y < -100) position.y = window.innerHeight;
      }
    });
  }
}

MovableSystem.queries = {
  moving: {
    components: [Velocity, Position],
  },
};

export { MovableSystem };
