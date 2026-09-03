console.log(
    "🍌 Dr. MOODIFY is ready for therapy!"
);


// =========================================
// LOAD PATIENT
// =========================================

const savedPatient =
    localStorage.getItem(
        "moodifyPatient"
    );


if (!savedPatient) {

    alert(
        "No patient found! Returning to clinic."
    );


    window.location.href =
        "index.html";


    throw new Error(
        "No patient data found."
    );

}


let patient;


try {

    patient =
        JSON.parse(
            savedPatient
        );

}

catch (error) {

    console.error(
        "Patient data error:",
        error
    );


    alert(
        "Patient data is corrupted! Returning to clinic."
    );


    window.location.href =
        "index.html";


    throw error;

}


// =========================================
// HTML ELEMENTS
// =========================================

const patientImage =
    document.getElementById(
        "therapyPatientImage"
    );


const patientName =
    document.getElementById(
        "therapyPatientName"
    );


const patientMood =
    document.getElementById(
        "therapyPatientMood"
    );


const speakerName =
    document.getElementById(
        "speakerName"
    );


const conversationText =
    document.getElementById(
        "conversationText"
    );


const speechBubble =
    document.getElementById(
        "speechBubble"
    );


const nextButton =
    document.getElementById(
        "nextButton"
    );


const replayButton =
    document.getElementById(
        "replayButton"
    );


const muteButton =
    document.getElementById(
        "muteButton"
    );


const doctorCharacter =
    document.getElementById(
        "doctorCharacter"
    );


const patientCharacter =
    document.getElementById(
        "patientCharacter"
    );


// =========================================
// DISPLAY PATIENT
// =========================================

patientName.textContent =
    patient.object ||
    "Unknown Object";


patientMood.textContent =
    patient.mood ||
    "Emotionally Confused";


// Load patient image

if (patient.image) {

    patientImage.src =
        patient.image;

}

else {

    console.warn(
        "Patient image was not saved."
    );


    patientImage.style.display =
        "none";

}


// =========================================
// THERAPY SETTINGS
// =========================================

let currentStep = 0;

let soundEnabled = true;

let currentSpeechText = "";

let currentSpeaker = "";

let therapyStarted = false;


// =========================================
// THERAPY CONVERSATION
// =========================================

const conversation = [

    {

        speaker:
            "doctor",

        name:
            "🍌 Dr. MOODIFY",

        text:

            "Hello hello. Please sit down. " +
            "Yes, I know you are already sitting. " +
            "You are literally a " +
            patient.object + "."

    },


    {

        speaker:
            "patient",

        name:
            patient.object,

        text:
            patient.dialogue ||
            "I have many complicated object emotions."

    },


    {

        speaker:
            "doctor",

        name:
            "🍌 Dr. MOODIFY",

        text:

            "Interesting. Very interesting. " +
            "I understood absolutely nothing, " +
            "but please continue."

    },


    {

        speaker:
            "patient",

        name:
            patient.object,

        text:

            "Finally! Someone who pretends " +
            "to understand me."

    },


    {

        speaker:
            "doctor",

        name:
            "🍌 Dr. MOODIFY",

        text:

            "According to my completely " +
            "imaginary medical degree, " +
            "your emotional condition is " +
            patient.mood + "."

    },


    {

        speaker:
            "patient",

        name:
            patient.object,

        text:

            "Doctor, that sounds " +
            "suspiciously accurate."

    },


    {

        speaker:
            "doctor",

        name:
            "🍌 Dr. MOODIFY",

        text:

            "Do you feel ignored by the humans " +
            "in your house?"

    },


    {

        speaker:
            "patient",

        name:
            patient.object,

        text:

            "Yesterday someone used me " +
            "without even saying thank you. " +
            "I have feelings too."

    },


    {

        speaker:
            "doctor",

        name:
            "🍌 Dr. MOODIFY",

        text:

            "That is terrible. Absolutely " +
            "unacceptable. I am writing " +
            "this down."

    },


    {

        speaker:
            "patient",

        name:
            patient.object,

        text:

            "Are you actually writing anything?"

    },


    {

        speaker:
            "doctor",

        name:
            "🍌 Dr. MOODIFY",

        text:

            "No. My pen is decorative. " +
            "Just like my medical career."

    },


    {

        speaker:
            "patient",

        name:
            patient.object,

        text:

            "I want another therapist."

    },


    {

        speaker:
            "doctor",

        name:
            "🍌 Dr. MOODIFY",

        text:

            "Excellent. Therapy complete. " +
            "I am incredibly qualified."

    }

];


// =========================================
// START THERAPY
// =========================================

function startTherapy() {

    therapyStarted =
        true;


    currentStep =
        0;


    showConversation();

}


// =========================================
// SHOW CONVERSATION
// =========================================

function showConversation() {


    if (
        currentStep >=
        conversation.length
    ) {

        window.speechSynthesis.cancel();

        stopTalkingAnimations();

        showPrescription();

        return;

    }


    const message =
        conversation[
            currentStep
        ];


    currentSpeechText =
        message.text;


    currentSpeaker =
        message.speaker;


    speakerName.textContent =
        message.name;


    conversationText.textContent =
        message.text;


    speechBubble.textContent =
        message.text;


    startTalkingAnimation(
        message.speaker
    );


    speak(
        message.text,
        message.speaker
    );


    if (
        currentStep ===
        conversation.length - 1
    ) {

        nextButton.textContent =
            "Finish Therapy 🧾";

    }

    else {

        nextButton.textContent =
            "Next Question ➜";

    }

}


// =========================================
// TALKING ANIMATION
// =========================================

function startTalkingAnimation(
    speaker
) {

    stopTalkingAnimations();


    if (
        speaker ===
        "doctor"
    ) {

        doctorCharacter.classList.add(
            "talking"
        );

    }

    else {

        patientCharacter.classList.add(
            "talking"
        );

    }

}


// =========================================
// STOP TALKING
// =========================================

function stopTalkingAnimations() {

    doctorCharacter.classList.remove(
        "talking"
    );


    patientCharacter.classList.remove(
        "talking"
    );

}


// =========================================
// NEXT BUTTON
// =========================================

nextButton.addEventListener(

    "click",

    () => {

        if (!therapyStarted) {

            startTherapy();

            return;

        }


        currentStep++;


        showConversation();

    }

);


// =========================================
// VOICE
// =========================================

function speak(
    text,
    speaker
) {

    if (!soundEnabled) {

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    if (
        speaker ===
        "doctor"
    ) {

        speech.rate =
            0.9;


        speech.pitch =
            1.2;

    }

    else {

        speech.rate =
            0.95;


        speech.pitch =
            0.9;

    }


    speech.volume =
        1;


    speech.onend =
        () => {

            stopTalkingAnimations();

        };


    window.speechSynthesis.speak(
        speech
    );

}


// =========================================
// REPLAY BUTTON
// =========================================

replayButton.addEventListener(

    "click",

    () => {

        if (!currentSpeechText) {

            return;

        }


        startTalkingAnimation(
            currentSpeaker
        );


        speak(
            currentSpeechText,
            currentSpeaker
        );

    }

);


// =========================================
// MUTE BUTTON
// =========================================

muteButton.addEventListener(

    "click",

    () => {

        soundEnabled =
            !soundEnabled;


        if (soundEnabled) {

            muteButton.textContent =
                "🔊 Sound On";

        }

        else {

            window.speechSynthesis.cancel();

            stopTalkingAnimations();


            muteButton.textContent =
                "🔇 Sound Off";

        }

    }

);


// =========================================
// PRESCRIPTION
// =========================================

function showPrescription() {

    document.getElementById(
        "prescriptionSection"
    ).style.display =
        "block";


    document.getElementById(
        "prescriptionCard"
    ).innerHTML =

        "<h2>🧾 OFFICIAL PRESCRIPTION</h2>" +

        "<p><b>Patient:</b> " +

        patient.object +

        "</p>" +

        "<p><b>Mood:</b> " +

        patient.mood +

        "</p>" +

        "<hr>" +

        "<p>💊 Take 3 compliments daily.</p>" +

        "<p>🛋️ Avoid emotionally draining humans.</p>" +

        "<p>😴 Get more unnecessary rest.</p>" +

        "<p>🍌 Never trust medical advice from bananas.</p>" +

        "<br>" +

        "<h3>Diagnosis: Still dramatic.</h3>" +

        "<p>— Dr. MOODIFY 🍌</p>";


    nextButton.style.display =
        "none";


    replayButton.style.display =
        "none";


    speechBubble.textContent =
        "Therapy complete! " +
        "The patient has learned nothing, " +
        "but feels emotionally validated. 🎉";


    document.getElementById(
        "prescriptionSection"
    ).scrollIntoView({

        behavior:
            "smooth"

    });

}