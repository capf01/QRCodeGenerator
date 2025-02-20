<template>
  <div class="container">
    <div class="card">
      <h1 class="title">Gerador de QR Code</h1>
      <div class="form-container">
        <input 
          v-model="inputText" 
          type="text" 
          placeholder="Insira um link ou texto" 
          class="input" 
          @input="validateInput" 
        />
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <input 
          v-model="extraText"
          type="text"
          placeholder="Texto adicional (ex: CODEC-SOLUÇÕES, nosso site)"
          class="input"
        />
        <label class="escolhacor">Escolha a cor do QR Code:</label>
        <div class="color-picker">
          
          <ColorPicker v-model="qrColor" format="hex" />
        </div>

        <button 
          @click="generateQRCode" 
          class="generate-button" 
          :disabled="!isInputValid"
        >
          Gerar QR Code
        </button>

        <div v-if="qrCodeUrl" class="qr-container">
          <p v-if="extraText" class="extra-text">{{ extraText }}</p>
          <img :src="qrCodeUrl" alt="QR Code" class="qr-code" />
        </div>

        <button 
          v-if="qrCodeUrl" 
          @click="downloadQRCode" 
          class="copy-button"
        >
          Baixar QR Code com Texto
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import { Chrome } from '@ckpack/vue-color';

export default {
  components: {
    ColorPicker: Chrome,
  },
  data() {
    return {
      inputText: '',
      extraText: '',
      qrCodeUrl: '',
      qrColor: '#000000',
      errorMessage: '',
      isInputValid: false,
    };
  },
  methods: {
    validateInput() {
      this.isInputValid = this.inputText.trim().length > 0;
      this.errorMessage = this.isInputValid ? '' : 'Por favor, insira um link ou texto.';
    },
    async generateQRCode() {
      if (!this.isInputValid) {
        alert('Por favor, insira um link ou texto válido.');
        return;
      }
      
      try {
        const canvas = document.createElement('canvas');
        
        await QRCode.toCanvas(canvas, this.inputText, {
          color: {
            dark: this.qrColor.hex || '#000000',
            light: '#ffffff',
          },
          width: 200,
        });
        
        if (this.extraText) {
          const newCanvas = document.createElement('canvas');
          newCanvas.width = canvas.width;
          newCanvas.height = canvas.height + 30;
          const newCtx = newCanvas.getContext('2d');
          
          newCtx.fillStyle = '#ffffff';
          newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);
          
          newCtx.font = '16px Arial';
          newCtx.fillStyle = this.qrColor.hex || '#000000';
          newCtx.textAlign = 'center';
          newCtx.fillText(this.extraText, newCanvas.width / 2, 20);
          
          newCtx.drawImage(canvas, 0, 30);
          this.qrCodeUrl = newCanvas.toDataURL('image/png');
        } else {
          this.qrCodeUrl = canvas.toDataURL('image/png');
        }
      } catch (err) {
        alert("Erro ao gerar o QR Code.");
        console.error("Erro ao gerar QR Code:", err);
      }
    },
    async downloadQRCode() {
      if (!this.qrCodeUrl) return;

      try {
        const link = document.createElement('a');
        link.href = this.qrCodeUrl;
        link.download = `qrcode-com-texto-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        alert("Erro ao fazer download.");
        console.error("Erro ao fazer download:", err);
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

body, html {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title{
  padding-bottom: 20px;
}
.escolhacor{
  padding-bottom: 10px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
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

.input, .generate-button, .copy-button {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

.input:focus, .generate-button:focus, .copy-button:focus {
  outline: none;
  border-color: #007bff;
}

.generate-button:disabled {
  background-color: #ccc;
}

.extra-text {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
}

.qr-code {
  width: 200px;
  height: 200px;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.color-picker {
  margin-bottom: 1.5rem;
  display: flex;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
}

</style>
