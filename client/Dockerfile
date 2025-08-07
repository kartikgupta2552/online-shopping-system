# 1️⃣ Use a tiny Node image (just for build)
FROM node:20-alpine AS builder

# 2️⃣ Set working directory INSIDE the container to /app
WORKDIR /app

# 3️⃣ Copy the package files (dependency info)
COPY package.json yarn.lock ./

# 4️⃣ Install dependencies, silent so it doesn't vomit a wall of logs
RUN yarn install --frozen-lockfile --silent

# 5️⃣ Copy the rest of your source code in (everything else)
COPY . .

# 6️⃣ Run the Vite build script (output: /app/dist)
RUN npm run build

# 7️⃣ Use small Nginx image for static webserver
FROM nginx:1.25-alpine

# 8️⃣ Copy Nginx config if you want custom routes (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# 9️⃣ Copy build files from previous stage to Nginx HTML dir
COPY --from=builder /app/dist /usr/share/nginx/html

# 1️⃣0️⃣ Expose port (let’s default to 80 for prod)
EXPOSE 80

# 1️⃣1️⃣ Start Nginx (official image's CMD handles this)

