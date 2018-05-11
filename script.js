const app = new Vue({
  el: "#test",
  created: function () {
    this.getImage()
  },
  data: {
    signIn_data:{
      name: '',
      email: ''
    },
    formdata: new FormData(),
    image: null,
    pictures: []
  },
  methods:{
    signIn: function () {

      axios({
        method: 'POST',
        url: 'http://35.198.212.156/request-token',
        headers: {autorizacion: localStorage.token},
        data: this.signIn_data })

      .then(function (response) {
        localStorage.setItem('authorization', response.data.user.uid)
      })
      .catch(function (error) {
        console.log(error);
      });

    },

    onFileChanged (event) {
      this.image = event.target.files[0]
    },
    onUpload() {
      // upload file
      var token = localStorage.getItem('authorization');

      this.formdata.set('photo', this.image)
      this.formdata.set('authorization', token)

      axios.post('http://35.198.212.156/api/image', this.formdata)
      .then(response => {
        this.getImage()
        console.log('success');
      })
      .catch(err => {
        console.log("gagal");
      })

    },
    getImage(){
      axios.get('http://35.198.212.156/api/image')
      .then(({data})=>{
        this.pictures = data.data
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
})
