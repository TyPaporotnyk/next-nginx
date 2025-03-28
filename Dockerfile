# Этап сборки
FROM node:18-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build:export

# Этап подготовки Nginx
FROM nginx:alpine

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копирование собранных статических файлов из этапа сборки
# Используем директорию dist вместо out
COPY --from=builder /app/dist /usr/share/nginx/html

# Экспозиция порта 80
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]