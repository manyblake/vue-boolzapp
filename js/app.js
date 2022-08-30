const contacts = [
  {
    name: `Michele`,
    avatar: `_1`,
    visible: true,
    messages: [
      {
        date: `10/01/2020 15:30:55`,
        message: `Hai portato a spasso il cane?`,
        status: `sent`,
      },
      {
        date: `10/01/2020 15:50:00`,
        message: `Ricordati di stendere i panni`,
        status: `sent`,
      },
      {
        date: `10/01/2020 16:15:22`,
        message: `Tutto fatto!`,
        status: `received`,
      },
    ],
  },
  {
    name: `Fabio`,
    avatar: `_2`,
    visible: true,
    messages: [
      {
        date: `20/03/2020 16:30:00`,
        message: `Ciao come stai?`,
        status: `sent`,
      },
      {
        date: `20/03/2020 16:30:55`,
        message: `Bene grazie! Stasera ci vediamo?`,
        status: `received`,
      },
      {
        date: `20/03/2020 16:35:00`,
        message: `Mi piacerebbe ma devo andare a fare la spesa.`,
        status: `sent`,
      },
    ],
  },
  {
    name: `Samuele`,
    avatar: `_3`,
    visible: true,
    messages: [
      {
        date: `28/03/2020 10:10:40`,
        message: `La Marianna va in campagna`,
        status: `received`,
      },
      {
        date: `28/03/2020 10:20:10`,
        message: `Sicuro di non aver sbagliato chat?`,
        status: `sent`,
      },
      {
        date: `28/03/2020 16:15:22`,
        message: `Ah scusa!`,
        status: `received`,
      },
    ],
  },
  {
    name: `Alessandro B.`,
    avatar: `_4`,
    visible: true,
    messages: [
      {
        date: `10/01/2020 15:30:55`,
        message: `Lo sai che ha aperto una nuova pizzeria?`,
        status: `sent`,
      },
      {
        date: `10/01/2020 15:50:00`,
        message: `Si, ma preferirei andare al cinema`,
        status: `received`,
      },
    ],
  },
  {
    name: `Alessandro L.`,
    avatar: `_5`,
    visible: true,
    messages: [
      {
        date: `10/01/2020 15:30:55`,
        message: `Ricordati di chiamare la nonna`,
        status: `sent`,
      },
      {
        date: `10/01/2020 15:50:00`,
        message: `Va bene, stasera la sento`,
        status: `received`,
      },
    ],
  },
  {
    name: `Claudia`,
    avatar: `_6`,
    visible: true,
    messages: [
      {
        date: `10/01/2020 15:30:55`,
        message: `Ciao Claudia, hai novità?`,
        status: `sent`,
      },
      {
        date: `10/01/2020 15:50:00`,
        message: `Non ancora`,
        status: `received`,
      },
      {
        date: `10/01/2020 15:51:00`,
        message: `Nessuna nuova, buona nuova`,
        status: `sent`,
      },
    ],
  },
  {
    name: `Federico`,
    avatar: `_7`,
    visible: true,
    messages: [
      {
        date: `10/01/2020 15:30:55`,
        message: `Fai gli auguri a Martina che è il suo compleanno!`,
        status: `sent`,
      },
      {
        date: `10/01/2020 15:50:00`,
        message: `Grazie per avermelo ricordato, le scrivo subito!`,
        status: `received`,
      },
    ],
  },
  {
    name: `Davide`,
    avatar: `_8`,
    visible: true,
    messages: [
      {
        date: `10/01/2020 15:30:55`,
        message: `Ciao, andiamo a mangiare la pizza stasera?`,
        status: `received`,
      },
      {
        date: `10/01/2020 15:50:00`,
        message: `No, l'ho già mangiata ieri, ordiniamo sushi!`,
        status: `sent`,
      },
      {
        date: `10/01/2020 15:51:00`,
        message: `OK!!`,
        status: `received`,
      },
    ],
  },
];

const app = new Vue({
  el: `#root`,
  data: {
    currentIndex: 0,
    newMessage: ``,
    contacts: contacts,
    contactToFind: ``,
    isToolboxActive: false,
  },
  computed: {
    currentContact: function () {
      return this.contacts[this.currentIndex];
    },

    filteredContacts: function () {
      return this.contacts.filter((contact) =>
        contact.name
          .toLowerCase()
          .includes(this.contactToFind.toLowerCase().trim())
      );
    },
  },
  methods: {
    addNewMessage() {
      this.newMessage = this.newMessage.trim();

      if (!this.newMessage) return;

      const actualUserMessages = this.currentContact.messages;

      actualUserMessages.push({
        message: this.newMessage,
        date: this.getNewDate(),
        status: `sent`,
      });
      this.newMessage = ``;

      setTimeout(() => {
        this.newMessage = `ok`;
        actualUserMessages.push({
          message: this.newMessage,
          date: this.getNewDate(),
          status: `received`,
        });
        this.newMessage = ``;
      }, 2000);
    },

    dateToMilliseconds() {
      const time = new Date(
        this.currentContact.messages[messages.length - 1].date
      );
      return time;
    },

    deleteMessage(i) {
      this.currentContact.messages.splice(i, 1);
      this.isToolboxActive = false;
    },

    toggleToolbox() {
      this.isToolboxActive = !this.isToolboxActive;
    },

    getNewDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      let hours = today.getHours();
      let minutes = today.getMinutes();
      let seconds = today.getSeconds();

      if (dd < 10) dd = `0` + dd;
      if (mm < 10) mm = `0` + mm;
      if (hours < 10) hours = `0` + hours;
      if (minutes < 10) minutes = `0` + minutes;
      if (seconds < 10) seconds = `0` + seconds;

      let formattedToday = `${dd}/${mm}/${yyyy} ${hours}:${minutes}:${seconds}`;

      return formattedToday;
    },
  },

  mounted() {
    this.contacts.sort(function (a, b) {
      const dateA = a.messages[a.messages.length - 1].date;
      const dA = dateA.slice(0, 2),
        mA = dateA.slice(3, 5),
        yA = dateA.slice(6, 10);

      const dateMDYa = new Date(mA, dA, yA);
      const millisecondsA = dateMDYa.getTime();

      const dateB = b.messages[b.messages.length - 1].date;
      const dB = dateB.slice(0, 2),
        mB = dateB.slice(3, 5),
        yB = dateB.slice(6, 10);

      const dateMDYb = new Date(mB, dB, yB);
      const millisecondsB = dateMDYb.getTime();

      return millisecondsA - millisecondsB;
    });
  },
});
