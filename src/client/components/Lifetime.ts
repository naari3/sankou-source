import { Component, Types } from "ecsy";

class Lifetime extends Component<{}> {
  time!: number;
}
Lifetime.schema = {
  time: { type: Types.Number },
};

export { Lifetime };
