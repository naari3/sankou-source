import { System, Not } from "ecsy";
import { Engine, Position, Sprite, SpriteState } from "../components";
import { Sprite as PIXISprite } from "pixi.js";

class SpriteSystem extends System {
  execute(delta: number, time: number): void {
    let app = this.queries.engine.results[0].getComponent(Engine)?.app;
    this.queries.creates.results.forEach((entity) => {
      let spriteInfo = entity.getComponent(Sprite);
      let position = entity.getComponent(Position);
      let sheet = app?.loader.resources[spriteInfo?.name || ""];
      let sprite = new PIXISprite(sheet?.texture);
      sprite.scale.x = sprite.scale.y = 0.2;
      if (sprite && position) {
        sprite.x = position?.x;
        sprite.y = position?.y;
      }
      app?.stage.addChild(sprite);
      entity.addComponent(SpriteState, { ref: sprite });
    });

    this.queries.updates.results.forEach((entity) => {
      let spriteInfo = entity.getComponent(Sprite);
      let position = entity.getComponent(Position);
      let spriteState = entity.getMutableComponent(SpriteState);
      let sprite = spriteState?.ref;
      if (spriteState && sprite && position) {
        sprite.x = position?.x;
        sprite.y = position?.y;
        spriteState.ref = sprite;
      }
    });
  }
}

SpriteSystem.queries = {
  creates: {
    components: [Sprite, Not(SpriteState), Position],
  },
  deletes: {
    components: [Not(Sprite), SpriteState],
  },
  updates: {
    components: [Sprite, SpriteState, Position],
  },
  engine: { components: [Engine] },
};

export { SpriteSystem };
