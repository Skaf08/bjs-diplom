"use strict"

const userForm = new UserForm();
userForm.loginFormCallback = data => {   
    ApiConnector.login(data, response => {
      if (response.success) {
        location.reload();
      } else {
        userForm.setLoginErrorMessage("Please, enter valid data");
        }
    })
}

userForm.registerFormCallback = data => {   
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
          userForm.setRegisterErrorMessage("Registration wasn't successful");
        }
    })
}