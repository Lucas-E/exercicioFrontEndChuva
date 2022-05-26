let counter = 0
let errorCounter = 0

function discussionText(){
    const header = document.querySelector('#discussion-header');
    while(header.firstChild){
        header.removeChild(header.lastChild)
    }

    //cria formulário
    let formulario = document.querySelector('#template-2');
    console.log(formulario)
    let formClon = formulario.content.cloneNode(true);

    header.appendChild(formClon)
}

function topicSent(){
    let name = document.getElementById('name');
    let subject = document.getElementById('subject');
    let content = document.getElementById('content');

    if(name.value == '' || subject.value == '' || content.value == ''){
        let topicArea = document.querySelector('#topics')
        let warning = document.createElement('div')
        warning.className = 'alert alert-danger'
        warning.textContent = 'Algum campo está vazio!'
        if(errorCounter == 0){
            topicArea.appendChild(warning)
            errorCounter = 1
        }
        return false
    }

    let topic = document.querySelector('#template-1')
    let topicClon = topic.content.cloneNode(true)

    //colocando id do tópico
    const parentTopic = topicClon.querySelector('[name="parentTopic"]')
    parentTopic.setAttribute('id',`topic-${counter}`)

    //criando nome no topico
    topicName = topicClon.querySelector('#topic-name')
    let nameField = document.createElement('span')
    nameField.textContent = name.value
    topicName.appendChild(nameField)

    //criando subject no topico
    topicSubject = topicClon.querySelector('#topic-subject')
    let subjectField = document.createElement('span')
    subjectField.textContent = subject.value
    topicSubject.appendChild(subjectField)


    //criando content no topico
    topicContent = topicClon.querySelector('#topic-content')
    let contentField = document.createElement('span')
    contentField.textContent = content.value
    topicContent.appendChild(contentField)

    //setando id no dropdown
    topicId = topicClon.querySelector('#topicId')
    let idField = document.createElement('span')
    idField.textContent = counter
    auxCounter = counter
    topicId.appendChild(idField)

    //setando função no botão de likes
    let likeButton = topicClon.querySelector('#like-button')
    likeButton.setAttribute('onclick',`like(${counter})`)

    //setando função no botão de respostas
    let ansButton = topicClon.querySelector('#modalButton')
    ansButton.setAttribute('onclick',`passId("topic-${counter}")`)

    //colocando o clone de topic dentro do topic area
    let topicArea = document.querySelector('#topics')
    topicArea.appendChild(topicClon)
    
    counter += 1;

    topicSuccess()

}

function topicSuccess(){
    let lastTemplate = document.querySelector('#template-3')
    let lastTemaplateClone = lastTemplate.content.cloneNode(true)

    const header = document.querySelector('#discussion-header');
    while(header.firstChild){
        header.removeChild(header.lastChild)
    }

    header.appendChild(lastTemaplateClone)
}

function like(id){
    let element = document.querySelector(`#topic-${id}`)
    let likeSpan = element.querySelector('[name="numLikes"]')
    likeSpan.textContent = eval(likeSpan.textContent) + 1
}
function answerCounter(id){
    let element = document.querySelector(`#${id}`)
    let answSpan = element.querySelector('[name="numAnsw"]')
    answSpan.textContent = eval(answSpan.textContent) + 1
}

function answerSent(id){
    let answerName = document.getElementById('answer-name');
    let answerContent = document.getElementById('answer-content');

    //vendo se tem campo vazio
    if(answerName.value == '' || answerContent.value == ''){
        let topicArea = document.querySelector('#modalBody')
        let warning = document.createElement('div')
        warning.className = 'alert alert-danger mt-3'
        warning.textContent = 'Algum campo está vazio!'
        if(errorCounter == 0){
            topicArea.appendChild(warning)
            errorCounter = 1
        }
        return false
    }

    let answerTemplate = document.querySelector('#template-4')
    console.log(answerTemplate)
    let answerTemplateClone = answerTemplate.content.cloneNode(true)

    //Setando nome no template de resposta
    let answerNameContainer = answerTemplateClone.querySelector('#topic-name');
    answerNameContainer.textContent = answerName.value;
    //Setando Conteúdo no template de resposta
    let answerContentContainer = answerTemplateClone.querySelector('#topic-content');
    answerContentContainer.textContent = answerContent.value;

    let parentNode = document.querySelector(`#${id}`)
    parentNode.appendChild(answerTemplateClone)
    answerCounter(id)
}

function passId(id){
    let answerButton = document.querySelector('#sendAnswerButton');
    console.log(answerButton)
    answerButton.setAttribute('onclick',`answerSent("${id}")`)
}