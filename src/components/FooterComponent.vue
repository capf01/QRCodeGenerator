<template>
  <footer class="footer">
    <div class="logoCodec">
      <div class="logo-and-text">
        <a href="https://www.instagram.com/codecsolucoestecnologicas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da CODEC">
          <img
            src="@/assets/images/logoCodec.jpeg"
            alt="Logo da CODEC"
            class="circular-image"
          />
        </a>
        <p>© CODEC Soluções Tecnológicas.</p>
      </div>
      <p>CNPJ: 30.996.198/0001-76.</p>
      <p>Rua Desembargador Luis Felismino Cabral N 32, Manaus-AM</p>
      <div class="contato">
        <p>Email: <a href="mailto:contato@codecsolucoes.com">contato@codecsolucoes.com</a></p>
        <p>Telefone: (92) 98471-3059</p>
        <p>Telefone: (64) 9285-1379</p>
        <div class="redes-sociais">
          <a href="https://www.instagram.com/codecsolucoestecnologicas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da CODEC">
            <img
              src="@/assets/images/instagram-removebg-preview (1).png"
              alt="Instagram"
              class="logo-redes"
            />
          </a>
          <a href="https://www.facebook.com/codecsolucoestecnologicas/" target="_blank" rel="noopener noreferrer" aria-label="Facebook da CODEC">
            <img
              src="@/assets/images/facebook-removebg-preview.png"
              alt="Facebook"
              class="logo-redes"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.footer {
  background-color: #000;
  padding: 20px 0;
  color: #fff;
  box-sizing: border-box;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  width: 100%;
  position: relative;
}

.logoCodec {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.logo-and-text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contato {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.redes-sociais {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.logo-redes {
  height: 30px;
  width: 30px;
  transition: opacity 0.3s ease;
}

.logo-redes:hover {
  opacity: 0.8;
}

.circular-image {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
}

p {
  margin: 5px 0;
  font-size: 1rem;
}

a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer {
    padding: 10px 0;
  }

  .circular-image {
    height: 40px;
    width: 40px;
  }

  .logo-redes {
    height: 25px;
    width: 25px;
  }

  p {
    font-size: 0.8rem;
  }
}
</style>
