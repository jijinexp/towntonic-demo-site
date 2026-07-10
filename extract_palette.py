from PIL import Image

def get_dominant_colors(image_path, num_colors=8):
    # Load and resize for speed
    img = Image.open(image_path)
    img.thumbnail((200, 200))
    
    # Quantize to reduce to N colors using adaptive palette
    quantized = img.quantize(colors=num_colors, method=Image.Quantize.MAXCOVERAGE)
    
    # Get palette
    palette = quantized.getpalette()
    
    # Extract RGB colors
    colors = []
    for i in range(num_colors):
        r = palette[i*3]
        g = palette[i*3 + 1]
        b = palette[i*3 + 2]
        hex_code = f"#{r:02x}{g:02x}{b:02x}"
        colors.append((hex_code, (r, g, b)))
        
    return colors

if __name__ == "__main__":
    colors = get_dominant_colors("images/floorshot2.jpeg", 10)
    print("Extracted dominant colors:")
    for hex_code, rgb in colors:
        print(f"  {hex_code} - RGB: {rgb}")
