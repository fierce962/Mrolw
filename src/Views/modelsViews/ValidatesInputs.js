
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

    register(textInput, Allinputs, index){
        let addMessage;
        this.clearValidate();
        if('Correo Electronico' === Allinputs[index].textHolder){
            addMessage = 'El correo';
            this.email(textInput);
        }else if('Nombre de Usuario' === Allinputs[index].textHolder){
            addMessage = 'El nombre de usuario';
            this.lengthInput(textInput, 6, addMessage)
        }else if('Clave' === Allinputs[index].textHolder){
            addMessage = 'La clave';
            this.lengthInput(textInput, 6, addMessage);
        }else if('Confirme la clave' === Allinputs[index].textHolder){
            addMessage = 'La clave';
            this.lengthInput(textInput, 6, addMessage);
            this.confirmePassWord(textInput, Allinputs, index);
        }
        this.hasVoidInput(textInput, addMessage);
        if(this.validateResult.message !== '') this.validateResult.result = true;
        return {... this.validateResult };
    }

    hasVoidInput(textInput, addMessageError){
        if(textInput === ''){
            this.validateResult.message = `${ addMessageError } puede estar vacio`;
        }
    }

    lengthInput(textInput, minLong, addMessageError){
        if(textInput.length < minLong){
            this.validateResult.message = `${ addMessageError } debe ser de minimo 6 caracteres`;
        }
    }

    email(textInput){
        const evaluateRegex = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/);
        if(!evaluateRegex.test(textInput)){
            this.validateResult.message = 'El correo no es valido';
        };
    }

    confirmePassWord(textInput, Allinputs, index){
        if(Allinputs[index - 1].value !== textInput){
            this.validateResult.message = 'Las claves no coinciden';
        }
    }
}

export const validateInputs = new ValidateInputs();