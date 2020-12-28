import { observable } from 'mobx';

class AuthStore {
    @observable username = "taha"
}
export default new AuthStore();