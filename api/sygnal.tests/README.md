⬅️ [Back to the main README](../../README.md)
---

# 📦 Sygnal - Tests

This project includes both **integration tests** and **service unit tests** for the `Order` module. The tests are written using `[Fact]` from the **xUnit** testing framework.

---

## ✅ Integration Tests

These tests validate the interaction between the API and external components such as the database or HTTP services.

| Test Method | Description |
|-------------|-------------|
| `GetOrders_ReturnsSuccessAndOrder()` | Verifies that listing orders returns success and correct data. |
| `GetOrder_ReturnsSuccessAndOrder()` | Validates fetching an existing order with a successful response. |
| `GetOrder_WhenOrderDoesNotExist_ReturnsNotFound()` | Ensures that searching for a non-existent order returns `NotFound`. |
| `PostOrder_ReturnsSuccessAndOrder()` | Tests the creation of a new order with the expected response. |
| `PatchOrder_ReturnsSuccessAndOrder()` | Checks if partial updates to an order are performed correctly. |
| `PatchOrder_WhenOrderDoesNotExist_ReturnsNotFound()` | Ensures that updating a non-existent order returns `NotFound`. |

---

## 🔧 Service Unit Tests

These tests validate the business logic in the service layer in isolation, without external dependencies.

| Test Method | Description |
|-------------|-------------|
| `GetOrderAll_ReturnsOrder()` | Tests the return of all orders from the service layer. |
| `GetOrderById_ReturnsOrder()` | Verifies that searching by ID returns the correct order. |
| `GetOrderById_WhenOrderNotFound_ReturnsNull()` | Ensures that a non-existent ID returns `null`. |
| `AddOrder_ReturnsOrder()` | Tests the logic for adding a new order. |
| `UpdateOrder_ReturnsOrder()` | Validates the logic for updating an existing order. |

---

## 🧪 How to Run the Tests

Run the tests using the following command in your terminal:

```bash
dotnet test
```