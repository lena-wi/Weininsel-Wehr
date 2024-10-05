# PDF Uploader Application Setup (macOS/Linux)

This guide will help you set up and package the provided Python script as a standalone executable on a macOS or Linux machine.

## Prerequisites

1. **Python**: Ensure Python is installed on your machine. You can check by running:

    ```bash
    python3 --version
    ```

    If Python is not installed, download and install it:

    - On macOS: Use [Homebrew](https://brew.sh/) to install Python by running:
        ```bash
        brew install python
        ```
    - On Linux: Use your distribution's package manager. For example, on Ubuntu:
        ```bash
        sudo apt update
        sudo apt install python3 python3-pip
        ```

2. **Supabase Credentials**: You will need your Supabase credentials (URL, API keys, bucket name, and table name) for the app to function properly. These will be stored in a `.env` file.

## Project Setup

1. **Create the Project Directory**:

    - Create a folder for your project, and navigate to it.

2. **Create `requirements.txt`**:

    - Create a file named `requirements.txt` with the following contents:
        ```txt
        PyQt5==5.15.9
        python-dotenv==1.0.0
        supabase==0.1.10
        ```

3. **Install the Required Packages**:

    - Open a terminal in your project folder and run:
        ```bash
        pip3 install -r requirements.txt
        ```

4. **Install PyInstaller**:

    - PyInstaller will convert your Python script into a standalone executable. Install it by running:
        ```bash
        pip3 install pyinstaller
        ```

5. **Create `.env` File**:
    - Create a `.env` file in the same folder as your script and add your Supabase credentials:
        ```env
        VITE_SUPABASE_URL=your_supabase_url
        VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
        VITE_SUPABASE_BUCKET_NAME=your_bucket_name
        VITE_SUPABASE_RELATED_BUCKET_TABLE_NAME=your_table_name
        ```

## Packaging the Script as an Executable

1. **Run PyInstaller**:

    - Use PyInstaller to create a standalone executable from your Python script. On macOS or Linux, run:

        ```bash
        pyinstaller --onefile --windowed uploadPdfsToTable.py
        ```

        - `--onefile`: Packages everything into a single executable file.
        - `--windowed`: Suppresses the command line window (for GUI applications).

2. **Locate the Executable**:

    - After the build process, the executable file will be located in the `dist` folder within your project directory.

    - **On macOS**: The output will be a `.app` bundle (which you can move into `Applications` or any other folder).
    - **On Linux**: The output will be a single executable file (`uploadPdfsToTable`).

3. **Distribute the Executable**:
    - Copy the executable file and the `.env` file to the desired location. Ensure that the `.env` file is in the same directory as the executable to provide the necessary environment variables.

## Running the Executable

1. **macOS**:

    - Navigate to the directory containing the `.app` bundle, and double-click it to run the application.
    - Ensure your `.env` file is in the same directory as the `.app` file.

2. **Linux**:

    - Navigate to the directory containing the executable file.
    - Ensure the `.env` file is in the same directory as the executable.
    - Run the executable using the terminal:
        ```bash
        ./uploadPdfsToTable
        ```

3. **Upload PDFs and Manage Data**:
    - Once the application is running, use the interface to upload PDFs to Supabase and enter the related `name` and `href` fields.

## Summary of Files

-   **Python Script**: `uploadPdfsToTable.py` (the code for the PDF uploader)
-   **Environment Variables**: `.env` (containing your Supabase credentials)
-   **Requirements**: `requirements.txt` (for package installation)
-   **Executable**:
    -   On macOS: A `.app` bundle located in the `dist` folder.
    -   On Linux: An executable file located in the `dist` folder.

## Troubleshooting

-   If the executable does not work as expected, ensure the `.env` file is properly configured and located in the same directory as the executable.
-   If you encounter permission issues on Linux, you might need to give execute permission to the generated file:
    ```bash
    chmod +x ./uploadPdfsToTable
    ```
