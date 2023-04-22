# Words to Path

- Run `npm start` and then `curl -d "font=EMSOsmotron&text=Hello&hex=37" -X POST http://localhost:8000` to get a list of points that say Hello
- These points can be fed into the mirror-array project as they are printed here (array of 2 element arrays)
- Go to `http://localhost:8000` for interfacing

# Process
## Fonts

- The first step is getting a single line svg font - http://cutlings.wasbo.net/single-line-fonts-options/
- Font file formats require closed paths to make outlines so even if  they say they're single line, they actually double back very thinly
- I downloaded the Geometric svg font from above

## Getting the shape manually

- Used [CNC Text Tool](https://msurguy.github.io/cnc-text-tool/) ([source](https://github.com/msurguy/cnc-text-tool)) with my geometric svg font uploaded and the text size to 75 to download sentences as svgs
- Turned that svg into points with [PathtoPoints](https://shinao.github.io/PathToPoints/) with every 10th point
- Copy All Paths and parse into python array of doubles with VS Code
  - Paste into https://arraythis.com/
  - Replace `",` with `]` and remaining `"` with `[` and surround with extra `[]`


## Getting shape automatically

- Incorporate the important parts of CNC Text Tool and PathToPoints into a single project.
- node backend that takes a sentence and translates it - keep IP secret from other Etsy Sellers
- Node output should be a file containing the point array. When an order comes through, the python program can create the mirror stl
  - manually run script with array and check the outputs are correct
 


## Test scripts

`EMSOsmotron` is a good font for this

```
curl -d "font=EMSOsmotron&text=Hello&hex=91" -X POST http://localhost:8000

ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789
```


# Used this one
curl -d "font=EMSReadability&text=GRAHAM&hex=127" -X POST http://localhost:8000