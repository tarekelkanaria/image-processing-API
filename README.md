# Image Processing API   

This project is for Advanced Full-Stack Web Development Nanodegree Program.

## Getting Started   

### `npm run start`

Runs the server in the development mode. with nodemon package to automatically refresh when changes are occur.   

Open **http://localhost:3001** to view it in your browser.

### `npm run build`   

To compile typescript and build dist folder for all compiled code.    

### `npm run test`   

to compile typescript code and run jasmine tests   

### `npm run prettier`   

To format the code with prettier package

### `npm run lint`   

To run Eslint Package with typescript configurations to make sure the code is consistent and errors free.   

## Author   

Tarek Elkanaria   

## Description   

After  start the server, open your browser with the URL:  
**http://localhost:3001/images**   
the URL take three parameters `filename`, `width`, and `height`.  
you can specify the filename by putting the image you want in `assets/images` directory and take it's name as filename.  
**Note**: it must be in `jpg` extension.
you can specify the width and height by any number you want for your image.  
the result URL will be something like that:  
**http://localhost:3001/images?filename=fjord&width=300&height=300**  
The final result should be the specified image with width and height on the screen and also in `thumb` directory.   

## Requirements   

Meets Specifications Criteria for udacity instructions.
