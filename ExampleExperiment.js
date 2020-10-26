function ExampleExperiment(jsSheetHandle, jsPsychHandle, survey_code) {
    jsSheetHandle.CreateSession(RunExperiment)

    function RunExperiment(session) {
        // Define Constants
        const CONTACT_EMAIL = 'apfahler@ufl.edu'
        const SONA_URL = `https://ufl.sona-systems.com/webstudy_credit.aspx?experiment_id=147&credit_token=1b0234db08a34870a2b669bbd6da5f90&survey_code=${survey_code}`

        // Define Experiment Trials
        timeline = []; 
        
        timeline.push({
            type: 'fullscreen',
            fullscreen_mode: true
            });
     
        var intro = [];
            
        var welcome = {
            type: "html-keyboard-response",
            stimulus: "Welcome to the experiment. Press any key to begin."
          }
        var consent = {
            type:'external-html',
            url: "https://apfahler.github.io/Consent-Forms/Active/Consent.html",
            cont_btn: "consent-button",
            //check_fn: check_consent
		  }
	var briefing = {
            type: "html-keyboard-response",
            stimulus: "Before we begin, we would like to ask you a few questions.<br><br>" +
      		      "Press any key to continue."
          }
        var sex = {
            type: 'survey-multi-choice',
            questions: [
                {prompt: "What sex were you assigned at birth, on your original birth certificate?",
                 name: 'sex', options: ['Female', 'Male', 'Prefer not to respond'], required:true}
               ],
          }
        var age = {
            type: 'survey-text',
            questions: [
                 {prompt: "How old are you?", name: 'Age'}
                ],
          }
        var picture = {
            type: 'image-button-response',
            stimulus: "https://apfahler.github.io/jsPsychSheet/experiment/img/armsLength.png",
            choices: ['Continue'],
            prompt: "<p>Please make sure that you are approximately one arms length away from you computer screen.<br> A photo is provided above as an example. Press the 'Continue' button when you are ready to move on. "
          }
         var instructions = {
             type: 'instructions',
             pages: [
                     'In this experiment you will be asked to report as many letters as you can from <br> an array of 12 letters that will be briefly displayed on the screen.',
                     'The whole experiment will be divided into three blocks.<br> At the end of each block you will be asked to complete a questionnaire.<br> At the end of the three blocks you will be asked to complete a brief interview where you answers will be recorded.',
                     'Before you start the experiment you will participate in 3 practice trials. <br> These practice trials are for you to become accustomed to the format of the experiement. <br> In the practice trials the array of letters will be displayed on the screen longer than in the actual experiment.',
                     'Click the "Next" button when you are ready to proceed to the practice trials.'
                     ],
             show_clickable_nav: true
          }
         var intro = {
             timeline: [welcome, consent, briefing, sex, age, picture, instructions],
          }
         timeline.push(intro);

         var practice = {
             type: "html-keyboard-response",
             stimulus: 'The practice trial is about to begin.',
             choices: jsPsych.NO_KEYS,
             trial_duration: 2000
          };
         timeline.push(practice);

                
         var practice_trial = [];
       
         var fixation = {
             type: "html-keyboard-response",
             stimulus: '<p style="font-size: 48px; color:red;">+</p>',
             choices: jsPsych.NO_KEYS,
             trial_duration: 500
          }
         var test = {
             type: "sperling-canvas",
             trial_duration: 1000,
             key: jsPsych.NO_KEYS,
          }
         var blank_screen = {
             type: "html-keyboard-response",
             stimulus: "",
             choices: jsPsych.NO_KEYS,
             trial_duration: 500
          }
         var letters = {
             type: "survey-text",
             questions: [
             {prompt: "Please enter all the letters you saw."}, 
             ],
          }
        
         var practice_trial = {
             timeline: [fixation, test, blank_screen, letters],
             repetitions: 3
          }
         timeline.push(practice_trial);

         var question = {    
             type: "html-button-response",
             stimulus: '<p> Have you ever heard of an experiment that used these stimuli before? <br> OR <br> Have you participated in a task that showed you a letter grid that looked like this?</p>',
             choices: ['YES','NO'],
          };
         timeline.push(question);

         var Block_1 = {
             type: "html-keyboard-response",
             stimulus: "Block 1 of the experiment will begin now.", 
             choices: jsPsych.NO_KEYS,
             trial_duration: 2000
          };
         timeline.push(Block_1); 

         var stimulus_block_1 = []; 
                    
         var fixation = {
             type: "html-keyboard-response",
             stimulus: '<p style="font-size: 48px; color:red;">+</p>',
             choices: jsPsych.NO_KEYS,
             trial_duration: 500
          }
         var test = {
             type: "sperling-canvas",
             trial_duration: 300,
             key: jsPsych.NO_KEYS,
          }
         var blank_screen = {
             type: "html-keyboard-response",
             stimulus: "",
             choices: jsPsych.NO_KEYS,
             trial_duration: 500
          }
         var letters = {
             type: "survey-text",
             questions: [
             {prompt: "Please enter all the letters you saw."}, 
             ],
          }
         var stimulus_block_1 = {
             timeline: [fixation, test, blank_screen, letters],
             repetitions: 20 //change to 20 for prototype
          }        
         timeline.push(stimulus_block_1);


         var questions_block_1 = [];

         var question_1 = {    
             type: "html-button-response",
             stimulus: '<p> In general, did you feel like you saw all the letters displayed on the screen?</p>',
             choices: ['YES','NO','I Do Not Know'],
          }

         var follow_up_1 = {
             type: 'html-slider-response',
             stimulus: '<p>I am _______ % certain of my response.</p>',
             labels: ['0%','50%', '100%'],
             prompt: '<p>How certain are you of your response to question 1, on a (0-100)% scale, with low numbers indicating that you are not sure and high numbers indicating that you are sure?</p>',
          }
        
         var page_1_options = ["I felt like I saw all the letters in detail and was able to identify them at this time.", "I felt like I saw all the letters in detail, but without necessarily being able to identify them and tell which letters they were at this time.", "I felt like I saw all the letters, but not in detail: I just saw where they were, and that they were letters.", "I felt like I saw most letters, but not all.", "I felt like I saw only a small part of the letters.","I felt like I saw nothing."];

         var question_2 = {
             type: "survey-multi-choice",
             questions: [
             {prompt: "Think about what you experienced during the block that just ended. Which of the following statements best describe what you experienced when the letters were displayed on the screen?", options: page_1_options, required: true}, 
             ],
          }

         var follow_up_2 = {
             type: 'html-slider-response',
             stimulus: "<p>I am _______ % certain of my response.</p>",
             labels: ['0%','50%', '100%'],
             prompt: "<p>How certain are you of your response to question 2, on a (0-100)% scale, with low numbers indicating that you are not sure and high numbers indicating that you are sure?</p>",
          }
         var questions_block_1 = {
             timeline: [question_1, follow_up_1, question_2, follow_up_2],
          }
         timeline.push(questions_block_1);

         var Block_2 = {
             type: "html-keyboard-response",
             stimulus: "Block 2 of the experiment will begin now.", 
             choices: jsPsych.NO_KEYS,
             trial_duration: 2000
          };
         timeline.push(Block_2); 

         var stimulus_block_2 = []; 
                    
         var fixation = {
             type: "html-keyboard-response",
             stimulus: '<p style="font-size: 48px; color:red;">+</p>',
             choices: jsPsych.NO_KEYS,
             trial_duration: 500
          }
         var test = {
             type: "sperling-canvas",
             trial_duration: 300,
             key: jsPsych.NO_KEYS,
          }
         var blank_screen = {
             type: "html-keyboard-response",
             stimulus: "",
             choices: jsPsych.NO_KEYS,
             trial_duration: 500
          }
         var letters = {
             type: "survey-text",
             questions: [
             {prompt: "Please enter all the letters you saw."}, 
             ],
          }
         var stimulus_block_2 = {
             timeline: [fixation, test, blank_screen, letters],
             repetitions: 20 //change to 20 for prototype
          }
         timeline.push(stimulus_block_2);

         var questions_block_2 = [];

         var question_1 = {    
             type: "html-button-response",
             stimulus: '<p> In general, did you feel like you saw all the letters displayed on the screen?</p>',
             choices: ['YES','NO','I Do Not Know'],
          }
         var follow_up_1 = {
             type: 'html-slider-response',
             stimulus: '<p>I am _______ % certain of my response.</p>',
             labels: ['0%','50%', '100%'],
             prompt: '<p>How certain are you of your response to question 1, on a (0-100)% scale, with low numbers indicating that you are not sure and high numbers indicating that you are sure?</p>',
          }
         var page_1_options = ["I felt like I saw all the letters in detail and was able to identify them at this time.", "I felt like I saw all the letters in detail, but without necessarily being able to identify them and tell which letters they were at this time.", "I felt like I saw all the letters, but not in detail: I just saw where they were, and that they were letters.", "I felt like I saw most letters, but not all.", "I felt like I saw only a small part of the letters.","I felt like I saw nothing."];
         var question_2 = {
             type: "survey-multi-choice",
             questions: [
             {prompt: "Think about what you experienced during the block that just ended. Which of the following statements best describe what you experienced when the letters were displayed on the screen?", options: page_1_options, required: true}, 
             ],
          }
         var follow_up_2 = {
             type: 'html-slider-response',
             stimulus: "<p>I am _______ % certain of my response.</p>",
             labels: ['0%','50%', '100%'],
             prompt: "<p>How certain are you of your response to question 2, on a (0-100)% scale, with low numbers indicating that you are not sure and high numbers indicating that you are sure?</p>",
          }
         var questions_block_2 = {
             timeline: [question_1, follow_up_1, question_2, follow_up_2],
          }
         timeline.push(questions_block_2);

         var Block_3 = {
             type: "html-keyboard-response",
             stimulus: "Block 3 of the experiment will begin now.", 
             choices: jsPsych.NO_KEYS,
             trial_duration: 2000
          };
         timeline.push(Block_3); 

         var stimulus_block_3 = []; 
                    
         var fixation = {
             type: "html-keyboard-response",
             stimulus: '<p style="font-size: 48px; color:red;">+</p>',
             choices: jsPsych.NO_KEYS,
             trial_duration: 500
          }
         var test = {
             type: "sperling-canvas",
             trial_duration: 300,
             key: jsPsych.NO_KEYS,
          }
         var blank_screen = {
             type: "html-keyboard-response",
             stimulus: "",
             choices: jsPsych.NO_KEYS,
             trial_duration: 500
          }
         var letters = {
             type: "survey-text",
             questions: [
             {prompt: "Please enter all the letters you saw."}, 
             ],
          }
         var stimulus_block_3 = {
             timeline: [fixation, test, blank_screen, letters],
             repetitions: 20 //change to 20 for prototype
          }
         timeline.push(stimulus_block_3);


         var questions_block_3 = [];

         var question_1 = {    
             type: "html-button-response",
             stimulus: '<p> In general, did you feel like you saw all the letters displayed on the screen?</p>',
             choices: ['YES','NO','I Do Not Know'],
          }
         var follow_up_1 = {
             type: 'html-slider-response',
             stimulus: '<p>I am _______ % certain of my response.</p>',
             labels: ['0%','50%', '100%'],
             prompt: '<p>How certain are you of your response to question 1, on a (0-100)% scale, with low numbers indicating that you are not sure and high numbers indicating that you are sure?</p>',
          }
         var page_1_options = ["I felt like I saw all the letters in detail and was able to identify them at this time.", "I felt like I saw all the letters in detail, but without necessarily being able to identify them and tell which letters they were at this time.", "I felt like I saw all the letters, but not in detail: I just saw where they were, and that they were letters.", "I felt like I saw most letters, but not all.", "I felt like I saw only a small part of the letters.","I felt like I saw nothing."];
         var question_2 = {
             type: "survey-multi-choice",
             questions: [
             {prompt: "Think about what you experienced during the block that just ended. Which of the following statements best describe what you experienced when the letters were displayed on the screen?", options: page_1_options, required: true}, 
             ],
          }
         var follow_up_2 = {
             type: 'html-slider-response',
             stimulus: "<p>I am _______ % certain of my response.</p>",
             labels: ['0%','50%', '100%'],
             prompt: "<p>How certain are you of your response to question 2, on a (0-100)% scale, with low numbers indicating that you are not sure and high numbers indicating that you are sure?</p>",
          }
         var questions_block_3 = {
             timeline: [question_1, follow_up_1, question_2, follow_up_2],
          }
         timeline.push(questions_block_3);
    
         var interview_start = {
             type: 'instructions',
             pages: [
                     'The goal of this study is to investigate what participants experienced and <br> had the impressions to see in this kind of experiment.',
                     'In this next section you will answer open-ended questions. <br> We are interested in your inner experiences. <br> Your answers will be recorded for further anaylsis.',
                     'Click the "Next" button when you are ready to proceed to the interview.'
                    ],
             show_clickable_nav: true
          };
         timeline.push(interview_start);

         var interview = []; 

         var question_a = {
             type: 'survey-text',
             questions:  [
             {prompt: "Describe in your own words what you saw when the letters were displayed on the screen."}, 
             ],
          }
         var theory = {
             type: 'instructions',
             pages: [
                     'Psychologists hold two competing theories about what participants had the impression to see in this experiment.',
                     'According to the first theory, when letters are displayed on the screen, <br> people consciously see all letters in detail. <br> However, they are unable to keep all letters in memory, <br> which explains why participants were not able to report all letters.',
                     'According to the second theory, people do not consciously see all letters on the screen: <br> maybe they only see part of the letters, or they see only certain letters in detail <br> while they see the others only as letters, but not in detail.', 
                     'However, according to this second theory, people might sometimes have the illusion that they consciously see all the letters because, <br> at the time of the experiment, they already know that they are there, <br> and that they just have to direct their attention at them to see them.',
                    ], // add page about making sure participants take time to read both theories?
             show_clickable_nav: true
          } 
         var question_b = {    
             type: "html-button-response",
             stimulus: "Do you understand both theories and see the differences between them?",
             choices: ['YES','NO'], 
          }
         var question_c = {    
             type: "html-button-response",
             stimulus: "Which of the two theories best match your own experience?",
             choices: ['First Theory','Second Theory','I Do Not Know'], 
          }
         var question_d = {    
             type: "html-button-response",
             stimulus: "Does the other theory still seem plausible?",
             choices: ['Yes','No','I Do Not Know'], 
          }
         var question_e = {    
             type: "html-button-response",
             stimulus: "Is it correct that you saw certain letters in detail but others in a less precise way?",
             choices: ['Correct','Not Correct'], 
          }
         var question_f = {    
             type: "html-button-response",
             stimulus: "Did you sometimes feel like you saw a letter in detail, but then failed to report it?",
             choices: ['Yes','No','I Do Not Know'], 
          }
         var page_2_options = ["I failed to identify it as a specific letter at the time", "I was able to identify the letter at the time but I was unable to keep it in memory long enough"];
         var question_gandh = {
             type: "survey-multi-choice",
             questions: [
             {prompt: "Why did you fail to report it?", options: page_2_options, required: true}, 
             ],
          }
         var question_i = {
             type: "survey-text",
             questions: [
             {prompt: "How many letters, on average, did you have the impression to see in detail?"}, 
             ],
          }
         var interview = {
             timeline: [question_a, theory, question_b, question_c, question_d, question_e, question_f, question_gandh, question_i],
          }
         timeline.push(interview);

        var FinalTrial = {
            type: 'instructions',
            pages: [`Thanks for particpating! Press the 'right-arrow-key' to end the experiment. `]
        }
	timeline.push(FinalTrial); 

        // Configure and Start Experiment
        jsPsychHandle.init({
            timeline: timeline,
            on_trial_finish: session.insert,
            on_finish: function() { window.top.location.href = SONA_URL }
        })
    }
}
