import { Component, Types } from "ecsy";

class Velocity extends Component<{}> {
  x!: number;
  y!: number;
}
Velocity.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
};

export { Velocity };
