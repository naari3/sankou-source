import { System } from "ecsy";
import type { World, Attributes } from "ecsy";
import { Engine } from "../components";
import { Application } from "pixi.js";

class EngineSystem extends System {
  constructor(world: World, attributes: Attributes) {
    super(world, attributes);
    console.log("Creation of EngineSystem");
  }

  execute(delta: number, time: number) {
    let engine = this.queries.engine.results[0].getMutableComponent(Engine);
    if (engine && !engine.app) {
      engine.app = new Application(engine.config);
      engine.app.stage.sortableChildren = true;
      engine.elem?.appendChild(engine.app.view);
    }
  }
}

EngineSystem.queries = {
  engine: {
    components: [Engine],
  },
};

export { EngineSystem };
