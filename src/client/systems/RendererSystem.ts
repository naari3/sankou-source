import { System } from "ecsy";
import { Engine, Renderable, Shape } from "../components";

class RendererSystem extends System {
  execute(delta: number, time: number): void {
    let app = this.queries.engine.results[0].getComponent(Engine)?.app;
    this.queries.renderables.results.forEach((entity) => {});
  }
}

RendererSystem.queries = {
  engine: { components: [Engine] },
  renderables: { components: [Renderable, Shape] },
};

export { RendererSystem };
