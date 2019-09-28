Vue.component('v-select', VueSelect.VueSelect);
var intervalTimer;

var app = new Vue({
  el: '#app',
  data: {
    counter: 1,
    ageSwitch: 0,
    totalStep: 1,
    finalStep: 0,
    currentAboveStep: 0,
    currentDetailsStep: 0,
    addYourSize: false,
    representation: false,
    union: false,
    headshotIsChecked: false,
    ageIsCheked: false,
    mainProgress: 8,
    //Pop Up Upgrade
    selectedTime: 0,
    timeLeft: '10:00',
    endTime: '0',
    upgradePopUp: false,
    //Athletic Skills
    athleticSkillsSurvey: false,
    athleticStep: 1,
    athleticCheck: false,
    athleticProgressLine: 25,
    //Performance Skills
    performanceCheck: false,
    performanceProgressLine: 20,
    performanceSkillsSurvey: false,
    performanceStep: 1,
    //Addition Skills
    additionSkillsAmount: 2,
    //Details
    weight: [
      10,
      20,
      30,
      40
    ],
    height: [
      110,
      120,
      130,
      140
    ],
    hairColor: [
      'white',
      'red',
      'green'
    ],
    hairLength: [
      'normal',
      'long'
    ],
    eyeColor: [
      'grey',
      'blue',
      'green'
    ],
    shoeSize: [
      20,
      30,
      40,
      50
    ],
    kidsSize: [
      1,
      2,
      3,
      4
    ],
    shirtSize: [
      11,
      22,
      33,
      44
    ],
    bust: [
      1,
      2,
      3,
      4
    ],
    pantsSize: [
      1,
      2,
      3,
      4
    ],
    dressSize: [
      15,
      26,
      36,
      44
    ],
    hipsSize: [
      15,
      26,
      36,
      44
    ],
    inseamSize: [
      15,
      26,
      36,
      44
    ],
    waistSize: [
      15,
      26,
      36,
      44
    ],
    //Representation
    commercialAgent: [
      'Mamba',
      'Another one'
    ],
    theatricalAgent: [
      'Theatrical',
      'Another one'
    ],
    printAgent: [
      'Mamba Print',
      'Another one'
    ],
  },
  created: function() {
    
  },
  methods: {
    headshotChange() {
      this.currentAboveStep = 0;
      this.headshotIsChecked = true
    },
    nextAboveStep() {
      if (this.currentAboveStep == 1 || this.currentAboveStep == 2 ) {
        this.currentAboveStep = 0;
        if (this.ageSwitch > 0) {
          this.ageIsCheked = true
        }
      }
      else if (this.headshotIsChecked &&  this.ageIsCheked) {
        this.currentAboveStep = 3
      }
      else {
        this.totalStep = 2;
      }
    },
    nextDetailsStep() {
      if (this.currentDetailsStep == 1 ) {
        this.addYourSize = true;
        this.currentDetailsStep = 0
      }
      else if (this.currentDetailsStep == 2 ) {
        this.representation = true;
        this.currentDetailsStep = 0
      }
      else if (this.currentDetailsStep == 3 ) {
        this.union = true;
        this.currentDetailsStep = 0
      }
      else if (this.addYourSize && this.representation && this.union) {
        this.currentDetailsStep = 4
      }
      else {
        this.totalStep = 3;
      }
    },
    skipAboutStep() {
      if (this.currentAboveStep < 1) {
        this.totalStep = 2
      }
      else {
        this.currentAboveStep = 0
      }
    },
    //Special Skills Continue
    continueSkillsStep() {
      if (this.athleticStep < 4) {
        this.athleticStep = this.athleticStep + 1;
      }
      else {
        this.athleticSkillsSurvey = false;
        this.athleticCheck = true;
        this.athleticStep = 1;
      }
    },
    continuePerformanceSkillsStep() {
      if (this.performanceStep < 6) {
        this.performanceStep++;
      }
      else {
        this.performanceSkillsSurvey = false;
        this.performanceCheck = true;
        this.performanceStep = 1;
      }
    },

    // CountDown
    setTime(seconds) {
      clearInterval(intervalTimer);
      this.timer(seconds);
    },
    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      // this.initialTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
    },
    countdown(end) {
      // this.initialTime = this.selectedTime;
      intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if(secondsLeft === 0) {
          this.endTime = 0;
        }

        if(secondsLeft < 0) {
          clearInterval(intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft)
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();

      this.endTime = `${hourConvert(hour)}:${zeroPadded(minutes)}`
    },
    
  },
  computed: {
    aboutProgressLine() {
      if (this.headshotIsChecked && this.ageIsCheked) {
        return 24
      }
      else if  (this.headshotIsChecked || this.ageIsCheked) {
        return 16
      }
      else {
        return 8
      }
    },
    detailsProgressLine() {
      if (this.addYourSize && this.representation && this.union) {
        return 24
      }
      else if  ( (this.addYourSize && this.representation) || (this.addYourSize && this.union) || (this.representation && this.union)) {
        return 16
      }
      else if  (this.addYourSize || this.representation || this.union) {
        return 8
      }
      else {
        return 0
      }
    },
    specialSkillsProgressLine() {
      if (this.performanceCheck && this.athleticCheck) {
        return 16
      }
      else if  (this.performanceCheck || this.athleticCheck) {
        return 8
      }
      else {
        return 0
      }
    },
  
  },
  watch: {
    //Athletic Skills
    athleticStep: function() {
      this.athleticProgressLine = this.athleticStep * 25;
    },
     //Performance Skills
    performanceStep: function() {
      this.performanceProgressLine = this.performanceStep * 100/6;
      console.log(this.performanceStep);
      console.log(this.performanceProgressLine);
    }
  },
 

});




function zeroPadded(num) {
// 4 --> 04
return num < 10 ? `0${num}` : num;
}

function hourConvert(hour) {
// 15 --> 3
return (hour % 12) || 12;
}
