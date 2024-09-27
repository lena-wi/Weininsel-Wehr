# Weininsel-Wehr

This web application is designed and optimized for mobile use, providing essential resources and training materials for the fire departments in Bavaria, Germany. It includes lecture files, exercises, and a quiz feature to help firefighters prepare for exams and ensure they are ready for real-world challenges.

## Features

-   **Mobile-Optimized Interface**: Easy-to-use interface designed specifically for mobile devices to facilitate learning on the go.
-   **Training Resources**: Access essential files and lectures related to fire department exercises. Stay up-to-date with the latest practices and procedures.
-   **Interactive Quiz**: Prepare for the fire department exams by taking quizzes that test your knowledge on various firefighting topics and scenarios.
-   **PDF Upload Script**: A Python script for uploading PDF files to a Supabase database, allowing for easy management of training resources.

## Installation

### Web Application

1. Clone the repository:

    ```bash
    git clone https://github.com/MrIceTea321/Weininsel-Wehr.git
    ```

2. Navigate into the project directory:

    ```bash
    cd Weininsel-Wehr
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up the Supabase environment by adding your Supabase credentials:
   Create a `.env` file at the root of the project and add the following:

    ```bash
    VITE_SUPABASE_URL=your-supabase-url
    VITE_SUPABASE_KEY=your-supabase-key
    ```

5. Run the application locally:

    ```bash
    npm run dev
    ```

### Python PDF Upload Script

1. Navigate to the Python script directory (if it's in a subfolder, for example, `python_script`):

    ```bash
    cd python_script
    ```

2. Install the required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

3. Set up the Supabase environment by creating a `.env` file with your Supabase credentials:

    ```bash
    VITE_SUPABASE_URL=your-supabase-url
    SUPABASE_SERVICE_ROLE_KEY=your-supabase-key
    SUPABASE_BUCKET_NAME=your-bucket-name
    SUPABASE_RELATED_BUCKET_TABLE_NAME=your-table-name
    ```

4. Run the Python script:

    ```bash
    python uploadPdfsToTable.py
    ```

## Usage

1. **Access Training Files**: Browse through the library of files and lectures that will assist you in completing your exercises.
2. **Quiz Section**: Test your knowledge through the quiz feature. You can practice different sets of questions that mimic the format of actual fire department exams.
3. **Track Your Progress**: Keep an eye on your quiz scores to measure your readiness for the exams.
4. **Upload PDFs**: Use the Python script to upload PDF files to the Supabase database for easy access and management.

## Technology Stack

-   **Frontend**: React, Vite, Tailwind CSS, Headless UI
-   **Backend**: Supabase (for database and authentication)
-   **Mobile Optimization**: Fully responsive design using CSS Grid and Flexbox for a seamless experience across devices.
-   **Python Script**: Utilizes Supabase for uploading PDF files and managing data.

## Contributing

We welcome contributions from the community to improve this project. To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-name).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-name).
5. Open a pull request.

## License

This project is licensed under the MIT License.
