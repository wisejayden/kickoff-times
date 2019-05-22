import LoginStore from './LoginStore';
import AppStore from './AppStore';

export default class RootStore {
  constructor() {
    this.LoginStore = new LoginStore(this);
    this.AppStore = new AppStore(this);
  }
}
