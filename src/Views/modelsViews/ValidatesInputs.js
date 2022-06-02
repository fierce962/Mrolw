
class ValidateInputs{
    validateResult = {
        index: undefined,
        message: '',
        result: false,
    }

    clearValidate(){
        this.validateResult.index = undefined
        this.validateResult.message = '';
        this.validateResult.result = false;
    }

    login(resultLogin){
        this.clearValidate();
        if(resultLogin === 'invalid-email'){
            this.validateResult.message = 'El correo no es valido';
            this.validateResult.result = true;
            this.validateResult.index = 0;
        }else if(resultLogin === 'invalid-password'){
            this.validateResult.index = 1;
            this.validateResult.message = 'La clave es incorrecta';
            this.validateResult.result = true;
        }
        return { ... this.validateResult };
    }
}

export const validateInputs = new ValidateInputs();