class User {
  constructor(private _age:number){}
  get age(){
    return this._age
  }

  set age(n:number){
    this._age = n
  }
  
}