# whatsnext-server
Find similar people like you based on shared life events.
You can experience it yourself here: https://www.stockdiv.com/whatsnext/#/login

Enter your main life events and find people who share the same events like you.

Privacy policy: We collect the email, password (encrypted) and life events as entered by the user. This data won't be sold nor shared with any 3rd party. When searching for other people, their private information is not disclosed. The user is able to ask for a connection request and his email will be visible to the other side.

You have a file called **db.sql** with a script to create a postgres database on your postgres instance.

Feel free to contribute in any way you like. If you have an idea but are familiar only with the client/server side, please share this idea with me. Following are some ideas to begin with:
1. Search based on age, not years.
2. When contacting someone, add the number of shared events between them.
3. If contacting the same person, just update the contact_when instead of inserting a new row to the table.
4. If already contacted today, prevent re-sending a contact request.
5. Change project name to SimilarMe?
6. Birth event can only be edited, not deleted.
7. Prevent adding another birth event.

The client side of WhatsNext can be found here: https://github.com/AmosSzust/whatsnext-client

Thanks!

Amos
