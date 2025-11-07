
//export default function* uuid(start_index){};

export default function*  uuid(start_index) {
    // console.log("salut tous le monde");
    // yield "Hello";
    // console.log("salut la L3");
    // 
    let i=start_index;
    while(true){
        yield i++;
    }
    
}




const uuidgen=uuid();
console.log(uuidgen.next());
console.log(uuidgen.next());


