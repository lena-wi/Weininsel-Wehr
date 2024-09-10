# Weininsel-Wehr study and training app for firefighters in bavaria

This web application is designed and optimized for mobile use, providing essential resources and training materials for the fire departments at bavaria, germany. 
It includes lecture files, exercises, and a quiz feature to help firefighters prepare for exams and ensure they are ready for real-world challenges.

## Features

- **Mobile-Optimized Interface**: Easy-to-use interface designed specifically for mobile devices to facilitate learning on the go.
  
- **Training Resources**: Access essential files and lectures related to fire department exercises. Stay up-to-date with the latest practices and procedures.

- **Interactive Quiz**: Prepare for the fire department exams by taking quizzes that test your knowledge on various firefighting topics and scenarios.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fire-department-sommerach-app.git

2. Navigate into the project directory:
    ```bash
    cd Weininsel-Wehr

3. Install dependencies
    ```bash
    npm install

4. Set up the Supabase environment by adding your Supabase credentials:
    Create a .env file at the root of the project and add the following:
    ```bash
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_KEY=your-supabase-key

5. Run the application locally:
    ```bash
    npm run dev

## Usage

1. Access Training Files: Browse through the library of files and lectures that will assist you in completing your exercises.

2. Quiz Section: Test your knowledge through the quiz feature. You can practice different sets of questions that mimic the format of actual fire department exams.

3. Track Your Progress: Keep an eye on your quiz scores to measure your readiness for the exams.

## Technology Stack

- **Frontend**: React, Vite, Tailwind CSS, Headless UI
- **Backend**: Supabase (for database and authentication)
- **Mobile Optimization**: Fully responsive design using CSS Grid and Flexbox for a seamless experience across devices.

## Contributing

We welcome contributions from the community to improve this project. To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-name).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-name).
5. Open a pull request.

## License
This project is licensed under the MIT License.