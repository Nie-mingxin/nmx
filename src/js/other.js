import '../css/index.css';


console.log('other');

let fn=()=>{
    console.log(222);
}
fn()

class demo{
    constructor(){
        this.a='aaa'
    }
    static n=10
    say(){
        console.log(333);
    }
}
let de =new demo()
de.say();
console.log(demo.n);
