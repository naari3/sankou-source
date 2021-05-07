import { World } from "ecsy";
import {
  Engine,
  Position,
  Renderable,
  Resource,
  ResourceState,
  Shape,
  Velocity,
  Sprite,
  SpriteState,
} from "./components";
import { EngineSystem, MovableSystem, RendererSystem, ResourceLoaderSystem, SpriteSystem } from "./systems";

const world = new World();
world
  .registerComponent(Position)
  .registerComponent(Renderable)
  .registerComponent(Shape)
  .registerComponent(Velocity)
  .registerComponent(Engine)
  .registerComponent(Resource)
  .registerComponent(ResourceState)
  .registerComponent(Sprite)
  .registerComponent(SpriteState)
  .registerSystem(MovableSystem)
  .registerSystem(RendererSystem)
  .registerSystem(EngineSystem)
  .registerSystem(ResourceLoaderSystem)
  .registerSystem(SpriteSystem);

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: window.devicePixelRatio,
  backgroundColor: 0xffffff,
};
let elem = document.body;
world.createEntity().addComponent(Engine, {
  elem,
  config,
});
console.log("world created");

[
  { name: "afro", url: "afro.png" },
  { name: "itakura", url: "itakura.png" },
].forEach((resource) => {
  world.createEntity().addComponent(Resource, resource);
});

function getRandomVelocity() {
  return {
    x: 0.001 * (2 * Math.random() - 1),
    y: 0.001 * (2 * Math.random() - 1),
  };
}

function getRandomPosition() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  };
}

function getRandomShape() {
  return {
    primitive: Math.random() >= 0.5 ? "afro" : "itakura",
  };
}

for (let i = 0; i < 10000; i++) {
  let shape = getRandomShape();
  world
    .createEntity()
    .addComponent(Velocity, getRandomVelocity())
    .addComponent(Shape, getRandomShape())
    .addComponent(Position, getRandomPosition())
    .addComponent(Sprite, { name: shape.primitive });
}

const prevTime = performance.now();

function update(time: number) {
  const dt = time - prevTime;

  world.execute(dt, time);

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
