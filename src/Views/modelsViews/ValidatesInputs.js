
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
            if(Allinputs[index].valid !== undefined && Allinputs[index].valid.result){
                this.validateResult.message = Allinputs[index].valid.message;
                this.validateResult.result = true;
            }
            this.email(textInput);
        }else if('Nombre de Usuario' === Allinputs[index].textHolder){
            addMessage = 'El nombre de usuario';
            this.lengthInput(textInput, 6, addMessage)
        }else if('Clave' === Allinputs[index].textHolder || 'Confirme la clave' === Allinputs[index].textHolder){
            addMessage = 'La clave';
            const sum = Allinputs[index].textHolder === 'Clave' ? 1 : -1;
            this.lengthInput(textInput, 6, addMessage);
            this.confirmePassWord(textInput, Allinputs, index, sum);
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
        const evaluateRegex = new RegExp(/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/);
        if(!evaluateRegex.test(textInput)){
            this.validateResult.message = 'El correo no es valido';
        }else{
            this.validateResult.message = '';
            this.validateResult.result = false;
        };
    }

    confirmePassWord(textInput, Allinputs, index, sumIndex){
        if(Allinputs[index + sumIndex].value !== '' && Allinputs[index + sumIndex].value !== textInput){
            this.validateResult.message = 'Las claves no coinciden';
        }else if(Allinputs[index + sumIndex].valid !== undefined){
            Allinputs[index + sumIndex].valid.result = false;
            Allinputs[index].valid.result = false;
        }
        
    }
}

export const validateInputs = new ValidateInputs();