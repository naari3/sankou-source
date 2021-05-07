import { Component, Types } from "ecsy";

class Shape extends Component<{}> {
  primitive!: string;
}
Shape.schema = {
  primitive: { type: Types.String, default: "box" },
};

export { Shape };
