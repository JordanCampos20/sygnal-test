⬅️ [Back to the main README](../../README.md)
---

# 📦 Sygnal - API

**Sygnal API** is an ASP.NET Core application that implements an order management system with support for versioning, authentication, PostgreSQL persistence, and clean layered architecture practices.

---

## 📁 Project Structure

The project consists of the following main components:

- **Controllers**
  - `OrderController`: Handles API endpoints for the `Order` entity.
- **Context**
  - `ApplicationDbContext`: Entity Framework Core database context.
- **Entities**
  - `Order`: Domain model representing an order.
- **Migrations**
  - EF Core migrations for managing the database schema.
- **Interfaces**
  - `IService`, `IOrderService`, `IRepository`, `IOrderRepository`: Interfaces for business logic and data access abstraction.
- **Enums**
  - `StateEnum`: Enumeration representing the state of an order.
- **Services**
  - `OrderService`: Contains business logic related to orders.
- **Repositories**
  - `OrderRepository`: Responsible for data persistence and queries related to orders.
- **Utils**
  - `ConfigUtil`: Utility class for general configuration and helpers.
- **ViewModels**
  - `OrderViewModel`: Data representation used in API requests and responses.

---

## ✅ Installed Packages

| Package | Description |
|--------|-------------|
| `Asp.Versioning.Mvc.ApiExplorer` | API versioning support with integration to API Explorer (Swagger). |
| `Scalar.AspNetCore` | Provides an easy way to generate clean and interactive API reference documentation based on OpenAPI/Swagger. |
| `Microsoft.AspNetCore.Identity.EntityFrameworkCore` | Identity system with authentication/authorization support using EF Core for persistence. |
| `Microsoft.EntityFrameworkCore.Design` | Design-time tools for creating and managing EF Core migrations. |
| `Microsoft.EntityFrameworkCore.Tools` | CLI commands (`dotnet ef`) for managing EF Core from the terminal. |
| `Npgsql.EntityFrameworkCore.PostgreSQL` | PostgreSQL provider for Entity Framework Core. |

---

## 🔧 API Endpoints

| Endpoint | HTTP Method | Description | Expected Response |
|----------|-------------|-------------|--------------------|
| `/api/v1/Order` | `GET` | Retrieves a list of orders. | `200 OK` – Successful request. |
| `/api/v1/Order` | `POST` | Creates a new order. | `200 OK` – Order created successfully. |
| `/api/v1/Order/{orderId}` | `GET` | Retrieves a specific order by `orderId`. | `200 OK` – Order retrieved successfully. |
| `/api/v1/Order/{orderId}` | `PATCH` | Partially updates a specific order by `orderId`. | `200 OK` – Order updated successfully. |

---

## 📄 Version

- **API Version:** 1.0

## 🧪 Running the Project

To start the project with hot reload during development, run the following command in your terminal:

```bash
dotnet watch
```