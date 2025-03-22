# REST Endpoints

All the endpoints will be located in the ```controller/``` directory.

## Student

- Get all students: ```GET``` http://localhost:8080/api/students
- Create a student: ```POST``` http://localhost:8080/api/students
- Get student by id: ```GET``` http://localhost:8080/api/students/{id}
- Delete student by id: ```DELETE``` http://localhost:8080/api/students/{id}
- Get list of students similar to a student of given id: ```GET``` http://localhost:8080/api/students/{id}/similar/{limit}
- Get embedding vector of student by given id: ```GET``` http://localhost:8080/api/students/{id}/vector
- Compound filtering by age range, majors, and gender (all optional): ```GET``` http://localhost:8080/api/students/filter?minAge=19&maxAge=21&majors=Computer%20Science&majors=mathematics
    - See ```filterStudentsAdvanced()``` in StudentController.java for all arguments  
- Search by partial name: ```GET``` http://localhost:8080/api/students/search?name=John

## Housing

- Get all housing: ```GET``` http://localhost:8080/api/housing/all
- Get all on-campus housing: ```GET``` http://localhost:8080/api/housing/oncampus
- Get all off-campus housing: ```GET``` http://localhost:8080/api/housing/offcampus
- Compound filtering examples:
    - ```GET``` http://localhost:8080/api/housing/filter?minPrice=500&maxPrice=10000&locationType=on_campus&campus=Busch&availability=true
    - ```GET``` http://localhost:8080/api/housing/filter?maxTimeToCampus=10&locationType=off_campus
    - See ```filterHousing()``` in HousingController.java for all arguments