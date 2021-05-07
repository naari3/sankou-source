import { Component, Types } from "ecsy";

class Position extends Component<{}> {
  x!: number;
  y!: number;
}
Position.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
};

export { Position };
