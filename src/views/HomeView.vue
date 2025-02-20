<template>
    <div>
      <QRCodeGenerator />
    </div>
    <section class="footer">
      <FooterComponent/>
    </section>
  </template>
  
  <script>
  import FooterComponent from '@/components/FooterComponent.vue';
import QRCodeGenerator from '@/components/QRCodeGenerator.vue';
  
  export default {
    components: {
      QRCodeGenerator,
      FooterComponent
    },
  };
  </script>
<style lang="css" scoped>
 .footer{
  margin: none;
  width: 100%;
 }
</style>