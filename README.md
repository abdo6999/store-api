# image-processor

this is a image processor use it to resize an image

## start the project

1.  clone the repo
2.  run npm install
3.  set up .env file with this 
    POSTGRES_HOST = chose host
    POSTGRES_DB = database
    POSTGRES_USER = user
    POSTGRES_PASSWORD = password
    POSTGRES_TEST_DB = test database
    PEPPER='storeDCRYPT_PASSWORD_'
    SALT_ROUNDS= '10'
    ACCESS_TOKEN_SECRET = '3aec27d374fb1b37b3272fea86a9693ded1fabe6be120569d44c85ca755995dd99e1f1751f18add0b6e7ee0d9ebf724156b892c3ee8719d336c5c9508d0
    e074b'
    REFRESH_TOKEN_SECRET = '0c4d35e88edc1aecb86d9021f487dccb93272e7444a982d4b046cca53cd98694e89ca6a6376a9b62f4f60a93584b0e3c9258d85cf7a3778b14fa895f5b0
    cc3d4'
4.  run npm start to serve

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

    "/" will get all route

    "/get-products" will retarn all products

    "/show-product/:id" will retarn product if id is exist

    "/create-product" will create product if authenticated and enter valid body and retarn the new product data

    "/update-product/:id"  will update product if authenticated and id is exist and retarn the updated data

    "/delete-product/:id" will delete product if authenticated and id is exist and retarn the delete product data

    "/get-users" will get all users


    "/show-user/:id" retarn user if authenticated and id is exist and

    "/create-user" will create user if you enter valid body retarn the new user data

    "/refresh-token" will make new access token and retarn it

    "/update-user/:id" will update user if authenticated and id is exist retarn the updated data

    "/delete-user/:id" will delete user if authenticated and id is exist and retarn the delete user data

    "/authenticate-user" will retarn access token and refreshtoken

    "/get-orders" will get all orders


    "/show-order/:id" retarn order if user_id is exist and

    "/create-order" will create order if you authenticated and enter valid body retarn the new order data

    "/update-order/:id" will update order if authenticated and id is exist retarn the updated data

    "/delete-order/:id" will delete order if authenticated and id is exist and retarn the delete order data

### status 401

all route that need authenticatToken and you unauthenticated

### status 404

if route not exist

### Data Shapes
  #### Product
  - id: number
  - title: string
  - price: number
  - rating: number
  - stock: number
  - brand: string
  - description: string
  - category: string
  - thumbnail: string
  - images: string[]
  #### users
  - id: number
  - firstName: string
  - lastName: string
  - password: string
  - email: string
  - gender: string
  - username: string
  #### users
  - id: number
  - cart: Cart[] Cart{product_id,quantity}
  - user_id: number
  - stutas: boolean
  - orderDate: string



