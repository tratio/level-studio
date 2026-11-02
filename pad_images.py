from PIL import Image
import os

def pad_to_square(img_path):
    try:
        img = Image.open(img_path)
        img = img.convert("RGBA")
        width, height = img.size
        
        if width == height:
            print(f"Image {img_path} is already square.")
            return

        max_dim = max(width, height)
        
        # Crear un lienzo cuadrado transparente
        new_img = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
        
        # Pegar la imagen original en el centro
        offset_x = (max_dim - width) // 2
        offset_y = (max_dim - height) // 2
        new_img.paste(img, (offset_x, offset_y))
        
        new_img.save(img_path)
        print(f"Éxito: {img_path} convertido a cuadrado ({max_dim}x{max_dim}) sin achatarse.")
    except Exception as e:
        print(f"Error con {img_path}: {e}")

if __name__ == "__main__":
    pad_to_square("public/logo-blanco.png")
    pad_to_square("public/logo-negro.png")
