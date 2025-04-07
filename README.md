# WeDormin?

Check out our deployed site here: <https://wedormin-nsh5.onrender.com/>

WeDormin? is a comprehensive platform designed to simplify the housing process for college students, with a particular focus on Rutgers University students. The application helps users find both on-campus and off-campus housing options, evaluate their lottery chances, and connect with potential roommates based on preferences and compatibility.

## Features

### Housing Search
- **On-Campus Housing**: Browse and filter through all available on-campus housing options
- **Off-Campus Housing**: Explore off-campus alternatives scraped from official listings
- **Advanced Filtering**: Filter housing by:
  - Price range
  - Location type (on/off campus)
  - Housing type (apartment, suite, etc.)
  - Campus (Busch, College Ave, etc.)
  - Availability
  - Square footage
  - Distance from campus

### Housing Details
- **Comprehensive Information**: View detailed information about each housing option including:
  - Price
  - Number of residents
  - Amenities
  - Address
  - Images
  - Availability
- **Lottery Chance Calculation**: For on-campus housing, see your chances of securing housing based on your lottery number
- **Map View**: Visualize housing locations on an interactive Google Maps interface

### Roommate Matching System
- **Preference-Based Profile**: Create a detailed roommate profile including:
  - Academic major and class year
  - General information about each user
  - Users' likes and dislikes
  - Access users' socials
- **AI-Powered Matching**: Our system uses advanced AI to analyze compatibility:
  - Vector embeddings of user profiles stored in PGVector
  - Semantic similarity matching between profiles
  - OpenAI's models analyze preferences to find ideal matches
- **Filtering Options**: Filter potential roommates by specific criteria

### User Features
- **Secure Authentication**: OAuth integration with Google for secure user login
- **Personal Dashboard**: View your personal information including your housing and roommate selection
- **Profile Management**: Update your preferences and roommate matching profile

### AI Integration
- Powered by OpenAI's models for enhanced roommate matching
- Spring AI integration for intelligent features and natural language processing
- Embeddings-based similarity search for finding compatible roommates
- Contextual recommendations based on user preferences

## Tech Stack

### Backend
- **Framework**: Spring-Boot
- **Language**: Java
- **Database**: PostgreSQL (hosted on Supabase)
- **Authentication**: Spring Security with OAuth2
- **Vector Database**: PGVector for similarity searches
- **AI Integration**: Spring AI with OpenAI

### Frontend
- **Framework**: Next.js, React.js
- **UI Components**: Custom UI components, shadcn
- **Maps Integration**: Google Maps API
- **Styling**: Modern responsive design

### Infrastructure
- **Data Scraping**: Custom scripts to gather off-campus housing data
- **Containerization**: Docker support for deployment

## Getting Started

### Backend Setup
1. Configure your database connection in application.properties:
```properties
spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
```

2. Configure your OpenAI API key:
```properties
spring.ai.openai.api-key=${OPENAI_KEY}
spring.ai.openai.model=gpt-4o-mini
spring.ai.openai.embedding.options.model=text-embedding-ada-002
```

3. Set up OAuth credentials:
```properties
spring.security.oauth2.client.registration.google.client-id=${CLIENT_ID}
spring.security.oauth2.client.registration.google.client-secret=${CLIENT_PASSWORD}
```

4. Navigate to the backend directory:
```bash
cd backend
```

5. Run the Spring Boot application:
```bash
mvn clean install
mvn compile
mvn spring-boot:run
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Future Enhancements
- Real-time chat between potential roommates
- Enhanced AI-driven recommendations

## Project Context
This project was developed as part of the Bank of America Code-A-Thon, aiming to create innovative solutions to improve the college housing experience for Rutgers students. 
