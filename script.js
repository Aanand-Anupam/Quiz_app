const URL = "https://opentdb.com/api.php?";
const container = document.querySelector(".sub_parent");

const first_page = document.querySelector(".game_details");


// const amt = prompt("How many no of questions do you want ?");
// const diff = prompt("Give the difficulty lvl.");
// const type = prompt("Type of question");
const btn_1 = document.querySelector(".proceed");
btn_1.addEventListener("click", ()=> {
    const no_of_question = document.querySelector(".Question_no");
const diff_level = document.querySelector("input[type=radio]:checked");
    
    console.log(no_of_question.value);
    console.log(diff_level.classList[0]);
    quiz_Question(no_of_question.value,diff_level.classList[0] );
    first_page.remove();
    
})


 async function quiz_Question(amt,diff) {
    const response = await fetch(`${URL}+amount=${amt} +&difficulty=${diff}`
    );
    const result = await response.json();
    console.log(result);
    startGame()
    Playgame(result);
}



function startGame(){
    const form = document.createElement("form");
    form.setAttribute("class", "form");
    container.append(form);
    const ques = document.createElement("h3"); 
    ques.setAttribute("class", "question");
    form.append(ques);
    //Parent div:
    const div_option1 = document.createElement("div");
    div_option1.setAttribute("class", "form-check");
    form.append(div_option1);
    //Making input:
    const input1 = document.createElement("input");
    input1.setAttribute("class", "form-check-input");
    input1.setAttribute("type", "radio");
    input1.setAttribute("name", "exampleRadios");
    input1.setAttribute("id", "exampleRadios1");
    input1.setAttribute("value", "option1");
    div_option1.append(input1);

    const label_1 = document.createElement("LABEL");
    label_1.setAttribute("class", "form-check-label");
    label_1.setAttribute("for", "exampleRadios1");
    label_1.setAttribute("class", "opt_1");
    
    div_option1.append(label_1);

    //Parent div:
    const div_option2 = document.createElement("div");
    div_option2.setAttribute("class", "form-check");
    form.append(div_option2);
    //Making input:
    const input2 = document.createElement("input");
    input2.setAttribute("class", "form-check-input");
    input2.setAttribute("type", "radio");
    input2.setAttribute("name", "exampleRadios");
    input2.setAttribute("id", "exampleRadios2");
    input2.setAttribute("value", "option2");
    div_option2.append(input2);

    const label_2 = document.createElement("LABEL");
    label_2.setAttribute("class", "form-check-label");
    label_2.setAttribute("for", "exampleRadios2");
    label_2.setAttribute("class", "opt_2");
    
    div_option2.append(label_2);

    //Option3:

    //Parent div:
    const div_option3 = document.createElement("div");
    div_option3.setAttribute("class", "form-check");
    form.append(div_option3);
    //Making input:
    const input3 = document.createElement("input");
    input3.setAttribute("class", "form-check-input");
    input3.setAttribute("type", "radio");
    input3.setAttribute("name", "exampleRadios");
    input3.setAttribute("id", "exampleRadios3");
    input3.setAttribute("value", "option3");
    div_option3.append(input3);

    const label_3 = document.createElement("LABEL");
    label_3.setAttribute("class", "form-check-label");
    label_3.setAttribute("for", "exampleRadios3");
    label_3.setAttribute("class", "opt_3");
    
    div_option3.append(label_3);

    //Option_4:
    //Parent div:
    const div_option4 = document.createElement("div");
    div_option4.setAttribute("class", "form-check");
    form.append(div_option4);
    //Making input:
    const input4 = document.createElement("input");
    input4.setAttribute("class", "form-check-input");
    input4.setAttribute("type", "radio");
    input4.setAttribute("name", "exampleRadios");
    input4.setAttribute("id", "exampleRadios4");
    input4.setAttribute("value", "option4");
    div_option4.append(input4);

    const label_4 = document.createElement("LABEL");
    label_4.setAttribute("class", "form-check-label");
    label_4.setAttribute("for", "exampleRadios4");
    label_4.setAttribute("class", "opt_4");
    
    div_option4.append(label_4);
}

function Playgame(result){
    
    const ques = document.querySelector(".question");
    ques.innerHTML = result.results[0].question;
    
    
    

    const option1 = document.querySelector(".opt_1");
    

    
    

    const option2 = document.querySelector(".opt_2");
    const option3 = document.querySelector(".opt_3");
    const option4 = document.querySelector(".opt_4");
    option1.innerHTML = result.results[0].correct_answer;
    option2.innerHTML = result.results[0].incorrect_answers[0];
    if(result.results[0].type == "multiple"){
        option3.innerHTML = result.results[0].incorrect_answers[1];
        option4.innerHTML = result.results[0].incorrect_answers[2];
    }
    
}
