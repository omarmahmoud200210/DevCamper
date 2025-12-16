# Project Plan & Task Management

## 🚀 Backend API Development & Front End.

### ✅ Completed

- [✅] **Bootcamp CRUD**: Basic Create, Read, Update, Delete operations.
- [✅] **Geocoding**: Automatic location data from address.
- [✅] **Geospatial Query**: Find bootcamps within a radius.
- [✅] **Advanced Filtering**: Select, Sort, Pagination.
- [✅] **Course CRUD**: Basic operations for courses.
- [✅] **Relationship**: Bootcamp <-> Course (Virtuals).
- [✅] **Aggregation**: Calculate Average Cost of Bootcamp.
- [✅] render three bootcamps from the existed bootcamps in the main page.
- [✅] render all the bootcamps that in DB in the bootcamps page.
- [✅] Add two inputs zipcode and distance in the bootcamps page.
- [✅] apply the pagination in bootcamp page
- [✅] i will do the filteration in three ways :
  1. [✅] by search for a specific name for a bootcamp
  2. [✅] by entering zipcode and distance
  3. [✅] by entering the rate of the bootcamp
  4. [✅] by entering the budget
- [✅] if the bootcamp not existed display to the user a message that the bootcamp not existed.
- [✅] create details of bootcamps page and render all the related courses to the entered bootcamp.
- [✅] for admin role i will make the admin able to manage the following :
  - [✅] bootcamps -> build simple dashboard and for each bootcamp the adming can do the following:
    - [✅] Edit Bootcamp details
    - [✅] Manage Courses
      - [✅] Edit Course details
      - [✅] Remove Course
      - [✅] Add Course
      - [✅] Organize the front end JS code.
    - [✅] Remove Bootcamp
    - [✅] Can publish a bootcamp
  - [✅] reviews -> build simple dashboard and for each review the admin can do the following:
    - [✅] render the existing reviews
    - [✅] add a review
  - [✅] Manage Reviews - [✅] Remove Review
- [✅] in manage reviews dashboard i want to click on each review and open the whole review in a pop up content box.
- [✅] Build Authentication using passportJS (JWT - GOOGLE OAUTH2.0).
  - [✅] Passport JWT
  - [✅] Passport Google Oauth 2.0
  - [✅] Forget my password implementation
  - [✅] Remember me implementation.
  - [✅] Refresh token.
  - [✅] for the guest user we should not send 401 status code.
- [✅] Authorization -> roles (user, publisher, admin)
  - [✅] Admin
    - [✅] he's the only that can access (manage: bootcamps, reviews, for the all data in the website).
    - [✅] build a dashboard to manage users (delete them).
  - [✅] Publisher
    - [✅] he's only can access the bootcamp dashboard (but for just the bootcamp that he created).
  - [✅] User
    - [✅] just browse the bootcamps can write reviews and read reviews.
- [✅] Rating
  - [✅] will take the rating from the review and push it in the bootcamp rating array.
  - [✅] will calculate the average of the rating array and update the bootcamp ratingAverage.
  - [✅] filter using the rating.
- [✅] Upload the image when the user add a new bootcamp.
- [✅] fix the refresh token issue.


### 🚧 In Progress
- [] Manage accounts.
- [] deploy on Vercel.


### 📋 Upcoming Tasks
