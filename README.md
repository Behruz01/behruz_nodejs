# Authorization for mapme.com

For user and admin authorization

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Configuration](#configuration)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Introduction

The authorization module for mapme.com provides a robust and secure mechanism for user and admin authentication and authorization. This module ensures that only authorized users can access specific resources and perform certain actions, thereby enhancing the security and integrity of the application.

## Features

- **User Authentication**: Secure user login and registration using JWT.
- **Admin Authentication**: Separate authentication mechanism for admins.
- **Role-Based Access Control**: Fine-grained access control based on user roles.
- **Session Management**: Efficient session handling using Redis
- **API Documentation**: Comprehensive API documentation with Swagger.

## Installation

Instructions for installing and setting up the project.

### Prerequisites

Ensure you have the following installed:

- **Node.js (version 14.x or higher)**

- **Redis**

- **PostgreSQL**

- **If you are using Windows, enable Redis CLI by opening an Ubuntu terminal for authorization.**

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Behruz01/behruz_nodejs
   ```

2. **Navigate to the project directory**:

   ```bash
   cd behruz_nodejs
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a .env file in the root directory and add the necessary environment variables

```
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
JWT_SECRET=your_jwt_secret
```

5.  **Start the application**

```
npm run start:dev
```

## Usage

Instructions for how to use the project once it’s set up.

### Basic Usage

To start the application in development mode:

```bash
# Run the application
npm run start:dev
```

### Examples

Example of running the server:

```
[Nest] 19068  - 08/05/2024, 3:23:26 PM     LOG [RoutesResolver] AuthControllerV1 {/api/auth} (version: 1): +111ms
[Nest] 19068  - 08/05/2024, 3:23:26 PM     LOG [RouterExplorer] Mapped {/api/auth/login, POST} (version: 1) route +10ms
[Nest] 19068  - 08/05/2024, 3:23:26 PM     LOG [RouterExplorer] Mapped {/api/auth/logout, POST} (version: 1) route +1ms
[Nest] 19068  - 08/05/2024, 3:23:26 PM     LOG [RouterExplorer] Mapped {/api/auth/register, POST} (version: 1) route +0ms
[Nest] 19068  - 08/05/2024, 3:23:26 PM     LOG [RouterExplorer] Mapped {/api/auth/refresh-token, POST} (version: 1) route +1ms
[Nest] 19068  - 08/05/2024, 3:23:26 PM     LOG [RouterExplorer] Mapped {/api/auth/superadminlogin, POST} (version: 1) route +1ms
[Nest] 19068  - 08/05/2024, 3:23:26 PM     LOG [NestApplication] Nest application successfully started +2ms
🚀 Server running on port: 3000
```

User Login

```
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

User Registration

```
POST /api/v1/auth/register
{
  "email": "newuser@example.com",
  "password": "newuserpassword"
}
```

## Configuration

Details on how to configure the project, such as environment variables, configuration files, or settings.

### Configuration Files

- **.env**: Environment variables for configuring the application.

### Environment Variables

- **PORT**: The port on which the application runs.
- **DATABASE_HOST**: Hostname of the PostgreSQL database.
- **DATABASE_PORT**: Port number of the PostgreSQL database.
- **DATABASE_NAME**: Name of the PostgreSQL database.
- **DATABASE_USER**: Username for the PostgreSQL database.
- **DATABASE_PASSWORD**: Password for the PostgreSQL database.
- **JWT_SECRET**: Secret key used for signing JWT tokens.

## Contributing

We welcome contributions to improve this project. Please follow the steps below to contribute:

### How to Contribute

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature-branch
   ```
3. **Make your changes**.
4. **Commit your changes**:
   ```bash
   git commit -m "Add new feature"
   ```
5. **Push to the branch**:
   ```bash
   git push origin feature-branch
   ```
6. **Create a pull request**.

### Code of Conduct

Please adhere to our Code of Conduct while contributing.

## License

This project is licensed under the MIT LICENSE - see the [LICENSE](LICENSE) file for details.

## Contact

Information on how to contact the project maintainers or team.

- **Name**: [Behruz](mailto:ibragimovbehruz822@gmail.com)
- **GitHub**: [Behruz01](https://github.com/Behruz01)

---

### **Explanation:**

- **Project Title**: Authorization for mapme.com
- **Introduction**: Overview and purpose of the authorization module.
- **Features**: Key features including user and admin authentication, role-based access control.
- **Installation**: Steps to install and set up the project, including environment variable setup.
- **Usage**: How to use the project, including API endpoints for registration and login.
- **Configuration**: Details on configuring the project with environment variables.
- **Contributing**: Guidelines for contributing to the project.
- **License**: Licensing information.
- **Contact**: How to get in touch with the project maintainers.
