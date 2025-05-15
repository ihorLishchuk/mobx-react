import { makeAutoObservable } from "mobx";
import { VIEW_MODE } from '../../shared';

class ViewModeStore {
  _mode = VIEW_MODE.PUBLIC;

  constructor() {
    makeAutoObservable(this);
  }

  get mode () {
    return this._mode;
  }

  set mode(mode) {
    this._mode = mode;
  }

  get isPublic() {
    return this.mode === VIEW_MODE.PUBLIC;
  }

  get isPrivate() {
    return this.mode === VIEW_MODE.PRIVATE;
  }
}

export const viewModeStore = new ViewModeStore();