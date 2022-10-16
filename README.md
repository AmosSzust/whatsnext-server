# whatsnext-server

Find similar people like you based on shared life events.
You can experience it yourself here: https://www.stockdiv.com/whatsnext/#/login

Enter your main life events and find people who share the same events like you.

## Privacy Policy

We collect the email, password (encrypted) and life events as entered by the user. This data won't be sold nor shared with any 3rd party. When searching for other people, their private information is not disclosed. The user is able to ask for a connection request and his email will be visible to the other side.

## Before you begin

You have a file called **db.sql** with a script to create a postgres database on your postgres instance.

You have a file called **.env** with several variables for you to define, for example, email and db/postgres related parameters.

## Contribution

The server side is developed using NodeJS (Typescript).

Feel free to contribute in any way you like. If you have an idea but you're only familiar with the client or server side, please share this idea with me and we'll coordinate the development together. Following are some ideas to start with:

1. Search based on age, not years.
2. When contacting someone, add the number of shared events between them.
3. If already contacted today, prevent re-sending a contact request.
4. Change project name to SimilarMe?
5. Add if/when the user contacted the similar person

The client side of WhatsNext can be found here: https://github.com/AmosSzust/whatsnext-client

Thanks!

Amos
