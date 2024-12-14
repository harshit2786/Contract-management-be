# Backend Application

This is the backend application for our project, built with express.

## Setup

Follow the steps below to get the project up and running on your local machine.

### Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/harshit2786/Contract-management-be.git
cd your-repository
```
### Steps for running locally without docker

## 1. Create an Environment File

Create a .env file in the root directory of the project. You can use the .env.example file as a reference. The .env file should include the following variables:

```bash
PORT=3000
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[dbName]"
```
If you are using supabase then go to supabase's database settings page and copy the connection string.

## 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

## 3. Migration and client generation

Run these commands to generate prisma client and migrate tables to the postgres database:

```bash
npm run generate
npm run migrate
```

## 4. Run the Development Server

Start the development server via nodemon using the following command:

```bash
npm run dev
```

This will start the server in development mode on the specified port.

### Using docker

## 1. Build Image

For building image run the following command:

```bash
docker build -t tagname .
```

This will build the image and you will get the image id

## 2. Running container

```bash
docker run -d -p 3000:3000 -e PORT=3000 -e DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[dbName]"  --name my-express-container "image-id"
```
This will start the server container on the port 3000.

# Note - If facing error while trying to connect to supabase db, try changing port in the supabase postgres string to 5432