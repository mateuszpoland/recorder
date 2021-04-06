# setup

1. cd recorder
2. docker-compose up -d --build
3. docker-compose exec api bin/console doctrine:migrations:migrate
4. docker-compose exec api bin/console doctrine:fixtures:load
5. cd records && composer install


# usage

1. go to localhost:3000 -> frontend application
2. test wit POSTMAN collection : https://www.getpostman.com/collections/973c3826f37e7468c788
