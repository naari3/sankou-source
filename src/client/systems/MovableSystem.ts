import { System } from "ecsy";
import { Velocity, Position, SpriteState, Lifetime } from "../components";

class MovableSystem extends System {
  execute(delta: number, time: number): void {
    this.queries.moving.results.forEach((entity) => {
      let spriteState = entity.getComponent(SpriteState);
      let lifetime = entity.getComponent(Lifetime);
      let velocity = entity.getMutableComponent(Velocity);
      let position = entity.getMutableComponent(Position);
      let sprite = spriteState?.ref;
      if (position && velocity && sprite && lifetime) {
        position.x += velocity.x * lifetime.time;
        position.y += velocity.y * lifetime.time;

        if (position.x > window.innerWidth + sprite.width) position.x = -sprite.width;
        if (position.x < -sprite.width) position.x = window.innerWidth;
        if (position.y > window.innerHeight + sprite.height) position.y = -sprite.height;
        if (position.y < -sprite.height) position.y = window.innerHeight;
      }
    });
  }
}

MovableSystem.queries = {
  moving: {
    components: [Velocity, Position, Lifetime, SpriteState],
  },
};

export { MovableSystem };
