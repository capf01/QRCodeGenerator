<template>
    <div class="container">
      <div class="card">
        <h1 class="title">Gerador de QR Code</h1>
        <div class="form-container">
          <!-- Campo de entrada para link/texto -->
          <input 
            v-model="inputText" 
            type="text" 
            placeholder="Insira um link ou texto" 
            class="input" 
            @input="validateInput" 
          />
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          
          <!-- Selecionador de cor avançado -->
          <div class="color-picker">
            <label class="label">Escolha a cor do QR Code:</label>
            <div>
              <ColorPicker v-model="qrColor" format="hex" />
            </div>
          </div>
          
          <!-- Botão para gerar o QR Code -->
          <button 
            @click="generateQRCode" 
            class="generate-button" 
            :disabled="!isInputValid"
          >
            Gerar QR Code
          </button>
          
          <!-- Exibição do QR Code com animação -->
          <div v-if="qrCodeUrl" class="qr-container">
            <img :src="qrCodeUrl" alt="QR Code" class="qr-code" />
          </div>
          
          <!-- Botão para copiar o QR Code -->
          <button 
            v-if="qrCodeUrl" 
            @click="copyToClipboard" 
            class="copy-button"
          >
            Copiar QR Code
          </button>
        </div>
      </div>
    </div>
  </template>
<script>
import { Chrome } from '@ckpack/vue-color';

export default {
  components: {
    ColorPicker: Chrome, // Use o componente Chrome do vue-color
  },
  data() {
    return {
      inputText: '', // Armazena o texto/link inserido pelo usuário
      qrCodeUrl: '', // Armazena a URL do QR Code gerado
      qrColor: '#000000', // Cor do QR Code
      errorMessage: '', // Mensagem de erro para validação
      isInputValid: false, // Estado de validação do input
    };
  },
  methods: {
    validateInput() {
      if (this.inputText.trim().length === 0) {
        this.errorMessage = 'Por favor, insira um link ou texto.';
        this.isInputValid = false;
      } else {
        this.errorMessage = '';
        this.isInputValid = true;
      }
    },
    generateQRCode() {
  if (!this.isInputValid) {
    alert('Por favor, insira um link ou texto válido.');
    return;
  }

  // Pegando a cor corretamente
  const colorHex = this.qrColor?.hex?.replace('#', '') || '000000';

  // Gera o QR Code usando a API do QRServer com a cor personalizada
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(this.inputText)}&color=${colorHex}`;
  
  console.log('Gerando QR Code com URL:', apiUrl); // Para debug
  this.qrCodeUrl = apiUrl;
},

    copyToClipboard() {
      if (this.qrCodeUrl) {
        navigator.clipboard.writeText(this.qrCodeUrl).then(() => {
          alert('QR Code copiado para a área de transferência!');
        }).catch((err) => {
          alert('Erro ao copiar o QR Code.');
          console.error('Erro ao copiar para a área de transferência:', err);
        });
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background-color: #f0f2f5;
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.card {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input, .color-input, .generate-button, .copy-button {
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid #ddd;
}

.input {
  font-size: 1rem;
  border-color: #bbb;
}

.input:focus {
  outline: none;
  border-color: #4c9aff;
}

.color-picker {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza o conteúdo na horizontal */
  justify-content: center; /* Centraliza na vertical */
  text-align: center;
}

.label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.generate-button, .copy-button {
  background-color: #4c9aff;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.generate-button:hover, .copy-button:hover {
  background-color: #3676e4;
}

.generate-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
}

.qr-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.qr-code {
  width: 200px;
  height: 200px;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.copy-button {
  background-color: #81c784;
}

.copy-button:hover {
  background-color: #66bb6a;
}

@media (max-width: 500px) {
  .card {
    padding: 1.5rem;
  }

  .qr-code {
    width: 150px;
    height: 150px;
  }
}
</style>
  