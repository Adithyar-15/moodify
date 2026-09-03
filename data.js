const moodData = {

    dramatic: {
        moods: [
            {
                mood: "Emotionally Damaged 😭",
                dialogue: "I have been through a lot. Mostly people dropping me."
            },
            {
                mood: "Overthinking Everything 🥲",
                dialogue: "Do you think I am an object, or am I just emotionally misunderstood?"
            },
            {
                mood: "Feeling Ignored 😔",
                dialogue: "You only notice me when you need me."
            }
        ]
    },

    energetic: {
        moods: [
            {
                mood: "Extremely Excited 🤩",
                dialogue: "HELLO HUMAN! SOMETHING IS HAPPENING!"
            },
            {
                mood: "Too Much Energy ⚡",
                dialogue: "I HAVE ENERGY AND ABSOLUTELY NO IDEA WHAT TO DO WITH IT!"
            },
            {
                mood: "Ready for Nothing 🚀",
                dialogue: "I am ready! Ready for absolutely nothing!"
            }
        ]
    },

    lazy: {
        moods: [
            {
                mood: "Very Tired 😴",
                dialogue: "Can we continue this tomorrow?"
            },
            {
                mood: "Avoiding Responsibilities 🛋️",
                dialogue: "I saw the problem and decided it was not my problem."
            },
            {
                mood: "Mentally Offline 🫠",
                dialogue: "Please leave a message after the beep. Actually, don't."
            }
        ]
    },

    angry: {
        moods: [
            {
                mood: "Angry 😡",
                dialogue: "Please do not touch me. I am processing emotions."
            },
            {
                mood: "Annoyed 🙄",
                dialogue: "Oh great. Another human interaction."
            },
            {
                mood: "Don't Touch Me 😤",
                dialogue: "Personal space! Even objects need boundaries."
            }
        ]
    },

    sarcastic: {
        moods: [
            {
                mood: "Judging You 🙄",
                dialogue: "Interesting choice. I would have done literally anything else."
            },
            {
                mood: "Not Impressed 😒",
                dialogue: "That was your best attempt? Fascinating."
            },
            {
                mood: "Questioning Your Life Choices 🤨",
                dialogue: "I have questions. You probably don't want to hear them."
            }
        ]
    },

    mysterious: {
        moods: [
            {
                mood: "Suspiciously Quiet 👀",
                dialogue: "I know something. I cannot tell you what."
            },
            {
                mood: "Keeping Secrets 🤫",
                dialogue: "If I told you, it would no longer be a secret."
            },
            {
                mood: "Existentially Confused 🌌",
                dialogue: "Why am I here? Why are you here? Why is anything here?"
            }
        ]
    }

};


// Get a random personality, mood and dialogue
function getObjectMood(objectName) {

    const personalities = Object.keys(moodData);

    const personality =
        personalities[
            Math.floor(
                Math.random() * personalities.length
            )
        ];

    const moodList =
        moodData[personality].moods;

    const selectedMood =
        moodList[
            Math.floor(
                Math.random() * moodList.length
            )
        ];

    return {

        object: objectName,

        personality: personality,

        mood: selectedMood.mood,

        dialogue: selectedMood.dialogue

    };

}                                                                       