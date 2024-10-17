W celu uruchomienia aplikacji należy : 
-Utworzyć bazę danych np w pg admin o nazwie todo_database, ponieważ wszystko odbywa się lokalnie
-Należy w pliku konfiguracyjnym zastąpić "your password" własnym hasłem do bazy danych, analogicznie z username
-link pod którym wszystko będzie działać na naszym lokalnym sprzęcie to : http://localhost:3000/api-docs (z odpowiednimi params)
-kompilacja z ts do js : tsc
-aby włączyć server : node dist/index.js
-należy zainstalować zależności
    npm init -y
    npm install swagger-jsdoc swagger-ui-express
    npm install typescript @types/node @types/express ts-node --save-dev
    npm install express typeorm pg reflect-metadata class-validator
    npm install pg

    
    