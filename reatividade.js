const projeto = {
    id: 1,
    descricao: 'Alura Tracker 3.0'
}    //O objeto Proxy é usado para definir comportamentos customizados para operações fundamentais (por exemplo, pesquisa de propriedade, atribuição, enumeração, invocação de função, etc.), ou seja, permite que o framework saiba automaticamente quando os dados mudam e atualiza a interface do usuário sem complicações

//REATIVIDADE

const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave) {
        console.log(`Alguem pediu a chave ${chave} do projeto`)
        return Reflect.get(objetoOriginal, chave, receptor) 
    }, //O Reflect é uma API do JavaScript que fornece métodos para interceptar operações em objetos, semelhante ao que o Proxy faz
    set(objetoOriginal, chave, valor) {
        console.log(`Alguem alterou a chave ${chave} do projeto para o valor ${valor}`)
        objetoOriginal[chave] = valor
    }
})

proxy.descricao = 'Reatividade é mega bacana'

console.log(proxy.descricao)