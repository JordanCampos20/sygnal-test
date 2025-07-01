# sygnal-test
Test project for the job application at Sygnal Group

# ⚙️ GitHub Actions

This project uses **GitHub Actions** to automate deployment and testing processes. Below are the main configured workflows:

---

- **🚀 Fly Deploy**  
  Workflow responsible for automatically deploying the **back-end** to [Fly.io](https://fly.io/), making the API available at:  
  🔗 [`https://sygnalapi.jasmim.dev`](https://sygnalapi.jasmim.dev)

- **🌐 Vercel Deploy**  
  Workflow that deploys the **front-end** to [Vercel](https://vercel.com/), making the application accessible at:  
  🔗 [`https://sygnal.jasmim.dev`](https://sygnal.jasmim.dev)

- **🧪 Run Tests on Pull Request**  
  Automatically runs the project's **automated tests** on every pull request. If any test fails, the error is reported directly in the PR interface, blocking the merge until the issue is resolved.

---

These workflows ensure continuous integration and delivery (CI/CD), improving reliability throughout the development process.

---

## 📚 Module Documentation

- 🔵 [**Sygnal - Front**](./front/README.md)  
  Web interface built with Next.js, featuring reusable components, API integration, and theme support.

---

- 🟢 [**Sygnal - API**](./api/sygnal/README.md)  
  Application back-end built with ASP.NET Core, including versioning, authentication, EF Core, and PostgreSQL.

---

- 🧪 [**Sygnal - Tests**](./api/sygnal.tests/README.md)  
  Automated tests for the application, covering both integration and unit tests using xUnit.

---
