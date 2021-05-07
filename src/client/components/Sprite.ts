import { Component, createType, copyValue, cloneValue, Types, SystemStateComponent } from "ecsy";
import { Sprite as PIXISprite } from "pixi.js";

export class Sprite extends Component<{}> {
  name?: string;
  fileName?: string;
}
Sprite.schema = {
  name: {
    type: Types.String,
  },
  fileName: {
    type: Types.String,
  },
};

export const PixiRef = createType<PIXISprite, undefined>({
  name: "PixiRef",
  default: undefined,
  copy: copyValue,
  clone: cloneValue,
});

// for Pixi Sprite referencing
export class SpriteState extends SystemStateComponent<{}> {
  ref?: PIXISprite;
}
SpriteState.schema = {
  ref: { type: PixiRef },
};
