const { createApp } = Vue;

const myApp = {
  data() {
    return {
      immos: [],
      immo1: {},
      immo2: {},
      isHidden: false,
      text: 0,
    };
  },
  methods: {
    async getImmos() {
      try {
        const { data } = await axios.get('/immos');
        this.immos = data;
      } catch (error) {
        console.error(error);
      }
    },
    async delImmo({ id }) {
      await axios.delete(`/immos/${id}`);
      this.getImmos();
    },
    async editImmo(i) {
      this.chosenImmo = { ...i };
      this.chosenImmo2 = i;
      this.isHidden = true;
    },
    async chPrice() {
      const id = this.chosenImmo2.id;
      await axios.patch(`/immos/${id}`, {"price": this.text});
      this.getImmos();
      this.isHidden = false;
    },
  },
};

createApp(myApp).mount('#app');
