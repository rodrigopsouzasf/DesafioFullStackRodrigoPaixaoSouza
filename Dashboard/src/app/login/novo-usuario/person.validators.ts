import { AbstractControl, FormGroup } from "@angular/forms";

export function minusculoValidator(control:AbstractControl){
  const valor = control.value as string
  if(valor !== valor.toLowerCase()){
    return {minusculo: true}
  }else{
    return null
  }
}

export function usuarioSenhaIguaisValidator(formGroup:FormGroup){
  const userName = formGroup.get('userName')?.value ?? '';
  const password = formGroup.get('password')?.value ?? '';

  if(userName.trim() + password.trim()){
    return userName !== password ? null: {senhaIgualUsuario: true}
  }else{
    return null
  }
}
