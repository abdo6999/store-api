# image-processor
this is a image processor use it to resize an image 
## start the project
 1. clone the repo
 2. run npm install
 3. run npm start to serve 
 4. go to /gallrey 
## script 
 ### build
   npm run build to build the project. The build artifacts will be stored in the `dist/` directory.
 ### test
   npm run test to to execute the unit tests with jasmine
 ### serve
   npm run start to run a dev server.
 ### lint
   npm run lint to run a eslint.
 ### prettier
   npm run prettier to run a dev server.
 ### run build version
   node dist/. to run the build version
   
 ## endpoint  
  ### status 200
   "/" root notes it is empty
   
   "/gallery" here where the images display
   
   "/gallery/images" add the qurey filename= {sring and exist} width = {number > 0} height = {number > 0}
  
  ### status 418
   if any of this condition return false 
   
   "/gallery/images" add the qurey filename= {sring and exist} width = {number > 0} height = {number > 0}
 
 ### status 404
   if route not exist
   
 
 
