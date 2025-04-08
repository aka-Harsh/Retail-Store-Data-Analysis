# 🚀 How to Run the Backend Application

Welcome! 👋 This guide will help you get the backend of the **Retail Store Data Analysis** project up and running on your local machine.

📦 **Repository**: [Retail-Store-Data-Analysis](https://github.com/aka-Harsh/Retail-Store-Data-Analysis)


## 🛠️ Prerequisites

- Java 17+ (Make sure it's installed and configured)
- Maven
- IDE of your choice (e.g., IntelliJ IDEA, Eclipse)
- Web browser
- Postman (for testing APIs)


## 🔄 Clone the Repository

```bash
git clone https://github.com/aka-Harsh/Retail-Store-Data-Analysis.git
```

Then open the `backend` folder in your preferred IDE.

---

## 🧱 Step-by-Step Setup

### 1️⃣ Start the API Gateway

- Navigate to the `api-gateway` module.
- Run the `ApiGatewayApplication.java` file.

✅ The API Gateway should be running on port **8089**.

📌 **Note**: Ensure port `8089` is free, or update the port in `application.yml`.

---

### 2️⃣ Start the Product Service

- Navigate to the `product-service` module.
- Run the `ProductServiceApplication.java` file.
- Open your browser and go to 👉 [http://localhost:8081/h2-console](http://localhost:8081/h2-console)

#### 🛢️ H2 Database Details:
- **JDBC URL**: `jdbc:h2:mem:productdb`
- **Username**: *(leave as is)*
- **Password**: *(leave as is)*
---

### 3️⃣ Start the Order Service

- Navigate to the `order-service` module.
- Run the `OrderServiceApplication.java` file.
- Open 👉 [http://localhost:8082/h2-console](http://localhost:8082/h2-console)

#### 🛢️ H2 Database Details:
- **JDBC URL**: `jdbc:h2:mem:orderdb`
- **Username**: *(leave as is)*
- **Password**: *(leave as is)*
---

### 4️⃣ Start the Admin Service

- Navigate to the `admin-service` module.
- Run the `AdminServiceApplication.java` file.
- Open 👉 [http://localhost:8083/h2-console](http://localhost:8083/h2-console)

#### 🛢️ H2 Database Details:
- **JDBC URL**: `jdbc:h2:mem:admindb`
- **Username**: *(leave as is)*
- **Password**: *(leave as is)*
---

### 5️⃣ Start the Auth Service

- Navigate to the `auth-service` module.
- Run the `AuthServiceApplication.java` file.
- Open 👉 [http://localhost:8084/h2-console](http://localhost:8084/h2-console)

#### 🛢️ H2 Database Details:
- **JDBC URL**: `jdbc:h2:mem:authdb`
- **Username**: *(leave as is)*
- **Password**: *(leave as is)*

---

## ✅ Final Check

🎯 Your backend should now be fully up and running!

You can test all the microservices and their inter-service communication using **Postman** or any other API testing tool.


## 💡 Next Step: Connect the Frontend

👉 Refer to the `frontend/help.md` file for instructions on how to connect the backend with the frontend and run the complete full-stack application.


## ⚠️ Notes

- 🚫 No need to manually add extra dependencies.
- 🔄 If any microservice fails due to dependency issues, simply update the `pom.xml` for that service accordingly.
