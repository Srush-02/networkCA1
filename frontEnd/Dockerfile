# Use official Nginx image
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy all files in current directory to Nginx HTML folder
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Nginx runs by default, no need to specify CMD