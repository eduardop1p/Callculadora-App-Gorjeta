class AppCalcularDesconto{
    constructor(){
        this.section = document.querySelector('section')
        this.inputCalcular = this.section.querySelector('#calcular')
        this.pocentagemAtual = this.section.querySelector('.pocentagemAtual')
        this.numberPeople = this.section.querySelector('#numberPeople')
        this.descontoValor = null
        this.valid = false
    }
    init(){
        this.calcular()
        this.total()
        this.inputsInFocus()
        this.custon()
    }
    clickActved(element){
        element.classList.add('clickActived')
        setTimeout(()=>element.classList.remove('clickActived'), 500);
    }
    err(errText){
        return setTimeout(() => alert(errText), 50)
    }
    calcular(){
        this.section.addEventListener('click', event =>{
            const element = event.target
            if(element.className !== 'porcent') return
            this.clickActved(element)
            this.pocentActived(element)
            this.pocentagemAtual.innerHTML = element.innerHTML
            this.valid = true
        })
    }
    desconto(){
        const calculo = Number(this.inputCalcular.value)
        const desconto = this.pocentagemAtual.innerHTML.slice(0,-1)
        const porcentagem = calculo * desconto / 100
        const descontoGorjeta = porcentagem
        return this.descontoValor = descontoGorjeta
    }
    custon(){
        const customElemnt = this.section.querySelector('#customInput')
        customElemnt.addEventListener('focusin', ()=>{
            this.section.querySelector('.custom').classList.add('customInFocus')
            customElemnt.addEventListener('focusout', ()=> this.section.querySelector('.custom').classList.remove('customInFocus'))
        })
        customElemnt.addEventListener('keyup', event => {
            if(event.keyCode === 13 ) {
                this.section.querySelectorAll('.porcent').forEach(porcent => porcent.classList.remove('pocentActived'))
                this.pocentagemAtual.innerHTML = `${customElemnt.value}%`
                this.valid = true
                this.desconto()
            }
        })
    }
    total(){
        const calcularTotal = this.section.querySelector('#calcularTotal')
        const valorGojeta = this.section.querySelector('.valor-gojeta')
        const valorTotalAPagarGojeta = this.section.querySelector('.valor-total')
        calcularTotal.addEventListener('click', ()=>{
            this.clickActved(calcularTotal)
            if(!this.valid) return this.err('Você tem que colocar uma porcentagem para realizar o calculo kkkk!!')
            this.desconto()
            if(!this.descontoValor && this.descontoValor !== 0) return this.err('Conta inválida kkkk')

            const valorTotalGojetaPorPessoa =  Number(this.descontoValor / this.numberPeople.value)
            if(valorTotalGojetaPorPessoa === Infinity || this.descontoValor == 0) return valorGojeta.innerHTML = this.descontoValor.toFixed(2)
            valorGojeta.innerHTML = valorTotalGojetaPorPessoa.toFixed(2)

            const totalApagarGojeta = Number(valorTotalGojetaPorPessoa * this.numberPeople.value)
            valorTotalAPagarGojeta.innerHTML  = totalApagarGojeta.toFixed(2)
        })
    }
    
    inputsInFocus(){
        this.inputCalcular.addEventListener('focusin', ()=> {
            this.section.querySelector('.calculo-input').classList.add('inputFocus')
            this.inputCalcular.addEventListener('focusout', ()=> this.section.querySelector('.calculo-input').classList.remove('inputFocus'))
        })

        this.numberPeople.addEventListener('focusin', ()=> {
            this.section.querySelector('.number-people').classList.add('inputFocus')
            this.numberPeople.addEventListener('focusout', ()=> this.section.querySelector('.number-people').classList.remove('inputFocus'))
        })
        
    }
    pocentActived(element){
        this.section.querySelectorAll('.porcent').forEach(porcent => porcent.classList.remove('pocentActived'))
        element.classList.add('pocentActived')
    }
}

const app = new AppCalcularDesconto()

app.init()