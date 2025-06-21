FROM php:8.2-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install required PHP extensions
RUN apt-get update && apt-get install -y \
    libicu-dev libzip-dev unzip git zip curl nodejs npm \
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

ENV APP_ENV=prod
ENV APP_DEBUG=0
ENV COMPOSER_ALLOW_SUPERUSER=1

RUN composer install --no-dev --optimize-autoloader --classmap-authoritative

RUN php bin/console tailwind:build
RUN php bin/console asset-map:compile

RUN rm -f /etc/apache2/sites-enabled/000-default.conf

# Apache config to serve Symfony public directory
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# ✅ Enable the config explicitly
RUN a2ensite 000-default.conf

# Symfony permissions (adjust if needed)
RUN mkdir -p var/log && chown -R www-data:www-data var && chmod -R 755 var

# Expose port 80
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]
