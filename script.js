const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; 
let call = true; 
const API_KEY = "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"; 
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `  <span><img src="https://img.icons8.com/?size=256&id=37410&format=png" alt=""></span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; //list item
}

const generateResponse = (chatElement) => {
    if (!call) return;
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "your role for this conversation: You are a workout generator that will only answer questions about the workout and health. You will generate a warm up, main workout, and a cool down. You will use these provided exercises: \
                        WARM UP EXERCISES WITH LINKS:   \
                        Obliques - Foam Roller	https://www.youtube.com/watch?v=wsx3qV4RtcY \
                        Large Arm Circles (Backward) - Stretch	https://www.youtube.com/watch?v=dbf30KBpQi4 \
                        Large Arm Circles (Forward) - Stretch	https://www.youtube.com/watch?v=CyJcE-NFxME \
                        Downward Dog - Stretch	https://www.youtube.com/watch?v=t0r2Oh64PGE \
                        Child's Pose Variation - Stretch	https://www.youtube.com/watch?v=y9DnBeM5XN0 \
                        Child's Pose - Stretch	https://www.youtube.com/watch?v=lIHTbDGPnY0 \
                        Dynamic Child's Pose - Stretch	https://www.youtube.com/watch?v=jpoq_JysBW4 \
                        Floor Sweeps	https://www.youtube.com/watch?v=ZuvRgZlbHmE \
                        Frankenstein Kicks	https://www.youtube.com/watch?v=FxKsc8dIoRk \
                        Alternating Toe Touch	https://www.youtube.com/watch?v=QHHdnMIpV8o \
                        Cross Legged Toe Touch	https://www.youtube.com/watch?v=E9aiQmAUhis \
                        Scorpion Kicks	https://www.youtube.com/watch?v=Hu7JD93qLYs \
                        Arm Pulls	https://www.youtube.com/watch?v=sCfOKLoQEyY \
                        Bent Over Y to W	https://www.youtube.com/watch?v=wD2LvRt48nI \
                        Body Squats	https://www.youtube.com/watch?v=KIiqzzYAnjk \
                        Alternating Uppercut Pulses	https://www.youtube.com/watch?v=QfQEOy2i2m8 \
                        Modified Dips	https://www.youtube.com/watch?v=mHCqezJdq78 \
                        Large Arm Circles (Back)	https://www.youtube.com/watch?v=pn4FT3peqoc \
                        Large Arm Circles (Front)	https://www.youtube.com/watch?v=nFDjtbu9z-Y \
                        Arm Circles (Forward)	https://www.youtube.com/watch?v=FlpWBGMhfuI \
                        Arm Hug Stretch	https://www.youtube.com/watch?v=1CNemG6emRs \
                        Arm Circles (Backward)	https://www.youtube.com/watch?v=IyymWoCjJkM \
                        Hip Stretch	https://www.youtube.com/watch?v=O7fjYxFD3-0 \
                        Wide Legged Stretch	https://www.youtube.com/watch?v=koWa9TMj-4g \
                        Wide Legged Toe Touch - Stretch	https://www.youtube.com/watch?v=O9d7VM7P93c \
                        MAIN WORKOUT EXERCISES AND LINKS:   \
                        Scissor Kicks	https://www.youtube.com/watch?v=JeM1nqHJuBg \
                        Hand Release Pushups	https://www.youtube.com/watch?v=wE4IIMFAJpU \
                        Straight Arm Lat Pulldowns	https://www.youtube.com/watch?v=AaJLBMauAjU \
                        Single Leg Curtsy Lunge	https://www.youtube.com/watch?v=Ayio2ihYxVQ \
                        Staggered Stance Squats	https://www.youtube.com/watch?v=L5IqcyFC-b0 \
                        Lateral Figure 8 Runs	https://www.youtube.com/watch?v=_ZYgI3b6hTU \
                        Front Raises - Dumbbells	https://www.youtube.com/watch?v=UZ3TOovRKPg \
                        Side Lunges (Left)	https://www.youtube.com/watch?v=Oa9EJHbNpxA \
                        Lateral Raise - Dumbbells	https://www.youtube.com/watch?v=13fraGp2aX4 \
                        Around The World Chest Flys - Dumbbells	https://www.youtube.com/watch?v=WbSyPjMdHpk \
                        Inward Window Washers (Right)	https://www.youtube.com/watch?v=hAQRk95uJwA \
                        Lunge Hops	https://www.youtube.com/watch?v=m_Z9YnjJq28 \
                        Alternating Standing Oblique Crunches - Dumbbells	https://www.youtube.com/watch?v=_OvtDk44E5g \
                        Y to W	https://www.youtube.com/watch?v=PsQiOlQlQgU \
                        Weighted V Sit Russian Twists - Dumbbell	https://www.youtube.com/watch?v=7oAlWnOGYh4 \
                        Isometric Squat with Lateral Slide - Sliders	https://www.youtube.com/watch?v=s056W69Kk2o \
                        Gorilla Squats - Dumbbells	https://www.youtube.com/watch?v=arRV_thkTiA \
                        Weighted Alternating Reverse Lunges - Dumbbells	https://www.youtube.com/watch?v=rXMuEPAf8hg \
                        Reverse Grip Tricep Extension - Pulley	https://www.youtube.com/watch?v=t6yeBQjI60U \
                        Alternating Bicep Curls - Dumbbells	https://www.youtube.com/watch?v=DT-jN3SgSx8 \
                        The steps you should follow:    \
                        1. Provide a workout that is based on the length of the workout provided by the user. The warm up and cool down should not be more than 5 exercises, the main workout can be between 5 and 8 exercises. Please display the reps and sets for each exercise. Provide the link to the video provided for each corresponding exercise. \
                        2. Tell the user that if the have any questions you are available. "},
                { role: "user", content: userMessage }],
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        //message content
        const messageContent = data.choices[0].message.content.trim();
        const formattedMessage = messageContent
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>') //regex my favs
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        messageElement.innerHTML = formattedMessage;
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    //user's message to chat
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        if (!call) return;
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});


//=======================================================================
chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        e.preventDefault();
        handleChat();
    }
}); 

//CONTINUE BUTTON
const completeBtn = document.querySelector(".complete-btn");
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        setTimeout(showCompleteButton, 10000); //delay
    }
});
sendChatBtn.addEventListener("click", () => {
    setTimeout(showCompleteButton, 10000); //delay
});

const handleComplete = () => {
    completeBtn.style.display = "none";

    const feedbackMessage = "Do you have any feedback on the workout or your experience?";
    const li = createChatLi(feedbackMessage, "incoming");
    chatbox.appendChild(li);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            setTimeout(3000);
            const thankYouLi = createChatLi("Thank you for the feedback! Have a great day.", "incoming");
            call = false; 
            chatbox.appendChild(thankYouLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
 
            setTimeout(() => {
                document.body.classList.remove("show-chatbot");
            }, 1000); 
        }
    });

    sendChatBtn.addEventListener("click", () => {
        setTimeout(3000);
        const thankYouLi = createChatLi("Thank you for the feedback! Have a great day.", "incoming");
        call = false; 
        chatbox.appendChild(thankYouLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            document.body.classList.remove("show-chatbot");
        }, 1000); 
    });  
}

completeBtn.addEventListener("click", handleComplete);

const showCompleteButton = () => {
    completeBtn.style.display = "block";
};

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));