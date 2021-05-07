import { Application, IApplicationOptions } from "pixi.js";
import { Component, Types } from "ecsy";

// Position component
class Engine extends Component<{}> {
  config?: IApplicationOptions;
  app?: Application;
  elem?: HTMLElement;

  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.config = undefined;
    this.app = undefined;
  }
}
Engine.schema = {
  app: { type: Types.Ref },
  elem: { type: Types.Ref },
  config: { type: Types.JSON },
};

export { Engine };
