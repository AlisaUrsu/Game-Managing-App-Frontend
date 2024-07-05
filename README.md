# Game Managing App Frontend
Welcome to the frontend repository for the Game Managing MERN application. This application provides a user-friendly interface for managing and exploring games, tailored for different user roles: basic, manager, and admin.
## Screenshots
### Logged out view
![image](https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/7a3eb9ac-82f9-475e-99d9-a73f94b66d9c)
Upon opening the application, users can view a list of games available. In order to access more functionalities the user has to login into his account or register.
<div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
  <img src="https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/0bebbefb-99f8-49bc-b615-f0896cbc7522" alt="Login or Register view" style="width: 45%; margin-bottom: 10px;">
  <img src="https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/1ba4f89d-066f-47b4-b387-97649c5b5eeb" alt="Login or Register view" style="width: 45%; margin-bottom: 10px;">
</div>

### Basic User View
![image](https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/1993d895-7766-4aeb-bc54-2bbf641822a8)
- **Personal Game List**: Users can add games from the list to their personal collection, manage game statuses, reviews, and ratings; a game's rating is influenced by the ratings submitted users. This feature helps users keep track of their gaming progress. Users can later modify the status, review and rating for a specific entry, or even remove it.
<div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
  <img src="https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/4c7f4f77-5051-42f9-857e-6e14e7a9acc3" alt="Add Game Modal" style="width: 20%; margin-bottom: 10px;">
  <img src="https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/ac85c79a-8b7e-46bc-980a-0bfa391a6556" alt="Personal List" style="width: 75%; margin-bottom: 10px;">
</div>

- **Genre Chart**: Visual representation of the number of games per genre.
![image](https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/eaf69fd9-9a09-4330-a2ac-90b777c712eb)

### Manager View
![image](https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/f0758515-25e0-460d-a89d-b6a391dfc6f3)
- **Game Management**: Managers have additional privileges to add, delete, or update game entries.
<div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
  <img src="https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/3ff4a0e6-0dbd-49ca-971e-fdb1335145eb" alt="Add Game Page" style="width: 45%; margin-bottom: 10px;">
  <img src="https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/afcca918-6a67-4a6c-9097-31b55c80bb81" alt="Add Game Page" style="width: 45%; margin-bottom: 10px;">
</div>

*Redesign coming later*
- **Personal Game List And Genre Chart**: Similar to basic users, managers can maintain their personal game lists and visualize the genre chart.

### Admin View
![image](https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/01a5028f-41c3-45ed-beca-6cf7d910fcdc)
![image](https://github.com/AlisaUrsu/Game-Managing-App-Frontend/assets/115451781/eea60433-79fb-43c2-b38a-34d7b5770ae9)
- **Full Access**: Admins can view all information, including games, users, and users' personal game lists.
- **Management**: Admins have complete control over game and user management, including CRUD operations for games and users.

## Future Enhancements
### Planned Features

- **Filtering**: Users can refine their search by diverese criteria, such as selecting specific genres, setting minimum ratings, or filtering games by supported platforms.
- **Search**: Utilize a search bar to find games by typing keywords or the exact name of the game.
- **Pagination**: Control the number of games displayed per page, with options to navigate through multiple pages of search results or filtered lists.
- **Game Details Page:**
  - **Information**: Create a dedicated page for each game, displaying detailed information such as description, genre, release date, developer, and more.
  - **Media Section**: Include multimedia elements like trailers, images, and videos to provide a rich visual experience of the game.
  - **Reviews and Ratings**: Enable users to view reviews and ratings submitted by other users. This allows for informed decision-making and community interaction around each game.
 
Stay tuned!
