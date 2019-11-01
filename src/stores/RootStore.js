import LoginStore from './LoginStore';
import AppStore from './AppStore';
import ApiStore from './ApiStore'; 

export default class RootStore {
  constructor() {
    this.LoginStore = new LoginStore(this);
    this.AppStore = new AppStore(this);
    this.ApiStore = new ApiStore(this);
  }
}
