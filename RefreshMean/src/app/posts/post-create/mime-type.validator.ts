//mime-type.validator will have to get the file , Read it using file reader then check using mime type of the file
import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

export const mimeType = (control: AbstractControl):Promise<{[key: string]: any}>| Observable<{[key: string]: any}> =>{
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<{[key: string]: any}>)=>{
    fileReader.addEventListener("loadend", ()=>{

    });
    fileReader.readAsArrayBuffer(file);
  });
}
