const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const imageMap = {
  'hero-upscaled-new.jpg': 'barberia-las-condes-level-studio.webp',
  'logo-level-studio-light-v2.png': 'logo-level-studio-las-condes.webp',
  'logo-level-studio-v2.png': 'logo-oscuro-level-studio.webp',
  'alonso-experiencia.jpg': 'experiencia-barberia-las-condes.webp',
  'cortes_upscaled.jpg': 'corte-de-pelo-hombre-las-condes.webp',
  'tienda-exterior.jpg': 'fachada-level-studio-las-condes.webp',
  'corte_barberia_upscaled_vertical.jpg': 'barberia-premium-corte-de-barba.webp',
  'foto-productos.jpg': 'productos-premium-cuidado-personal-barberia.webp',
  'juanchi-corte.jpg': 'barbero-juanchi-level-studio.webp',
  'alonso-corte.jpg': 'barbero-alonso-level-studio.webp',
  'misael-oficial-hd.jpg': 'barbero-misael-level-studio.webp',
  'concrete.jpg': 'fondo-concreto-level-studio.webp',
  'benjamin.png': 'resena-cliente-barberia-benjamin.webp',
  'faxio.png': 'resena-cliente-barberia-faxio.webp',
  'alejandro.png': 'resena-cliente-barberia-alejandro.webp'
};

async function optimizeImages() {
  for (const [oldName, newName] of Object.entries(imageMap)) {
    const oldPath = path.join(publicDir, oldName);
    const newPath = path.join(publicDir, newName);
    
    if (fs.existsSync(oldPath)) {
      try {
        await sharp(oldPath)
          .webp({ quality: 80 })
          .toFile(newPath);
        console.log(`Optimized: ${oldName} -> ${newName}`);
      } catch (error) {
        console.error(`Error processing ${oldName}:`, error);
      }
    } else {
      console.log(`File not found: ${oldPath}`);
    }
  }
}

optimizeImages();
