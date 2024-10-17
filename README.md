W celu uruchomienia aplikacji należy :

1. Utworzyć bazę danych np w pg admin o nazwie todo_database, ponieważ wszystko odbywa się lokalnie
2. Należy w pliku konfiguracyjnym zastąpić "your password" własnym hasłem do bazy danych, analogicznie z username
3. link pod którym wszystko będzie działać na naszym lokalnym sprzęcie to : http://localhost:3000/api-docs (z odpowiednimi params)
4. kompilacja z ts do js : tsc
5. aby włączyć server : node dist/index.js
6. należy zainstalować zależności :
   npm init -y
   npm install swagger-jsdoc swagger-ui-express
   npm install typescript @types/node @types/express ts-node --save-dev
   npm install express typeorm pg reflect-metadata class-validator
   npm install pg
