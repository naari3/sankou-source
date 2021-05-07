import { Component, SystemStateComponent, Types } from "ecsy";

class Resource extends Component<{}> {
  name?: string;
  url?: string;
}
Resource.schema = {
  name: { type: Types.String },
  url: { type: Types.String },
};

class ResourceState extends SystemStateComponent<{}> {
  state?: string;
  progress: any;
}
ResourceState.schema = {
  state: { type: Types.String },
  progress: { type: Types.JSON },
};

export { Resource, ResourceState };
