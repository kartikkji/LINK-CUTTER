# Link Cutter

![Link Cutter](https://kartikkji.github.io/LINK-CUTTER/logo.png)  

**Link Cutter** is a simple and efficient URL shortener that helps users shorten long URLs into concise and shareable links.

🔗 **Live Demo**: [Link Cutter](https://kartikkji.github.io/LINK-CUTTER/)

## 🚀 Features
- ✅ Shorten long URLs instantly
- 🔄 Copy shortened URLs with one click
- 📊 Track shortened URL performance (if analytics are included)
- 🎨 Clean and user-friendly UI
- 🏎️ Fast and reliable link generation

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Spring Boot, Java
- **Database**: PostgreSQL
- **ORM**: Hibernate

## 🏗️ Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Java 17+
- Spring Boot
- PostgreSQL
- Git

### Steps to Run the Project
1. **Clone the repository**
   ```sh
   git clone https://github.com/kartikkji/LINK-CUTTER.git
   cd LINK-CUTTER
   ```

2. **Configure Database**
   Update `application.properties` with your PostgreSQL credentials:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/linkcutter_db
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build and Run**
   ```sh
   mvn spring-boot:run
   ```

4. **Access the Application**
   Open your browser and go to:
   ```sh
   http://localhost:8080
   ```

## 📜 API Endpoints
| Method | Endpoint         | Description                |
|--------|----------------|----------------------------|
| POST   | `/shorten`      | Shorten a given URL        |
| GET    | `/{shortUrl}`   | Redirect to original URL   |

## 🤝 Contributing
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Push to your fork and create a Pull Request

## 📄 License
This project is licensed under the MIT License.

## 🙌 Acknowledgments
- Thanks to the open-source community for inspiration!

---
✨ **Developed by [Kartik](https://github.com/kartikkji)** ✨

