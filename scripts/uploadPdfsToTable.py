import sys
import os
from PyQt5.QtWidgets import (
    QApplication,
    QWidget,
    QPushButton,
    QVBoxLayout,
    QLabel,
    QLineEdit,
    QFileDialog,
    QMessageBox,
)
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up Supabase credentials
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_SERVICE_ROLE_KEY")
BUCKET_NAME = os.getenv("VITE_SUPABASE_BUCKET_NAME")
TABLE_NAME = os.getenv("VITE_SUPABASE_RELATED_BUCKET_TABLE_NAME")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class PDFUploaderApp(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("PDF Upload to Supabase")
        self.setGeometry(100, 100, 400, 400)

        font = self.font()
        font.setPointSize(16)  # Increase font size
        self.setFont(font)

        layout = QVBoxLayout()

        self.feedback_label = QLabel("Bitte wählen Sie eine PDF-Datei aus.")
        layout.addWidget(self.feedback_label)

        self.upload_btn = QPushButton("PDF auswählen")
        self.upload_btn.setFixedHeight(50)  # Set button height
        self.upload_btn.clicked.connect(self.select_pdf)
        layout.addWidget(self.upload_btn)

        self.url_entry = QLineEdit(self)
        self.url_entry.setPlaceholderText("Datei URL")
        self.url_entry.setReadOnly(True)
        self.url_entry.setFixedHeight(50)
        layout.addWidget(self.url_entry)

        self.name_entry = QLineEdit(self)
        self.name_entry.setPlaceholderText("Name: Gruppenführer")
        self.name_entry.setVisible(False)
        self.name_entry.setFixedHeight(40)  # Increase height
        layout.addWidget(self.name_entry)

        self.href_entry = QLineEdit(self)
        self.href_entry.setPlaceholderText("Href: /gruppenfuehrer")
        self.href_entry.setVisible(False)
        self.href_entry.setFixedHeight(50)  # Increase height
        layout.addWidget(self.href_entry)

        self.submit_btn = QPushButton("Daten hochladen")
        self.submit_btn.setVisible(False)
        self.submit_btn.setFixedHeight(50)  # Set button height
        self.submit_btn.clicked.connect(self.submit_data)
        layout.addWidget(self.submit_btn)

        self.setLayout(layout)

    def select_pdf(self):
        file_path, _ = QFileDialog.getOpenFileName(self, "Select PDF File", "", "PDF Files (*.pdf)")
        if file_path:
            self.pdf_file_path = file_path
            self.url_entry.setText(file_path)  # Display the file path
            self.feedback_label.setText("Datei ausgewählt: " + os.path.basename(file_path))
            self.upload_file(file_path)  # Upload the file immediately

    def upload_file(self, file_path):
        # Upload the file to Supabase storage
        file_name = os.path.basename(file_path)
        try:
            with open(file_path, "rb") as f:
                res = supabase.storage.from_(BUCKET_NAME).upload(file_name, f)
                if res:
                    file_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{file_name}"
                    self.url_entry.setText(file_url)  # Show URL
                    self.name_entry.setVisible(True)  # Show name field
                    self.href_entry.setVisible(True)  # Show href field
                    self.feedback_label.setText("Upload erfolgreich! Füllen Sie die Felder aus.")
                    self.submit_btn.setVisible(True)  # Show the submit button
                else:
                    QMessageBox.warning(self, "Fehler", "Upload fehlgeschlagen.")
        except Exception as e:
            QMessageBox.critical(self, "Fehler", str(e))

    def submit_data(self):
        url = self.url_entry.text()
        name = self.name_entry.text()
        href = self.href_entry.text()

        if url and name and href:
            response = supabase.table(TABLE_NAME).insert({"url": url, "name": name, "href": href}).execute()
            # Check for successful insertion
            if response.data:
                QMessageBox.information(self, "Erfolg", "Daten erfolgreich hochgeladen!")
                self.name_entry.clear()
                self.href_entry.clear()
                self.url_entry.clear()
                self.submit_btn.setVisible(False)
                self.name_entry.setVisible(False)
                self.href_entry.setVisible(False)
                self.feedback_label.setText("Bitte wählen Sie eine PDF-Datei aus.")  # Reset feedback message
            else:
                QMessageBox.warning(self, "Fehler", "Upload fehlgeschlagen: " + str(response.error))
        else:
            QMessageBox.warning(self, "Fehlende Daten", "Bitte füllen Sie alle Felder aus.")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = PDFUploaderApp()
    window.show()
    sys.exit(app.exec_())
