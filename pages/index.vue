<template>
  <div class="img_accueil">
    <img class="main_img" src="../static/maison1.jpg" alt="Exemple maison" width="1200" height="800"/>
    <img class="secondary_img" src="../static/maison2.jpg" alt="Exemple maison2" width="900" height="600"/>
    <img class="secondary_img" src="../static/maison2.jpg" alt="Exemple maison2" width="900" height="600"/>
    <p>Louez la maison de<br> vos rêves !</p>
    <button>Découvrez nos nouveautés</button>
    
  </div>
</template>

<script>
</script>

<style scoped>

  @font-face {
    font-family: "Roboto";
    src: local("Roboto"),   url(../assets/fonts/Roboto-Medium.ttf) format("truetype");
  }
   @font-face {
    font-family: "RobotoBold";
    src: local("RobotoBold"),   url(../assets/fonts/Roboto-Bold.ttf) format("truetype");
  }
  
  .img_accueil>img:nth-child(1) {
    position: relative;
    margin-left: 10%;
    top: 50%;
    width: 80%;
    border-radius: 15px;
    box-shadow: 0px 0px 10px;
    z-index: 1;
  }

  .img_accueil>button {
    background-color: dodgerblue;
    padding: 15px 32px;
    color: white;
    font-size: 22px;
    border-radius: 30px;
    position:absolute;
    top: 630px;
    transform: translate(-50%, -50%);
    left: 50%;
    font-family: 'RobotoBold', sans-serif;
    z-index: 2;
  }

  .img_accueil>p {
    position: relative;
    top: -400px;
    color: white;
    text-shadow: 2px 2px 8px #000;
    text-decoration: underline;
    text-decoration-color: dodgerblue;
    text-decoration-thickness: 5px ;
    text-align: center;
    font-size: 42px;
    font-family: 'RobotoBold', sans-serif;
    z-index: 2;
  }

  .img_accueil>img{
    border-radius: 15px;
    position: absolute;
    top: 100px;
    z-index: 0;
    box-shadow: 0px 0px 8px;
  }

  .img_accueil>img:nth-child(2){
    left: 5%;
  }
  .img_accueil>img:nth-child(3){
    left: 36%;
  }

</style>