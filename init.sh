#!/bin/bash
docker volume create mysql_data
export MYSQL_ROOT_PASSWORD=MyPoli0725.
docker run --name mysql-poli -e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} -e MYSQL_DATABASE=poli -v mysql_data:/var/lib/mysql -p 3306:3306 -d mysql:latest
# Wait for MySQL to start up
echo "Waiting for MySQL to start up..."
while ! docker exec -i mysql-poli mysqladmin ping -h localhost --silent; do
    sleep 1
done
# Execute SQL scripts
echo "Executing SQL scripts..."
# docker cp ./db/migrations/init.sql mysql-poli:/tmp/init.sql
docker exec -i mysql-poli mysql -u root -p${MYSQL_ROOT_PASSWORD} poli < ./db/migrations/init.sql
# CREATE USER 'admin'@'172.17.0.1' IDENTIFIED BY 'password';
# GRANT ALL PRIVILEGES ON *.* TO 'admin'@'172.17.0.1' WITH GRANT OPTION;
# flush privileges; 
# exit
echo "Done!"