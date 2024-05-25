//vreau o variabila globala caruia sa nu i se reseteze valoarea de fiecare data cand ii dau call, momnetan functiile ce folosesc id au placeholder
export async function setID(id){
    ID = id
}
export function getID(){
    return ID
}
let ID = "placeholder"