
class ControllerNavigation {
    navigation;
    
    set(navigation){
        this.navigation = navigation;
    }

    get(){
        return this.navigation;
    }
}

export const controllerNavigation = new ControllerNavigation();