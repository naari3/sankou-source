import { System } from "ecsy";
import { Engine, ResourceState, Resource } from "../components";
import { Loader } from "pixi.js";

class ResourceLoaderSystem extends System {
  execute(delta: number, time: number): void {
    let app = this.queries.engine.results[0].getComponent(Engine)?.app;
    if (this.queries.loaderState.results.length === 0) {
      this.stopSystemsAfter();
      this.queries.toLoad.results.forEach((entity) => {
        let url = entity.getComponent(Resource)?.url;
        let name = entity.getComponent(Resource)?.name;
        if (name && url) {
          app?.loader.add(name, url, () => {});
          this.world.createEntity().addComponent(ResourceState, { state: "toLoad" });
        }
      });
    } else {
      let loadingState = this.queries.loaderState.results[0].getMutableComponent(ResourceState);
      if (loadingState?.state === "toLoad") {
        loadingState.state = "loading";
        app?.loader.load(() => {
          if (loadingState) loadingState.state = "loaded";
          this.startSystemsAfter();
        });
        app?.loader.onProgress.add((loader: any, resource: any) => {
          if (loadingState) loadingState.progress = loader.progress;
          if (resource.error) {
            console.log(`Loading of ${resource.name} at ${resource.url} failed!`);
          } else {
            console.log(`Loading of ${resource.name} at ${resource.url} succeed!`);
          }
        });
      }
    }
  }

  stopSystemsAfter() {
    let systems = this.world.getSystems();
    let myIndex = systems.findIndex((system) => system instanceof ResourceLoaderSystem);
    for (var i = myIndex + 1; i < systems.length; i++) {
      systems[i].stop();
    }
  }

  startSystemsAfter() {
    let systems = this.world.getSystems();
    let myIndex = systems.findIndex((system) => system instanceof ResourceLoaderSystem);
    for (var i = myIndex + 1; i < systems.length; i++) {
      systems[i].play();
    }
  }
}

ResourceLoaderSystem.queries = {
  loaderState: { components: [ResourceState] },
  toLoad: { components: [Resource] },
  engine: { components: [Engine] },
};

export { ResourceLoaderSystem };
