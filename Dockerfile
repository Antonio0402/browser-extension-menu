FROM php:8.2-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install required PHP extensions
RUN apt-get update && apt-get install -y \
    libicu-dev libzip-dev unzip git zip curl \
    && docker-php-ext-install intl pdo pdo_mysql zip

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Add this line before composer install
RUN git config --global --add safe.directory /var/www/html

# Ensure .env exists
RUN if [ ! -f .env ]; then cp .env.production .env; fi

RUN composer install --no-dev --optimize-autoloader --no-scripts

# Apache config to serve Symfony public directory
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Symfony permissions (adjust if needed)
RUN mkdir -p var && chown -R www-data:www-data var vendor
