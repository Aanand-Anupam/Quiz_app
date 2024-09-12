const URL = "https://opentdb.com/api.php?";
const container = document.querySelector(".sub_parent");

const first_page = document.querySelector(".game_details");

let result;

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
     result = await response.json();
    console.log(result);
    startGame()
    Playgame(result, 0);
}



function createRadioOption(id, value, className) {
    // Create the div container for the option
    const div = document.createElement("div");
    div.setAttribute("class", "form-check");

    // Create the input element
    const input = document.createElement("input");
    input.setAttribute("class", "form-check-input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "exampleRadios");
    input.setAttribute("id", id);
    input.setAttribute("value", value);

    // Create the label element
    const label = document.createElement("label");
    label.setAttribute("class", "form-check-label");
    label.setAttribute("for", id);
    label.setAttribute("class", className);

    // Append the input and label to the div
    div.append(input, label);

    return div;
}

function startGame() {
   
    const form = document.createElement("form");
    form.setAttribute("class", "form");
    container.append(form);

    const ques = document.createElement("h3"); 
    ques.setAttribute("class", "question");
    form.append(ques);

    // Append all options using the helper function
    const options = [
        { id: "exampleRadios1", value: "option1", className: "opt_1" },
        { id: "exampleRadios2", value: "option2", className: "opt_2" },
        { id: "exampleRadios3", value: "option3", className: "opt_3" },
        { id: "exampleRadios4", value: "option4", className: "opt_4" }
    ];

    options.forEach(option => {
        form.append(createRadioOption(option.id, option.value, option.className));
    });

    // Create and append the submit button
    const btn = document.createElement("button");
    btn.setAttribute("type", "submit");
    btn.setAttribute("class", "btn btn-primary btn_2");
    btn.textContent = "Submit";
    container.append(btn);
}


let i = 0;
let actual_answer_index = "";
function Playgame(result,i){
    

    const ques = document.querySelector(".question");
    ques.innerHTML = result.results[i].question;
    const option1 = document.querySelector(".opt_1");
    const option2 = document.querySelector(".opt_2");
    const option3 = document.querySelector(".opt_3");
    const option4 = document.querySelector(".opt_4");
    //Creating Random Options:
    const correct_answer = result.results[i].correct_answer;
    const incorrect_answers = result.results[i].incorrect_answers;
    let avl_option = [correct_answer, incorrect_answers[0], incorrect_answers[1], incorrect_answers[2]];
    function shuffleArray(avl_option) {
        if(result.results[i].type === "boolean"){ 
            avl_option.splice(2, 2)
            option3.style.display = "none";
            option4.style.display = "none";
        };
            
        
        for (let i = avl_option.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [avl_option[i], avl_option[j]] = [avl_option[j], avl_option[i]]; // Swap elements
        }
        return avl_option;
    }
    avl_option = shuffleArray(avl_option);
    actual_answer_index = avl_option.indexOf(correct_answer);
    
   
    option1.innerHTML = avl_option[0];
    option2.innerHTML = avl_option[1];
    if(result.results[i].type === "multiple"){
        option3.style.display = "block";
        option4.style.display = "block";
        option3.innerHTML = avl_option[2];
        option4.innerHTML = avl_option[3];
    }
    
    const btn_2 = document.querySelector(".btn_2");
    btn_2.removeEventListener("click",btn2_click);
    btn_2.addEventListener("click", btn2_click);
    
    
}
function btn2_click() {
    
    let possible_opt = ["option1", "option2", "option3", "option4"];

    const choosen_opt = document.querySelector("input[type=radio]:checked");
    console.log(possible_opt.indexOf(choosen_opt.value),actual_answer_index )
    if(possible_opt.indexOf(choosen_opt.value) === actual_answer_index){
        update_score();
    };
    
    i = i+1;
    if(result.results.length > i){
        Playgame(result, i);
    }
    else{
        window.alert("Quiz Completed!");
    }
}
let j = 0;
function update_score() {
    j += 1;
    let scorecard = document.querySelector(".score");
        scorecard.innerHTML = `SCORE: ${j}`;
}
