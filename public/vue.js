 const app = new Vue({
     el: '#app',
     data: {
         name: 'Nikita',
         dbs: [
             {title: "Mysql", weigth: 13},
             {title: "Redis", weigth: 55}
         ],
     },
     methods: {
         handleButtonClick() {
             const title = prompt("input title");
             const weigth = prompt("input weigth");
             this.dbs.push({ title, weigth})
         }
     },
     mounted() {

         alert('mounted');
     },
     created(){
         alert('create');
     },
/*
     computed: {
         transformedName() {
             return ('Mr.' + name).toUpperCase();
         }
     }*/
 });